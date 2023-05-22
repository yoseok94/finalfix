<!-- PageAbout.vue -->
<template>
<div class="maindiv">
  <div>
    <div class="col-md-7 col-lg-8">
          <h2 align="center">사원정보등록</h2>
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; I &nbsp; &nbsp; D &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
                <div class="input-group has-validation">
                    <input type="text" class="form-control" v-model="empId">
                </div>
            </div>

            
            
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; P &nbsp; &nbsp; W &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                    <input type="password" class="form-control" v-model="emppw">
              </div>
            </div>

            
            
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; N a m e &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="text" class="form-control" v-model="empname">
              </div>
            </div>


          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; email &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="email" class="form-control" v-model="empemail">
              </div>
            </div>

            
            
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; P h o n e &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="tel" class="form-control" v-model="empphone">
              </div>
            </div>

            
            
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; Address &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="text" placeholder="우편번호" v-model="zonecode" readonly>
                <button id="postcode" @click="fnaddress()">검색</button><br>
              </div>
              <div class="input-group has-validation">
                <input type="text" v-model="roadAddress" placeholder="주소" readonly><br>
              </div>
              <div class="input-group has-validation">
                <input type="text" v-model="detailAddress" placeholder="상세주소">
              </div>
            </div>

            
            
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; 생년월일 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">  
                <input type="date" class="form-control" v-model="empbirth">
              </div>
            </div>

           
           
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; 입사일 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="date" class="form-control" v-model="emphiredate">
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
                <span class="input-group-text">&nbsp; 사원구분 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="radio" v-model="emplevel" value="임원">
                <label for="임원">임원</label>
                <input type="radio" v-model="emplevel" value="사원">
                <label for="사원">사원</label>
              </div>
          </div> 
          <hr class="mb-4">
            <div>
              <button class="btn btn-primary1" type="button" @click="checkUserId(empId)">등록</button>
            </div>
          <hr class="mb-4">
        </div>
  </div>
</div>
</template>
  

<script>

export default {
    //id pw name phone address birth hiredate 사원구분
    data(){
        return{
          empId: '',
          emppw: '',
          empname: '',
          empphone: '',
          empaddress:'',
          empbirth:'',
          emphiredate:'',
          emplevel:'',
          deptname:'',
          empemail:"",


          zonecode: "",
          roadAddress: "",
          detailAddress: "",
        }
        
    },
    mounted(){
      this.setNowTimes();
    },
    methods: {
      checkPhoneNumber(empphone) {
        const regex = /^\d{3}-\d{3,4}-\d{4}$/;
        if (regex.test(empphone) === true){
          this.fnnewmember();
        }else{
          this.empphone = ""
          alert("번호입력이 형식에 맞지 않습니다.")
        return false;
        }
      },
      checkEmail(empemail) {
      // eslint-disable-next-line no-useless-escape
        const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (regex.test(empemail) === true){
          this.checkPhoneNumber(this.empphone);
        }else{
          alert("email형식에 맞지않습니다.")
            this.empemail = ""
            return false;
        }
      },
      checkPasswd(emppw) {
        const regex = /^[A-Za-z0-9]{6,12}$/;
        if (regex.test(emppw) === true){
          this.checkEmail(this.empemail);
        }else{
          alert("pw형식에 맞지않습니다.")
            this.emppw= ""
            return false;
        }
      },
      checkUserId(empId) {
        if (empId !== undefined) {
          const reg = /^[a-zA-Z]+[a-zA-Z0-9]{6,12}$/;
          if (empId.match(reg)) {
            this.checkPasswd(this.emppw);
            return true;
          }else{
            alert("id형식에 맞지않습니다.")
            this.empId = ""
            return false;
          }
        }else{
          alert("id를 입력하세요.")
        }
        return false;
      },
      setNowTimes(){        
        let myDate = new Date()
        let yy = String(myDate.getFullYear())
        let mm = String(myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1))
        let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
        this.emphiredate = yy + '-' + mm + '-' + dd
        this.empbirth = yy + '-' + mm + '-' + dd
      },
      fnaddress(){
        new window.daum.Postcode({
          oncomplete: (data) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
            this.zonecode = data.zonecode;
            this.roadAddress = data.roadAddress;
          },
        }).open()
      },
      fnnewmember(){
        let apiUrl = this.$serverUrl + '/hrm/newmember'
          this.form = {
            "empId": this.empId,
            "emppw": this.emppw,
            "empname": this.empname,
            "empphone": this.empphone,
            "empaddress": this.zonecode + " " + this.roadAddress + " " + this.detailAddress,
            "empemail": this.empemail,
            "empbirth": this.empbirth,
            "deptname": this.deptname,
            "emplevel": this.emplevel,
            "emphiredate": this.emphiredate,
          },
          this.$axios.post(apiUrl, this.form)
          .then(() => {
            alert("사원 등록 처리 되었습니다.");
            this.changepage();
          }).catch((err) => {
            console.log(err)
          });

       },
       changepage(){
        this.$router.push({
          path: '../hrm/hrmmember',
        })
      },
    }
}

</script>

<style>
.maindiv{
    display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
}
.col-md-7{
    margin: 0 auto;
}
.btn btn-primary1{
    font-weight: 600;
    background-color:cadetblue;
    border: solid cadetblue;
}
</style>