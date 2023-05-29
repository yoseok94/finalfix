<template>
  <div class="business-plan">
    <div class="left-section">
      <div class="list-container">
        <div class="plan-list">
          <span class="filter-label">작성일</span>
          <input type="date" class="start-date-input" v-model="startDate" />
          <span class="date-separator">~</span>
          <input type="date" class="end-date-input" v-model="endDate" />
          <button class="btn-search" @click="search">조회</button>
          <button class="btn-reset" @click="reset">초기화</button>

          <h1>영업 실적 목록</h1>
          <table>
            <thead>
              <tr>
                <th>계획 번호</th>
                <th>계획 제목</th>
                <th>거래처명</th>
                <th>상품명</th>
                <th>부서명</th>
                <th>직책</th>
                <th>담당자명</th>
                <th>목표 수량(개)</th>
                <th>실적 수량(개)</th>
                <th>목표 금액(원)</th>
                <th>영업실적 금액(원)</th>
                <th>영업실적 작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="plan in currentPagePlanList" :key="plan.planno">
                <td>{{ plan.planno }}</td>
                <td>{{ plan.plantitle }}</td>
                <td>{{ plan.accountname }}</td>
                <td>{{ plan.productname }}</td>
                <td>{{ plan.deptname }}</td>
                <td>{{ plan.emplevel }}</td>
                <td>{{ plan.empname }}</td>
                <td>{{ formatNumber(plan.targetquantity) }}</td>
                <td>{{ formatNumber(plan.quantity) }}</td>
                <td>{{ formatNumber(plan.targetamount) }}</td>
                <td>{{ formatNumber(plan.totalamount) }}</td>
                <td>{{ plan.sentdate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <a
            href="#"
            class="page"
            @click.prevent="changePage(Math.max(currentPage - 1, 1))"
          >
            &lt;
          </a>
          <a
            href="#"
            v-for="page in displayedPages"
            :key="page"
            class="page"
            :class="{ active: currentPage === page }"
            @click.prevent="changePage(page)"
          >
            {{ page }}
          </a>
          <a
            href="#"
            class="page"
            @click.prevent="changePage(Math.min(currentPage + 1, totalPages))"
          >
            &gt;
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

  
 <script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const planList = ref([]);
    const itemsPerPage = 10;
    const currentPage = ref(1);
    const selectedPlans = ref([]);
    const startDate = ref("");
    const endDate = ref("");

    const search = () => {
      const filteredPlans = planList.value.filter((plan) => {
        const planDate = new Date(plan.sentdate);
        return (
          planDate >= new Date(startDate.value) &&
          planDate <= new Date(endDate.value)
        );
      });
      planList.value = filteredPlans;
      currentPage.value = 1;
    };

    const reset = () => {
      startDate.value = "";
      endDate.value = "";
      fetchPlanList();
    };

    const isSelected = (planno) => {
      return selectedPlans.value.includes(planno);
    };

    const fetchPlanList = async () => {
      try {
        const response = await axios.get("/business/disbursementlist");
        const plans = response.data;
        planList.value = plans;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchPlanList);

    const sortedPlanList = computed(() => {
      return planList.value.slice().sort((a, b) => b.planno - a.planno);
    });

    const totalPages = computed(() => {
      return Math.ceil(planList.value.length / itemsPerPage);
    });

    const currentPagePlanList = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sortedPlanList.value.slice(start, end);
    });

    const changePage = (page) => {
      if (page === totalPages.value + 1) {
        currentPage.value = page - 1;
      } else {
        currentPage.value = page;
      }
    };

    const displayedPages = computed(() => {
      const start = Math.floor((currentPage.value - 1) / 5) * 5 + 1;
      const end = Math.min(start + 4, totalPages.value);
      return Array(end - start + 1)
        .fill()
        .map((_, index) => start + index);
    });

    const toggleSelection = (plan) => {
      const index = selectedPlans.value.indexOf(plan.planno);
      if (index === -1) {
        selectedPlans.value.push(plan.planno);
      } else {
        selectedPlans.value.splice(index, 1);
      }
    };

    const formatNumber = (value) => {
      return value.toLocaleString();
    };

    const formatDate = (date) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    return {
      planList,
      itemsPerPage,
      currentPage,
      selectedPlans,
      isSelected,
      sortedPlanList,
      totalPages,
      currentPagePlanList,
      changePage,
      displayedPages,
      toggleSelection,
      formatNumber,
      formatDate,
      startDate,
      endDate,
      search,
      reset,
    };
  },
};
</script>
 
    
      
<style scoped>
.business-plan {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-container {
  width: 100%;
}

.plan-list {
  margin-bottom: 20px;
}

.filter-label {
  font-weight: bold;
}

.start-date-input,
.end-date-input {
  margin: 0 5px;
}

.btn-search,
.btn-reset {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn-reset {
  background-color: #f44336;
}

h1 {
  font-size: 24px;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead th {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.page {
  margin: 0 5px;
  padding: 5px 10px;
  text-decoration: none;
  color: #000;
  background-color: #f2f2f2;
  cursor: pointer;
}

.page.active {
  background-color: #4caf50;
  color: #fff;
}
</style>