<template>
     <br>
     <h1 style="text-align: center;">급여 명세서</h1>
     <br>
     <!-- 해당 사원이 Salary 테이블 정보 조회해오면 됨. -->
     <div v-if="salaryDetails">
        <span> 입사일자 : {{ formatDate(salaryDetails.emphiredate) }} </span>
        <span> 지급일자 : {{ formatDate(salaryDetails.paymentdate) }} </span>
    </div>
    <table v-if="salaryDetails">
        <tr>
            <td>사원코드</td>
            <td>{{ salaryDetails.empid }}</td>
            <td>사원명</td>
            <td>{{ salaryDetails.empname }}</td>
        </tr>
        <tr>
            <td>부서이름</td>
            <td>{{ salaryDetails.deptname }}</td>
            <td>직급이름</td>
            <td>{{ salaryDetails.emplevel }}</td>
        </tr>
    </table>
<br>
<table v-if="salaryDetails">
        <tr>
            <td> 총  근무시간  :</td>
            <td>{{ salaryDetails.workhours }}</td>
            <td>시간외근무시간 :</td>
            <td>{{ salaryDetails.overtimehours }}</td>
        </tr>
    </table>
    <br>
<br>
<table v-if="salaryDetails">
        <thead>
            <tr>
                <th>수당항목명</th>
                <th>수당금액</th>
                <th>산출방법</th>
                <th>상세내용</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>기본급(고정)</td>
                <td>{{ salaryDetails.basesalary }}</td>
                <td>근무시간 * 기본급</td>
                <td>회사 내규를 확인해주세요.</td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>초과근무수당</td>
                <td>{{ salaryDetails.overtimesalary }}</td>
                <td>근무시간 * 기본급의 150%</td>
                <td>회사 내규를 확인해주세요.</td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>식대(고정)</td>
                <td>200,000</td>
                <td>최대 200,000 원 지원</td>
                <td>회사 내규를 확인해주세요.</td>
            </tr>
        </tbody>

    </table>
<br>
<table v-if="salaryDetails">
        <thead>
            <tr>
                <td>공제항목명</td>
                <td style="width: 200px;">공제금액</td>
                <td>산출방법</td>
                <td>상세내용</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>근로소득세</td>
                <td>{{ salaryDetails.earnedincometax }}</td>
                <td>과세표준에 근로소득 세율을 곱해서 정해집니다.</td>
                <td>구간별 차이가 있어 자세한 사항은 연도별 개정안을 확인해주세요.</td>
            </tr>
            <tr>
                <td>지방소득세</td>
                <td>{{ salaryDetails.localincomtax }}</td>
                <td>근로소득세 * 10%</td>
                <td>근로소득세 * 10% 입니다.</td>
            </tr>
            <tr>
                <td>국민연금료</td>
                <td>{{ salaryDetails.nationalpensionfee }}</td>
                <td>월 급여 * 4.5%</td>
                <td>단, 월급이 5,530,000 이상일 경우 5,530,000 * 4.5%</td>
            </tr>
            <tr>
                <td>건강보험료</td>
                <td>{{ salaryDetails.healthinsurancepremium }}</td>
                <td>월 급여 * 3.545%</td>
                <td>계산 시 월 급여에서 식대는 제외합니다.</td>
            </tr>
            <tr>
                <td>고용보험료</td>
                <td>{{ salaryDetails.employmentinsurancepremium }}</td>
                <td>월 급여 * 0.9%</td>
                <td>계산 시 월 급여에서 식대는 제외합니다.</td>
            </tr>
            <tr>
                <td>장기요양보험료</td>
                <td>{{ salaryDetails.longtermcareinsurancepremium }}</td>
                <td>건강보험료 * 12.81%</td>
                <td>건강보험료 * 12.81% 입니다.</td>
            </tr>
        </tbody>
    </table>
    <br>
    <table v-if="salaryDetails">
        <tr>
            <td>지급총액 :</td>
            <td>{{ salaryDetails.totalpaymentsalary }}</td>
            <td>공제총액 :</td>
            <td>{{ salaryDetails.totaldeductionsamount }}</td>
            <td>실지급액 :</td>
            <td>{{ salaryDetails.actualpaymentsalary }}</td>
        </tr>
    </table>
<br>
    <div class="actions">
        <button>Email</button>
        <button>Print</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            requestBody: this.$route.query,
            empid : this.$route.query.empid,
            paymentdate : this.$route.query.paymentdate,
            salaryDetails: {}, // Add this property to hold the details
        };
    },
    mounted() {
    const empid = this.$route.query.empid;
    const paymentdate = this.$route.query.paymentdate;

    this.$axios.get(`${this.$serverUrl}/accounting/payslib/${empid}/${paymentdate}`)
    .then((res) => {
        this.salaryDetails = res.data; // Assign the returned data to salaryDetails
    }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
    }); 
},
    methods: {
        formatDate(dateString) {
        let date = new Date(dateString);
        return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    },
    }
}
</script>


<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  td,
  th {
    border: .0625rem solid black;
    text-align: center;
    padding: .25rem;
  }
</style>