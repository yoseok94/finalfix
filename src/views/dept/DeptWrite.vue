<template>
  <div class="dept-detail-container">
    <div class="dept-detail">      
      <div class="dept-contents">
        <h3 style="text-align: center;">부서 등록</h3>
        <hr>
        <label for="dept_id">1. 부서코드</label>
        <input type="text" v-model="dept_id" class="w3-input w3-border" id="dept_id" placeholder="부서코드 입력">
        <br>
        <label for="dept_name" v-if="idx === undefined">2. 부서명</label>
        <input type="text" v-model="dept_name" class="w3-input w3-border" id="dept_name" placeholder="부서명 입력" v-if="idx === undefined">
        <br>
        <label for="dept_id">3. 상품코드</label>
        <input type="text" v-model="product_id" class="w3-input w3-border" id="product_id" placeholder="상품코드 입력">
      </div>
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">등록</button>
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
dept_no: this.$route.query.dept_no,

  dept_name: '',
  dept_id: '',
  product_id: '',
  created_at: ''
}

},
mounted() {
this.fnGetView()
},
methods: {
fnGetView() {
if (this.dept_no !== undefined) {
this.$axios.get(this.$serverUrl + '/dept/' + this.dept_no, {
params: this.requestBody
}).then((res) => {
this.dept_name = res.data.dept_name
this.dept_id = res.data.dept_id
this.product_id = res.data.product_id
this.created_at = res.data.created_at
}).catch((err) => {
console.log(err)
})
}
},
fnList() {
delete this.requestBody.dept_no
this.$router.push({
path: './list',
query: this.requestBody
})
},



fnView(dept_no) {
this.requestBody.dept_no = dept_no
this.$router.push({
path: './detail',
query: this.requestBody
})
},




fnSave() {
let apiUrl = this.$serverUrl + '/board'
this.form = {
"idx": this.idx,
"title": this.title,
"contents": this.contents,
"author": this.author
}

  if (this.idx === undefined) {
    //INSERT
    this.$axios.post(apiUrl, this.form)
    .then((res) => {
      alert('글이 저장되었습니다.')
      this.fnView(res.data.idx)
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
      this.fnView(res.data.idx)
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