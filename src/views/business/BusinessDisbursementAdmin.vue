<template>
    <div class="breadcumb-area"
         style="background-image: url('${pageContext.servletContext.contextPath}/resources/img/catagory-img/3.jpg');">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="bradcumb-title text-center">
                        <h2>영업지출 결의서[관리자]</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="business-plan">
        <div class="left-section">
            <table class="filters">
            <tr>
                <td>
                    <label for="start-date">작성일:</label>
                </td>
                <td>
                    <input type="date" id="start-date" class="calendar" v-model="startDate"/>
                </td>
                <td>
                    <label for="end-date">~</label>
                </td>
                <td>
                    <input type="date" id="end-date" class="calendar" v-model="endDate"/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="client">거래처:</label>
                </td>
                <td>
                    <input type="text" id="client" class="department-manager-input" v-model="client"/>
                </td>
                <td>
                    <label for="department">부서:</label>
                </td>
                <td>
                    <input type="text" id="department" class="department-manager-input" v-model="department"/>
                </td>
                <td>
                    <label for="position">직책:</label>
                </td>
                <td>
                    <input type="text" id="position" class="department-manager-input" v-model="position"/>
                </td>
                <td>
                    <label for="manager">담당자:</label>
                </td>
                <td>
                    <input type="text" id="manager" class="department-manager-input" v-model="manager"/>
                </td>
                <td>
                    <label for="status">상태:</label>
                </td>
                <td>
                    <select id="status" class="department-manager" v-model="status">
                        <option value="">선택 해주세요</option>
                        <option value="processing">승인</option>
                        <option value="completed">승인반려</option>
                    </select>
                </td>
                <td>
                    <button class="btn-search" @click="search">조회</button>
                </td>
            </tr>
            </table>
            <hr>
            <div class="plan-list">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>선택</th>
                        <th>작성일</th>
                        <th>발송일</th>
                        <th>거래처</th>
                        <th>부서</th>
                        <th>직책</th>
                        <th>담당자</th>
                        <th>금액</th>
                        <th>부가세</th>
                        <th>상세내용</th>
                        <th>비고</th>
                        <th>처리상태</th>
                        <th>승인처리</th>
                    </tr>
                    </thead>
                    <tbody>
    <tr v-for="(plan, index) in filteredPlans" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
            <input type="checkbox" :value="plan.id" v-model="selectedIds"/>
        </td>
        <td>{{ plan.date }}</td>
        <td>{{ plan.sentDate }}</td>
        <td>{{ plan.client }}</td>
        <td>{{ plan.department }}</td>
        <td>{{ plan.position }}</td>
        <td>{{ plan.manager }}</td>
        <td>{{ plan.amount }}</td>
        <td>{{ plan.tax }}</td>
        <td>{{ plan.details }}</td>
        <td>{{ plan.remarks }}</td>
        <td>{{ plan.status === 'processing' ? '승인' : '승인반려' }}</td>
        <td>
            <button class="btn-approve" @click="approve(plan.id)" :disabled="plan.status === 'completed'">승인</button>
            <button class="btn-reject" @click="cancelApproval(plan.id)" :disabled="plan.status === 'processing'">승인반려</button>
        </td>
    </tr>
</tbody>
                </table>
            </div>
            <hr>
            
            <div class="common-buttons">  
                    <router-link to="/businessDisbursementAdminSend">
                    <button class="btn-send" @click="sendToClient">발송</button>
                    </router-link>
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

</template>
<script>
export default {
    data() {
        return {
            startDate: '',
            endDate: '',
            filterValue: '',
            selectedIds: [],
            plans: [
                {
                    id: 1,
                    date: '2023-04-25',
                    sentDate: '2023-04-26',
                    client: '거래처1',
                    department: '영업부',
                    position: '팀장',
                    manager: '김영업',
                    amount: 1000000,
                    tax: 100000,
                    details: '상세내용1',
                    remarks: '비고1',
                    status: 'processing'
                },
                {
                    id: 2,
                    date: '2023-04-24',
                    sentDate: '2023-04-25',
                    client: '거래처2',
                    department: '영업부',
                    position: '팀원',
                    manager: '이영업',
                    amount: 2000000,
                    tax: 200000,
                    details: '상세내용2',
                    remarks: '비고2',
                    status: 'completed'
                },
                {
                id: 3,
                date: '2023-04-27',
                sentDate: '2023-04-28',
                client: '거래처3',
                department: '영업부',
                position: '팀원',
                manager: '박영업',
                amount: 3000000,
                tax: 300000,
                details: '상세내용3',
                remarks: '비고3',
                status: 'processing'
            },
            {
                id: 4,
                date: '2023-04-26',
                sentDate: '2023-04-27',
                client: '거래처4',
                department: '영업부',
                position: '팀원',
                manager: '최영업',
                amount: 4000000,
                tax: 400000,
                details: '상세내용4',
                remarks: '비고4',
                status: 'completed'
            },
            {
                id: 5,
                date: '2023-04-23',
                sentDate: '2023-04-24',
                client: '거래처5',
                department: '영업부',
                position: '팀원',
                manager: '한영업',
                amount: 5000000,
                tax: 500000,
                details: '상세내용5',
                remarks: '비고5',
                status: 'processing'
            }
            ]
        };
    },
    methods: {
        search() {
// 필터링 로직
        },
        create() {
// 영업 계획 등록 로직
        },
        update() {
// 영업 계획 수정 로직
        },
        selectdelete() {
// 영업 계획 삭제 로직
        },
        approve(planId) {
            const plan = this.plans.find(p => p.id === planId);
            if (plan) {
                plan.status = 'completed';
            }
        },
        cancelApproval(planId) {
            const plan = this.plans.find(p => p.id === planId);
            if (plan) {
                plan.status = 'processing';
            }
        }
    },
    computed: {
        filteredPlans() {
            let plans = this.plans;
            if (this.startDate && this.endDate) {
                plans = plans.filter(plan => plan.date >= this.startDate && plan.date <= this.endDate);
            }
            if (this.filterType && this.filterValue) {
                plans = plans.filter(plan => plan[this.filterType] === this.filterValue);
            }
            return plans;
        }
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
.btn-search,
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