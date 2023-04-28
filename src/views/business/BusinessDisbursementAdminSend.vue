<template>
    <div class="expense-form">
      <div class="header">
        <h2>영업지출 결의서 발송</h2>
      </div>
      <table class="expense-info">
        <tbody>
          <tr>
            <th>결제금액</th>
            <td>1,100,000</td>
            <th>발송일</th>
            <td>2020/01/01</td>
          </tr>
          <tr>
            <th>발송인</th>
            <td>관리자1</td>
            <th>지급방법</th>
            <td>
              <label for="card"><input type="checkbox" id="card"> 카드</label>
              <label for="cash"><input type="checkbox" id="cash"> 현금</label>
              <label for="transfer"><input type="checkbox" id="transfer"> 계좌이체</label>
            </td>
          </tr>
          <tr>
            <th>거래처</th>
            <th>상세내역</th>
            <th>금액</th>
            <th>부가세</th>
          </tr>
          <tr>
            <td>거래처1</td>
            <td>테스트1</td>
            <td>1,000,000</td>
            <td>100,000</td>
          </tr>
          <tr>
            <td></td>
            <th>합계</th>
            <td>1,000,000</td>
            <td>100,000</td>
          </tr>
          <tr>
            <th>비고</th>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
      <div class="buttons">
        <button id="send">발송</button>
        <button id="cancel">취소</button>
      </div>
    </div>
  </template>
  <style scoped>
    .expense-form {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #333;
    }
  .header {
  text-align: center;
  margin-bottom: 30px;
  }
table {
border-collapse: collapse;
width: 100%;
margin-bottom: 30px;
}
th,
td {
border: 1px solid #333;
padding: 8px;
text-align: center;
}
th {
background-color: #f5f5f5;
font-weight: bold;
}
tbody tr:nth-child(even) {
background-color: #f5f5f5;
}

label {
margin-right: 10px;
}

.buttons {
display: flex;
justify-content: center;
margin-top: 20px;
}

button {
    padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 14px;
}

button:hover {
background-color: #333;
color: #f5f5f5;
}
</style>