<template>
<div class="product-detail-container">
  <div class="product-detail">
    <div class="product-contents">
      <h3 style="text-align: center;">상품 상세</h3>
      <hr>
      <strong class="w3-large">1. 상품이름</strong>
      <td>{{ productname}}</td>
      <br>
      <strong class="w3-large">2. 상품코드</strong>
      <td>{{ productid}}</td>
      <br>
      <strong class="w3-large">3. 등록일시</strong>
      <td>{{ productdate}}</td>
      <br>
      <strong class="w3-large">4. 상품분류</strong>
      <td>{{ productcategory}}</td>
      <br>
      <strong class="w3-large">5. 상품원가</strong>
      <td>{{ productcost}}</td>
      <br>
      <strong class="w3-large">6. 상품구매가</strong>
      <td>{{ purchaseprice}}</td>
      <br>
      <strong class="w3-large">7. 상품판매가</strong>
      <td>{{ consumerprice}}</td>
      <br>
      <strong class="w3-large">8. 상품이미지</strong>
      <td>{{ productimg}}</td>
			<!-- <td><div id="preview"><img src="items/display?productno=41" width="210" height="50"></div></td> -->
      <!-- <td>
        <div id="preview">
          <img :src="getProductimg(productNo)" width="210" height="50">
        </div>
      </td> -->
      <br>
      <strong class="w3-large">9. 상품비고</strong>
      <td>{{ productremarks}}</td>
    </div>
    <div class="common-buttons">
    <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button> &nbsp;
    <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button> &nbsp;
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
productno: this.$route.query.productno,
    productid: '',
    productname: '',
    productcategory: '',
    productcost: '',
    purchaseprice: '',
    consumerprice: '',
    productdate: '',
    // productimg: '',
    productremarks: ''
}

},
mounted() {
this.fnGetView()
},
methods: {
fnGetView() {
this.$axios.get(this.$serverUrl + '/product/' + this.productno, {
params: this.requestBody
}).then((res) => {
this.productid = res.data.productid
this.productname = res.data.productname
this.productcategory = res.data.productcategory
this.productcost = res.data.productcost
this.purchaseprice = res.data.purchaseprice
this.consumerprice = res.data.consumerprice
this.productdate = res.data.productdate
// this.productimg = res.data.productimg
this.productremarks = res.data.productremarks
}).catch((err) => {
if (err.message.indexOf('Network Error') > -1) {
alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
}
})
},
// getImageUrl(productno) {
//       return `product/display?productno=${productno}`;
//     },

fnList() {
delete this.requestBody.productno
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

  this.$axios.delete(this.$serverUrl + '/product/' + this.productno, {})
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
.product-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.product-detail {
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