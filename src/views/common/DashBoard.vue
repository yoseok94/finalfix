<template>
    <div class="maindiv">
        <div>
        <div class="dashboard">
            <div class="dashboard-row">
                <div class="dashboard-column">
                    <div class="notice-column">
                        <table class="w3-table-all">
                            <thead>
                                <h2>공지사항</h2>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>등록일시</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, noticeno) in nlist" :key="noticeno">
                                    <td>{{ no-noticeno }}</td>
                                    <td><a v-on:click="fnNoticeView(`${row.noticeno}`)" :style="{ color: row.noticetitle ? 'blue' : ''}" class="hover-effect">{{ row.noticetitle }}</a></td>
                                    <td>관리자</td>
                                    <td>{{ row.noticedate }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="dashboard-column">
                <div class="calendardiv">
                <div class="calendar-container" style="width: 500px; height: 500px">
                <BusinessPlanCalendar :planList="planList" @dateClick="showPlanDetails"/>
                </div>
                </div>
                </div>
            </div>
        <div class="dashboard-row">
          <div class="dashboard-column">
    
      <div class="dashboard-column">     
        <div class="event-column">
            <table class="w3-table-all">
                <thead>
                    <h2>이벤트</h2>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일시</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, eventno) in elist" :key="eventno">
                        <td>{{ no-eventno }}</td>
                        <td><a v-on:click="fnEventView(`${row.eventno}`)" :style="{ color: row.eventtitle ? 'blue' : ''}" class="hover-effect">{{ row.eventtitle }}</a></td>
                        <td>관리자</td>
                        <td>{{ row.eventdate }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
          </div>
          <div class="dashboard-column">
            <div>
              <div id="chart">
                <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
                </div>
            </div>
        </div>
      </div>
      </div>
      </div>
    </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';
import BusinessPlanCalendar from "@/views/business/BusinessPlanCalendar.vue";

export default {
    name: 'DashBoard',
    data() {
        return {
                requestBody : this.$route.query,
                nlist: [],
                elist: [],
                planList: [],
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
                size: this.$route.query.size ? this.$route.query.size :5,
                paginavigation: function () { //페이징 처리 for문 커스텀
                    let pageNumber = [] //;
                    let startPage = this.paging.startPage;
                    let endPage = this.paging.endPage;
                    for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
                    return pageNumber;
                }
            };
        },
       
        async mounted() {
            this.fnNoticeGetList();
        this.fnEventGetList();

            try {
      const response = this.$axios.get('/accounting/monthlysales');
      this.monthlySales = response.data;
    } catch (error) {
      console.error(error);
    }
            console.log("localStorage: " + localStorage);
            this.getPlanList();
        },
        methods: {
            fnNoticeGetList() {
            this.requestBody = { // 데이터 전송
                                  // keyword: this.keyword,
                                //   sk: this.search_key,
                                //   sv: this.search_value,
                                  page: this.page,
                                  size: this.size
                              }
                              this.$axios.get(this.$serverUrl + "/notice/list", {
                                  params: this.requestBody,
                                  headers: {}
                              }).then((res) => {        
                                  //this.list = res.data =  
                                  if (res.data.resultCode === "OK") {
                                    this.nlist = res.data.data
                                    this.paging = res.data.pagination
                                    this.no = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize)
                                  }
                              }).catch((err) => {
                                  if (err.message.indexOf('Network Error') > -1) {
                                      alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                                  }
                              })
        },
        fnEventGetList(){
            this.requestBody = { // 데이터 전송
                                  // keyword: this.keyword,
                                //   sk: this.search_key,
                                //   sv: this.search_value,
                                  page: this.page,
                                  size: this.size
                              }
                              this.$axios.get(this.$serverUrl + "/event/list", {
                                  params: this.requestBody,
                                  headers: {}
                              }).then((res) => {        
                                  //this.list = res.data =  
                                  if (res.data.resultCode === "OK") {
                                    this.elist = res.data.data
                                    this.paging = res.data.pagination
                                    this.no = this.paging.totalListCnt - ((this.paging.page - 1) * this.paging.pageSize)
                                  }
                              }).catch((err) => {
                                  if (err.message.indexOf('Network Error') > -1) {
                                      alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                                  }
                              })
        },
            fnPage() {
        },
         fnNoticeView(noticeno){
        this.requestBody.noticeno = noticeno
        this.$router.push({
            path: 'notice/detail',
            query: this.requestBody
        })
        },
         fnEventView(eventno){
        this.requestBody.eventno = eventno
        this.$router.push({
            path: 'event/detail',
            query: this.requestBody
        })
        },
        fnWrite() {
            this.$router.push({
                path: './write'
            })
        },
        fnUpdate() {
            this.$router.push({
                path: './update'
            })
        },
        async getPlanList() {
      try {
        const response = await axios.get("/business/planlist");
        this.planList = response.data;
        } catch (error) {
        console.error(error);
         }
        },
        },
        components: {
        apexchart: VueApexCharts,
        BusinessPlanCalendar,
    },
        setup() {
            const monthlySales = ref([]);
        const series = ref([{ name: '단위 100만원 ', data: [] }]);
        const chartOptions = ref({
            chart: {
                    type: 'bar',
                    height: 'auto',
                    width: 'auto',
                },
                title: {
                    text: '2023년 월 매출 그래프',
                    align: 'center',
                    offsetY: 10,
                    style: {
                        fontSize: '18px',
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                },
                yaxis: {
                    min: 0, // Set the minimum value here
                    max: 300,
                    forceNiceScale: true,
                    tickAmount: 10,
                },
                annotations: {
                    position: "front",
                    yaxis: [
                        {
                            y: 1000,
                            borderColor: "transparent",
                            label: {
                                text: "(단위: 백만원)",
                                style: {
                                    color: "#333",
                                    background: "transparent",
                                    fontSize: "12px",
                                },
                            },
                        },
                    ],
                },
            });

            const getMonthlySales = async () => {
            try {
                const response = await axios.get('/accounting/monthlysales');
                monthlySales.value = response.data.map(sale => {
    return { x: sale.month, y: sale.totalSales / 1000000 };
});
series.value[0].data = monthlySales.value;
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(getMonthlySales);    
    return {
        series,
        chartOptions,
    };
}
}
    </script>
    
    <style>
    .maindiv{
        overflow: auto;
    }
    .calendardiv{
        margin-top: 150px;
    }
    
    .dashboard {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 60px);
    }
    
    .dashboard-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50%;
    }
    
    .dashboard-column {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    /* 매출 그래프 용 CSS */
    #chart {
        width: calc(100% - 700px);
        width: calc(100% + 200px);
        box-sizing: border-box;
    }
.notice-column {
    border: 2px solid #e7e8fa;
         margin: 10px;
         padding: 8px;
         width: 700px;
            height: 300px;
         overflow: hidden;
}

.event-column {
    border: 2px solid #e7e8fa;
         margin: 10px;
         padding: 8px;
         width: 700px;
            height: 300px;
         overflow: hidden;
}




    </style>