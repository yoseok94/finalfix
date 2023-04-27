<template>
  <div class="breadcumb-area"
    style="background-image: url('${pageContext.servletContext.contextPath}/resources/img/catagory-img/3.jpg');">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12">
          <div class="bradcumb-title text-center">
            <h2>거래명세서 관리</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="breadcumb-nav">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="@"><i class="fa fa-home" aria-hidden="true"></i>메인</a></li>
              <li class="breadcrumb-item active" aria-current="page">거래명세서 관리</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <br>
  <div class="dept-list">
    <div>
      <table>
        <tr>
          <td>거래일:</td>
          <td><input type="date" v-model="trading_date"></td>
          <td>거래처:</td>
          <td>
            <select v-model="account_name">
              <option>거래처1</option>
              <option>거래처2</option>
              <option>거래처3</option>
              <option>거래처4</option>
              <option>거래처5</option>
            </select>
          </td>
          &nbsp;&nbsp;
          <td>부서:</td>
          <td>
            <select v-model="department">
              <option>부서1</option>
              <option>부서2</option>
              <option>부서3</option>
              <option>부서4</option>
              <option>부서5</option>
            </select>
          </td>
          &nbsp;&nbsp;
          <td>납기일:</td>
          <td><input type="date" v-model="due_date"></td>
          &nbsp;&nbsp;
          <td>담당자:</td>
          <td><input type="text" v-model="manager_name"></td>
          &nbsp;&nbsp;
          <button class="trade-search-btn">조회</button>
        </tr>
      </table>
    </div>
    <hr>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>선택</th>
          <th>거래일</th>
          <th>납기일</th>
          <th>거래처명</th>
          <th>품명</th>
          <th>단가</th>
          <th>수량</th>
          <th>부가세포함</th>
          <th>공급가액</th>
          <th>부가세</th>
          <th>판매금액계</th>
          <th>담당자</th>
          <th>담당자 연락처</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, account_id) in list" :key="account_id">
          <td class="checkbox-container"><input type="checkbox" v-model="row.isSelected" /></td>
          <td>{{ row.trading_date }}</td>
          <td>{{ row.due_date }}</td>
          <td>{{ row.account_name }}</td>
          <td>{{ row.product_name }}</td>
          <td>{{ row.unit_price }}</td>
          <td>{{ row.quantity }}</td>
          <td class="checkbox-container"><input type="checkbox" v-model="row.include_tax" /></td>
          <td>{{ row.tax }}</td>
          <td>{{ row.supply_price }}</td>
          <td>{{ row.total_price }}</td>
          <td>{{ row.manager_name }}</td>
          <td>{{ row.manager_phone }}</td>
        </tr>
      </tbody>
    </table>
    <hr>
    <div class="common-buttons">
      <div class="left-buttons">
        <button class="btn-excel">엑셀</button>
        <button class="btn-print">인쇄</button>
        <button class="btn-email">이메일</button>
      </div>
      <div class="right-buttons">
        <router-link to="/tradingStatementEdit">
          <button class="btn-edit">수정</button>
        </router-link>
        <router-link to="/tradingStatementAdd">
          <button class="btn-add">추가</button>
        </router-link>
        <button class="btn-delete">삭제</button>
      </div>
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
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처1',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '홍길동',
          manager_phone: '010-1111-1111',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처2',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '이원준',
          manager_phone: '010-2222-2222',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처3',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '박지성',
          manager_phone: '010-3333-3333',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처4',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '손흥민',
          manager_phone: '010-4444-4444',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처5',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '김민재',
          manager_phone: '010-5555-5555',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처6',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '차두리',
          manager_phone: '010-6666-6666',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처7',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '이강인',
          manager_phone: '010-7777-7777',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처8',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '이승우',
          manager_phone: '010-8888-8888',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처9',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '김연아',
          manager_phone: '010-9999-9999',
        },
        {
          trading_date: '2023/04/19',
          due_date: '2023/04/27',
          account_name: '거래처10',
          product_name: '상품1',
          unit_price: '1,000',
          quantity: '10',
          include_tax: false,
          supply_price: "9,091",
          tax: '909',
          total_price: '10,000',
          manager_name: '이순신',
          manager_phone: '010-1212-2223',
        },
      ];
    },
    fnPage() {
      const selectedList = this.list.filter(item => item.isSelected);
      console.log(selectedList);
    },
    fnWrite() {
      this.$router.push({
        path: './write'
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


table {
  text-align: center;
}

tbody tr td {
  vertical-align: middle;
}

.trade-search-btn {
  display: block;
  margin: 0 auto;
}

.common-buttons {
  display: flex;
  justify-content: space-between;
}

.left-buttons {
  display: inline-flex;
}

.right-buttons {
  display: inline-flex;
}
.btn-email,
.btn-delete,
.btn-add,
.btn-edit,
.btn-excel,
.btn-print {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 14px;
}

.trade-search-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  font-size: 14px;
  display: inline-block;
}</style>