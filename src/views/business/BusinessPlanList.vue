<template>
    <div class="business-plan">
        <div class="left-section">
            <div class="filters">
                <label for="start-date">작성일</label>
                <input type="date" id="start-date" class="calendar" v-model="startDate"/>
                <label for="end-date">~</label>
                <input type="date" id="end-date" class="calendar" v-model="endDate"/>
                <label for="department-manager">부서/담당자</label>
                <select class="department-manager" v-model="filterType">
                    <option value="">선택 해주세요</option>
                    <option value="department">부서명</option>
                    <option value="manager">담당자명</option>
                </select>
                <input type="text" class="department-manager-input" v-model="filterValue"/>
                <button @click="search">조회</button>
            </div>
            <div class="list-container">
                <div class="plan-list">
                    <table>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>선택</th>
                            <th>작성일</th>
                            <th>제목</th>
                            <th>거래처</th>
                            <th>부서</th>
                            <th>직책</th>
                            <th>담당자</th>
                            <th>목표수량</th>
                            <th>목표금액</th>
                            <th>상세내용</th>
                            <th>비고</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(plan, index) in filteredPlans" :key="index" @click="goToPlanDetail(plan.id)">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <input type="checkbox" :value="plan.id" v-model="selectedIds"/>
                            </td>
                            <td>{{ plan.date }}</td>
                            <td @click="goToPlanDetail(plan.id)">{{ plan.title }}</td>
                            <td>{{ plan.client }}</td>
                            <td>{{ plan.department }}</td>
                            <td>{{ plan.position }}</td>
                            <td>{{ plan.manager }}</td>
                            <td>{{ plan.targetQuantity }}</td>
                            <td>{{ plan.targetAmount }}</td>
                            <td>{{ plan.details }}</td>
                            <td>{{ plan.remark }}</td>
                        </tr>
                        </tbody>
                    </table>
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
                    <router-link to="/businessPlanAdd">
                        <button class="btn-add">등록</button>
                    </router-link>
                    <router-link to="/businessPlanEdit">
                        <button class="btn-edit">수정</button>
                    </router-link>
                    <button class="selectdelete">삭제</button>
                </div>
            </div>
        </div>
        <div class="right-section">
            <div class="filter-container"> <!-- 수정 -->
                <label for="filter-calendar">캘린더</label>
            </div>
            <div class="calendar-container"> <!-- 추가 -->
                <div id="calendar"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            startDate: '',
            endDate: '',
            filterType: '',
            filterValue: '',
            selectedIds: [],
            plans: [
                {
                    id: 1,
                    date: '2023-04-26',
                    title: '회의',
                    client: 'A회사',
                    department: '영업부',
                    position: '과장',
                    manager: '김영업',
                    targetQuantity: '100',
                    targetAmount: '1000000',
                    details: '다음주 계획 논의',
                    remark: '없음'
                },
                {
                    id: 2,
                    date: '2023-04-27',
                    title: '실적 보고',
                    client: 'B회사',
                    department: '영업부',
                    position: '대리',
                    manager: '이영업',
                    targetQuantity: '50',
                    targetAmount: '500000',
                    details: '전월 실적 리뷰',
                    remark: '날짜 변경 가능'
                },
                {
                    id: 3,
                    date: '2023-04-27',
                    title: '상담',
                    client: 'C회사',
                    department: '영업부',
                    position: '과장',
                    manager: '박업업',
                    targetQuantity: '30',
                    targetAmount: '300000',
                    details: '새로운 프로모션 기획',
                    remark: '없음'
                },
                {
                    id: 4,
                    date: '2023-04-28',
                    title: '신규 발표',
                    client: 'D회사',
                    department: '영업부',
                    position: '대리',
                    manager: '홍영업',
                    targetQuantity: '50',
                    targetAmount: '500000',
                    details: '신규 제품 발표 계획',
                    remark: '없음'
                },
                {
                    id: 5,
                    date: '2023-04-29',
                    title: '미팅',
                    client: 'E회사',
                    department: '영업부',
                    position: '과장',
                    manager: '이영업',
                    targetQuantity: '20',
                    targetAmount: '200000',
                    details: 'E회사와의 비즈니스 협의',
                    remark: '날짜 변경 가능'
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
        goToPlanDetail(planId) {
            // 선택한 계획의 상세 정보로 이동하는 로직
            this.$router.push({ name: 'businessPlanDetail', params: { planId } });
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
    mounted() {
        // 캘린더 초기화
        const calendarEl = document.getElementById('calendar');
        calendarEl.innerHTML = 'Calendar';
    }
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
    width: 70%;
    margin-right: 20px;
    border: 1px solid #ccc; /* 추가 */
    padding: 20px; /* 추가 */
    box-sizing: border-box; /* 추가 */
}

.right-section {
    width: 30%;
    border: 1px solid #ccc; /* 추가 */
    padding: 20px; /* 추가 */
    box-sizing: border-box; /* 추가 */
}

.filter-container { /* 추가 */
    padding: 20px;
    border-bottom: 1px solid #ccc;
}

.list-container { /* 추가 */
    padding: 20px;
    border-bottom: 1px solid #ccc;
}

.button-container { /* 추가 */
    padding: 20px;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.filters label {
    margin-right: 10px;
}

.calendar {
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

</style>