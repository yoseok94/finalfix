<template>
<div class="hrmlist">
  <div>
    <h2 align="center">근태 현황 조회</h2>
    <div class="table-responsive">
      <div class="head-btn">
      <button @click="fnexceldown()">Excel</button>
      </div>
      <hr class="my-4">
        <table id="table" class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">직급</th>
              <th scope="col">출근시간</th>
              <th scope="col">퇴근시간</th>
              <th scope="col">구분</th>
              <th scope="col">근태신청일자</th>
              <th scope="col">사유</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, attendenceno) in list" :key="attendenceno">
                <td>{{ row.empId }}</td>
                <td>{{ row.empname }}</td>
                <td>{{ row.emplevel }}</td>
                <td v-if="row.outtime != null">{{ row.intime }}</td>
                <td v-else></td>
                <td v-if="row.outtime != null">{{ row.outtime }}</td>
                <td v-else></td>
                <td v-if="row.divide != null && row.reason == null">{{row.divide}}</td>
                <td v-else-if="row.divide != null && row.reason != null">{{row.divide}} {{row.reason}}</td>
                <td v-else-if="row.divide == null && row.reason != null">{{row.reason}}</td>
                <td v-if="row.reason != null">{{ row.requestdate }}</td>
                <td v-else>{{row.intime.substring(0,9)}}</td>
                <td v-if="row.reason != null && row.intime != null && row.outtime != null">{{ row.reason }}</td>
                <td v-else>근태신청없음</td>
            </tr>
          </tbody>
        </table>
        <div class="searchdiv">
            <select v-model="search_key" >
              <option value="">선택</option>
              <option value="ID">ID</option>
              <option value="Name">Name</option>
            </select>
            <input type="text" v-model="search_value" @keyup.enter="fnattendencesearch()">
            <button @click="fnattendencesearch()">검색</button>
        </div> 
        <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalListCnt > 0">
            <span>
              <a href="javascript:;" @click="fnattendencesearch(1)" class="first w3-button w3-border">&lt;&lt;</a>
              <a href="javascript:;" v-if="paging.startPage > 10" @click="fnattendencesearch(`${paging.startPage - 1}`)" class="prev w3-button w3-border">
              &lt;</a>
              <template v-for="(n, index) in paginavigation()">
              <template v-if="paging.page == n">
              <strong class="w3-button w3-border w3-green" :key="index">{{n}}</strong>
              </template>
              <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnattendencesearch(`${n}`)" :key="index">{{ n }}</a>
              </template>
              </template>
              <a href="javascript:;" v-if="paging.totalPageCnt > paging.endPage" @click="fnattendencesearch(`${paging.endPage + 1}`)" class="next w3-button w3-border">
              &gt;</a>
              <a href="javascript:;" @click="fnattendencesearch(`${paging.totalPageCnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
            </span>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      empId: sessionStorage.getItem("empId"),
      emplevel: sessionStorage.getItem("emplevel"),

      requestBody: {},

      list: {},
      no: '',
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
      },
    }
  },
  mounted() {
    this.fnattendencelist()
  },
  methods: {
    fnexceldown(){
      let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
      tab_text += '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      tab_text += '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
      tab_text += '<x:Name>Test Sheet</x:Name>'
      tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>'
      tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>'
      tab_text += "<table>"
      const temp = document.getElementById('table').innerHTML
      
      tab_text += temp
      tab_text += '</table></body></html>'
      
      const fileName = 'attendenceTable.xls'
      const a_tag = document.createElement('a')
      const blob = new Blob([tab_text], { type: 'application/vnd.ms-excel;charset=utf-8;' })
      a_tag.href = window.URL.createObjectURL(blob)
      a_tag.download = fileName
      a_tag.click()
    },
    fnattendencesearch(n) {
      if (this.page !== n) {
        this.page = n       
      }

      this.fnattendencelist()      
    },
    fnattendencelist(){
      this.requestBody = { // 데이터 전송        
        sk: this.search_key,
        sv: this.search_value,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/hrm/adlist", {
        
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
.head-btn{
  text-align: right;
  margin-top: 15px;
  margin-right: 30px;
}
.pagination{
  display: flex;
  align-items: center;
  justify-content: center;
}
.hrmlist{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
  margin: 0 auto;
}
.searchdiv{
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-responsive{
    border: #87888a80 1px solid;
    border-radius: 20px;
    --bs-blue: #0d6efd;
    --bs-indigo: #6610f2;
    --bs-purple: #6f42c1;
    --bs-pink: #d63384;
    --bs-red: #dc3545;
    --bs-orange: #fd7e14;
    --bs-yellow: #ffc107;
    --bs-green: #198754;
    --bs-teal: #20c997;
    --bs-cyan: #0dcaf0;
    --bs-black: #000;
    --bs-white: #fff;
    --bs-gray: #6c757d;
    --bs-gray-dark: #343a40;
    --bs-gray-100: #f8f9fa;
    --bs-gray-200: #e9ecef;
    --bs-gray-300: #dee2e6;
    --bs-gray-400: #ced4da;
    --bs-gray-500: #adb5bd;
    --bs-gray-600: #6c757d;
    --bs-gray-700: #495057;
    --bs-gray-800: #343a40;
    --bs-gray-900: #212529;
    --bs-primary: #0d6efd;
    --bs-secondary: #6c757d;
    --bs-success: #198754;
    --bs-info: #0dcaf0;
    --bs-warning: #ffc107;
    --bs-danger: #dc3545;
    --bs-light: #f8f9fa;
    --bs-dark: #212529;
    --bs-primary-rgb: 13,110,253;
    --bs-secondary-rgb: 108,117,125;
    --bs-success-rgb: 25,135,84;
    --bs-info-rgb: 13,202,240;
    --bs-warning-rgb: 255,193,7;
    --bs-danger-rgb: 220,53,69;
    --bs-light-rgb: 248,249,250;
    --bs-dark-rgb: 33,37,41;
    --bs-white-rgb: 255,255,255;
    --bs-black-rgb: 0,0,0;
    --bs-body-color-rgb: 33,37,41;
    --bs-body-bg-rgb: 255,255,255;
    --bs-font-sans-serif: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --bs-font-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
    --bs-body-font-family: var(--bs-font-sans-serif);
    --bs-body-font-size: 1rem;
    --bs-body-font-weight: 400;
    --bs-body-line-height: 1.5;
    --bs-body-color: #212529;
    --bs-body-bg: #fff;
    --bs-border-width: 1px;
    --bs-border-style: solid;
    --bs-border-color: #dee2e6;
    --bs-border-color-translucent: rgba(0, 0, 0, 0.175);
    --bs-border-radius: 0.375rem;
    --bs-border-radius-sm: 0.25rem;
    --bs-border-radius-lg: 0.5rem;
    --bs-border-radius-xl: 1rem;
    --bs-border-radius-2xl: 2rem;
    --bs-border-radius-pill: 50rem;
    --bs-link-color: #0d6efd;
    --bs-link-hover-color: #0a58ca;
    --bs-code-color: #d63384;
    --bs-highlight-bg: #fff3cd;
    font-family: var(--bs-body-font-family);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: .875rem;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    box-sizing: border-box;
    overflow-x: auto;
    margin: 0 auto;
}
</style>