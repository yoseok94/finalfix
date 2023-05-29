<template>
  <div class="business-plan-edit">
    <h1>영업 계획 등록</h1>
    <form @submit.prevent="addPlan">
      <div class="form-group">
        <label for="plantitle">계획 제목</label>
        <input type="text" id="plantitle" v-model="plan.plantitle" required />
      </div>
      <div class="form-group">
        <label for="empId">사원 ID</label>
        <input type="text" id="empId" v-model="empId" readonly required />
      </div>
      <div class="form-group">
        <label for="deptname">부서명</label>
        <input type="text" id="deptname" v-model="plan.deptname" readonly required />
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
        <label for="plandetail">영업계획 상세내용:</label>
        <input type="text" id="plandetail" v-model="plan.plandetail" required />
      </div>
      <div class="form-group">
        <label for="planremarks">영업계획 비고:</label>
        <input
          type="text"
          id="planremarks"
          v-model="plan.planremarks"
          required
        />
      </div>
      <button type="submit">등록</button>
    </form>
  </div>
</template>
    <script>
import axios from "axios";

export default {
    computed: {
  getLoggedInEmpId() {
    return sessionStorage.getItem('empId');
  }
},

  data() {
    return {
      plan: {
        plantitle: "",
        productno: 0,
        targetquantity: 0,
        plandetail: "",
        planremarks: "",
        accountname: "",
        deptname: "",
      },
      empId: "",
      productName: "",
      accounts: [],
    };
  },
  methods: {
    addPlan() {
        this.plan.empId = this.empId;
      axios
        .post("/business/planadd", this.plan)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/businessPlanList");
        })
        .catch((error) => {
          console.error(error.response.data);
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
    getLoggedInEmpInfo() {
    axios
      .get("/hrm/employeeinfo/" + this.empId)
      .then((response) => {
        this.plan.deptname = response.data.deptname;
      })
      .catch((error) => {
        console.error(error.response.data);
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
    this.getProducts();
    this.empId = sessionStorage.getItem("empId");
    this.getLoggedInEmpInfo();
    axios
      .get(`/hrm/employeeinfo/${this.empId}`) 
      .then((response) => {
        this.plan.deptname = response.data.deptname; 
      })
      .catch((error) => {
        console.error(error.response.data);
      });
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