<template>
  <div class="product-detail-container">
  <div class="product-detail">
    <h3 style="text-align: center;">상품 등록</h3>
    <div class="input-file">
      <input id="inputFile" type="file" @change="readInputFile" name="picture" class="w3-btn w3-white w3-border"/>
    </div>
    <br />
    <div id="imagePreview" class="preview-img">
      <img v-if="previewImage" :src="previewImage" id="img" class="preview-image"/>
    </div>
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
          <label for="productremarks">7. 비고</label>
          <input type="text" v-model="productremarks" class="w3-input w3-border" id="productremarks" placeholder="비고 입력">
        </div>
      </div>
      <div class="common-buttons">
        <button @click="registerProduct" class="w3-button w3-round w3-blue-gray">등록</button>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    requestBody: this.$route.query,
    productno: this.$route.query.productno,       
    productid: '',
    productname: '',
    productcategory: '',
    productcost: '',
    purchaseprice: '',
    consumerprice: '', 
    productremarks: '',
    productdate: '',
    previewImage: null,
    file: null,
    };
  },
  mounted() {
this.fnGetView()
},

  methods: {
    fnlist(){
            this.$router.push({
                path: './list',
            });
        },
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



    readInputFile(event) {
      this.file = event.target.files[0];
      this.previewImage = null; // 기존 미리 보기 지우기
      const files = event.target.files;
      const fileArr = Array.from(files);
      fileArr.forEach((file) => {
        if (!file.type.match('image/.*')) {
          alert("이미지 확장자만 업로드 가능합니다.");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
    registerProduct() {
      var productObject = {
        productno: this.productno,
        productid: this.productid,
        productname: this.productname,
        productcategory: this.productcategory,
        productcost: this.productcost,
        purchaseprice: this.purchaseprice,
        consumerprice: this.consumerprice,
        productremarks: this.productremarks,
        // productdate: this.productdate        
      };

      var formData = new FormData();
      formData.append('file', this.file);
      formData.append('product', JSON.stringify(productObject));
      formData.append('productno', this.productno);
      formData.append('productid', this.productid);
      formData.append('productname', this.productname);
      formData.append('productcategory', this.productcategory );
      formData.append('productcost', this.productcost);
      formData.append('purchaseprice', this.purchaseprice);
      formData.append('consumerprice', this.consumerprice);
      formData.append('productremarks', this.productremarks );

      fetch('/product/file', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            alert('Created');

            this.fnlist();

          } else {
            throw new Error('Request failed');
          }
        })
        .catch(error => {
          alert('Error: ' + error.message);
        });
    },
  },

    computed: {
    previewImageUrl() {
      return 'product/display?productno=' + this.productno;
    },
  },

};
</script>

<style scoped>
.preview-image {
  max-width: 200px; 
  max-height: 200px; 
}
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
