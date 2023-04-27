<template>
  <h1 style="text-align: center;">급여 조회 페이지</h1>
  
    <div>
      <!-- 검색 바 구역 -->
      <div class="search_container">
        <input class="search_container-bar" type="text" placeholder="Search" v-model="searchTerm" size="50"/>
        <button class="search_container-btn" @click="search">검색</button>
        <!-- 검색 옵션 선택 버튼을 여기에 추가하세요 -->
      </div>
  
   <!-- 테이블 구역 -->
   <table class="salary-table">
      <thead>
        <tr>
          <th></th>
          <th style="text-align: center;">지급연월</th>
          <th style="text-align: center;">급여구분</th>
          <th style="text-align: center;">사원코드</th>
          <th style="text-align: center;">사원명</th>
          <th style="text-align: center;">지급총액</th>
          <th style="text-align: center;">소득세</th>
          <th style="text-align: center;">지방소득세</th>
          <th style="text-align: center;">국민연금</th>
          <th style="text-align: center;">건강보험</th>
          <th style="text-align: center;">고용보험</th>
          <th style="text-align: center;">장기요양보험</th>
          <th style="text-align: center;">공제총액</th>
          <th style="text-align: center;">실지급액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salaryItem in displayedItems" :key="salaryItem.employeeID">
          <td><input type="checkbox" /></td>
          <td><router-link to="/accounting/stub">{{ salaryItem.paymentYearAndMonth }}</router-link></td>
          <td>{{ salaryItem.classificationOfSalary }}</td>
          <td>{{ salaryItem.employeeCode }}</td>
          <td>{{ salaryItem.employeeName }}</td>
          <td>{{ salaryItem.totalAmountPaid }}</td>
          <td>{{ salaryItem.incomeTax }}</td>
          <td>{{ salaryItem.localIncomeTax }}</td>
          <td>{{ salaryItem.nationalPension }}</td>
          <td>{{ salaryItem.healthInsurance }}</td>
          <td>{{ salaryItem.employmentInsurance }}</td>
          <td>{{ salaryItem.longTermCareInsurance }}</td>
          <td>{{ salaryItem.totalDeduction }}</td>
          <td>{{ salaryItem.actualPaymentAmount }}</td>
        </tr>
      </tbody>
    </table>
  
      <!-- 액션 버튼 (이메일 및 인쇄) 구역 -->
      <div class="actions">
        <button>Email</button>
        <button>Print</button>
      </div>
  
      <!-- 페이지네이션 구역 -->
      <div class="pagination">
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
          paymentYearAndMonth: `2023-${Math.floor(Math.random() * 12) + 1}`,
          classificationOfSalary: Math.random() > 0.5 ? 'Full-time' : 'Part-time',
          employeeCode: `EMP-${Math.floor(Math.random() * 1000)}`,
          employeeName: `Employee ${i}`,
          totalAmountPaid: Math.floor(Math.random() * 5000) + 1000,
          incomeTax: Math.floor(Math.random() * 500) + 100,
          localIncomeTax: Math.floor(Math.random() * 300) + 50,
          nationalPension: Math.floor(Math.random() * 300) + 50,
          healthInsurance: Math.floor(Math.random() * 200) + 50,
          employmentInsurance: Math.floor(Math.random() * 100) + 25,
          longTermCareInsurance: Math.floor(Math.random() * 100) + 25,
          totalDeduction: Math.floor(Math.random() * 1000) + 200,
          actualPaymentAmount: Math.floor(Math.random() * 4000) + 800,
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
  .search_container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
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
</style>