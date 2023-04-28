<template>
     <div>
          <br>
          <h1 style="text-align: center;">수당 리스트 작성 페이지</h1> 
          <br>
<router-link to="/accounting/WageList"><button>수당 리스트작성</button></router-link>
     <router-link to="/accounting/DeductionList"><button>공제 리스트작성</button></router-link>
       <div class="salary_menu-bar">

           <div class="salary_menu-bar-search">
               <input class="search_container-bar" type="text" placeholder="Search" v-model="searchTerm" size="50"/>
               <button class="search_container-btn" @click="search">검색</button>
           <!-- 검색 옵션 선택 버튼을 여기에 추가하세요 --> 
           </div> 
       </div>

  <!-- 테이블 구역 -->
  <form @submit.prevent="saveData">
  <table class="salary-table">
     <thead>
       <tr>
         <th>수당항목코드</th>
         <th>수당항목명</th>
         <th>표시 순서</th>
         <th>지급 유형</th>
         <th>계산식</th>
         <th>산출방법</th>
       </tr>
     </thead>
     <tbody>
          <tr v-for="allowanceItem in displayedItems" :key="allowanceItem.itemCode">
               <td><input class="table-input" type="text" v-model="allowanceItem.itemCode" /></td>
               <td><input class="table-input" type="text" v-model="allowanceItem.itemName" /></td>
               <td><input class="table-input" type="text" v-model="allowanceItem.displayOrder" /></td>
               <td><input class="table-input" type="text" v-model="allowanceItem.paymentType" /></td>
               <td><input class="table-input" type="text" v-model="allowanceItem.calculation" /></td>
               <td><input class="table-input" type="text" v-model="allowanceItem.calculationMethod" /></td>
   </tr>
 </tbody>
   </table>
 </form>

     <div class="actions">
       <button>저장</button>

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
</div>
 </template>
 
<script>
export default {
 data() {
   // Insert random data values. It needs to be modified later after connecting the backend.
   return {
     searchTerm: "",
     currentPage: 1,
     itemsPerPage: 10,
     items: Array.from({ length: 50 }, (_, i) => ({
        itemCode: `BNF-${Math.floor(Math.random() * 1000)}`,
        itemName: `Allowance Item ${i}`,
        displayOrder: i + 1,
        paymentType: i % 2 === 0 ? "Recurring" : "One-time",
        calculation: (Math.random() * 0.1).toFixed(2),
        calculationMethod: i % 2 === 0 ? "1" : "2",

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
input.table-input {
  border: none;
}
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


