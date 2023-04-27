<template>
  <div class="breadcumb-area"
    style="background-image: url('${pageContext.servletContext.contextPath}/resources/img/catagory-img/3.jpg');">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12">
          <div class="bradcumb-title text-center">
            <h2>거래처 관리</h2>
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
              <li class="breadcrumb-item active" aria-current="page">거래처 관리</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <div class="dept-list">
    <!-- 검색필드추가 -->
    <div>
      <input type="text" v-model="searchTerm" placeholder="거래처명을 입력하세요" />
      &nbsp;
      <button class="btn-search" @click="fnPage()">검색</button>
    </div>
    <br>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>선택</th>
          <th>거래처 명</th>
          <th>대표자 명</th>
          <th>전화번호</th>
          <th>팩스</th>
          <th>사업장 주소</th>
          <th>담당자 명</th>
          <th>연락처</th>
          <th>이메일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, account_name) in list" :key="account_name">
          <td class="checkbox-container"><input type="checkbox" v-model="row.isSelected" /></td>
          <td>{{ row.account_name }}</td>
          <td>{{ row.representative_name }}</td>
          <td>{{ row.account_phone }}</td>
          <td>{{ row.fax }}</td>
          <td>{{ row.account_address }}</td>
          <td>{{ row.manager_name }}</td>
          <td>{{ row.manager_phone }}</td>
          <td>{{ row.manager_email }}</td>
        </tr>
      </tbody>
    </table>
    <hr>

    <div class="common-buttons">
      <router-link to="/businessPartnerEdit">
        <button class="btn-edit">수정</button>
      </router-link>
      <router-link to="/businessPartnerAdd">
        <button class="btn-add">추가</button>
      </router-link>
      <button class="btn-delete">삭제</button>
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
          account_name: '거래처1',
          representative_name: '홍길동',
          account_phone: '02-1111-1111',
          fax: '02-1111-1112',
          account_address: '서울시 00구',
          manager_name: '홍길동',
          manager_phone: '010-1111-1111',
          manager_email: 'eastwest@gmail.com',

        },
        {
          account_name: '거래처2',
          representative_name: '홍길금',
          account_phone: '02-2222-2222',
          fax: '02-2222-2223',
          account_address: '서울시 00구',
          manager_name: '이원준',
          manager_phone: '010-2222-2222',
          manager_email: 'leejg789@gmail.com',

        },
        {
          account_name: '거래처3',
          representative_name: '홍길은',
          account_phone: '02-3333-3333',
          fax: '02-3333-3334',
          account_address: '서울시 00구',
          manager_name: '박지성',
          manager_phone: '010-3333-3333',
          manager_email: 'jisungpark@gmail.com',

        },
        {
          account_name: '거래처4',
          representative_name: '홍길순',
          account_phone: '02-4444-4444',
          fax: '02-4444-4445',
          account_address: '서울시 00구',
          manager_name: '손흥민',
          manager_phone: '010-4444-4444',
          manager_email: 'son@gmail.com',

        },
        {
          account_name: '거래처5',
          representative_name: '이재용',
          account_phone: '02-5555-5555',
          fax: '02-5555-5556',
          account_address: '서울시 00구',
          manager_name: '김민재',
          manager_phone: '010-5555-5555',
          manager_email: 'mjkim@samsung.com',

        },
        {
          account_name: '거래처6',
          representative_name: '정의선',
          account_phone: '02-6666-6666',
          fax: '02-6666-6667',
          account_address: '서울시 00구',
          manager_name: '차두리',
          manager_phone: '010-6666-6666',
          manager_email: 'duri2@hyundai.com',

        },
        {
          account_name: '거래처7',
          representative_name: '신동빈',
          account_phone: '02-7777-7777',
          fax: '02-7777-7778',
          account_address: '서울시 00구',
          manager_name: '이강인',
          manager_phone: '010-7777-7777',
          manager_email: 'kangin@lotte.com',

        },
        {
          account_name: '거래처8',
          representative_name: '구광모',
          account_phone: '02-8888-8888',
          fax: '02-8888-8889',
          account_address: '서울시 00구',
          manager_name: '이승우',
          manager_phone: '010-8888-8888',
          manager_email: 'swlee@lg-electric.com',

        },
        {
          account_name: '거래처9',
          representative_name: '구자은',
          account_phone: '02-9999-9999',
          fax: '02-9999-9991',
          account_address: '서울시 00구',
          manager_name: '김연아',
          manager_phone: '010-9999-9999',
          manager_email: 'kimyuna@ls.com',

        },
        {
          account_name: '거래처10',
          representative_name: '김택진',
          account_phone: '02-1212-1212',
          fax: '02-1212-1213',
          account_address: '서울시 00구',
          manager_name: '이순신',
          manager_phone: '010-1212-2223',
          manager_email: 'lss@ncsoft.com',

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

.checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

table {
  text-align: center;
}

tbody tr td {
  vertical-align: middle;
}

.btn-search,
.btn-add,
.btn-delete,
.btn-edit {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 14px;
}</style>