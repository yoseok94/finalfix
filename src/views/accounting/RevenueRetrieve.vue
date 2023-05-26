<template>
  <br>
     <h1 style="text-align: center;">매출 조회 페이지</h1>
     <br>



  <div>
    <!-- <div class="revenue_header">
      <div class="revenue_header-date">
        <div style="text-align: center; font-weight: bolder;">매출 기간</div>
        <div>2023.03.21 ~ 2023.04.21</div>
       </div>
   </div> -->
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
          <td>{{ row.totalprice }}</td>
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
          <td>{{ row.totalprice }}</td>
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
          <td>{{ row.totalprice }}</td>
        </tr>
      </tbody>
    </table>
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
    cardSales: [],
    cashSales: [],
    otherSales: [],
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
      paginavigation: function () { //페이징 처리 for문 커스텀
        let pageNumber = [] //;
        let startPage = this.paging.startPage;
        let endPage = this.paging.endPage;
        for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      },
    }
  },
   mounted() {
    
    this.fnrevenuelist().then(() => {
    this.cardSales = this.list.filter(trade => trade.tradetype === 1);
    this.cashSales = this.list.filter(trade => trade.tradetype === 2);
    this.otherSales = this.list.filter(trade => trade.tradetype === 3);
  });
},

  methods: {
    async fnrevenuelist() {
      this.requestBody = {
        page: this.page,
        size: this.size
      };
      try {
       const res = await this.$axios.get(this.$serverUrl + "/accounting/revenuelist", {
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
 },
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
}
</style>