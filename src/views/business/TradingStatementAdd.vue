<template>
  <div>
    <div class="breadcumb-area"
      style="background-image: url('${pageContext.servletContext.contextPath}/resources/img/catagory-img/3.jpg');">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="bradcumb-title text-center">
              <h2>거래내역서 추가</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <table class="add-business-form">
      <table class="add-business-form">
        <tr>
          <td>거래일자</td>
          <td><input type="date" v-model="trading_date" /></td>
          <td>납기일자</td>
          <td><input type="date" v-model="due_date" /></td>
        </tr>
        <tr>
          <td>담당자</td>
          <td><input type="text" v-model="manager_name" /></td>
          <td>담당자 연락처</td>
          <td><input type="text" v-model="manager_phone" /></td>
        </tr>
        <tr>
          <td>거래처명</td>
          <td><input type="text" v-model="account_name" /></td>
          <td>품명</td>
          <td><input type="text" v-model="product_name" /></td>
        </tr>
        <tr>
          <td>단가</td>
          <td><input type="number" v-model="unit_price" /></td>
          <td>수량</td>
          <td><input type="number" v-model="quantity" /></td>
        </tr>
        <tr>
          <td>부가세 포함</td>
          <td colspan="1"><input type="checkbox" v-model="include_tax" /></td>
          <td>공급가액</td>
          <td><input type="number" v-model="supply_price" /></td>
        </tr>
        <tr>
          <td>부가세</td>
          <td><input type="number" v-model="tax" /></td>
          <td>판매금액</td>
          <td><input type="number" v-model="total_price" /></td>
        </tr>
      </table>
    </table>
  </div>
  <hr>
  <div class="button-container">
    <button class="btn-add">등록</button>
    <button class="btn-cancel" @click="clearForm">취소</button>
  </div>
</template>
   
<script>
export default {
  // 취소 버튼 누르면 입력 값 초기화
  data() {
    return {
      account_name: "",
      representative_name: "",
      account_phone: "",
      account_fax: "",
      account_address: "",
      manager_name: "",
      manager_phone: "",
      manager_email: ""
    };
  },
  methods: {
    clearForm() {
      this.account_name = "";
      this.representative_name = "";
      this.account_phone = "";
      this.account_fax = "";
      this.account_address = "";
      this.manager_name = "";
      this.manager_phone = "";
      this.manager_email = "";
    }
  }
};
</script>
  
<style scoped>
.header {
  display: inline-block;
  padding: 8px 16px;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 24px;
  margin-bottom: 16px;
}

.add-business-form {
  border-collapse: separate;
  /* 셀 간격을 주기 위해 */
  border-spacing: 1px;
  /* 셀 간격 크기 */
  background-color: #fff;
  /* 배경색 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  /* 그림자 */
  border-radius: 10px;
  /* 테이블 모서리 둥글게 */
  margin: auto;
  border: 1px solid #ccc;
  /* 전체 테이블에도 1px 두께의 회색 선 추가 */
}

.add-business-form td {
  text-align: left;
  /* 셀 텍스트 정렬 */
  padding: 10px;
  /* 셀 안 여백 */
  border: none;
  border-left: 1px solid #ccc;
  /* 각 셀 사이에 1px 크기의 선 추가 */
  border-top: 1px solid #ccc;
}

.add-business-form td:first-child {
  font-weight: bold;
  /* 첫 번째 셀 텍스트 굵게 */
  border-left: none;
  /* 첫 번째 셀 왼쪽에는 선이 필요 없으므로 삭제 */
}

.input-field {
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 4px;
  font-size: 14px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.btn-add,
.btn-cancel {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 14px;
}

.btn-add:hover,
.btn-cancel:hover {
  background-color: #0056b3;
}

.add-business-form td input[type="checkbox"] {
  margin: 0 auto;
  display: block;
}

/* 여기에 스타일을 추가하세요 */</style>
  