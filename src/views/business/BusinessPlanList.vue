<template>
    <div class="business-plan">
      <div class="left-section">
        <div class="list-container">
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
  
            <h1>영업 계획 목록</h1>
            <table>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>계획 번호</th>
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
                  <th>영업계획 작성일</th>
                  <th>수정</th>
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
                  <td>{{ formatDate(plan.plandate) }}</td>
                  <td>
                    <router-link :to="`/businessPlanEdit/${plan.planno}`">
                      <button class="btn-edit" @click="editPlan(plan.planno)">
                        수정
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
            <router-link to="/businessPlanAdd">
              <button class="btn-add">등록</button>
            </router-link>
            <button class="selectdelete" @click="deleteSelectedPlans">
              삭제
            </button>
          </div>
        </div>
      </div>
      <div class="right-section">
        <div class="calendar-container">
          <BusinessPlanCalendar
            :planList="planList"
            @dateClick="showPlanDetails"
          />
        </div>
      </div>
    </div>
  </template>
  
    
   <script>
  import { ref, onMounted, computed } from "vue";
  import axios from "axios";
  import BusinessPlanCalendar from "@/views/business/BusinessPlanCalendar.vue";
  
  export default {
    components: {
      BusinessPlanCalendar,
      
    },
    setup() {
      const planList = ref([]);
      const itemsPerPage = 10;
      const currentPage = ref(1);
      const selectedPlans = ref([]);
      const startDate = ref("");
      const endDate = ref("");
  
      const search = () => {
        const filteredPlans = planList.value.filter((plan) => {
          const planDate = new Date(plan.plandate);
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
          const response = await axios.get("/business/planlist");
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
  
      const deleteSelectedPlans = () => {
        if (selectedPlans.value.length === 0) {
          return;
        }
  
        if (confirm("선택한 영업계획을 삭제하시겠습니까?")) {
          axios
            .delete("/business/plandel", {
              data: selectedPlans.value,
            })
            .then(() => {
              selectedPlans.value.forEach((plan) => {
                const index = planList.value.findIndex(
                  (p) => p.planno === plan.planno
                );
                if (index > -1) {
                  planList.value.splice(index, 1);
                }
              });
              selectedPlans.value = [];
  
              fetchPlanList();
            })
            .catch((error) => {
              console.error(error);
              alert("영업계획 삭제에 실패했습니다.");
            });
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
        deleteSelectedPlans,
      };
    },
    methods: {
      editPlan(planno) {
        this.$router.push(`/businessPlanEdit/${planno}`);
      },
    },
  };
  </script>
   
      
        
   <style scoped>
   .business-plan {
     display: flex;
     flex-direction: row;
   }
   
   .left-section {
     flex: 1;
     padding: 20px;
     background-color: #f2f2f2;
   }
   
   .list-container {
     margin-bottom: 20px;
   }
   
   .filters {
     background-color: #f2f2f2;
     padding: 10px;
     margin-bottom: 20px;
     border: 1px solid #ccc;
   }
   
   .filters span {
     margin-right: 5px;
   }
   
   .start-date-input,
   .end-date-input {
     margin-right: 10px;
   }
   
   .btn-search {
     background-color: #4caf50;
     color: white;
     border: none;
     padding: 8px 16px;
     margin-right: 10px;
   }
   
   .btn-reset {
     background-color: #f44336;
     color: white;
     border: none;
     padding: 8px 16px;
   }
   
   h1 {
     margin-bottom: 20px;
   }
   
   table {
     width: 100%;
     border-collapse: collapse;
   }
   
   th,
   td {
     padding: 8px;
     text-align: left;
     border-bottom: 1px solid #ddd;
   }
   
   th {
     background-color: #f2f2f2;
   }
   
   tbody tr:nth-child(even) {
     background-color: #f9f9f9;
   }
   
   tbody tr:hover {
     background-color: #f2f2f2;
   }
   
   .btn-edit {
     background-color: #4caf50;
     color: white;
     border: none;
     padding: 8px 16px;
   }
   
   .pagination {
     margin-top: 20px;
   }
   
   .page {
     color: #000;
     padding: 4px 8px;
     text-decoration: none;
   }
   
   .page.active {
     background-color: #4caf50;
     color: white;
   }
   
   .common-buttons {
     margin-top: 20px;
   }
   
   .btn-add {
     background-color: #4caf50;
     color: white;
     border: none;
     padding: 8px 16px;
   }
   
   .selectdelete {
     background-color: #f44336;
     color: white;
     border: none;
     padding: 8px 16px;
   }
   
   .right-section {
     flex: 1;
     padding: 20px;
   }
   
   .calendar-container {
     height: 100%;
   }
   </style>