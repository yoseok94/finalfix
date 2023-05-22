<template>
  <div class="dept-detail-container">
    <div class="dept-detail">      
      <div class="dept-contents">
        <h3 style="text-align: center;">부서 수정</h3>
        <label for="deptid">1. 부서코드</label>
        <input type="text" v-model="deptid" class="w3-input w3-border" id="deptid" placeholder="부서코드 입력">
        <br>
        <label for="deptname" v-if="deptno === undefined">2. 부서명</label>
        <input type="text" v-model="deptname" class="w3-input w3-border" id="deptname" placeholder="부서명 입력" v-if="deptno === undefined">
        <br>
        <label for="deptid">3. 상품코드</label>
        <input type="text" v-model="productid" class="w3-input w3-border" id="productid" placeholder="상품코드 입력">
      </div>
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">수정</button>
        <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">이전</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() { //변수생성
return {
requestBody: this.$route.query,
deptno: this.$route.query.deptno,
  deptname: '',
  deptid: '',
  productid: '',
  deptdate: ''
}

},
mounted() {
this.fnGetView()
},
methods: {
fnGetView() {
if (this.deptno !== undefined) {
this.$axios.get(this.$serverUrl + '/dept/' + this.deptno, {
params: this.requestBody
}).then((res) => {
this.deptname = res.data.deptname
this.deptid = res.data.deptid
this.productid = res.data.productid
this.deptdate = res.data.deptdate
}).catch((err) => {
console.log(err)
})
}
},
fnSave() {
let apiUrl = this.$serverUrl + '/board'
this.form = {
"deptno": this.deptno,
"deptid": this.dept_id,
"product_id": this.product_id,
"deptname": this.deptname,
"deptdate": this.deptdate
}

  if (this.deptno === undefined) {
    //INSERT
    this.$axios.post(apiUrl, this.form)
    .then((res) => {
      alert('글이 저장되었습니다.')
      this.fnView(res.data.deptno)
    }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\\n잠시 후 다시 시도해주세요.')
      }
    })
  } else {
    //UPDATE
    this.$axios.patch(apiUrl, this.form)
    .then((res) => {
      alert('글이 저장되었습니다.')
      this.fnView(res.data.deptno)
    }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\\n잠시 후 다시 시도해주세요.')
      }
    })
  }
}

}
}
</script>
<style scoped>
.dept-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.dept-detail {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 70px;
}

.common-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.common-buttons button {
  margin: 0 5px;
}


</style>