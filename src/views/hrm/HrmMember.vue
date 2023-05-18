<template>
<div class="hrmlist">
  <div>
    <h2 align="center">사원정보 리스트</h2>
    <div class="table-responsive">
      <div>
      <div class="head-btn">
      <button @click="fnexceldown()">Excel</button>
      <button @click="fnincheck()">사원등록</button>
      </div>
      </div>
      <hr class="my-4">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">재직여부</th>
              <th scope="col">담당부서</th>
              <th scope="col">사원정보처리</th>
              <th scope="col">재직상태변경</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, empno) in list" :key="empno">
              <td>{{ row.empid }}</td>
              <td>{{ row.empname }}</td>
              <td>{{ row.empstatus }}</td>
              <td>{{ row.deptname }}</td>
              <td>
              <button @click="fnhrmup(row.empno)">수정</button>
              </td>
              <td>
              <button @click="fnhrmde(row.empno, row.empstatus)">변경</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="searchdiv">
            <select v-model="search_key" >
              <option value="ID">ID</option>
              <option value="Name">Name</option>
            </select>
            <input type="text" v-model="search_value" @keyup.enter="fnhrmsearch()">
            <button @click="fnhrmsearch()">검색</button>
        </div> 
        <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
            <span>
              <a href="javascript:;" @click="fnhrmsearch(1)" class="first w3-button w3-border">&lt;&lt;</a>
              <a href="javascript:;" v-if="paging.startPage > 10" @click="fnhrmsearch(`${paging.startPage - 1}`)" class="prev w3-button w3-border">
              &lt;</a>
              <template v-for="(n, index) in paginavigation()">
              <template v-if="paging.page == n">
              <strong class="w3-button w3-border w3-green" :key="index">{{n}}</strong>
              </template>
              <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnhrmsearch(`${n}`)" :key="index">{{ n }}</a>
              </template>
              </template>
              <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage" @click="fnhrmsearch(`${paging.endPage + 1}`)" class="next w3-button w3-border">
              &gt;</a>
              <a href="javascript:;" @click="fnhrmsearch(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
            </span>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
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
      size: this.$route.query.size ? this.$route.query.size : 10,
      search_key: this.$route.query.sk ? this.$route.query.sk : "",
      search_value: this.$route.query.sv ? this.$route.query.sv : null,
      paginavigation: function () { //페이징 처리 for문 커스텀
        let pageNumber = [] //;
        let startPage = this.paging.startPage;
        let endPage = this.paging.endPage;
        for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      },
      empno: '',
      empstatus: "" 
    }
  },
  mounted() {
    this.fnhrmlist()
  },
  methods: {
    fnhrmsearch(n) {
      if (this.page !== n) {
        this.page = n       
      }

      this.fnhrmlist()      
    },
    fnhrmlist(){
      this.requestBody = { // 데이터 전송        
        sk: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/hrm/hrmmember", {
        
        params: this.requestBody,
        headers: {}
      }).then((res) => {      

        if (res.data.resultCode === "OK") {
          this.list = res.data.data
          this.paging = res.data.pagination
          this.no = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize)
        }
        
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnincheck(){
      this.$router.push({
        path: './hrmenroll'
      })
    },
    fnhrmup(empno){
      this.requestBody.empno = empno
      this.$router.push({
        path: './hrmup',
        query: this.requestBody
      })
    },
    fnexceldown(){

    },
    fnhrmde(empno, empstatus){
      if(empstatus == "N"){
        this.form = {
          "empno": empno,
          "empstatus": "Y"
        }
      }else{
        this.form = {
          "empno": empno,
          "empstatus": "N"
        }
      }

      this.$axios.patch(this.$serverUrl + "/hrm/employeequit", this.form)
      .then(() => {
          alert('재직상태가 변경되었습니다.')
          this.fnhrmlist();
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
  }
}
</script>

<style scoped>
.pagination{
  display: flex;
  align-items: center;
  justify-content: center;
}
.hrmlist{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
  margin: 0 auto;
}
.head-btn{
  text-align:right;
  margin-top: 15px;
  margin-right: 30px;
}
.searchdiv{
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-responsive{
    border: #87888a80 1px solid;
    border-radius: 20px;
    --bs-blue: #0d6efd;
    --bs-indigo: #6610f2;
    --bs-purple: #6f42c1;
    --bs-pink: #d63384;
    --bs-red: #dc3545;
    --bs-orange: #fd7e14;
    --bs-yellow: #ffc107;
    --bs-green: #198754;
    --bs-teal: #20c997;
    --bs-cyan: #0dcaf0;
    --bs-black: #000;
    --bs-white: #fff;
    --bs-gray: #6c757d;
    --bs-gray-dark: #343a40;
    --bs-gray-100: #f8f9fa;
    --bs-gray-200: #e9ecef;
    --bs-gray-300: #dee2e6;
    --bs-gray-400: #ced4da;
    --bs-gray-500: #adb5bd;
    --bs-gray-600: #6c757d;
    --bs-gray-700: #495057;
    --bs-gray-800: #343a40;
    --bs-gray-900: #212529;
    --bs-primary: #0d6efd;
    --bs-secondary: #6c757d;
    --bs-success: #198754;
    --bs-info: #0dcaf0;
    --bs-warning: #ffc107;
    --bs-danger: #dc3545;
    --bs-light: #f8f9fa;
    --bs-dark: #212529;
    --bs-primary-rgb: 13,110,253;
    --bs-secondary-rgb: 108,117,125;
    --bs-success-rgb: 25,135,84;
    --bs-info-rgb: 13,202,240;
    --bs-warning-rgb: 255,193,7;
    --bs-danger-rgb: 220,53,69;
    --bs-light-rgb: 248,249,250;
    --bs-dark-rgb: 33,37,41;
    --bs-white-rgb: 255,255,255;
    --bs-black-rgb: 0,0,0;
    --bs-body-color-rgb: 33,37,41;
    --bs-body-bg-rgb: 255,255,255;
    --bs-font-sans-serif: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --bs-font-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
    --bs-body-font-family: var(--bs-font-sans-serif);
    --bs-body-font-size: 1rem;
    --bs-body-font-weight: 400;
    --bs-body-line-height: 1.5;
    --bs-body-color: #212529;
    --bs-body-bg: #fff;
    --bs-border-width: 1px;
    --bs-border-style: solid;
    --bs-border-color: #dee2e6;
    --bs-border-color-translucent: rgba(0, 0, 0, 0.175);
    --bs-border-radius: 0.375rem;
    --bs-border-radius-sm: 0.25rem;
    --bs-border-radius-lg: 0.5rem;
    --bs-border-radius-xl: 1rem;
    --bs-border-radius-2xl: 2rem;
    --bs-border-radius-pill: 50rem;
    --bs-link-color: #0d6efd;
    --bs-link-hover-color: #0a58ca;
    --bs-code-color: #d63384;
    --bs-highlight-bg: #fff3cd;
    font-family: var(--bs-body-font-family);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: .875rem;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    box-sizing: border-box;
    overflow-x: auto;
    margin: 0 auto;
}
</style>