<template>
<div class="maindiv">
<main class="form-signin w-100 m-auto">
    <img class="mb-4" src="@/assets/images/Sefix.png" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please Sign In</h1>

    <form @submit.prevent="login()">
    <div class="form-floating">
      <input type="id" class="form-control" id="floatingInput" placeholder="Id" v-model="userId">
      <label for="floatingInput">ID 입력</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
      <label for="floatingPassword">PW 입력</label>
    </div>

    <div class="form-floating">
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">© 2022–2023</p>
    </div>
    </form>
</main>
</div>
</template>

<script>
import axios from "axios";

export default {
  name:'LoginPage',
  data(){
    return{
      requestBody: {},
      userId: "",
      password: "",
      empId:"",
    };
  },
  methods: {
    changepage(){
      this.$router.push({
        path: './',
      })
    },
    loginok(){
      if (this.empId !== undefined) {
      this.$axios.get(this.$serverUrl + "/hrm/employeeinfo/" + this.empId
        ).then((res) => {
          this.requestBody = res.data
          if(this.password == this.requestBody.emppw && this.userId == this.requestBody.empId){
            sessionStorage.setItem('empno', this.requestBody.empno)
            sessionStorage.setItem('emplevel', this.requestBody.emplevel)
          
            this.changepage();
          }else if(this.password != this.requestBody.emppw || this.userId != this.requestBody.empId){
            alert("아이디 또는 비밀번호가 다릅니다. 다시 입력해주세요.");
            this.$router.go(0);
          }
        }).catch((err) => {
          console.log(err)
        });
      }
    },
    login(){
      if(this.password == "" || this.userId == ""){
        alert("아이디 또는 비밀번호를 모두 입력해주세요.");
        this.$router.go(0);
      }else{
      axios.post("/login/", {
          empId: this.userId,
          emppw: this.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'token',
          }
        }).then((res) => {
          if (res.status == 200) {
            console.log(res)
            sessionStorage.setItem('token', res.data.token);
            this.empId = this.userId
            this.loginok();
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  },

};
</script>

<style scoped>
.maindiv{
  overflow: auto;
}
.form-floating{
  width: 300px;
  margin: 0 auto;
}
.form-signin{
    --bs-blue: #0d6efd;
    --bs-indigo: #6610f2;
    --bs-purple: #6f42c1;
    --bs-pink: #d63384;
    --bs-red: #dc3545;
    --bs-orange: #fd7e14;
    --bs-yellow: #ffc107;
    --bs-green: #198754;
    --bs-teal: #20c997;
    --bs-cyan: #0dcaf0;
    --bs-black: #000;
    --bs-white: #fff;
    --bs-gray: #6c757d;
    --bs-gray-dark: #343a40;
    --bs-gray-100: #f8f9fa;
    --bs-gray-200: #e9ecef;
    --bs-gray-300: #dee2e6;
    --bs-gray-400: #ced4da;
    --bs-gray-500: #adb5bd;
    --bs-gray-600: #6c757d;
    --bs-gray-700: #495057;
    --bs-gray-800: #343a40;
    --bs-gray-900: #212529;
    --bs-primary: #0d6efd;
    --bs-secondary: #6c757d;
    --bs-success: #198754;
    --bs-info: #0dcaf0;
    --bs-warning: #ffc107;
    --bs-danger: #dc3545;
    --bs-light: #f8f9fa;
    --bs-dark: #212529;
    --bs-primary-rgb: 13,110,253;
    --bs-secondary-rgb: 108,117,125;
    --bs-success-rgb: 25,135,84;
    --bs-info-rgb: 13,202,240;
    --bs-warning-rgb: 255,193,7;
    --bs-danger-rgb: 220,53,69;
    --bs-light-rgb: 248,249,250;
    --bs-dark-rgb: 33,37,41;
    --bs-white-rgb: 255,255,255;
    --bs-black-rgb: 0,0,0;
    --bs-body-color-rgb: 33,37,41;
    --bs-body-bg-rgb: 255,255,255;
    --bs-font-sans-serif: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --bs-font-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
    --bs-body-font-family: var(--bs-font-sans-serif);
    --bs-body-font-size: 1rem;
    --bs-body-font-weight: 400;
    --bs-body-line-height: 1.5;
    --bs-body-color: #212529;
    --bs-body-bg: #fff;
    --bs-border-width: 1px;
    --bs-border-style: solid;
    --bs-border-color: #dee2e6;
    --bs-border-color-translucent: rgba(0, 0, 0, 0.175);
    --bs-border-radius: 0.375rem;
    --bs-border-radius-sm: 0.25rem;
    --bs-border-radius-lg: 0.5rem;
    --bs-border-radius-xl: 1rem;
    --bs-border-radius-2xl: 2rem;
    --bs-border-radius-pill: 50rem;
    --bs-link-color: #0d6efd;
    --bs-link-hover-color: #0a58ca;
    --bs-code-color: #d63384;
    --bs-highlight-bg: #fff3cd;
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    text-align: center!important;
    box-sizing: border-box;
    margin-top: 200px!important;
}
</style>