<template>
  <br>
  <h1 style="text-align: center;">급여 명세서 작성</h1>
  <br>
 <table>
     <tr>
         <td>사원코드</td>
         <td><input class="table-input" type="text" v-model="employeeDetails.empId" /></td>
         <td>사원이름</td>
         <td><input class="table-input" type="text" v-model="employeeDetails.empname" /></td>
     </tr>
     <tr>
         <td>부서이름</td>
         <td><input class="table-input" type="text" v-model="employeeDetails.deptname " /></td>
         <td>직급이름</td>
         <td><input class="table-input" type="text" v-model="employeeDetails.emplevel" /></td>
     </tr>
     <tr>
         <td>입사일자</td>
         <td><input class="table-input" type="text" v-model="employeeDetails.emphiredate " /></td>
     <td>지급일자</td>
     <td><input class="table-input" type="text" v-model="currentDate" /></td>
     </tr>
 </table>
<br>
 <table>
     <tr>
         <td>총 근무시간 :</td>
         <td><input class="table-input" type="text" v-model="totalWorkHours " /></td>
         <td>초과근무시간:</td>
         <td><input class="table-input" type="text" v-model="workDays" /></td>
         <button v-on:click="calculateSalary()">급여 계산하기</button>
     </tr>
 </table>
<br>
 <table>
     <thead>
         <tr>
             <th>수당항목명</th>
             <th>계산식</th>             
             <th>산출방법</th>
             <th>금액</th>
             
         </tr>
     </thead>
     <tbody>
         <tr>
             <td>기본급(고정)</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
     </tbody>
     <tbody>
         <tr>
             <td>식대(고정)</td>
        <td><input class="table-input" type="text" readonly>200,000</td>
        <td><input class="table-input" type="text" readonly>1인 최대 200,000원 입니다.</td>
        <td><input class="table-input" type="text" readonly>200,000</td>
         </tr>
     </tbody>
     <tbody>
         <tr>
             <td>초과근무수당</td>
             <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
        <td><input class="table-input" type="text"></td>
         </tr>
     </tbody>
 </table>
 <br>
 <table>
     <tr>
         <td>지급총액 :</td>
         <td><input class="table-input" type="text" v-model="totalAmountPaid " /></td>
     </tr>
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
            empId: null,
            employeeDetails: { },
            salaryDetails: { empId: null },
            currentDate: new Date().toISOString().slice(0,10),
        };
    },
  created() {
    this.$axios.get(`${this.$serverUrl}/hrm/employeeinfo/${this.empId}`)
      .then((res) => {
          this.employeeDetails = res.data;
      })
      .catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
      });
  },

         
      mounted() {

},
    methods: {
        formatDate(dateString) {
        let date = new Date(dateString);
        return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    },
    submitForm() {
    this.salaryDetails.empId = this.empId; // Associate the employee id with the salary details
    this.$axios.post(`${this.$serverUrl}/accounting/salarywrite`, this.salaryDetails)
    .then((res) => {
        console.log(res);
        this.$router.push('/');
    })
    .catch((err) => {
        console.log(err);
    });
},
calculateSalary() {
    let salaryRate = 0;
    switch(this.employeeDetails.emplevel) {
        case 'laborer':
            salaryRate = 60000;
            break;
        case 'manager':
            salaryRate = 35000;
            break;
        case 'employee':
            salaryRate = 15000;
            break;
    }
    this.salaryDetails.baseSalary = this.totalWorkHours * salaryRate;
    this.salaryDetails.overtimeSalary = this.salaryDetails.baseSalary * 1.5;
    this.salaryDetails.empId = this.empId; // Associate the employee id with the salary details
},
    }
}
</script>

<style scoped>
table {
 position: relative;
 width: 65%;
 left: 20%;
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
    left: 20%;
}
</style>