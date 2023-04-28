<template>
  <br>
   <h1 style="text-align: center;">급여 관리 페이지</h1>
   <br>
        <div class="salary_menu-bar">

            <div class="salary_menu-bar-search">
                <input class="search_container-bar" type="text" placeholder="Search" v-model="searchTerm" size="50"/>
                <button class="search_container-btn" @click="search">검색</button>
            <!-- 검색 옵션 선택 버튼을 여기에 추가하세요 --> 
            </div> 
        </div>

   <!-- 테이블 구역 -->
   <table class="salary-table">
      <thead>
        <tr>
          <th></th>
          <th>사원코드</th>
          <th>사원명</th>
          <th>부서명</th>
          <th>입사일자</th>
          <th>지급급액</th>
          <th>급여이체현황</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salaryItem in displayedItems" :key="salaryItem.employeeID">
          <td><input type="checkbox" /></td>
          <td><router-link to="/accounting/management2">{{ salaryItem.employeeCode }}</router-link></td>
          <td>{{ salaryItem.employeeName }}</td>
          <td>{{ salaryItem.deptName }}</td>
          <td>{{ salaryItem.hireDate }}</td>
          <td>{{ salaryItem.actualPaymentAmount }}</td>
          <td style="text-align: center;">{{ salaryItem.paymentCheck }}</td>
        </tr>
      </tbody>
    </table>
  
      <!-- 액션 버튼 (이메일 및 인쇄) 구역 -->
      <div class="actions">
        <button>Email</button>
        <button>Print</button>
      </div>
  
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
    <div class="pagination">
  <a href="#" class="page active">1</a>
  <a href="#" class="page">2</a>
  <a href="#" class="page">3</a>
  <a href="#" class="page">4</a>
  <a href="#" class="page">5</a>
  <a href="#" class="page">></a>
</div>
  </template>
  
  <script>
  export default {
    // data() {
    //   return {
    //     searchTerm: "",
    //     currentPage: 1,
    //     itemsPerPage: 10,
    //     items: [] // 실제 데이터로 교체하세요
    //   };
    // },
    data() {
      // 임의의 데이터 값 넣어주기 ! 추후 백엔드 연결 후 수정해줘야함.
      return {
        searchTerm: "",
        currentPage: 1,
        itemsPerPage: 10,
        items: Array.from({ length: 50 }, (_, i) => ({
          employeeID: i,
          employeeCode: `EMP-${Math.floor(Math.random() * 1000)}`,
          employeeName: `Employee ${i}`,
          hireDate: `2018-${Math.floor(Math.random() * 12) + 1}`,
          actualPaymentAmount: Math.floor(Math.random() * 4000) + 800,
          paymentCheck: 'X'
        })),
      };
    },
    computed: {
      totalPages() {
      // Calculate the total number of pages
        return Math.ceil(this.items.length / this.itemsPerPage);
      },
      displayedItems() {
      // Calculate the items to be displayed on the current page
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.items.slice(start, end);
      }
    },
    search() {
       // 검색 기능 구현이 아직 되지 않았습니다.
       console.log("Search function not implemented yet");
    },
    previousPage() {
      // 이전 페이지로 이동
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      // 다음 페이지로 이동
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      // 선택한 페이지로 이동
      this.currentPage = page;
    }
  };
  </script>
  
  <style scoped>

  .salary_menu-bar {
    display: flex;
    justify-content:flex-end;
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
}
th  {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
}
</style>