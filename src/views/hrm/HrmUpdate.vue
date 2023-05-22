<!-- PageAbout.vue -->
<template>
<div class="maindiv">
  <div>
    <div class="col-md-7 col-lg-8">
          <h2 align="center">사원정보수정</h2>
          <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; I &nbsp; &nbsp; D &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
                <div class="input-group has-validation">
                    <input type="text" class="form-control" v-model="empId" readonly>
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
                <input type="text" class="form-control" v-model="empbirth" readonly>
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
                <input type="text" class="form-control" v-model="emphiredate" readonly>
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
              <button class="btn btn-primary1" type="button" @click="fnmemberup()">수정</button>
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
          requestbody: this.$route.query,
          empno: this.$route.query.empno,
          empId: '',
          emppw: '',
          empname: '',
          empphone: '',
          empaddress:'',
          empbirth:'',
          emphiredate:'',
          emplevel:'',
          deptname:'',


          zonecode: "",
          roadAddress: "",
          detailAddress: "",
        }
        
    },
    mounted(){
      this.fnmember();
    },
    methods: {
      fnaddress(){
        new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
          this.zonecode = data.zonecode;
          this.roadAddress = data.roadAddress;
        },
      }).open()
      },
      fnmember(){
        if (this.empno !== undefined) {
          this.$axios.get(this.$serverUrl + "/hrm/hrmup/" + this.empno,{
            params: this.requestBody
          })
          .then((res) => {
            this.empno = res.data.empno
            this.empId = res.data.empId
            this.emppw = res.data.emppw
            this.empname = res.data.empname
            this.empphone = res.data.empphone
            this.empbirth = res.data.empbirth
            this.emphiredate = res.data.emphiredate
            this.deptname = res.data.deptname
            this.emplevel = res.data.emplevel
          })
          .catch((err) => {
            if (err.message.indexOf("Network Error") > -1) {
              alert("네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.");
            }
          });
        }
      },
      fnmemberup(){
        let apiUrl = this.$serverUrl + '/hrm/hrmup'
          this.form = {
            "empno": this.empno,
            "empId": this.empId,
            "emppw": this.emppw,
            "empname": this.empname,
            "empphone": this.empphone,
            "empaddress": this.zonecode + " " + this.roadAddress + " " + this.detailAddress,
            "empbirth": this.empbirth,
            "deptname": this.deptname,
            "emplevel": this.emplevel,
            "emphiredate": this.emphiredate,
          },
          this.$axios.patch(apiUrl, this.form)
          .then(() => {
            alert("사원정보 수정 처리 되었습니다.");
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