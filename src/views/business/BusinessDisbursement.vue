<template>
  <div class="plan-list">
    <div
      class="filters"
      style="
        background-color: #f2f2f2;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
      "
    >
    <span style="margin-right: 5px">작성일</span>
      <input
        type="date"
        class="start-date-input"
        v-model="startDate"
        style="margin-right: 10px"
      />
      <span style="margin-right: 5px">~</span>
      <input
        type="date"
        class="end-date-input"
        v-model="endDate"
        style="margin-right: 10px"
      />
      <button
        class="btn-search"
        @click="search"
        style="
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 8px 16px;
          margin-right: 10px;
        "
      >
        조회
      </button>
      <button
        class="btn-reset"
        @click="reset"
        style="
          background-color: #f44336;
          color: white;
          border: none;
          padding: 8px 16px;
        "
      >
        초기화
      </button>
    </div>
    <h1>영업 지출 목록</h1>
    <table>
      <thead>
        <tr>
          <th>선택</th>
          <th>번호</th>
          <th>계획 제목</th>
          <th>거래처명</th>
          <th>상품명</th>
          <th>부서명</th>
          <th>직책</th>
          <th>담당자명</th>
          <th>목표 수량(개)</th>
          <th>목표 금액(원)</th>
          <th>영업계획 상세내용</th>
          <th>영업계획 비고</th>
          <th>영업지출 수량</th>
          <th>영업지출 공급가액</th>
          <th>영업지출 부가세</th>
          <th>영업지출 합계</th>
          <th>거래 유형</th>
          <th>영업지출 상세내용</th>
          <th>영업지출 비고</th>
          <th>영업계획 작성일</th>
          <th>영업지출 작성일</th>
          <th>등록/수정</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="plan in currentPagePlanList" :key="plan.planno">
          <td>
            <input
              type="checkbox"
              :value="plan"
              :checked="isSelected(plan.planno)"
              @change="toggleSelection(plan)"
            />
          </td>
          <td>{{ plan.planno }}</td>
          <td>{{ plan.plantitle }}</td>
          <td>{{ plan.accountname }}</td>
          <td>{{ plan.productname }}</td>
          <td>{{ plan.deptname }}</td>
          <td>{{ plan.emplevel }}</td>
          <td>{{ plan.empname }}</td>
          <td>{{ formatNumber(plan.targetquantity) }}</td>
          <td>{{ formatNumber(plan.targetamount) }}</td>
          <td>{{ plan.plandetail }}</td>
          <td>{{ plan.planremarks }}</td>
          <td>{{ formatNumber(plan.quantity) }}</td>
          <td>{{ formatNumber(plan.disbursementsupplyprice) }}</td>
          <td>{{ formatNumber(plan.disbursementtax) }}</td>
          <td>{{ formatNumber(plan.totalamount) }}</td>
          <td>
            {{
              plan.tradetype === 0
                ? " "
                : plan.tradetype === 1
                ? "카드"
                : plan.tradetype === 2
                ? "현금"
                : "기타"
            }}
          </td>
          <td>{{ plan.disbursementdetail }}</td>
          <td>{{ plan.disbursementremarks }}</td>

          <td>{{ formatDate(plan.plandate) }}</td>
          <td>{{ formatDate(plan.sentdate) || "" }}</td>
          <td>
            <router-link :to="`/businessDisbursementEdit/${plan.planno}`">
              <button class="btn-edit" @click="editDisbursement(plan.planno)">
                등록/수정
              </button>
            </router-link>
          </td>
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
  <div class="common-buttons">
    <button class="btn-delete" @click="deleteDisbursements">삭제</button>
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
      if (date) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
      } else {
        return "";
      }
    };

    const deleteDisbursements = async () => {
      try {
        const response = await axios.patch(
          `/business/disbursementdel/${selectedPlans.value.join(",")}`
        );
        console.log(response.data);
        fetchPlanList();
        selectedPlans.value = [];
      } catch (error) {
        console.error(error);
      }
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
      deleteDisbursements,
    };
  },
  methods: {
    editDisbursement(planno) {
      this.$router.push(`/businessDisbursementEdit/${planno}`);
    },
  },
};
</script>
  
  <style scoped>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.business-plan {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.left-section {
  width: 100%;
  margin-right: 20px;
}

.right-section {
  width: 30%;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filters label {
  margin-right: 10px;
}

.department-manager {
  margin-right: 10px;
}

.department-manager-input {
  width: 150px;
  margin-right: 10px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.actions button {
  margin-left: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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

.plan-list table {
  text-align: center;
  width: 100%;
}

.plan-list th,
.plan-list td {
  border-bottom: 1px solid #ccc;
}

.plan-list th {
  background-color: #f1f1f1;
  font-weight: bold;
  color: #333;
}

.plan-list td {
  color: #666;
}

.plan-list input[type="checkbox"] {
  margin-right: 5px;
}

.plan-list tr:nth-child(even) {
  background-color: #f9f9f9;
}

.plan-list tr:hover {
  background-color: #f5f5f5;
}
.btn-delete,
.btn-add,
.btn-edit,
.btn-excel,
.btn-search {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 14px;
}
</style>