<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import koLocale from '@fullcalendar/core/locales/ko' // 한글 로케일을 가져옵니다.

export default {
  components: {
    FullCalendar 
  },
  props: {
    planList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [], 
        locale: koLocale 
      }
    }
  },
  methods: {
    handleDateClick: function (arg) {
      const date = arg.dateStr;
      const plans = this.planList.filter((plan) => plan.plandate === date);
      this.showPlanDetails(date, plans);
    },
    showPlanDetails(date, plans) {
      let message = "";
      if (plans.length > 0) {
        message = `날짜: ${date}\n등록된 영업 계획 개수: ${plans.length}\n\n`;
        message += plans.map((plan) => `계획 번호: ${plan.planno}, 계획 제목: ${plan.plantitle}`).join("\n");
      } else {
        message = "해당 날짜에 등록된 영업 계획이 없습니다.";
      }
      alert(message);
    },
    updateCalendarEvents() {
      const events = this.planList.reduce((acc, plan) => {
        const existingEvent = acc.find(event => event.date === plan.plandate);
        if (existingEvent) {
          existingEvent.title = `영업 계획 (${existingEvent.count + 1})`;
          existingEvent.count += 1;
        } else {
          acc.push({
            title: `영업 계획 (1)`,
            date: plan.plandate,
            count: 1
          });
        }
        return acc;
      }, []);
      this.calendarOptions.events = events;
    }
  },
  watch: {
    planList: {
      immediate: true,
      handler() {
        this.updateCalendarEvents();
      }
    }
  }
}
</script>
