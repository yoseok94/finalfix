<!-- PageAbout.vue -->
<template>
<div class="maindiv">
<div>
    <div class="col-md-7 col-lg-8">
        <h2 align="center">사원정보수정</h2>
        <form class="needs-validation" novalidate="">
          <div class="row g-3">

            
            
            <hr class="my-4">
            <div class="col-sm-2">
                <div class="input-group has-validation">
                    <span align="center" style="margin: 0; padding: 0; display: flex;" class="input-group-text">
                        &nbsp; Profile image &nbsp;</span>
                </div>
            </div>
            &nbsp;&nbsp;
            <img id="showprofile"
            style="height: 90px; width: 110px; border-radius: 25px; border: 2px solid #D1D1D1;" alt="profile"/>
            &nbsp;
            <div class="col-sm-7">
                <div class="input-group has-validation">
                    <input type="file" class="form-control" id="hrmimage">
                </div>
            </div>
            


            <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; I &nbsp; &nbsp; D &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
                <div class="input-group has-validation">
                    <input type="text" class="form-control" :value="empid" readonly>
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
                    <input type="password" class="form-control" :value="emppw">
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
                <input type="text" class="form-control" :value="empname">
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
                <input type="tel" class="form-control" :value="empphone">
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
                <button @onclick="fnaddress()">우편번호 검색</button> &nbsp;
                <input type="text" class="form-control" :value="empaddress">
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
                <input type="text" class="form-control" :value="empbirth" readonly>
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
                <input type="text" class="form-control" :value="emphiredate" readonly>
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
                <input type="text" class="form-control" :value="deptname" readonly>
              </div>
            </div>
            
            <hr class="my-4">
            <div class="col-sm-2">
              <div class="input-group has-validation">  
                <span class="input-group-text">&nbsp; 사원구분 &nbsp;</span>
              </div>
            </div>
            <div class="col-sm-10">
              <div class="input-group has-validation">
                <input type="text" class="form-control" :value="emplevel" readonly>
              </div>
            </div>
          </div>
          <br>
          
          
          <hr class="my-4">
          <div>
            <button class="btn btn-primary1" type="button" v-on:click="fnmemberup">수정</button>
          </div>
          <hr class="my-4">
        </form>
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
          empid: '',
          emppw: '',
          empname: '',
          empphone: '',
          empaddress:'',
          empbirth:'',
          emphiredate:'',
          emplevel:'',
          deptname:''
        }
        
    },
    mounted(){
      this.fnmember();
    },
    methods: {
      fnmember(){
        if (this.empno !== undefined) {
          this.$axios.get(this.$serverUrl + "/hrm/hrmup/" + this.empno,{
            params: this.requestBody
          })
          .then((res) => {
            this.empno = res.data.empno
            this.empid = res.data.empid
            this.emppw = res.data.emppw
            this.empname = res.data.empname
            this.empphone = res.data.empphone
            this.empaddress = res.data.empaddress
            this.empbirth = res.data.empbirth
            this.emphiredate = res.data.emphiredate
            this.deptname = res.data.deptname
            if(res.data.emplevel == 3){
              this.emplevel = "사원"
            }
            if(res.data.emplevel == 2){
              this.emplevel = "임원"
            }
          })
          .catch((err) => {
            if (err.message.indexOf("Network Error") > -1) {
              alert("네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.");
            }
          });
        }
      },
      fnmemberup(){
        if (this.empno !== undefined) {

          this.$axios.patch(this.$serverUrl + "/hrm/hrmup/" + this.empno,{
            params: this.requestBody
          })
          .then(() => {
            this.$router.push({
               path: "./hrmmember",
           })
          })
          .catch((err) => {
            if (err.message.indexOf("Network Error") > -1) {
              alert("네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.");
            }
          });
        }
      }
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