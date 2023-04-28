<template>
  <div>
    <div class="breadcumb-area"
      style="background-image: url('${pageContext.servletContext.contextPath}/resources/img/catagory-img/3.jpg');">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="bradcumb-title text-center">
              <h2>거래처 추가</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <hr>
    <table class="add-business-form">
      <tr>
        <td>거래처명</td>
        <td colspan="3"><input type="text" v-model="account_name" /></td>
      </tr>
      <tr>
        <td>대표자명</td>
        <td colspan="3"><input type="text" v-model="representative_name" /></td>
      </tr>
      <tr>
        <td>전화번호</td>
        <td colspan="3"><input type="text" v-model="account_phone" /></td>
      </tr>
      <tr>
        <td>팩스</td>
        <td colspan="3"><input type="text" v-model="account_fax" /></td>
      </tr>
      <tr>
        <td>사업장 주소</td>
        <td colspan="3"><input type="text" v-model="account_address" /></td>
      </tr>
      <tr>
        <td>담당자 명</td>
        <td colspan="3"><input type="text" v-model="manager_name" /></td>
      </tr>
      <tr>
        <td>담당자 연락처</td>
        <td colspan="3"><input type="text" v-model="manager_phone" /></td>
      </tr>
      <tr>
        <td>이메일</td>
        <td colspan="3"><input type="text" v-model="manager_email" /></td>
      </tr>
    </table>
  </div>
  <hr>
  <div class="button-container">
    <button class="btn-add">추가</button>
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
  border-spacing: 0 10px;
  /* 셀 간격 크기 */
  background-color: #fff;
  /* 배경색 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  /* 그림자 */
  border-radius: 10px;
  /* 테이블 모서리 둥글게 */
  margin: auto;
}

.add-business-form td {
  text-align: left;
  /* 셀 텍스트 정렬 */
  padding: 10px;
  /* 셀 안 여백 */
  border: none;
}

.add-business-form td:first-child {
  font-weight: bold;
  /* 첫 번째 셀 텍스트 굵게 */
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

/* 여기에 스타일을 추가하세요 */</style>
  