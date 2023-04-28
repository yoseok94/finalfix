<template>
    <div class="breadcrumb-area"
         style="background-image: url('${pageContext.servletContext.contextPath}/resources/img/catagory-img/3.jpg');">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-title text-center">
                        <h2>영업실적 조회</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="business-plan">
        <div class="left-section">
            <div class="filters">
                <label for="start-date">기준일</label>
                <input type="date" id="start-date" class="calendar" v-model="startDate"/>
                <label for="end-date">~</label>
                <input type="date" id="end-date" class="calendar" v-model="endDate"/>
                <label for="client">거래처</label>
                <input type="text" id="client" class="department-manager-input" v-model="client"/>
                <label for="department-manager">부서/담당자</label>
                <select class="department-manager" v-model="filterType">
                    <option value="">선택 해주세요</option>
                    <option value="department">부서명</option>
                    <option value="manager">담당자명</option>
                </select>
                <button class="btn-search" @click="search">조회</button>
            </div>
            <div class="plan-list">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>작성일</th>
                        <th>거래처</th>
                        <th>판매 목표 수량</th>
                        <th>판매수량</th>
                        <th>판매 목표 실적</th>
                        <th>판매 실적</th>
                        <th>부서</th>
                        <th>직책</th>
                        <th>담당자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(plan, index) in filteredPlans" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ plan.date }}</td>
                        <td>{{ plan.client }}</td>
                        <td>{{ plan.targetAmount }}</td> <!-- 판매 목표 수량 -->
                        <td>{{ plan.actualAmount }}</td> <!-- 판매수량 -->
                        <td>{{ plan.targetSales }}</td> <!-- 판매 목표 실적 -->
                        <td>{{ plan.actualSales }}</td> <!-- 판매 실적 -->
                        <td>{{ plan.department }}</td>
                        <td>{{ plan.position }}</td>
                        <td>{{ plan.manager }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="pagination">
        <a href="#" class="page active">1</a>
        <a href="#" class="page">2</a>
        <a href="#" class="page">3</a>
        <a href="#" class="page">4</a>
        <a href="#" class="page">5</a>
        <a href="#" class="page">></a>
    </div>
                <div class="common-buttons">
                    <button class="btn-excel">엑셀</button>
                    <button class="btn-print">인쇄</button>
                </div>
    
</template>

<script>
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            client: "",
            department: "",
            position: "",
            manager: "",
            plans: [
                {
                    id: 1,
                    date: "2023-04-01",
                    client: "A거래처",
                    targetAmount: 1000,
                    actualAmount: 900,
                    targetSales: 1000000,
                    actualSales: 900000,
                    department: "영업1팀",
                    position: "대리",
                    manager: "김영업",
                },
                {
                    id: 2,
                    date: "2023-04-10",
                    client: "B거래처",
                    targetAmount: 2000,
                    actualAmount: 1800,
                    targetSales: 2000000,
                    actualSales: 1800000,
                    department: "영업2팀",
                    position: "과장",
                    manager: "박영업",
                },
                {
                    id: 3,
                    date: "2023-04-15",
                    client: "C거래처",
                    targetAmount: 1500,
                    actualAmount: 1300,
                    targetSales: 1500000,
                    actualSales: 1300000,
                    department: "영업3팀",
                    position: "차장",
                    manager: "이영업",
                },
                {
                    id: 4,
                    date: "2023-04-18",
                    client: "D거래처",
                    targetAmount: 800,
                    actualAmount: 750,
                    targetSales: 800000,
                    actualSales: 750000,
                    department: "영업4팀",
                    position: "대리",
                    manager: "최영업",
                },
                {
                    id: 5,
                    date: "2023-04-25",
                    client: "E거래처",
                    targetAmount: 1200,
                    actualAmount: 1000,
                    targetSales: 1200000,
                    actualSales: 1000000,
                    department: "영업5팀",
                    position: "과장",
                    manager: "홍영업",
                },
            ],
        };
    },
    computed: {
        filteredPlans() {
            let plans = this.plans;
            if (this.startDate && this.endDate) {
                plans = plans.filter((plan) => {
                    return plan.date >= this.startDate && plan.date <= this.endDate;
                });
            }
            if (this.client) {
                plans = plans.filter((plan) => {
                    return plan.client.toLowerCase().includes(this.client.toLowerCase());
                });
            }
            if (this.department) {
                plans = plans.filter((plan) => {
                    return plan.department.toLowerCase().includes(this.department.toLowerCase());
                });
            }
            if (this.position) {
                plans = plans.filter((plan) => {
                    return plan.position.toLowerCase().includes(this.position.toLowerCase());
                });
            }
            if (this.manager) {
                plans = plans.filter((plan) => {
                    return plan.manager.toLowerCase().includes(this.manager.toLowerCase());
                });
            }
            return plans;
        },
    },
    methods: {
        search() {
            // 검색 로직
        },
    },
};
</script>

<style scoped>
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
    padding: 10px;
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

.selectdelete,
.btn-add,
.btn-edit,
.btn-excel,
.btn-search,
.btn-approve,
.btn-reject,
.btn-print,
.btn-send {
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