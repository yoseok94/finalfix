<template>
    <div class="business-plan">
        <div class="left-section">
            <div class="filters">
                <label for="start-date">작성일</label>
                <input type="date" id="start-date" class="calendar" v-model="startDate"/>
                <label for="end-date">~</label>
                <input type="date" id="end-date" class="calendar" v-model="endDate"/>
                <select class="department-manager" v-model="filterType">
                    <option value="">선택 해주세요</option>
                    <option value="department">부서명</option>
                    <option value="manager">담당자명</option>
                </select>
                <input type="text" class="department-manager-input" v-model="filterValue"/>
                <button @click="search">조회</button>
            </div>
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
                    <tr v-for="(plan, index) in filteredPlans" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <input type="checkbox" :value="plan.id" v-model="selectedIds"/>
                        </td>
                        <td>{{ plan.date }}</td>
                        <td>{{ plan.title }}</td>
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
            <div class="actions">
                <button @click="create">등록</button>
                <button @click="update">수정</button>
                <button @click="selectdelete">삭제</button>
            </div>
        </div>
        <div class="right-section">
            <div id="calendar"></div>
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
                },
                {
                    id: 6,
                    date: '2023-04-30',
                    title: '컨퍼런스',
                    client: 'F회사',
                    department: '영업부',
                    position: '대리',
                    manager: '김영업',
                    targetQuantity: '100',
                    targetAmount: '1000000',
                    details: '산업 동향 및 경쟁사 분석',
                    remark: '없음'
                },
                {
                    id: 7,
                    date: '2023-05-01',
                    title: '상담',
                    client: 'G회사',
                    department: '영업부',
                    position: '과장',
                    manager: '최영업',
                    targetQuantity: '30',
                    targetAmount: '300000',
                    details: '새로운 프로모션 기획',
                    remark: '없음'
                },
                {
                    id: 8,
                    date: '2023-05-02',
                    title: '미팅',
                    client: 'H회사',
                    department: '영업부',
                    position: '대리',
                    manager: '박영업',
                    targetQuantity: '20',
                    targetAmount: '200000',
                    details: 'H회사와의 비즈니스 협의',
                    remark: '날짜 변경 가능'
                },
                {
                    id: 9,
                    date: '2023-05-03',
                    title: '컨퍼런스',
                    client: 'I회사',
                    department: '영업부',
                    position: '과장',
                    manager: '김영업',
                    targetQuantity: '100',
                    targetAmount: '1000000',
                    details: '산업 동향 및 경쟁사 분석',
                    remark: '없음'
                },
                {
                    id: 10,
                    date: '2023-05-04',
                    title: '상담',
                    client: 'J회사',
                    department: '영업부',
                    position: '대리',
                    manager: '홍영업',
                    targetQuantity: '30',
                    targetAmount: '300000',
                    details: 'J회사와의 계약 조건 협의',
                    remark: '없음'
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
    justify-content: space-between;
    padding: 20px;
    flex-wrap: wrap;
}

.left-section {
    width: calc(50% - 10px);
}

.right-section {
    width: calc(50% - 10px);
}

@media (max-width: 768px) {
    .left-section {
        width: 100%;
    }

    .right-section {
        width: 100%;
        margin-top: 20px;
    }
}

.filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.calendar,
.department,
.manager {
    flex: 1;
    margin-right: 10px;
}

.plan-list table {
    width: 100%;
    border-collapse: collapse;
}

.plan-list th,
.plan-list td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.actions button {
    margin-left: 10px;
}
</style>