<template>
  <div class="footer_defence">
  <br>
 <h1 style="text-align: center;">급여 관리 페이지</h1>
 <br>
        <div class="salary_menu-bar">
            <div class="salary_menu-bar-tab">
                <!-- 하위메누 구분 텝 -->
                <router-link to="/accounting/management1"><input type="button" value="급여조회"></router-link>
            </div>

              <!-- 검색 바 구역 --> 
        </div>
        <table>
          <tr>
            <td>사원코드</td>
            <td>{{ employeeCode }}</td>
            <td>사원명</td>
            <td>{{ employeeName }}</td>
          </tr>
          <tr>
            <td>지급구분</td>
            <td>00001</td>
            <!-- <td style="text-align: left;">&nbsp;&nbsp;{{ COPayment }}</td> -->
          </tr>
        </table>
<br>
        <table>
            <thead>
          <tr>
            <td>수당항목명</td>
            <td>내역</td>
          </tr>
        </thead>
        <tbody>
          <td>수당항목명 예시입니다</td>
            <td>내용입니다 1</td>
        </tbody>
        </table>
<br>
<table>
            <thead>
          <tr>
            <td>수당항목명</td>
            <td>내역</td>
          </tr>
        </thead>
        <tbody>
          <td>수당항목명 예시입니다</td>
            <td>내용입니다 2</td>
        </tbody>
        </table>
<br>

<br>
    <div class="actions">
      <router-link to="/accounting/stubwrite"><button>등록</button></router-link>
        <router-link to="/accounting/wageList"><button>리스트작성</button></router-link>
        <router-link to="/accounting/stubsend"><button>명세서보내기</button></router-link>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        employeeCode: "EMP001",
        employeeName: "John Doe",
        deptName: "Sales",
        jobName: "Manager",
        hireDate: "2020-01-01",
        paymentDate: "2023-04-30",
        totalAmountPaid: "KRW 3,815,000",
        totalDeduction: "KRW 815,000",
        actualPaymentAmount: "KRW 3,000,000", 
        workDays: "22",
        totalWorkHours: "176",
      };
    },
  };
  </script>
  
  <style scoped>
.footer_defence {
  height: 100%;
  overflow: auto;
}
  table {
    width: 100%;
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid black;
    text-align: center;
    padding: 4px;
  }

  .salary_menu-bar {
    display: flex;
    justify-content:space-between;
    margin-bottom: 1rem;
    margin-top: 5px;
  }
  .search_container-bar {
    margin-right: 1rem;    
  }
 input[type=text] {
 padding: 5px;
 text-align: center;
 margin: 0px;
}

</style>