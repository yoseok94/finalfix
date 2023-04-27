<template>
  <div class="dashboard">
    <div class="dashboard-row">
      <div class="dashboard-column">
         공지사항
        </div>
      <div class="dashboard-column">
        이벤트페이지
      </div>
    </div>
    <div class="dashboard-row">
      <div class="dashboard-column">
        영업계획표(켈린더)
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