<template>
  <!-- 특정 인원의 모든 이동이력 출력 -->
    <div class="main">
      <h2 align="center">이동이력</h2>

        <!--카테고리검색-->
        <div class="top">
          <div class="d-inline-flex align-items-center">
            <div class="form-group mr-2">
              <select id="category" v-model="search_key" class="form-control">
                <option value="">- 선택 -</option>
                <option value="Deptname">부서명</option>
                <option value="ID">ID</option>
                <option value="Name">이름</option>
                <option value="Level">직급</option>
                <option value="Accept">현황</option>
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
                    <th>부서명</th>
                    <th>ID</th>
                    <th>이름</th>
                    <th>직급</th>
                    <th>작성일자</th>
                    <th>=></th>
                    <th>희망부서</th>
                    <th>세부내역조회</th>
                    <th>현황</th>
                </tr>
            </thead>
            <tbody v-if="auth == '관리자' ">
                <tr v-for="(row, appno) in list" :key="appno">   
                    <td>{{ row.appdeptname }}</td>
                    <td>{{ row.appid }}</td>
                    <td>{{ row.appname }}</td>
                    <td>{{ row.applevel }}</td>
                    <td>{{ row.appdate }}</td>
                    <td>=></td>
                    <td>{{ row.appchange }}</td>
                    <td><a v-on:click="fnView(`${row.appno}`)"><button>세부내역조회</button></a></td>
                    <td>{{ row.appaccept }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="(row, appno) in mylist" :key="appno">   
                    <td>{{ row.appdeptname }}</td>
                    <td>{{ row.appid }}</td>
                    <td>{{ row.appname }}</td>
                    <td>{{ row.applevel }}</td>
                    <td>{{ row.appdate }}</td>
                    <td>=></td>
                    <td>{{ row.appchange }}</td>
                    <td><a v-on:click="fnView(`${row.appno}`)"><button>세부내역조회</button></a></td>
                    <td>{{ row.appaccept }}</td>
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
      token: "",
      auth: "", // 권한 설정
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      mylist: [], //본인 리스트
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
  watch: {  // 권한 설정
    '$route'() {
      this.authcheck();
      this.fnloginck();
      
    }
  },
  mounted() {
    this.authcheck();
    this.fnGetList().then(() => {
      // 관리자, 임원 전용 리스트 조건
      this.mylist = this.list.filter(condition => condition.appid === this.empId);
    });
    
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
      this.empId = sessionStorage.getItem('empId');
      if(sessionStorage.getItem('emplevel') == '관리자') {
        this.auth = '관리자';
      } else if (sessionStorage.getItem('emplevel') == '임원') {
        this.auth = '임원';
      } else if (sessionStorage.getItem('emplevel') == '사원') {
        this.auth = '사원';
      } 
    },  // 권한 설정
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
        path: '/management/movedetailscheck',
        query: this.requestBody
      })
    },

    fnPage(n) {
      if (this.page !== n) {
        this.page = n          
      }
      this.fnGetList()
    },

    fnWrite() {
      this.$router.push({
        path: './write'
      })
    },

    fnUpdate(){
      this.$router.push({
      path: './update'
      })
    },

  }
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