<template>
    <div>
    <h1 style="text-align: center;">회계 전표 조회 페이지</h1>
    <div class="salary_menu-bar">
      <div class="salary_menu-bar-search">
        <input class="search_container-bar" type="text" placeholder="Search" v-model="searchTerm" size="50"/>
        <button class="search_container-btn" @click="search">검색</button>
      </div>
    </div>
    <!-- 테이블 구역 -->
    <table class="salary-table">
      <thead>
        <tr>
          <th></th>
          <th style="text-align: center;">전표번호</th>
          <th style="text-align: center;">거래유형</th>
          <th style="text-align: center;">금액</th>
          <th style="text-align: center;">거래처명</th>
          <th style="text-align: center;">적요</th>
          <th style="text-align: center;">전표</th>
          <th style="text-align: center;">결의서</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salaryItem in displayedItems" :key="salaryItem.employeeID">
          <td><input type="checkbox" /></td>
          <td>{{ salaryItem.invoiceNumber }}</td>
          <td>{{ salaryItem.tradeType }}</td>
          <td>{{ salaryItem.amount }}</td>
          <td>{{ salaryItem.customerName }}</td>
          <td>{{ salaryItem.brief }}</td>
          <td style="text-align: center;">인쇄</td>
          <td style="text-align: center;">인쇄</td>
        </tr>
      </tbody>
    </table>

    <div class="actions">
      <router-link to="/accounting/slipwrite"><button>등록하기</button></router-link>
      <button>인쇄</button>
    </div>

    <div class="pagination">
      <a href="#" class="page active">1</a>
      <a href="#" class="page">2</a>
      <a href="#" class="page">3</a>
      <a href="#" class="page">4</a>
      <a href="#" class="page">5</a>
      <a href="#" class="page">></a>
    </div>
  </div>
</template>
<!-- 페이지네이션 구역 -->
<!-- <div class="pagination">
<button @click="previousPage"></button>
<button
v-for="page in totalPages"
:key="page"
@click="goToPage(page)"
>
{{ page }}
</button>
<button @click="nextPage">></button>
</div>
</div> -->

    
<script> 
export default {
  data() {
    return {
      searchTerm: "",
      currentPage: 1,
      itemsPerPage: 10,
      items: Array.from({ length: 50 }, (_, i) => ({
        employeeID: i,
        employeeCode: `EMP-${Math.floor(Math.random() * 1000)}`,
        tradeType: "Trade Type " + i,
        amount: Math.floor(Math.random() * 4000) + 800,
        customerName: `Customer ${i}`,
        brief: `Brief ${i}`,
      })),
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  methods: {
    search() {
      console.log("Search function not implemented yet");
    },
  },
};
</script>

<style scoped>
    .salary_menu-bar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
      margin-top: 5px;
    }
    .search_container-bar {
      margin-right: 1rem;
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
      justify-content: space-between;
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