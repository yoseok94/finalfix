<template>
  <div class="bradcumb-title text-center">
    <h2>부서 관리</h2>
  </div>
  <div class="common-buttons">
    <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">부서등록</button>
  </div>
  <div class="dept-list">
    <table class="w3-table-all">
      <thead>
        <tr>
          <th></th>
          <th>번호</th>
          <th>부서명</th>
          <th>부서 코드</th>
          <th>상품코드</th>
          <th>등록일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, deptno) in list" :key="deptno">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address">
            <label></label>
          </div>    
          <td>{{ row.deptno }}</td>
          <td>{{ row.deptname }}</td>
          <td>{{ row.deptid }}</td>
          <td>{{ row.productid }}</td>
          <td>{{ row.deptdate }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 검색필드추가 -->
    <div class="center">
      <div class="d-inline-flex align-items-center">
        <div class="form-group mr-2">
          <!--카테고리-->
          <select id="category" v-model="search_key" class="form-control">
            <option value="">- 카테고리 -</option>
            <option value="deptid">부서코드</option>
            <option value="deptname">부서명</option>
          </select>
        </div>
        <div class="form-group mr-2">
          <input type="text" v-model="search_value" class="form-control" @keyup.enter="fnPage()" placeholder="입력란">
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
    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
        <span class="pg">
        <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-border">&lt;&lt;</a>
        <a href="javascript:;" v-if="paging.startPage > 10" @click="fnPage(`${paging.startPage-1}`)"
          class="prev w3-button w3-border">&lt;</a>
        <template v-for=" (n,index) in paginavigation()">
            <template v-if="paging.page==n">
                <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
            </template>
            <template v-else>
                <a class="w3-button w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
            </template>
        </template>
        <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage"
          @click="fnPage(`${paging.endPage+1}`)" class="next w3-button w3-border">&gt;</a>
        <a href="javascript:;" @click="fnPage(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
        </span>
      </div>
  </div>
</template>
<script>
export default {
  data() {
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
                size: this.$route.query.size ? this.$route.query.size :8,
                //keyword: this.$route.query.keyword,
                search_key: this.$route.query.sk ? this.$route.query.sk : '',
                search_value: this.$route.query.sv ? this.$route.query.sv : '',
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
              this.fnGetList();
            },
            methods: {
              fnGetList() {
                //스프링부트에서 전송받은 데이터 출력처리
                                  this.requestBody = { // 데이터 전송
                                  // keyword: this.keyword,
                                  sk: this.search_key,
                                  sv: this.search_value,
                                  page: this.page,
                                  size: this.size
                              }
                              this.$axios.get(this.$serverUrl + "/dept/list", {
                                  params: this.requestBody,
                                  headers: {}
                              }).then((res) => {        
                                  //this.list = res.data  //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.  
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
    fnPage(n) {
      if (this.page !== n) {
                  this.page = n
                  
                }
                this.fnGetList()
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
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

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