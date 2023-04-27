<template>

                <div class="bradcumb-title text-center">
                    <h2>이벤트</h2>
                </div>




  <div class="event-list">
    <!-- 검색필드추가 -->
<div>
  <div class="d-inline-flex align-items-center">
    <div class="form-group mr-2">
      <!--카테고리-->
      <select id="category" v-model="search_key" class="form-control">
        <option value="">- 선택 -</option>
        <option value="event_title">제목</option>
        <option value="event_author">작성자</option>
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
        <tr v-for="(row, event_no) in list" :key="event_no">          
          <td>{{ row.event_no }}</td>
          <td><router-link to="/event/detail">{{ row.event_title }}</router-link></td>
          <td>{{ row.event_author }}</td>
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
  event_no: 1,
  event_title: '2023년 workshop 일정 안내',
  event_author: '정준혁',
  created_at: '2023-12-20',
},
{
  event_no: 2,
  event_title: '2023년 체육대회 일정 안내',
  event_author: '정준혁',
  created_at: '2023-9-10',
},
{
  event_no: 3,
  event_title: '2023 회사 후퇴: 더 강한 팀 만들기',
  event_author: '정준혁',
  created_at: '2023-08-30',
},
{
  event_no: 4,
  event_title: '2022 제품 출시 행사: 최신 혁신 소개',
  event_author: '정준혁',
  created_at: '2023-08-13',
},
{
  event_no: 5,
  event_title: '2023년 주주총회: 회사 실적 검토',
  event_author: '정준혁',
  created_at: '2023-07-29',
},
{
  event_no: 6,
  event_title: '2022년 직원 시상식: 우수 직원 축하',
  event_author: '정준혁',
  created_at: '2023-06-22',
},
{
  event_no: 7,
  event_title: '2023년 영업 컨퍼런스: 수익의 새로운 고지 달성',
  event_author: '정준혁',
  created_at: '2023-04-30',
},
{
  event_no: 8,
  event_title: '2022 지역 사회 봉사 활동 프로그램: 우리 이웃에 돌려주기',
  event_author: '정준혁',
  created_at: '2023-4-15',
},
{
  event_no: 9,
  event_title: '2023년 기업의 사회적 책임 서밋: 긍정적인 영향 만들기',
  event_author: '정준혁',
  created_at: '2023-3-10',
},
{
  event_no: 10,
  event_title: '2023년 파트너 감사의 밤: 주요 협력사 인정',
  event_author: '정준혁',
  created_at: '2023-02-30',
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