<template>
<div class="inoutform">
  <h2 align="center">근태 등록</h2>
  <div class="head-btn">
    <button @click="fnincheck()">출근</button>
    <button @click="fnoutcheck()">퇴근</button>
  </div>
  <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">출근시간</th>
              <th scope="col">퇴근시간</th>
              <th scope="col">출근IP</th>
              <th scope="col">퇴근IP</th>
              <th scope="col">휴무여부</th>
              <th scope="col">연차</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>s01</td>
              <td>김이름</td>
              <td>AM 08:21</td>
              <td>PM 08:23</td>
              <td>199.999.9.9</td>
              <td>199.999.9.9</td>
              <td>N</td>
              <td>12개</td>
            </tr>
          </tbody>
        </table>
  </div>
</div>
<div class="col-md-8 order-md-1">
  <br>
          <h2 class="mb-3" align="center">근태 신청서</h2>
          <hr class="mb-4">
          <span class="needs-validation" novalidate="">
            <div class="mb-3">
              <label for="Name">Name : </label>
              김이름 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label for="Dept">담당부서 : </label>
              A파트 부서
            </div>
            <hr class="mb-4">
            <div class="mb-3">
              <label for="hrmdate">기간 : </label>
              <input type="date" class="form-control" id="hrmdate">
            </div>
            <hr class="mb-4">
            <div class="mb-3">
            <div class="custom-control custom-checkbox">
              사유 : 
              <input type="radio" class="custom-control-input" id="save-info">
              <label class="custom-control-label" for="save-info">조퇴</label>
              <input type="radio" class="custom-control-input" id="save-info">
              <label class="custom-control-label" for="save-info">연차</label>
              <input type="radio" class="custom-control-input" id="save-info">
              <label class="custom-control-label" for="save-info">기타</label>
            </div>
            <hr class="mb-4">
            </div>
            <div class="mb-3">
            <label for="hrmetc">기타 사유 : </label><br><textarea style="width:500px; height:300px;"></textarea>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            <button @onclick="fnhrmsub()">등록</button>
            </div>
          </span>
        </div>
</template>

<script>
export default {}
</script>

<style scoped>
.col-md-8{
  border: #87888a80 1px solid;
  border-radius: 20px;
}
.form-control{
  width: 200px;
}
.head-btn{
  text-align: right;
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
    --bs-primary: #343519;
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
    --bs-link-color: #01070f;
    --bs-link-hover-color: #01070f;
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
.col-md-8 {
      -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    -webkit-box-flex: 0;
    flex: 0 0 66.666667%;
    -webkit-box-ordinal-group: 2;
    order: 1;
}
</style>