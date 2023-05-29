<template>
  <div class="bradcumb-title text-center">
    <h2>공지사항</h2>
  </div>
  <template v-if="auth == '관리자' ">
  <div class="common-buttons">
    <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">글 등록</button>
  </div>
  </template>
  <template v-else-if="auth == '임원' || auth == '사원' ">
    <div class="common-buttons">
    <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite" disabled>글 등록</button>
  </div>
  </template>
  <div class="notice-list">
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
        </tr>
      </thead>
    <tbody>
      <tr v-for="(row, noticeno) in list" :key="noticeno">   
          <td>{{ nos-noticeno }}</td>     
        <td><a v-on:click="fnNoticeView(`${row.noticeno}`)" :style="{ color: row.noticetitle ? 'blue' : '', textDecoration: 'none' }" class="hover-effect">{{ row.noticetitle }}</a></td>
        <td>관리자</td>
        <td>{{ row.noticedate }}</td>
      </tr>
    </tbody>
  </table>
  <!-- 검색필드추가 -->
  <div class="center">
  <div class="d-inline-flex align-items-center">
    <div class="form-group mr-2">
      <select id="category" v-model="search_key" class="form-control">
        <option value="">- 선택 -</option>
        <option value="noticetitle">제목</option>
      </select>
    </div>
    <div class="form-group mr-2">
      <input type="text" id="noticetitle" v-model="search_value" class="form-control" @keyup.enter="fnPage()" placeholder="입력란">
    </div>
    <div class="form-group mr-1">
      <button class="form-control" type="button"  @click="fnPage()">조회</button>
    </div>
  </div>
  </div>
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
      auth: "",
      requestBody: {}, 
                list: {}, 
                nos: '', 
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
                }, 
                page: this.$route.query.page ? this.$route.query.page : 1,
                size: this.$route.query.size ? this.$route.query.size :10,
                search_key: this.$route.query.sk ? this.$route.query.sk : '',
                search_value: this.$route.query.sv ? this.$route.query.sv : '',
                paginavigation: function () {
                    let pageNumber = [] //;
                    let startPage = this.paging.startPage;
                    let endPage = this.paging.endPage;
                    for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
                    return pageNumber;
                }
    }
  },
  mounted() {
    this.fnGetList();
    this.authcheck();
  },
  methods: {
    fnGetList() {
      this.requestBody = { 
                sk: this.search_key,
                sv: this.search_value,
                page: this.page,
                size: this.size
            }
            this.$axios.get(this.$serverUrl + "/notice/list", {
                params: this.requestBody,
                headers: {}
            }).then((res) => {        
                if (res.data.resultCode === "OK") {
                  this.list = res.data.data
                  this.paging = res.data.pagination
                  this.nos = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize)
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                }
            })
    },
     authcheck() {
      if(sessionStorage.getItem('emplevel') == '관리자') {
        this.auth = '관리자';
      } else if (sessionStorage.getItem('emplevel') == '임원') {
        this.auth = '임원';
      } else if (sessionStorage.getItem('emplevel') == '사원') {
        this.auth = '사원';
      } 
    },
    fnNoticeView(noticeno){
      this.requestBody.noticeno = noticeno
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnPage(n) {
      if(this.page !== n){
        this.page = n
      }
      this.fnGetList()
    },
     fnWrite() {
                this.$router.push({
                  path: './write'
                })
              },
  },
};
</script>
<style scoped>
  
  .hover-effect:hover {
    background-color: #edf6ff;
    text-decoration: none;
  }

 .center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

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