<template>
  <div class="product-detail-container">
    <div class="product-detail">
      <h3 style="text-align: center;">상품 등록</h3>
      <hr>
      <div class="product-contents">   
        <div>
          <label for="productid">1. 상품코드</label>
          <input type="text" v-model="productid" class="w3-input w3-border" id="productid" placeholder="상품코드 입력">
          <br>
          <label for="productname">2. 상품명</label>
          <input type="text" v-model="productname" class="w3-input w3-border" id="productname" placeholder="상품명 입력">
          <br> 
          <label for="productcategory">3. 상품분류</label>
          <input type=text v-model="productcategory" class="w3-input w3-border" id="productcategory" placeholder="상품분류 입력">
          <br>
          <label for="productcost">4. 원가</label>
          <input type="number" v-model="productcost" class="w3-input w3-border" id="productcost" placeholder="원가 입력">
        </div>
        &nbsp; &nbsp;
        <div>
          <label for="purchaseprice">5. 구매가</label>
          <input type="number" v-model="purchaseprice" class="w3-input w3-border" id="purchaseprice" placeholder="구매가 입력">
          <br>
          <label for="consumerprice">6. 소비자가</label>
          <input type="number" v-model="consumerprice" class="w3-input w3-border" id="consumerprice" placeholder="소비자가 입력">
          <br>
          <!-- <label for="productimg">7. 상품이미지</label>
          <td><label for="inputFile">file</label></td>
          <td><input type="file" name="picture" id="inputFile" /></td>
          <br> -->
          <label for="productremarks">7. 비고</label>
          <input type="text" v-model="productremarks" class="w3-input w3-border" id="productremarks" placeholder="비고 입력">
        </div>
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
productno: this.$route.query.productno,
  productid: '',
  productname: '',
  productcategory: '',
  productcost: '',
  purchaseprice: '',
  consumerprice: '',
  // productimg: '',
  productremarks: '',
  productdate: ''
  }

},
mounted() {
this.fnGetView()
},
methods: {
fnGetView() {
if (this.productno !== undefined) {
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
console.log(err)
})
}
},

fnList() {
delete this.requestBody.productno
this.$router.push({
path: './list',
query: this.requestBody
})
},
fnView(productno) {
this.requestBody.productno = productno
this.$router.push({
path: './detail',
query: this.requestBody
})
},
fnSave() {
let apiUrl = this.$serverUrl + '/product'
this.form = {
"productno": this.productno,
"productid": this.productid,
"productname": this.productname,
"productcategory": this.productcategory,
"productcost": this.productcost,
"purchaseprice": this.purchaseprice,
"consumerprice": this.consumerprice,
// "productimg": this.productimg,
"productremarks": this.productremarks,

// "file": this.file
}
  if (this.productno === undefined) {
    //INSERT
    this.$axios.post(apiUrl, this.form)
    .then((res) => {
      alert('글이 저장되었습니다.')
      this.fnView(res.data.productno)
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
      this.fnView(res.data.productno)
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
.product-contents {
    display: flex;
}


</style>

