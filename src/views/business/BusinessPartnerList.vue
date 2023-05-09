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
      <input type="text" v-model="searchName" placeholder="거래처명을 입력하세요" />
      &nbsp;
      <button class="btn-search" @click="fnSearchList()">검색</button>
    </div>
    <br>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>선택</th>
          <th>거래처 순번</th>
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
        <tr v-for="(row, accountname) in list" :key="accountname">
          <td class="checkbox-container"><input type="checkbox" v-model="row.isSelected" /></td>
          <td>{{ row.accountno }}</td>
          <td>{{ row.accountname }}</td>
          <td>{{ row.representativename }}</td>
          <td>{{ row.accountphone }}</td>
          <td>{{ row.accountfax }}</td>
          <td>{{ row.accountaddress }}</td>
          <td>{{ row.managername }}</td>
          <td>{{ row.managerphone }}</td>
          <td>{{ row.manageremail }}</td>
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
import axios from 'axios';
export default {
  data() {
    return {
      list: [],
      search_key: '',
      search_value: '',
      searchName: '',
    };
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    fnSearchList(){
      axios.get('/businessPartnerList/search', {
        params: {
          searchName: this.searchName
        }
      })
      .then(response => {
        this.list = response.data;
      })
      .catch(error => {
        console.error(error);
      })
    },
    fnGetList() {
      axios.get('/businessPartnerList')
      .then(response => {
        this.list = response.data;
      })
      .catch(error => {
        console.error(error);
      })
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