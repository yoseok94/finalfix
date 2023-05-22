<template>
  <br>
  <h1 style="text-align: center;">급여 명세서 작성</h1>
  <br>
 <table>
     <tr>
         <td>사원코드</td>
         <td><input class="table-input" type="text" v-model="salaryDetails.empid" /></td>
         <td>사원명</td>
         <td><input class="table-input" type="text" v-model="salaryDetails.empname" /></td>
     </tr>
     <tr>
         <td>부서</td>
         <td><input class="table-input" type="text" v-model="deptname " /></td>
         <td>직급</td>
         <td><input class="table-input" type="text" v-model="jobname " /></td>
     </tr>
     <tr>
         <td>입사일</td>
         <td><input class="table-input" type="text" v-model="emphiredate " /></td>
         <td>지급일자</td>
         <td><input class="table-input" type="text" v-model="SYSDATE " /></td>
     </tr>
 </table>
<br>
 <table>
     <tr>
         <td>지급총액 :</td>
         <td><input class="table-input" type="text" v-model="totalAmountPaid " /></td>
         <td>공제총액 :</td>
         <td><input class="table-input" type="text" v-model="totalDeduction " /></td>
         <td>실지급액 :</td>
         <td><input class="table-input" type="text" v-model="actualPaymentAmount " /></td>
     </tr>
 </table>
<br>
 <table>
     <tr>
         <td>근로일수 :</td>
         <td><input class="table-input" type="text" v-model="workDays " /></td>
         <td>총 근로시간수 :</td>
         <td><input class="table-input" type="text" v-model="totalWorkHours " /></td>
     </tr>
 </table>
<br>
 <table>
     <thead>
         <tr>
             <th>수당항목명</th>
             <th>지급유형</th>
             <th>근무기록</th>
             <th>수당금액</th>
             <th>금액</th>
             <th>산출방법</th>
         </tr>
     </thead>
     <tbody>
         <tr>
             <td>기본급(고정)</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
     </tbody>
     <tbody>
         <tr>
             <td>식대(고정)</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
     </tbody>
     <tbody>
         <tr>
             <td>야간근로수당</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
     </tbody>
     <tbody>
         <tr>
             <td>결근</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
     </tbody>
     <tbody>
         <tr>
             <td>조퇴</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
         <tr>
             <td>합계</td>
             <td colspan="5"></td>
         </tr>
     </tbody>
 </table>
<br>
 <table>
     <thead>
         <tr>
             <td>공제항목명</td>
             <td>금액</td>
             <td>산출방법</td>
         </tr>
     </thead>
     <tbody>
         <tr>
             <td>소득세</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>

         </tr>
         <tr>
             <td>지방소득세</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
         <tr>
             <td>국민연금</td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td>건강보험</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
         <tr>
             <td>고용보험</td>

             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
         <tr>
             <td>장기요양보험</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
         <tr>
             <td>합계</td>
             <td colspan="2"></td>
         </tr>
     </tbody>
 </table>
<br>
    <div class="actions">
        <router-link to="/accounting/stubwrite"><button @click="submitForm">등록</button></router-link>
        <router-link to="/accounting/allowancesdeductions"><button>리스트작성</button></router-link>
        <router-link to="/accounting/stubsend"><button>명세서보내기</button></router-link>
      </div>

</template>

<script>
export default {
    data() {
        return {
            requestBody: this.$route.query,
            empid : this.$route.query.empid,
            salaryDetails: {
                empid: this.$route.query.empid, // Add empid to the salaryDetails object
            },
        };
    },
    mounted() {
    const empid = this.$route.query.empid;

    this.$axios.get(`${this.$serverUrl}/accounting/employee/${empid}`)
    .then((res) => {
        this.employeeDetails = res.data; 
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
    submitForm() {
        this.$axios.post(`${this.$serverUrl}/accounting/salarywrite`, this.salaryDetails)
        .then((res) => {
            console.log(res);
            this.$router.push('/'); 
        })
        .catch((err) => {
            console.log(err);
        });
    },
    }
}
</script>

<style scoped>
table {
 position: relative;
 width: 50%;
 left: 25%;
 border-collapse: collapse;
}

td,
th {
 border: 1px solid black;
 text-align: center;
 padding: 4px;
}
input.table-input {
  border: none;
  width: 100%;
  text-align: center;
  background-color: transparent;
  outline: none;
}
.actions button {
    margin-right: 1rem;
    position: relative;
    left: 25%;
}
</style>