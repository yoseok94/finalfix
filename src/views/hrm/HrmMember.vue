<template>
<div class="hrmlist">
  <div>
    <h2 align="center">사원정보 리스트</h2>
    <div class="table-responsive">
      <div>
      <div class="head-btn">
      <button @click="fnexceldown()">Excel</button>
      <button @click="fnincheck()">사원등록</button>
      </div>
      </div>
      <hr class="my-4">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">재직여부</th>
              <th scope="col">담당부서</th>
              <th scope="col">회원정보처리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>Y</td>
              <td>A파트부서</td>
              <td>
              <button @click="fnhrmup()">수정</button>
              &nbsp;
              <button @click="fnhrmde()">퇴직</button>
              </td>
            </tr>
          </tbody>
          <div class="searchdiv">
            <select name="search_key" >
              <option value="ID">ID</option>
              <option value="Name">Name</option>
            </select>
            <input type="search" name="search_value">
            <button @click="fnhrmsearch()">검색</button>
          </div> 
        </table>
    </div>
</div>
</div>
</template>

<script>
export default {
  methods: {
    fnincheck(){
      this.$router.push({
        path: './hrmenroll'
      })
    },
    fnhrmup(){
      this.$router.push({
        path: './hrmup'
      })
    },
    fnexceldown(){

      },
  }
}
</script>

<style scoped>
.hrmlist{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
  margin: 0 auto;
}
.head-btn{
  text-align:right;
  margin-top: 15px;
  margin-right: 30px;
}
.searchdiv{
  margin-top: 15px;
  margin-left: 30px;
}
.table-responsive{
    border: #87888a80 1px solid;
    border-radius: 20px;
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
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: .875rem;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    box-sizing: border-box;
    overflow-x: auto;
    margin: 0 auto;
}
</style>