<template>
  <div class="product-detail-container">
    <div class="product-detail">
      <h3 style="text-align: center;">상품 등록</h3>
      <hr>
      <div class="product-contents">   
        <div>
          <label for="product_id" v-if="idx === undefined">1. 상품코드</label>
          <input type="text" v-model="product_id" class="w3-input w3-border" id="product_id" placeholder="상품코드 입력" v-if="idx === undefined">
          <br>
          <label for="product_name">2. 상품명</label>
          <input type="text" v-model="product_name" class="w3-input w3-border" id="product_name" placeholder="상품명 입력">
          <br> 
          <label for="category">3. 상품분류</label>
          <!-- <input type=text v-model="category" class="w3-input w3-border" id="category" placeholder="상품분류 입력"> -->
          <select id="category" class="form-control">
            <option value="">-선택-</option>
            <option value="category">매장용냉장고</option>
            <option value="category">김치냉장고</option>
            <option value="category">양문형냉장고</option>
            <option value="category">일반냉장고</option>
            <option value="category">건식냉장고</option>
            <option value="category">다목적냉동고</option>
            <option value="category">반찬냉장고</option>
          </select>
          <br>
          <label for="cost">4. 원가</label>
          <input type="text" v-model="cost" class="w3-input w3-border" id="cost" placeholder="원가 입력">
        </div>
        &nbsp; &nbsp;
        <div>
          <label for="purchase_price">5. 구매가</label>
          <input type="text" v-model="purchase_price" class="w3-input w3-border" id="purchase_price" placeholder="구매가 입력">
          <br>
          <label for="consumer_price">6. 소비자가</label>
          <input type="text" v-model="consumer_price" class="w3-input w3-border" id="consumer_price" placeholder="소비자가 입력">
          <br>
          <label for="pdorigin_img">7. 상품이미지</label>
          <input type="file" ref="fileInput" @change="handleFileUpload()" accept="image/*" id="pdorigin_img" class="w3-input w3-border">
          <br>
          <label for="product_remarks">8. 비고</label>
          <input type="text" v-model="product_remarks" class="w3-input w3-border" id="product_remarks" placeholder="비고 입력">
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
product_no: this.$route.query.product_no,

  dept_id: '',
  product_id: '',
  product_name: '',
  category: '',
  cost: '',
  purchase_price: '',
  consumer_price: '',
  pdorigin_img: '',
  product_remarks: '',
  created_at: ''
}

},
mounted() {
this.fnGetView()
},
methods: {
fnGetView() {
if (this.product_no !== undefined) {
this.$axios.get(this.$serverUrl + '/dept/' + this.product_no, {
params: this.requestBody
}).then((res) => {
this.dept_id = res.data.dept_id
this.dept_name = res.data.dept_name
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