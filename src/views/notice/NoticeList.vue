<template>
                <div class="bradcumb-title text-center">
                    <h2>공지사항</h2>
                </div>



  <div class="notice-list">
    <!-- 검색필드추가 -->
<div>
  <div class="d-inline-flex align-items-center">
    <div class="form-group mr-2">
      <!--카테고리-->
      <select id="category" v-model="search_key" class="form-control">
        <option value="">- 선택 -</option>
        <option value="notice_title">제목</option>
        <option value="notice_author">작성자</option>
      </select>
    </div>
    <div class="form-group mr-2">
      <input type="text" id="category" v-model="search_value" class="form-control" @keyup.enter="fnPage()" placeholder="입력란">
    </div>
    <div class="form-group mr-1">
    <button class="form-control" type="button"  @click="fnPage()">조회</button>
    </div>

  </div>
</div>
    <br>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
        </tr>
      </thead>
    <tbody>
  <tr v-for="(row, notice_no) in list" :key="notice_no">
    <td>{{ row.notice_no }}</td>
    <td><router-link to="/notice/detail">{{ row.notice_title }}</router-link></td>
    <td>{{ row.notice_author }}</td>
    <td>{{ row.created_at }}</td>
  </tr>
</tbody>
    </table>


<div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">글 등록</button>
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
  notice_no: 1,
  notice_title: '부서 변경사항 안내(B부서)',
  notice_author: '정준혁',
  created_at: '2022-04-25',
},
{
  notice_no: 2,
  notice_title: '연말 인사드립니다',
  notice_author: '정준혁',
  created_at: '2021-12-30',
},
{
  notice_no: 3,
  notice_title: '긴급 공지',
  notice_author: '정준혁',
  created_at: '2022-08-10',
},
{
  notice_no: 4,
  notice_title: '회사 이전 안내',
  notice_author: '정준혁',
  created_at: '2023-02-14',
},
{
  notice_no: 5,
  notice_title: '업무협조 요청',
  notice_author: '윤영광',
  created_at: '2022-09-05',
},
{
  notice_no: 6,
  notice_title: '공휴일 근무 안내',
  notice_author: '윤영광',
  created_at: '2022-10-02',
},
{
  notice_no: 7,
  notice_title: '휴가 신청 안내',
  notice_author: '이원준',
  created_at: '2023-01-15',
},
{
  notice_no: 8,
  notice_title: '업무 시스템 점검 안내',
  notice_author: '윤영광',
  created_at: '2022-11-12',
},
{
  notice_no: 9,
  notice_title: '사내 경조사 소식',
  notice_author: '이원준',
  created_at: '2022-05-20',
},
{
  notice_no: 10,
  notice_title: '재택 근무 안내',
  notice_author: '이원준',
  created_at: '2023-03-05',
}

       
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


  a {
    text-decoration: none;
  }



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