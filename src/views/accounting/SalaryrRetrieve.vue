<template>
  <br>
  <h1 style="text-align: center;">급여 조회 페이지</h1>
  <br>
  <!-- 검색 바 구역 -->
  <div class="search_container">
    <select v-model="search_key">
      <option value="paymentdate">지급연월일</option>
      <option value="empId">사원코드</option>
      <option value="empname">사원이름</option>
    </select>
    <input class="search_container-input" type="text" placeholder="검색어를 입력해주세요" v-model="search_value"
      @keyup.enter="fnsalarysearch()" size="50" />
    <button class="w3-button w3-round w3-blue-gray search_container-btn" @click="fnsalarysearch()">검색</button>
  </div>
  <table class="salary-table">
    <thead>
      <tr>
        <th>지급연월</th>
        <th>사원코드</th>
        <th>사원이름</th>
        <th>부서이름</th>
        <th>직급이름</th>
        <th>근무시간</th>
        <th>시간외근무시간</th>
        <th>기본급여</th>
        <th>시간외근무수당</th>
        <th>지급총액</th>
        <th>근로소득세</th>
        <th>지방소득세</th>
        <th>국민연금료</th>
        <th>건강보험료</th>
        <th>고용보험료</th>
        <th>장기요양보험료</th>
        <th>공제총액</th>
        <th>실지급액</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, salaryno) in list" :key="salaryno">
        <td style="color:blue;">
          <a v-on:click="movePaySlib(`${row.empId}`, `${row.paymentdate}`)">{{ formatDate(row.paymentdate) }}</a>
        </td>
        <td>{{ row.empId }}</td>
        <td>{{ row.empname }}</td>
        <td>{{ row.deptname }}</td>
        <td>{{ row.emplevel }}</td>
        <td>{{ row.workhours }}</td>
        <td>{{ row.overtimehours }}</td>
        <td>{{ row.basesalary }}</td>
        <td>{{ row.overtimesalary }}</td>
        <td>{{ row.totalpaymentsalary }}</td>
        <td>{{ row.earnedincometax }}</td>
        <td>{{ row.localincomtax }}</td>
        <td>{{ row.nationalpensionfee }}</td>
        <td>{{ row.healthinsurancepremium }}</td>
        <td>{{ row.employmentinsurancepremium }}</td>
        <td>{{ row.longtermcareinsurancepremium }}</td>
        <td>{{ row.totaldeductionsamount }}</td>
        <td>{{ row.actualpaymentsalary }}</td>
      </tr>
    </tbody>
  </table>

  <!-- 페이지 처리 -->
  <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
    <span>
      <a href="javascript:;" @click="fnsalarysearch(1)" class="first w3-button w3-border">&lt;&lt;</a>
      <a href="javascript:;" v-if="paging.startPage > 10" @click="fnsalarysearch(`${paging.startPage - 1}`)"
        class="prev w3-button w3-border">
        &lt;</a>
      <template v-for="(n, index) in paginavigation()">
        <template v-if="paging.page == n">
          <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
        </template>
        <template v-else>
          <a class="w3-button w3-border" href="javascript:;" @click="fnsalarysearch(`${n}`)" :key="index">{{ n }}</a>
        </template>
      </template>
      <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage" @click="fnsalarysearch(`${paging.endPage + 1}`)"
        class="next w3-button w3-border">
        &gt;</a>
      <a href="javascript:;" @click="fnsalarysearch(`${paging.totalPageCnt}`)"
        class="last w3-button w3-border">&gt;&gt;</a>
    </span>
  </div>

</template>
  
<script>

export default {
  data() {
    return {
      paymentdate: this.$route.query.paymentdate,
      salaryDetails: {},
      requestBody: {},
      list: [],
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
      search_value: this.$route.query.sv ? this.$route.query.sv : '',
    }
  },
  mounted() {
    this.fnsalarylist()
  },
  methods: {
    paginavigation: function () {
      let pageNumber = []
      let startPage = this.paging.startPage;
      let endPage = this.paging.endPage;
      for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
      return pageNumber;
    },
    fnsalarysearch(n) {
      n = parseInt(n, 10);
      if (this.page !== n) {
        this.page = n;
      }
      this.fnsalarylist();
    },
    fnsalarylist() {
      this.requestBody = { // 데이터 전송        
        sk: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/accounting/salarylist", {
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
    movePaySlib(empId, paymentdate) {
      this.$router.push({
        path: './stub',
        query: { empId, paymentdate }
      });
    },
    formatDate(dateString) {
      let date = new Date(dateString);
      return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    },
  }
}

</script>
<style scoped>
.salary-table th,
.salary-table td {
  text-align: center;
}

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
}</style>