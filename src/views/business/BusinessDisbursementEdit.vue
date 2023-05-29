<template>
    <div class="business-disbursement-edit">
      <h1>영업지출 등록/수정</h1>
      <form @submit.prevent="submitForm">  
        <div class="form-group">
          <label for="deptname">부서명</label>
          <input
            type="text"
            id="deptname"
            v-model="disbursement.deptname"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="empname">담당자 명</label>
          <input
            type="text"
            id="empname"
            v-model="disbursement.empname"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="accountname">거래처명</label>
          <input
            type="text"
            id="accountname"
            v-model="disbursement.accountname"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="productname">상품명</label>
          <input
            type="text"
            id="productname"
            v-model="disbursement.productname"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="tradetype">거래 유형</label>
          <select id="tradetype" v-model="disbursement.tradetype" required>
            <option value="0">선택 없음</option>
            <option value="1">카드</option>
            <option value="2">현금</option>
            <option value="3">기타</option>
          </select>
        </div>
        <div class="form-group">
          <label for="quantity">영업지출 수량</label>
          <input
            type="number"
            id="quantity"
            v-model.number="disbursement.quantity"
            required
          />
        </div>
        <input type="hidden" v-model="disbursement.planno" />
        <div class="form-group">
          <label for="disbursementdetail">영업 지출 상세내용</label>
          <textarea
            id="disbursementdetail"
            v-model="disbursement.disbursementdetail"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="disbursementremarks">영업 지출 비고</label>
          <textarea
            id="disbursementremarks"
            v-model="disbursement.disbursementremarks"
          ></textarea>
        </div>
        
        <div>
          <button class="btn-update" @click="editDisbursement">등록/수정</button>
          <router-link to="/businessDisbursement">
            <button class="btn-cancel">취소</button>
          </router-link>
        </div>
      </form>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        planNo: "",
        disbursement: {
          planno: "",
          plantitle: "",
          targetquantity: 0,
          targetamount: 0,
          plandetail: "",
          planremarks: "",
          plandate: "",
          deptname: "",
          empId: "",
          accountname: "",
          productno: "",
          quantity: 0,
          disbursementsupplyprice: 0,
          disbursementtax: 0,
          totalamount: 0,
          sentdate: "",
          disbursementdetail: "",
          disbursementremarks: "",
          paymentremarks: "",
        },
      };
    },
    methods: {
      getDisbursement() {
        const planno = this.$route.params.planNo;
        axios
          .get(`/business/disbursement/${planno}`)
          .then((response) => {
            this.disbursement = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      editDisbursement() {
        axios
          .patch(
            `/business/disbursementedit/${this.disbursement.planno}`,
            this.disbursement
          )
          .then(() => {
            this.$router.push("/businessDisbursement");
          })
          .catch((error) => {
            console.error(error);
            alert("영업지출 등록/수정에 실패했습니다.");
          });
      },
    },
    mounted() {
      this.getDisbursement();
    },
  };
  </script>
  
  <style scoped>
  .business-disbursement-edit {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    overflow-x: hidden;
  }
  
  .business-disbursement-edit h1 {
    text-align: center;
  }
  
  .business-disbursement-edit form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .business-disbursement-edit .form-group {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .business-disbursement-edit label {
    display: block;
    margin-bottom: 5px;
  }
  .business-disbursement-edit input[readonly],
  .business-disbursement-edit textarea[readonly] {
    /* Apply different color to readonly elements */
    background-color: #f5f5f5;
    border-color: #888;
    cursor: not-allowed;
  }
  .business-disbursement-edit input,
  .business-disbursement-edit textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  .business-disbursement-edit textarea {
    height: 100px;
  }
  
  .business-disbursement-edit button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .business-disbursement-edit button.btn-cancel {
    background-color: #dc3545;
  }
  
  .business-disbursement-edit button.btn-update {
    background-color: #28a745;
  }
  </style>