<template>
  <div>
    <br>
    <h1 style="text-align: center;">수당 및 공제 리스트 작성 페이지</h1>
    <br>
    </div>
    <div class="salary_menu-bar">
    <div class="searchdiv">
            <select v-model="search_key" >
              <option value="ID">ID</option>
              <option value="Name">Name</option>
            </select>
            <input type="text" v-model="search_value" @keyup.enter="fnhrmsearch()">
            <button @click="fnhrmsearch()">검색</button>
        </div> 
      </div> 

    <!-- 테이블 구역 -->
    <form @submit.prevent="saveData">
      <table class="salary-table">
        <thead>
          <tr>
            <th style="width: 50px;"></th>
            <th style="width: 200px;">항목코드</th>
            <th style="width: 400px;">항목이름</th>
            <th>계산식</th>
            <th>산출방법</th>
          </tr>
        </thead>
        <tbody>
         
          <tr v-for="(row, adno) in list" :key="adno">
            <td><input type="checkbox" style="align-items: center;"></td>
            <td>{{ row.adcode }}</td>
            <td>{{ row.adname }}</td>
            <td>{{ row.adcalculation }}</td>
            <td>{{ row.adcalculationmethod }}</td>
          </tr>
        </tbody>
      </table>
    </form>
    
            <!-- 액션 버튼 (이메일 및 인쇄) 구역 -->
            <div class="actions">
      <button @click="sendemail()">신규등록</button>
      <button @click="sendsms()">삭제</button>
      <button class="movelocation" @click="updatesalary()">수정</button>
    </div>


    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
            <span>
              <a href="javascript:;" @click="fnhrmsearch(1)" class="first w3-button w3-border">&lt;&lt;</a>
              <a href="javascript:;" v-if="paging.startPage > 10" @click="fnhrmsearch(`${paging.startPage - 1}`)" class="prev w3-button w3-border">
              &lt;</a>
              <template v-for="(n, index) in paginavigation()">
              <template v-if="paging.page == n">
              <strong class="w3-button w3-border w3-green" :key="index">{{n}}</strong>
              </template>
              <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnhrmsearch(`${n}`)" :key="index">{{ n }}</a>
              </template>
              </template>
              <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage" @click="fnhrmsearch(`${paging.endPage + 1}`)" class="next w3-button w3-border">
              &gt;</a>
              <a href="javascript:;" @click="fnhrmsearch(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
            </span>
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
    this.fnhrmlist()
  },
  methods: {
    fnhrmsearch(n) {
      if (this.page !== n) {
        this.page = n       
      }

      this.fnhrmlist()      
    },
    fnhrmlist(){
      this.requestBody = { // 데이터 전송        
        sk: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/accounting/adlist", {
        
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
  }
}
</script>
  
<style scoped>
input.table-input {
  border: none;
}

.salary_menu-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: 5px;
}

.search_container-bar {
  margin-right: 1rem;
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
  justify-content: flex-start;
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

.pagination button {
  margin: 0 0.5rem;
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


th {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
}</style>