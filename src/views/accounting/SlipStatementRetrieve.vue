<template>
    <div>
    <h1 style="text-align: center;">회계 전표 조회 페이지</h1>
    <br>
    <div class="search_container">
    <select v-model="search_key">
      <option value="slipstatementno">전표번호</option>
      <option value="tradetype">거래유형</option>
    </select>
    <input class="search_container-input" type="text" placeholder="검색어를 입력해주세요" v-model="search_value"
      @keyup.enter="fnsalarysearch()" size="50" />
    <button class="search_container-btn w3-button w3-round w3-blue-gray" @click="fnsalarysearch()">검색</button>
  </div>

    <!-- 테이블 구역 -->
    <table class="salary-table">
      <thead>
        <tr>
          <th></th>
          <th style="text-align: center;">전표번호</th>
          <th style="text-align: center;">거래유형</th>
          <th style="text-align: center;">거래금액</th>
          <th style="text-align: center;">적요</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, slipstatementno) in list" :key="slipstatementno">
          <td><input type="checkbox" /></td>
          <td>{{ row.slipstatementdate }}</td>
          <td>{{ tradeTypeName(row.tradetype) }}</td>
          <td>{{ row.slipstatementamount }}</td>
          <td>{{ row.slipstatementbrief }}</td>
        </tr>
      </tbody>
    </table>

    <div class="actions">
      <router-link to="/accounting/slipwrite"><button class="w3-button w3-round w3-blue-gray">등록하기</button></router-link>

    </div>
    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
            <span>
              <a href="javascript:;" @click="fnslipsearch(1)" class="first w3-button w3-border">&lt;&lt;</a>
              <a href="javascript:;" v-if="paging.startPage > 10" @click="fnslipsearch(`${paging.startPage - 1}`)" class="prev w3-button w3-border">
              &lt;</a>
              <template v-for="(n, index) in paginavigation()">
              <template v-if="paging.page == n">
              <strong class="w3-button w3-border w3-green" :key="index">{{n}}</strong>
              </template>
              <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnslipsearch(`${n}`)" :key="index">{{ n }}</a>
              </template>
              </template>
              <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage" @click="fnslipsearch(`${paging.endPage + 1}`)" class="next w3-button w3-border">
              &gt;</a>
              <a href="javascript:;" @click="fnslipsearch(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
            </span>
        </div>



  </div>
</template>

    
<script>
export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      no: '', //게시판 숫자처리
      paging: {
        block: 0,
        endPage: 0,
        nextBlock: 0,
        page: 0,
        pageSize: 0,
        prevBlock: 0,
        startIndex: 0,
        startPage: 0,
        totalBlockCnt: 0,
        totalListCnt: 0,
        totalPageCnt: 0,
      }, //페이징 데이터
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size : 10,
      search_key: this.$route.query.sk ? this.$route.query.sk : "",
      search_value: this.$route.query.sv ? this.$route.query.sv : null,
      paginavigation: function () { //페이징 처리 for문 커스텀
        let pageNumber = [] //;
        let startPage = this.paging.startPage;
        let endPage = this.paging.endPage;
        for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      }
    }
  },
  mounted() {
    this.fnsliplist()
  },
  computed: {
    listWithTradeTypeNames() {
      return this.list.map(row => ({
        ...row,
        tradetype: this.tradeTypeName(row.tradetype)
      }));
    }
  },
  methods: {
    fnslipsearch(n) {
      if (this.page !== n) {
        this.page = n       
      }

      this.fnsliplist()      
    },
    fnsliplist(){
      this.requestBody = { // 데이터 전송        
        sk: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/accounting/sliplist", {
        
        params: this.requestBody,
        headers: {}
      }).then((res) => {      

        if (res.data.resultCode === "OK") {
          this.list = res.data.data
          this.paging = res.data.pagination
          this.no = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize)
        }
        
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },

    tradeTypeName(tradeType) {
  switch(tradeType) {
    case '1': return '카드 결제';
    case '2': return '현금 결제';
    case '3': return '기타';
    default: return '기타';
  }
}
  }
}
</script>

<style scoped>
   .salary_menu-bar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
      margin-top: 5px;
    }
    .search_container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }
    .search_container-input,
    .search_container-btn {
      margin-left: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.5rem;
      text-align: left;
      border: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }

    .actions button {
      margin-right: 1rem;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
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
td input[type="checkbox"] {
  display: block;
  margin: 0 auto;
}
  </style>