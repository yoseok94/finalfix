<template>
    <div id="paystub" class="vue-container">
    <br>
    <h1 style="text-align: center;">급여 명세서</h1>
    <br>
    <!-- 해당 사원이 Salary 테이블 정보 조회해오면 됨. -->
    <div v-if="salaryDetails" style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 10px;">
        <span> 입사일자 : {{ formatDate(salaryDetails.emphiredate) }} </span>
        <span> 지급일자 : {{ formatDate(salaryDetails.paymentdate) }} </span>
    </div>
    <table v-if="salaryDetails">
        <tr>
            <td>사원코드</td>
            <td>{{ salaryDetails.empId }}</td>
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
            <td> 총 근무시간 :</td>
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
                <th>산출방법</th>
                <th>상세내용</th>
                <th>수당금액</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>기본급(고정)</td>

                <td>근무시간 * 기본급</td>
                <td>회사 내규를 확인해주세요.</td>
                <td>{{ salaryDetails.basesalary }}</td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>초과근무수당</td>

                <td>근무시간 * 기본급의 150%</td>
                <td>회사 내규를 확인해주세요.</td>
                <td>{{ salaryDetails.overtimesalary }}</td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>식대(고정)</td>

                <td>최대 200,000 원 지원</td>
                <td>회사 내규를 확인해주세요.</td>
                <td>200,000</td>
            </tr>
        </tbody>

    </table>
    <br>
    <table v-if="salaryDetails">
        <thead>
            <tr>
                <td>공제항목명</td>

                <td>산출방법</td>
                <td>상세내용</td>
                <td style="width: 200px;">공제금액</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>근로소득세</td>

                <td>과세표준에 근로소득 세율을 곱해서 정해집니다.</td>
                <td>구간별 차이가 있어 자세한 사항은 연도별 개정안을 확인해주세요.</td>
                <td>{{ salaryDetails.earnedincometax }}</td>
            </tr>
            <tr>
                <td>지방소득세</td>

                <td>근로소득세 * 10%</td>
                <td>근로소득세 * 10% 입니다.</td>
                <td>{{ salaryDetails.localincomtax }}</td>
            </tr>
            <tr>
                <td>국민연금료</td>

                <td>월 급여 * 4.5%</td>
                <td>단, 월급이 5,530,000 이상일 경우 5,530,000 * 4.5%</td>
                <td>{{ salaryDetails.nationalpensionfee }}</td>
            </tr>
            <tr>
                <td>건강보험료</td>
                <td>월 급여 * 3.545%</td>
                <td>계산 시 월 급여에서 식대는 제외합니다.</td>
                <td>{{ salaryDetails.healthinsurancepremium }}</td>

            </tr>
            <tr>
                <td>고용보험료</td>

                <td>월 급여 * 0.9%</td>
                <td>계산 시 월 급여에서 식대는 제외합니다.</td>
                <td>{{ salaryDetails.employmentinsurancepremium }}</td>
            </tr>
            <tr>
                <td>장기요양보험료</td>

                <td>건강보험료 * 12.81%</td>
                <td>건강보험료 * 12.81% 입니다.</td>
                <td>{{ salaryDetails.longtermcareinsurancepremium }}</td>
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
        <button class="w3-button w3-round w3-blue-gray">Email</button>
        <button class="w3-button w3-round w3-blue-gray" @click="() => makePDF('#paystub')">PDF 인쇄</button>
        <button class="movelocation" @click="goBack">이전페이지</button>
	</div>
</div>
</template>

<script>
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
export default {

    data() {
        return {
            requestBody: this.$route.query,
            empId: this.$route.query.empId,
            paymentdate: this.$route.query.paymentdate,
            salaryDetails: {},
            propTitle: 'mypdf'
        };
    },
    mounted() {
        window.html2canvas = require('html2canvas');
        window.jsPDF = require('jspdf');
        const empId = this.$route.query.empId;
        const paymentdate = this.$route.query.paymentdate;

        this.$axios.get(`${this.$serverUrl}/accounting/payslib/${empId}/${paymentdate}`)
            .then((res) => {
                this.salaryDetails = res.data; // Assign the returned data to salaryDetails
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                }
            });
    },
    methods: {
        goBack() {
      this.$router.go(-1);
    },
        formatDate(dateString) {
            let date = new Date(dateString);
            return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        },
        makePDF(selector = 'body') {
            window.html2canvas = html2canvas
            let pdf = new jsPDF('p', 'mm', 'a4')
            let canvas = pdf.canvas
            let date = new Date(this.salaryDetails.paymentdate);
let formattedDate = date.toISOString().substring(0,10);
			const pageWidth = 210 //캔버스 너비 mm
			const pageHeight = 295 //캔버스 높이 mm
			canvas.width = pageWidth

			let ele = document.querySelector(selector)
			let width = ele.offsetWidth // 셀렉트한 요소의 px 너비
			let height = ele.offsetHeight // 셀렉트한 요소의 px 높이
			let imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환

			if(!ele){
				console.warn(selector + ' is not exist.')
				return false
			}

			html2canvas(ele).then((canvas) => {let position = 0
					const imgData = canvas.toDataURL('image/png')
					pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight, undefined, 'slow')

					//Paging 처리
					let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
					heightLeft -= pageHeight
					while (heightLeft >= 0) {
						position = heightLeft - imgHeight
						pdf.addPage();
						pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight)
						heightLeft -= pageHeight
					}

					pdf.save(`${formattedDate}일 급여명세서_사원명_${this.salaryDetails.empname}.pdf`);

                
                })
            }
	}
}

</script>


<style scoped>
.vue-container {
    width: 70%; 
    height: auto;
    margin: auto;
}
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
.actions {
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0;
}
.actions button {
  margin-right: 1rem;
}

</style>