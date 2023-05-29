<template>
    <div class="main">
      <!--[관리자, 임원]의 부서이동신청 관리 페이지입니다.-->
      <h2 align="center">부서 신청</h2>

        <!--관리자는 내 이동이력 버튼 숨김-->
          <div v-if="auth == '임원' ">
            <a v-on:click="fnView2()"><button>내 이동이력</button></a>
          </div>
          <div v-else></div>
        <div class="top">
          
        <!--카테고리검색-->
          <div class="d-inline-flex align-items-center">
            <div class="form-group mr-2">
              <select id="category" v-model="search_key" class="form-control">
                <option value="">- 선택 -</option>
                <option value="ID">ID</option>
                <option value="Name">이름</option>
                <option value="Level">직급</option>
                <option value="Deptname">현부서명</option>
              </select>
            </div>
            <div class="form-group mr-2">
              <input type="text" v-model="search_value" class="form-control" @keyup.enter="fnPage()" placeholder="입력란">
            </div>
            <div class="form-group mr-1">
              <button class="form-control" type="button"  @click="fnPage()">조회</button>
            </div>
          </div>
        </div>

        <!-- 내용 -->
        <table class="w3-table-all">
            <thead class="theadline">
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>직급</th>
                    <th>현부서명</th>
                    <th>=></th>
                    <th>이동희망부서</th>
                    <th>신청내역조회</th>
                </tr>
            </thead>
            <tbody v-if="auth == '관리자' ">
              <!-- [관리자] 전체인원중 현황값이 '검토중'인 모든 리스트 출력 -->
              <tr v-for="(row, appno) in manager" :key="appno">   
                <td>{{ row.appid }}</td>
                <td>{{ row.appname }}</td>
                <td>{{ row.applevel }}</td>
                <td>{{ row.appdeptname }}</td>
                <td>=></td>
                <td>{{ row.appchange }}</td>
                <td><a v-on:click="fnView(`${row.appno}`)"><button>신청내역조회</button></a></td>
                </tr>
            </tbody>

            <tbody v-else>
              <!-- [임원] 접속한 본인과 같은 부서 인원들의 현황값 '검토중'만 출력 -->
              <tr v-for="(row, appno) in executive" :key="appno">   
                <td>{{ row.appid }}</td>
                <td>{{ row.appname }}</td>
                <td>{{ row.applevel }}</td>
                <td>{{ row.appdeptname }}</td>
                <td>=></td>
                <td>{{ row.appchange }}</td>
                <td><a v-on:click="fnView(`${row.appno}`)"><button>신청내역조회</button></a></td>
                </tr>
            </tbody>
        </table>
      
      <!-- 페이징 -->
      <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
        <span class="pg">
          <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-border">&lt;&lt;</a>
          <a href="javascript:;" v-if="paging.startPage > 10" @click="fnPage(`${paging.startPage-1}`)"
            class="prev w3-button w3-border">&lt;</a>
          <template v-for=" (n,index) in paginavigation()">
            <template v-if="paging.page==n">
              <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
            </template>
            <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
            </template>
          </template>
          <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage"
            @click="fnPage(`${paging.endPage+1}`)" class="next w3-button w3-border">&gt;</a>
          <a href="javascript:;" @click="fnPage(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
        </span>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loginid: "",
      token: "",
      auth: "",
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      manager: [],  //관리자
      executive: [],  //임원
      no: '', //게시판 숫자처리
      paging: {
      block: 0,
      endPage: 0,
      nextBlock: 0,
      page: 0,
      pageSize: 0,
      prevBlock: 0,
      startIndex: 0,
      startPage: 0,
      totalBlockCnt: 0,
      totalListCnt: 0,
      totalPageCnt: 0,
    }, //페이징 데이터
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size :10,
      //keyword: this.$route.query.keyword,
      search_key: this.$route.query.sk ? this.$route.query.sk : '',
      search_value: this.$route.query.sv ? this.$route.query.sv : '',
      paginavigation: function () { //페이징 처리 for문 커스텀
        let pageNumber = [] //;
        let startPage = this.paging.startPage;
        let endPage = this.paging.endPage;
        for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      }
    }
  },

  mounted() {
    this.fnGetList().then(() => {
      // 관리자, 임원 전용 리스트 조건
      this.manager = this.list.filter(condition => condition.applevel === '임원' && condition.appaccept === '검토중');
      this.executive = this.list.filter(condition => condition.applevel === '사원' && condition.appaccept === '검토중');
    });
    this.authcheck();
  },

  watch: {
    '$route'() {
      this.fnloginck();
      this.authcheck();
    }
  },

  methods: {
    fnloginck() {
      if (sessionStorage.getItem('token') !== null) {
        this.token = 1;
      } else {
        this.token = 0;
      }
    },
    authcheck() {
      if (sessionStorage.getItem('emplevel') == '관리자') {
        this.auth = '관리자';
      } else if (sessionStorage.getItem('emplevel') == '임원') {
        this.auth = '임원';
      } else if (sessionStorage.getItem('emplevel') == '사원') {
        this.auth = '사원';
      }
    },
    async fnGetList() {
      this.requestBody = {
        sk: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      };
      try {
       const res = await this.$axios.get(this.$serverUrl + "/management/deptapplist", {
        params: this.requestBody,
           headers: {}
          });
       if (res.data.resultCode === "OK") {
        this.list = res.data.data;
          this.paging = res.data.pagination;
          this.no = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize);
       }
     } 
     catch(err) {
       if (err.message.indexOf('Network Error') > -1) {
         alert('Network error. Please contact support.');
       }
     }
    },
    fnView(appno) {
        this.requestBody.appno = appno
        this.$router.push({
        path: '/management/appdetailscheck',
        query: this.requestBody
      })
    },
    fnView2(appid) {
      this.requestBody.loginid = appid
      this.$router.push({
        path: '/management/movinghistory',
        query: this.requestBody
      })
    },
    fnPage(n) {
      if (this.page !== n) {
        this.page = n          
      }
      this.fnGetList()
    },
  },
};
</script>


<style scoped>
.main {
    overflow: auto;
}
.top {
    display: flex;
    justify-content: flex-end;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f1f1f1;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.page.active,
.page:hover {
  background-color: #0077cc;
  color: #fff;
}
</style>