<template>
  <br>
  <h1 style="text-align: center;">매출 조회 페이지</h1>
  <br>
  <div>
    <h3>신용카드매출</h3>
    <table class="sales-table">
      <thead>
        <tr>
          <th>일시</th>
          <th>세부내용</th>
          <th>승인금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, tradingno) in cardSales" :key="tradingno">
          <td>{{ row.tradingday }}</td>
          <td>{{ row.accountname }} : {{ row.productname }}</td>
          <td>{{ row.totalprice.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <h3>현금 매출</h3>
    <table class="sales-table">
      <thead>
        <tr>
          <th>일시</th>
          <th>세부내용</th>
          <th>승인금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, tradingno) in cashSales" :key="tradingno">
          <td>{{ row.tradingday }}</td>
          <td>{{ row.accountname }} : {{ row.productname }}</td>
          <td>{{ row.totalprice.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <h3>기타 매출</h3>
    <table class="sales-table">
      <thead>
        <tr>
          <th>일시</th>
          <th>세부내용</th>
          <th>승인금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, tradingno) in otherSales" :key="tradingno">
          <td>{{ row.tradingday }}</td>
          <td>{{ row.accountname }} : {{ row.productname }}</td>
          <td>{{ row.totalprice.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
    <span>
      <a href="javascript:;" @click="fnrevenuesearch(1)" class="first w3-button w3-border">&lt;&lt;</a>
      <a href="javascript:;" v-if="paging.startPage > 10" @click="fnrevenuesearch(`${paging.startPage - 1}`)"
        class="prev w3-button w3-border">
        &lt;</a>
      <template v-for="(n, index) in paginavigation()">
        <template v-if="paging.page == n">
          <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
        </template>
        <template v-else>
          <a class="w3-button w3-border" href="javascript:;" @click="fnrevenuesearch(`${n}`)" :key="index">{{ n }}</a>
        </template>
      </template>
      <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage" @click="fnrevenuesearch(`${paging.endPage + 1}`)"
        class="next w3-button w3-border">
        &gt;</a>
      <a href="javascript:;" @click="fnrevenuesearch(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
    </span>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      exceldata:[],
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
    this.fnrevenuelist();
  },
  methods: {
    fnrevenuesearch(n) {
      if (this.page !== n) {
        this.page = n       
      }

      this.fnrevenuelist()      
    },
    fnrevenuelist(){
      this.requestBody = { // 데이터 전송        
        sk: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/accounting/revenuelist", {
        params: this.requestBody,
        headers: {}
      }).then((res) => {      

        if (res.data.resultCode === "OK") {
          this.list = res.data.data
          this.exceldata = this.list
          this.paging = res.data.pagination
          this.no = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize)
          this.cardSales = this.list.filter(trade => trade.tradetype === 1);
          this.cashSales = this.list.filter(trade => trade.tradetype === 2);
          this.otherSales = this.list.filter(trade => trade.tradetype === 3);
        }
        
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
.revenue_header {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
}

.sales-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.sales-table thead {
  background-color: #f2f2f2;
}

.sales-table th,
.sales-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.sales-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.sales-table tr:hover {
  background-color: #ddd;
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