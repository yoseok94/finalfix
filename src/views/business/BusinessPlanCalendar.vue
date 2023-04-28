<template>
    <div class="calendar">
      <h2>
        <a href="#" @click="onClickPrev(currentMonth)">◀</a>
        {{ currentYear }}년 {{ currentMonth }}월
        <a href="#" @click="onClickNext(currentMonth)">▶</a>
      </h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <td v-for="(weekName, index) in weekNames" :key="index">
              {{ weekName }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
            <td
              v-for="(day, index2) in row"
              :key="index2"
              style="padding: 20px;"
            >
              <span v-if="isToday(currentYear, currentMonth, day)" class="rounded">
                {{ day }}
              </span>
              <span v-else>
                {{ day }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Calendar",
    data() {
      return {
        weekNames: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
        rootYear: 1904,
        rootDayOfWeekIndex: 6, // 1904년 1월 1일은 토요일
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth() + 1,
        currentDay: new Date().getDate(),
        currentMonthStartWeekIndex: null,
        currentCalendarMatrix: [],
        endOfDay: null,
        memoDatas: [],
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.currentMonthStartWeekIndex = this.getStartWeek(
          this.currentYear,
          this.currentMonth
        );
        this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
        this.initCalendar();
      },
      initCalendar() {
        this.currentCalendarMatrix = [];
        let day = 1;
        for (let i = 0; i < 6; i++) {
          let calendarRow = [];
          for (let j = 0; j < 7; j++) {
            if (i === 0 && j < this.currentMonthStartWeekIndex) {
              calendarRow.push("");
            } else if (day <= this.endOfDay) {
              calendarRow.push(day);
              day++;
            } else {
              calendarRow.push("");
            }
          }
          this.currentCalendarMatrix.push(calendarRow);
        }
      },
      getEndOfDay(year, month) {
        switch (month) {
          case 2:
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
              ? 29
              : 28;
          case 4:
          case 6:
          case 9:
          case 11:
            return 30;
          default:
            return 31;
        }
      },
        getStartWeek: function(targetYear, targetMonth){
          let year = this.rootYear;
          let month = 1;
          let sumOfDay = this.rootDayOfWeekIndex;
          // eslint-disable-next-line no-constant-condition
          while(true){
            if(targetYear > year){
              for(let i=0; i<12; i++){
                sumOfDay += this.getEndOfDay(year, month+i);
              }
              year++;
            }
            else if(targetYear == year){
              if(targetMonth > month){
                sumOfDay += this.getEndOfDay(year, month);
                month++;
              }
              else if(targetMonth == month){
                return (sumOfDay)%7;
              }
            }
          }
        },
        onClickPrev: function(month){
          month--;
          if(month<=0){
            this.currentMonth = 12;
            this.currentYear -= 1;
          }
          else{
            this.currentMonth -= 1;
          }
          this.init();
        },
        onClickNext: function(month){
          month++;
          if(month>12){
            this.currentMonth = 1;
            this.currentYear += 1;
          }
          else{
            this.currentMonth += 1;
          }
          this.init();
        },
        isToday: function(year, month, day){
          let date = new Date();
          return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
        }
    }
  }
  </script>