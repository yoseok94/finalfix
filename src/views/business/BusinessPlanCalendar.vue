<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import koLocale from '@fullcalendar/core/locales/ko' // 한글 로케일을 가져옵니다.

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [
          { title: '이벤트 1', date: '2019-04-01' }, // 이벤트 제목을 한글로 변경
          { title: '이벤트 2', date: '2019-04-02' }  // 이벤트 제목을 한글로 변경
        ],
        locale: koLocale // 로케일을 한글로 설정합니다.
      }
    }
  },
  methods: {
    handleDateClick: function(arg) {
      alert('날짜 클릭! ' + arg.dateStr) // 경고 메시지를 한글로 변경합니다.
    }
  }
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
