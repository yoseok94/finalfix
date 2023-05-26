<template>
<div class="maindiv">
<div>
<div class="inoutform">
  <h2 align="center">근태 등록</h2>
  <div class="table-responsive">
    <div class="head-btn">
    <button @click="fnincheck()">출근</button>
    <button @click="fnoutcheck()">퇴근</button>
  </div>
  <hr class="my-4">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">출근시간</th>
              <th scope="col">퇴근시간</th>
              <th scope="col">출근IP</th>
              <th scope="col">퇴근IP</th>
              <th scope="col">근태구분</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{this.empId}}</td>
              <td>{{this.empname}}</td>
              <td v-if="this.requestdate == this.checkdate">{{this.intime}}</td>
              <td v-if="this.requestdate == this.checkdate">{{this.outtime}}</td>
              <td v-if="this.requestdate == this.checkdate">{{this.inip}}</td>
              <td v-if="this.requestdate == this.checkdate">{{this.outip}}</td>
              <td v-if="this.requestdate == this.checkdate">{{this.divide}}</td>
            </tr>
          </tbody>
        </table>
  </div>
</div>
<div class="col-md-8 order-md-1">
  <br>
          <h2 class="mb-3" align="center">근태 신청서</h2>
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; Name &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="text" class="form-control" v-model="empname" readonly>
              </div>
            </div>
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; 담당부서 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="text" class="form-control" v-model="deptname" readonly>
              </div>
            </div>
          <hr class="mb-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; 기 간 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="date" class="form-control" v-model="requestdate">
              </div>
            </div>
          <hr class="mb-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; 사 유 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="radio" v-model="reason" value="조퇴">
                <label for="조퇴">조퇴</label>
                <input type="radio" v-model="reason" value="연차">
                <label for="연차">연차</label>
                <input type="radio" v-model="reason" value="기타">
                <label for="기타">기타</label>
              </div>
            </div>
          <hr class="mb-4">
          <div v-if="reason == '기타'">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; 기타사유 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="text" class="form-control" v-model="reasonpr">
              </div>
            </div>
          </div>
            <hr class="mb-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <button @click="fnorder()">등록</button>
              </div>
            </div>          
      </div>
</div>
</div>
</template>

<script>
export default {
  data(){
    return{
      empno: sessionStorage.getItem("empno"),
      emplevel: sessionStorage.getItem("emplevel"),
      requestBody: {},
      attendenceno: "",
      empId: "",
      empname: "",
      deptname: "",
      intime: "",
      outtime: "",
      inip: "",
      outip: "",
      divide: "",
      reason: "",
      reasonpr: "",
      requestdate: "",
      checkdate: "",
      requestresult: "N",
      checkresult: "",
    };
  },
  mounted(){
    this.setNowTimes();
  },
  methods: {
    setNowTimes(){        
      let myDate = new Date()
      let yy = String(myDate.getFullYear())
      let mm = String(myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1))
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      this.requestdate = yy + '-' + mm + '-' + dd
      this.checkdate = yy + '-' + mm + '-' + dd
      this.fngetemp();
    },
    fnorder(){
      if(this.reason != "기타"){
        this.reasonpr = "기타사유x"
      }
      if(this.checkdate < this.requestdate){
        if(this.checkresult == null){
        let apiUrl = this.$serverUrl + '/hrm/orderin'
          this.form = {
            "empId": this.empId,
            "empname": this.empname,
            "emplevel": this.emplevel,
            "deptname": this.deptname,
            "reason": this.reason,
            "reasonpr": this.reasonpr,
            "requestdate": this.requestdate,
            "requestresult": this.requestresult,
          },
          this.$axios.post(apiUrl, this.form)
          .then(() => {
            alert("근태 신청 처리 되었습니다.");
            this.fngetemp();
          }).catch((err) => {
            console.log(err)
          });
        }
        else{
          let apiUrl = this.$serverUrl + '/hrm/orderup'
          this.form = {
            "attendenceno": this.attendenceno,
            "reason": this.reason,
            "reasonpr": this.reasonpr,
            "requestdate": this.requestdate,
            "requestresult": this.requestresult,
          },
          this.$axios.patch(apiUrl, this.form)
          .then(() => {
            alert("근태 신청 처리 되었습니다.");
            this.fngetemp();
          }).catch((err) => {
            console.log(err)
          });
        }
      }else{
        alert("해당 날짜로 신청 불가능합니다.");
        this.$router.go(0);
      }
    },
    fngetemp(){
      this.$axios.get(this.$serverUrl + "/hrm/hrmup/" + this.empno
        ).then((res) => {
          this.requestBody = res.data
          this.empId = this.requestBody.empId
          this.empname = this.requestBody.empname
          this.deptname = this.requestBody.deptname
          this.fngetattendence();
        }).catch((err) => {
          console.log(err)
        });
    },
    fngetattendence(){
      this.$axios.get(this.$serverUrl + "/hrm/adinfo/" + this.empId
        ).then((res) => {
          this.requestBody = res.data
          this.attendenceno = this.requestBody.attendenceno
          this.reason = "기타"
          this.reasonpr = this.requestBody.reasonpr
          this.requestdate = this.requestBody.requestdate
          this.checkresult = this.requestBody.requestresult
          if(this.requestBody.requestdate == this.checkdate){
            this.intime = this.requestBody.intime
            this.outtime = this.requestBody.outtime
            this.inip = this.requestBody.inip
            this.outip = this.requestBody.outip
            this.divide = this.requestBody.divide
          }
        }).catch((err) => {
          console.log(err)
        });
    },
    fnincheck(){
      if(this.requestBody.intime == null || this.requestBody.requestdate != this.checkdate){
        if(this.checkresult == "N" || this.checkresult == null){
          let apiUrl = this.$serverUrl + '/hrm/adin'
          this.form = {
            "empId": this.empId,
            "empname": this.empname,
            "emplevel": this.emplevel,
            "deptname": this.deptname,
            "requestresult": this.requestresult,
          },
          this.$axios.post(apiUrl, this.form)
          .then(() => {
            alert("출근 처리 되었습니다.");
            this.fngetemp();
          }).catch((err) => {
            console.log(err)
          });
        }else{
          alert("근태 신청한 일자는 출근처리 불가합니다.");
          this.$router.go(0);
        }
      }else{
        alert("이미 처리되었습니다.");
        this.$router.go(0);
      }
    },
    fnoutcheck(){
      if(this.outtime == null){
        let apiUrl = this.$serverUrl + '/hrm/adout'
        this.form = {
          "attendenceno": this.attendenceno,
        },
        this.$axios.patch(apiUrl, this.form)
        .then(() => {
          alert("퇴근 처리 되었습니다.");
          this.fngetemp();
        }).catch((err) => {
          console.log(err)
        });
      }else{
        alert("이미 처리되었습니다.");
        this.$router.go(0);
      }
    },
  }
}
</script>

<style scoped>
.maindiv{
    display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
}
.col-md-8{
  border: #87888a80 1px solid;
  border-radius: 20px;
}
.form-control{
  width: 200px;
}
.head-btn{
  text-align: right;
  margin-top: 15px;
  margin-right: 30px;
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