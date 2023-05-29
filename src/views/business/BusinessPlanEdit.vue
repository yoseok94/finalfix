<template>
    <div class="business-plan-edit">
      <h1>영업계획 수정</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="plantitle">계획 제목</label>
          <input type="text" id="plantitle" v-model="plan.plantitle" required />
        </div>
        <div class="form-group">
          <label for="deptname">부서명</label>
          <input type="text" id="deptname" v-model="plan.deptname" readonly />
        </div>
        <div class="form-group">
          <label for="empname">담당자 명</label>
          <input type="text" id="empname" v-model="plan.empname" readonly />
        </div>
        <div class="form-group">
        <label for="productno">상품 이름</label>
        <select v-model="plan.productno" required>
          <option value="">선택하세요</option>
          <option
            v-for="product in products"
            :key="product.productno"
            :value="product.productno"
          >
            {{ product.productname }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="accountname">거래처</label>
        <select v-model="plan.accountname" required>
          <option value="">선택하세요</option>
          <option
            v-for="account in accounts"
            :key="account.accountname"
            :value="account.accountname"
          >
            {{ account.accountname }}
          </option>
        </select>
      </div>
        <div class="form-group">
          <label for="targetquantity">목표 수량</label>
          <input
            type="number"
            id="targetquantity"
            v-model="plan.targetquantity"
            required
          />
        </div>
        <div class="form-group">
          <label for="plandetail">영업계획 상세내용</label>
          <textarea id="plandetail" v-model="plan.plandetail" required></textarea>
        </div>
        <div class="form-group">
          <label for="planremarks">영업계획 비고</label>
          <textarea id="planremarks" v-model="plan.planremarks"></textarea>
        </div>      
        <div>
          <button class="btn-update" @click="editPlan">수정</button>
          <router-link to="/businessPlanList">
            <button class="btn-cancel">취소</button>
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        planNo: '',
        plan: {
          planno: '',
          plantitle: '',
          targetquantity: 0,
          targetamount: 0,
          plandetail: '',
          planremarks: '',
          plandate: '',
          deptname: '',
          empId: '',
          accountname: '',
          productno: 0,
        },
        productName: "",
      accounts: [],
      };
    },
    methods: {
      getPlan() {
        const planno = this.$route.params.planNo;
        axios
          .get(`/business/plan/${planno}`)
          .then((response) => {
            this.plan = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      getProducts() {
      axios
        .get("/business/products") 
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
      editPlan() {
        axios
          .patch(`/business/planedit/${this.plan.planno}`, this.plan)
          .then(() => {
            this.$router.push("/businessPlanList");
          })
          .catch((error) => {
            console.error(error);
            alert("영업계획 수정에 실패했습니다.");
          });
      },
      getAccounts() {
      axios
        .get("/business/accounts") 
        .then((response) => {
          this.accounts = response.data;
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
    },
    mounted() {
      this.getPlan();
      this.getProducts();
      this.getAccounts();
    },
  };
  </script>
  
  <style scoped>
  .business-plan-edit {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    overflow-x: hidden;
  }
  
  .business-plan-edit h1 {
    text-align: center;
  }
  
  .business-plan-edit form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .business-plan-edit .form-group {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .business-plan-edit label {
    display: block;
    margin-bottom: 5px;
  }
  
  .business-plan-edit input,
  .business-plan-edit textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  .business-plan-edit textarea {
    height: 100px;
  }
  
  .business-plan-edit button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .business-plan-edit button.btn-cancel {
    background-color: #dc3545;
  }
  
  .business-plan-edit button.btn-update {
    background-color: #28a745;
  }
  </style>