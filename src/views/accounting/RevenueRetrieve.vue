<template>
  <br>
     <h1 style="text-align: center;">매출 조회 페이지</h1>
     <br>



  <div>
    <div class="revenue_header">
      <div class="revenue_header-date">
        <div style="text-align: center; font-weight: bolder;">매출 기간</div>
        <div>2023.03.21 ~ 2023.04.21</div>
       </div>
      <input type="button" value="검색옵션"/>
   </div>
    <h3>신용카드매출</h3>
    <table class="sales-table">
      <thead>
        <tr>
          <th>일시</th>
          <th>카드사</th>
          <th>카드번호</th>
          <th>승인금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sale, index) in creditCardSales" :key="index">
          <td>{{ sale.date }}</td>
          <td>{{ sale.company }}</td>
          <td>{{ sale.cardNumber }}</td>
          <td>{{ sale.approvalAmount }}</td>
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
        <tr v-for="(sale, index) in cashSales" :key="index">
          <td>{{ sale.date }}</td>
          <td>{{ sale.details }}</td>
          <td>{{ sale.approvalAmount }}</td>
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
        <tr v-for="(sale, index) in otherSales" :key="index">
          <td>{{ sale.date }}</td>
          <td>{{ sale.details }}</td>
          <td>{{ sale.approvalAmount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creditCardSales: [
        {
          date: "2023/04/21",
          company: "KB국민",
          cardNumber: "933502-**-****** 외 150건",
          approvalAmount: "20000000 원",
        },
        // Add more sales as needed
      ],
      cashSales: [
        {
          date: "2023/04/21",
          details: "",
          approvalAmount: "20000000 원",
        },
        // Add more sales as needed
      ],
      otherSales: [
        {
          date: "2023/04/21",
          details: "",
          approvalAmount: "20000000 원",
        },
        // Add more sales as needed
      ],
    };
  },
};
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
</style>