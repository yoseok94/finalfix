<template>
<div class="maindiv">
<div class="hrmcheck-mainbox">
  <div class="hrmlist">
    <h2 align="center">근태 현황 조회</h2>
      <div class="table-responsive">
        <div class="head-btn"> 
          <button @click="fnexceldown()">Excel</button>
        </div>

      <hr class="my-4">
        <table id="table" class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">근무일자</th>
              <th scope="col">출근시간</th>
              <th scope="col">퇴근시간</th>
              <th scope="col">구분</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, attendenceno) in list" :key="attendenceno">
              <td>{{row.requestdate}}</td>
              <td>{{row.intime}}</td>
              <td>{{row.outtime}}</td>
              <td>{{row.divide}}</td>
            </tr>
          </tbody> 
        </table>
    </div>
  </div>
  <div>
  <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
    <div class="col-auto d-none d-lg-block">
          <img class="bd-placeholder-img" width="200" height="250" src="@/assets/images/noneprofile.jpg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
        </div>
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-success"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">My Profile</font></font></strong>
          <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ID : {{employee.empId}}</font></font></h4><br>
          <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Name : {{employee.empname}}</font></font></h4><br>
          <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">담당부서 : {{employee.deptname}}</font></font></h4><br>
        </div>
      </div>
        <div>
          <div id="chart">
            <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  import { ref } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    setup(){
        const series = ref([]);
  
        const chartOptions = ref({
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['정상근무', '비정상근무', '조퇴/연차/기타'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        });
    
        return {
          series,
          chartOptions,
        };
      },
    data(){ //변수생성
      return {
        empId: sessionStorage.getItem("empId"),
        requestBody: {},
        list:{},
        employee: {},
        startdate: "",
        enddate: "",
      }
    },
    mounted(){
      this.setNowTimes();
    },
    methods:{
      fncalculator(){
        let a = 0;
        let b = 0;
        let c = 0;
        let a2 = 0;
        let b2 = 0;
        let c2 = 0;
        for(var i = 0; i < this.list.length; i++){
          console.log(this.list[i].divide)
          console.log(this.list[i].reason)
          if(this.list[i].divide == "정상"){
            a++;
          }else if(this.list[i].reason == "조퇴" || this.list[i].reason == "기타" || this.list[i].reason == "연차"){
            c++;
          }else if(this.list[i].divide == "비정상"){
            b++;
          }
        }

        console.log(a + "===" + b + "===" + c + "===" )

        if(a !== undefined){
          a2 = (a/this.list.length) * 100;
        }
        if(b !== undefined){
          b2 = (b/this.list.length) * 100;
        }
        if(c !== undefined){
          c2 = (c/this.list.length) * 100;
        }

        console.log(a2 + "===" + b2 + "===" + c2 + "===" )

        this.series = ref([a2, b2, c2]);

      },
      setNowTimes(){        
        let myDate = new Date()
        let yy = String(myDate.getFullYear())
        let mm = String(myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1))
        let dd = String(new Date(yy,mm,0).getDate())
        this.startdate = yy + '-' + mm + '-01'
        this.enddate = yy + '-' + mm + '-' + dd
        console.log(this.startdate + "=====" + this.enddate);
        this.fnmyinfo();
      },
      fnmyattendence(){
        this.$axios.get(this.$serverUrl + "/hrm/myadlist/" + this.empId
          ).then((res) => {
            this.list = res.data
            this.fncalculator();
          }).catch((err) => {
            console.log(err)
        });
      },
      fnmyinfo(){
      if (this.empId !== undefined) {
        this.$axios.get(this.$serverUrl + "/hrm/employeeinfo/" + this.empId
          ).then((res) => {
            this.employee = res.data
            this.fnmyattendence();
          }).catch((err) => {
            console.log(err)
          });
        }
      },
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
    },
  };
  </script>
  
<style scoped>
.head-btn{
  text-align: right;
  margin-top: 15px;
  margin-right: 30px;
}
.seldiv{
  margin-top: 15px;
  margin-left: 30px;
}
.maindiv{
    display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
}
.hrmcheck-mainbox {
 display: flex;
}

#chart {
  padding: 0;
  max-width: 380px;
  margin: 35px auto;
}
  .hrmlist{
  margin: 0 auto;
  width: 50%!important;
}
.head-btn{
  text-align: right;
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
.row{
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
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-left: calc(-.5 * var(--bs-gutter-x));
    margin-right: calc(-.5 * var(--bs-gutter-x));
    --bs-gutter-x: 0;
    --bs-gutter-y: 0;
    overflow: hidden!important;
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    position: relative!important;
    border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important;
    margin-bottom: 1.5rem!important;
    border-radius: var(--bs-border-radius)!important;
    flex-direction: row!important;
    height: 250px;
}
</style>
  