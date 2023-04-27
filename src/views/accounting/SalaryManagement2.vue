<template>

        <div class="salary_menu-bar">
            <div class="salary_menu-bar-tab">
                <!-- 하위메누 구분 텝 -->
                <router-link to="/accounting/management1"><input type="button" value="급여조회"></router-link>
                <router-link to="/accounting/management2"><input type="button" value="급여관리"></router-link>
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
            <td>부서</td>
            <td>{{ deptName }}</td>
            <td>직급</td>
            <td>{{ jobName }}</td>
        </tr>
        <tr>
            <td>입사일</td>
            <td>{{ hireDate }}</td>
            <td>지급일자</td>
            <td>{{ paymentDate }}</td>
        </tr>
    </table>
<br>
    <table>
        <tr>
            <td>지급총액 :</td>
            <td>{{ totalAmountPaid }}</td>
            <td>공제총액 :</td>
            <td>{{ totalDeduction }}</td>
            <td>실지급액 :</td>
            <td>{{ actualPaymentAmount }}</td>
        </tr>
    </table>
<br>
    <table>
        <tr>
            <td>근로일수 :</td>
            <td>{{ workDays }}</td>
            <td>총 근로시간수 :</td>
            <td>{{ totalWorkHours }}</td>
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>식대(고정)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>야간근로수당</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>결근</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>조퇴</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>지방소득세</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>국민연금</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>건강보험</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>고용보험</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>장기요양보험</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>합계</td>
                <td colspan="2"></td>
            </tr>
        </tbody>
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

</style>