<template>
  <div>
    <div class="calendar-box" @click="calendarFlag=true">{{weekRange}}</div>
    <div
      class="calendar-mask"
      v-show="calendarFlag"
      @touchmove.prevent
      @click.self="calendarFlag=false"
    >
      <div>
        <calendar-week @chooseWeek="chooseWeek" :incomingDate="new Date(1562947200000)"></calendar-week>
      </div>
    </div>
  </div>
</template>

<script>
import calendarWeek from '@/components/calendar/calendarWeek'
export default {
  name: 'My',

  components: {
    calendarWeek
  },

  data() {
    return {
      weekRange: '2019/07/08 2019/07/14',
      calendarFlag: false
    }
  },

  methods: {
    chooseWeek(date) {
      this.weekRange = date.join(' ')
      this.calendarFlag = false
    }
  }
}
</script>

<style scoped lang='scss'>
.calendar-box {
  width: 5rem;
  height: 0.56rem;
  font-size: 0.28rem;
  border-radius: 0.28rem;
  border: 0.01rem solid green;
}
//日期选择
.calendar-mask {
  position: fixed;
  top: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
