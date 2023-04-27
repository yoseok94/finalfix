<!-- PageAbout.vue -->
<template>
    <div class="col-md-7 col-lg-8">
        <h2 align="center">신규사원등록</h2>
        <form class="needs-validation" novalidate="">
          <div class="row g-3">

            
            
            <hr class="my-4">
            <div class="col-sm-2">
                <div class="input-group has-validation">
                    <span align="center" style="margin: 0; padding: 0; display: flex;" class="input-group-text">
                        &nbsp; Profile image &nbsp;</span>
                </div>
            </div>
            <img id="showprofile" :src="previewImage"
            style="height: 90px; width: 110px; border-radius: 25px; border: 2px solid #D1D1D1;" alt="profile"/>
            <div class="col-sm-7">
                <div class="input-group has-validation">
                    <input type="file" class="form-control" id="hrmimage" v-onchange="fnchangeImg(this)">
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
                    <input type="text" class="form-control" id="userid">
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
                    <input type="password" class="form-control" id="password">
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
                <input type="text" class="form-control" id="username">
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
                <input type="tel" class="form-control" id="userphone">
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
                <input type="text" class="form-control" id="address" placeholder="상세 주소 입력">
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
                <span class="input-group-text"> 생년월일 </span>
                <input type="date" class="form-control" id="birth">
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
                <span class="input-group-text"> 입사일 </span>
                <input type="date" class="form-control" id="enrolldate">
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
                <input type="radio" id="userlev"> 임원 &nbsp;
                <input type="radio" id="userlev"> 사원
              </div>
            </div>
          </div>
          <br>
          
          
          <hr class="my-4">
          <div>
            <button class="btn btn-primary1" type="button" v-on:click="fnmemberin">등록</button>
          </div>
          <hr class="my-4">
        </form>
      </div>
</template>
  

<script>

export default {
    
    data(){
        return{
            previewImageData: null
        }
        
    },
    methods: {
        fnmemberin(){
            this.$router.push({
                path: "./hrmember",
            })
        },
        fnchangeImg(input) {
            const reader = new FileReader();
            if (input.files && input.files[0]) {
                reader.onload = e => {
                    const previewImage = document.getElementById("showprofile");
                    previewImage.src = e.target.result;
                    console.log(previewImage.src);
                }
                //이미지 읽기
                reader.readAsDataURL(input.files[0]);
            }
        }
    }
}

</script>

<style>
.col-md-7{
    margin: 0 auto;
}
.btn btn-primary1{
    font-weight: 600;
    background-color:cadetblue;
    border: solid cadetblue;
}
</style>