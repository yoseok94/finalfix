<template>
<div class="dept-detail-container">
    <div class="dept-detail">      
      <div class="dept-contents">
        <h3 style="text-align: center;">부서 상세</h3>
        <hr>
        <strong class="w3-large">1. 부서이름</strong>
        <td>{{ deptname}}</td>
        <br>
        <strong class="w3-large">2. 부서코드</strong>
        <td>{{ deptid}}</td>
        <br>
        <strong class="w3-large">3. 등록일시</strong>
        <td>{{ deptdate}}</td>
        <br>
        <strong class="w3-large">4. 상품코드</strong>
        <td>{{ productid}}</td>
      </div>
      <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button> &nbsp;
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnDelete">삭제</button> &nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() { //변수생성
return {
requestBody: this.$route.query, //query를 보내왔으니까 지금 이 페이지는 qeury를 가지고 있는 상태가 된다
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
this.$axios.get(this.$serverUrl + '/dept/' + this.deptno, {
params: this.requestBody
}).then((res) => {
this.productid = res.data.productid
this.deptid = res.data.deptid
this.deptname = res.data.deptname
this.deptdate = res.data.deptdate
}).catch((err) => {
if (err.message.indexOf('Network Error') > -1) {
alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
}
})
},
fnList() {
delete this.requestBody.deptno
this.$router.push({
path: './list',
query: this.requestBody
})
},
fnUpdate() {
this.$router.push({
path: './write',
query: this.requestBody
})
},
fnDelete() {
if (!confirm("삭제하시겠습니까?")) return

  this.$axios.delete(this.$serverUrl + '/dept/' + this.deptno, {})
      .then(() => {
        alert('삭제되었습니다.')
        this.fnList();
      }).catch((err) => {
    console.log(err);
  })
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