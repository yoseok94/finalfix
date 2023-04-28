<template>
  <div class="dashboard">
    <div class="dashboard-row">
  <div class="dashboard-column">
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
  <tr v-for="(row, notice_no) in nlist" :key="notice_no">
    <td>{{ row.notice_no }}</td>
    <td><router-link to="/notice/detail">{{ row.notice_title }}</router-link></td>
    <td>{{ row.notice_author }}</td>
    <td>{{ row.created_at }}</td>
  </tr>
</tbody>
    </table>
        </div>
      <div class="dashboard-column">
        영업계획표(켈린더)
      </div>
    </div>
    <div class="dashboard-row">
  <div class="dashboard-column">     
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
        <tr v-for="(row, event_no) in elist" :key="event_no">          
          <td>{{ row.event_no }}</td>
          <td><router-link to="/event/detail">{{ row.event_title }}</router-link></td>
          <td>{{ row.event_author }}</td>
          <td>{{ row.created_at }}</td>
        </tr>
      </tbody>
    </table>
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
</template>
 <script>
 

//  매출 그래프 용 Script
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  data() {
    return {
      nlist: [],
      elist: [],

      search_key: '',
      search_value: '',
    };
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    fnGetList() {
      this.nlist = [
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
      ];
       this.elist = [
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
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const series = ref([
      {
        name: '단위 100만원 ',
        data: [20, 40, 100, 50, 220, 100, 175, 223, 115, 272, 5, 42 ],
      },
    ]);

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
        categories: ['1월', '2월', '3월', '4월', '5월' , '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
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
        y: 300,
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
    return {
      series,
      chartOptions,
    };
  },
};
 </script>

 <style>

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
</style>