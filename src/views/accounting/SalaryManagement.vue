<template>
  <br>
   <h1 style="text-align: center;">급여 관리 페이지</h1>
   <br>

     <!-- 검색 바 구역 -->
  <div class="search_container">
    <select v-model="search_key">
      <option value="ID">사원코드</option>
      <option value="Name">사원이름</option>
      <option value="deptname">부서이름</option>
      <option value="emphiredate">입사일자</option>
    </select>
    <input class="search_container-input" type="text" placeholder="검색어를 입력해주세요" v-model="search_value" @keyup.enter="fnhrmsearch()" size="50" />
    <button class="search_container-btn w3-button w3-round w3-blue-gray" @click="fnhrmsearch()">검색</button>
  </div>

   <!-- 테이블 구역 -->
   <table class="salary-table">
      <thead>
        <tr>
          <th style="width:150px;"></th>
          <th>사원코드</th>
          <th>사원명</th>
          <th>부서명</th>
          <th>입사일자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, empno) in list" :key="empno">
          <td><input type="checkbox" /></td>
          <td style="color:blue;"><a v-on:click="movePayStubWrite(`${row.empId}`)">{{ row.empId }}</a></td>
          <td>{{ row.empname }}</td>
          <td>{{ row.deptname }}</td>
          <td>{{ row.emphiredate }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 액션 버튼 (이메일 및 인쇄) 구역 -->
  <div class="actions">
    <!-- <button class="w3-button w3-round w3-blue-gray" @click="sendemail()">Email</button>
    <button class="w3-button w3-round w3-blue-gray" @click="sendsms()">SMS</button> -->

  </div>
  
  <!-- 페이지 처리 -->
  <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
    <span>
      <a href="javascript:;" @click="fnhrmsearch(1)" class="first w3-button w3-border">&lt;&lt;</a>
      <a href="javascript:;" v-if="paging.startPage > 10" @click="fnhrmsearch(`${paging.startPage - 1}`)"
        class="prev w3-button w3-border">
        &lt;</a>
      <template v-for="(n, index) in paginavigation()">
        <template v-if="paging.page == n">
          <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
        </template>
        <template v-else>
          <a class="w3-button w3-border" href="javascript:;" @click="fnhrmsearch(`${n}`)" :key="index">{{ n }}</a>
        </template>
      </template>
      <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage" @click="fnhrmsearch(`${paging.endPage + 1}`)"
        class="next w3-button w3-border">
        &gt;</a>
      <a href="javascript:;" @click="fnhrmsearch(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
    </span>
  </div>
  </template>
   
<script>
export default {
  data () {
    return {
      requestBody: {},
      list: {},
      no: '',
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
  created() {
    this.empId = this.$route.params.empId;
  },
  mounted() {
    this.fnhrmlist();
  },
  methods: {
    fnhrmsearch(n) {
      if (this.page !== n) {
        this.page = n;
        this.fnhrmlist();
      }
    },
    fnhrmlist(){
      this.requestBody = {
        eg: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      };
      this.$axios.get(this.$serverUrl + "/hrm/hrmmember", {
        params: this.requestBody,
        headers: {}
      }).then((res) => {
        if (res.data.resultCode === "OK") {
          this.list = res.data.data;
          this.paging = res.data.pagination;
          this.no = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize);
        } 
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('Network error. Please contact support.');
        }
      });
    },
    movePayStubWrite(empId){
      this.requestBody.empId = empId
      this.$router.push({
        path: '/accounting/stubwrite',
        query: this.requestBody
      })
    },
  }
}
</script>
  <style scoped>

.search_container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.search_container-input {
  margin-right: 1rem;
  margin-left: 1rem;
}

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .actions {
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;
  }
  .movelocation {
    position: relative;
    left: 90%;
  }

  .actions button {
    margin-right: 1rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  .pagination button {
    margin: 0 0.5rem;
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
th  {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
}
td input[type="checkbox"] {
  display: block;
  margin: 0 auto;
}
</style>