<template>

  <div class="bradcumb-title text-center">
                    <h2>부서 관리</h2>
                </div>



  <div class="dept-list">
    <!-- 검색필드추가 -->
<div>
  <div class="d-inline-flex align-items-center">
    <div class="form-group mr-2">
      <!--카테고리-->
      <select id="category" v-model="search_key" class="form-control">
        <option value="">- 카테고리 -</option>
        <option value="category">부서코드</option>
        <option value="category">부서명</option>
      </select>
    </div>
    <div class="form-group mr-2">
      <input type="text" id="category" v-model="search_value" class="form-control" @keyup.enter="fnPage()" placeholder="입력란">
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
          <th></th>
          <th>번호</th>
          <th>부서 코드</th>
          <th>부서명</th>
          <th>등록일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, dept_no) in list" :key="dept_no">
          <div class="d-flex justify-content-center">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address">
            <label></label>
          </div>
        </div>
          <td>{{ row.dept_no }}</td>
          <td>{{ row.dept_id }}</td>
          <td>{{ row.dept_name }}</td>
          <td>{{ row.created_at }}</td>
        </tr>
      </tbody>
    </table>


<div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">부서등록</button>
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
          dept_no: 1,
          dept_id: 'J1',
          dept_name: '상품마켓팅',
          created_at: '2022-04-25',
        },
        {
          dept_no: 2,
          dept_id: 'J2',
          dept_name: '상품홍보',
          created_at: '2022-04-24',
        },
        {
          dept_no: 3,
          dept_id: 'J3',
          dept_name: '상품운영',
          created_at: '2022-04-23',
        },
         {
          dept_no: 4,
          dept_id: 'J4',
          dept_name: '상품기획',
          created_at: '2022-04-23',
        },
           {
          dept_no: 5,
          dept_id: 'E1',
          dept_name: '상품인사',
          created_at: '2022-04-23',
        },
           {
          dept_no: 6,
          dept_id: 'E2',
          dept_name: '상품회계',
          created_at: '2022-04-23',
        },
           {
          dept_no: 7,
          dept_id: 'G1',
          dept_name: '경영전략',
          created_at: '2022-04-23',
        },
           {
          dept_no: 8,
          dept_id: 'G2',
          dept_name: '재무/회계',
          created_at: '2022-04-23',
        },
           {
          dept_no: 9,
          dept_id: 'G3',
          dept_name: '경영지원',
          created_at: '2022-04-23',
        },
           {
          dept_no: 10,
          dept_id: 'G4',
          dept_name: '품질',
          created_at: '2022-04-23',
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