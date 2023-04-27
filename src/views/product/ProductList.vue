<template>

                <div class="bradcumb-title text-center">
                    <h2>상품 관리</h2>
                </div>


  <div class="product-list">
   <!-- 검색필드추가 -->
<div>
  <div class="d-inline-flex align-items-center">
    <div class="form-group mr-2">
      <!--카테고리-->
      <select id="category" v-model="search_key" class="form-control">
        <option value="">- 카테고리 -</option>
        <option value="category">매장용냉장고</option>
        <option value="category">김치냉장고</option>
        <option value="category">양문형냉장고</option>
        <option value="category">일반냉장고</option>
        <option value="category">건식냉장고</option>
        <option value="category">다목적냉동고</option>
        <option value="category">반찬냉장고</option>
      </select>
    </div>
    <div class="form-group mr-2">
      <!--상품명-->
      
      <input type="text" id="product_name" v-model="search_value" class="form-control" @keyup.enter="fnPage()" placeholder="상품명 입력">
    </div>
    <div class="form-group mr-1">
    <button class="form-control" type="button"  @click="fnPage()">조회</button>
    </div>
    <div class="form-group mr-1">
    <button class="form-control" type="button"  @click="fnDelete()">삭제</button>
    </div>
    <div class="form-group mr-1">
    <button class="form-control" type="button"  @click="fnUpdate()">수정</button>
    </div>
  </div>
</div>
    <br>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>선택</th>
          <th>번호</th>
          <th>상품 코드</th>
          <th>상품명</th>
          <th>분류</th>
          <th>원가</th>
          <th>구매가</th>
          <th>소비자가</th>
          <th>등록일시</th>
        </tr>
           </thead>
      <tbody>
        <tr v-for="(row, product_no) in list" :key="product_no">
          <div class="d-flex justify-content-center">
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address">
            <label></label>
        </div>
        </div>
          
          <td>{{ row.product_no }}</td>
          <td>{{ row.product_id }}</td>
          <td>{{ row.product_name }}</td>
          <td>{{ row.category }}</td>
          <td>{{ row.cost }}</td>
          <td>{{ row.purchase_price }}</td>
          <td>{{ row.consumer_price }}</td>
          <td>{{ row.created_at }}</td>
        </tr>
      </tbody>
    </table>


<div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">상품등록</button>
    </div>

    <div class="pagination">
  <a href="#" class="page active">1</a>
  <a href="#" class="page">2</a>
  <a href="#" class="page">3</a>
  <a href="#" class="page">4</a>
  <a href="#" class="page">5</a>
  <a href="#" class="page">></a>
</div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      search_key: '',
      search_value: '',
    };
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    fnGetList() {
      

      this.list = [
         {
    product_no: 1,
    product_id: 'A1111',
    product_name: '****',
    category: '매장용냉장고',
    cost: '500000',
    purchase_price: '300000',
    consumer_price: '800000',
    created_at: '2022-04-25',
  },
  {
    product_no: 2,
    product_id: 'A1112',
    product_name: '****',
    category: '매장용냉장고',
    cost: '550000',
    purchase_price: '350000',
    consumer_price: '900000',
    created_at: '2022-04-25',
  },
  {
    product_no: 3,
    product_id: 'A1113',
    product_name: '****',
    category: '매장용냉장고',
    cost: '600000',
    purchase_price: '400000',
    consumer_price: '950000',
    created_at: '2022-04-25',
  },
  {
    product_no: 4,
    product_id: 'A1114',
    product_name: '****',
    category: '매장용냉장고',
    cost: '700000',
    purchase_price: '450000',
    consumer_price: '1100000',
    created_at: '2022-04-25',
  },
  {
    product_no: 5,
    product_id: 'A1115',
    product_name: '****',
    category: '매장용냉장고',
    cost: '800000',
    purchase_price: '500000',
    consumer_price: '1200000',
    created_at: '2022-04-25',
  },
  {
    product_no: 6,
    product_id: 'A1116',
    product_name: '****',
    category: '매장용냉장고',
    cost: '900000',
    purchase_price: '550000',
    consumer_price: '1300000',
    created_at: '2022-04-25',
  },
  {
    product_no: 7,
    product_id: 'A1117',
    product_name: '****',
    category: '매장용냉장고',
    cost: '1000000',
    purchase_price: '600000',
    consumer_price: '1400000',
    created_at: '2022-04-25',
  },
  {
    product_no: 8,
    product_id: 'A1118',
    product_name: '****',
    category: '매장용냉장고',
    cost: '1100000',
    purchase_price: '650000',
    consumer_price: '1500000',
    created_at: '2022-04-25',
  },
  {
    product_no: 9,
    product_id: 'A1119',
    product_name: '****',
    category: '매장용냉장고',
    cost: '1200000',
    purchase_price: '700000',
    consumer_price: '1600000',
    created_at: '2022-04-25',
  },
   {
    product_no: 10,
    product_id: 'A1120',
    product_name: '****',
    category: '매장용냉장고',
    cost: '1300000',
    purchase_price: '800000',
    consumer_price: '1600000',
    created_at: '2022-04-25',
  },
      ];
    },
    fnPage() {

    },
     fnWrite() {
                this.$router.push({
                  path: './write'
                })
              },
      fnUpdate(){
          this.$router.push({
            path: './update'
          })
      },
  },
};
</script>
<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f1f1f1;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.page.active,
.page:hover {
  background-color: #0077cc;
  color: #fff;
}
</style>