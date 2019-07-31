
<template>
  <div class="calendar-week">
    <ul class="week-top">
      <li v-for="(itemWeek,indexWeek) in week" :key="indexWeek">{{itemWeek}}</li>
    </ul>
    <ul class="week-middle">
      <li
        v-for="(item,index) in weekDate[weekIndex].week"
        :key="index"
        :class="{'week-sel':item.day[0]===initDate}"
        @click="selWeek(item)">
        <span
          v-for="(itemDay,indexDay) in item.day"
          :key="indexDay"
          :class="{'is-today':judgeDay(itemDay,indexDay,item.day)}">{{dealDay(itemDay,indexDay)}}</span>
      </li>
    </ul>
    <div class="week-bottom">
      <div class="bottom-left" @click="preMonth">
        <img src="./images/calendar-left.png">
      </div>
      <div class="bottom-middle">{{weekDate[weekIndex].month}}</div>
      <div class="bottom-right" @click="nextMonth">
        <img src="./images/calendar-right.png">
      </div>
    </div>
  </div>
</template>

<script>
import { calendarArr } from './calendar.js'
export default{
  name: 'CalendarWeek',
  props: {
    incomingDate: {
      type: Date,
      value: '2019-07-08'
    }
  },
  data() {
    return {
      week: ['一', '二', '三', '四', '五', '六', '日'],
      initDate: '2019-07-08',
      weekDate: calendarArr,
      weekIndex: 0,
      monYearMonthDay: ''// 当前所在周星期一的年月日
    }
  },
  mounted() {
    // 处理传入日期为周一日期
    const inViceDate = this.incomingDate
    const whatDay = inViceDate.getDay()
    const day = inViceDate.getDate()
    const month = (inViceDate.getMonth() + 1)
    // 获取年月
    const yMonth = `${inViceDate.getFullYear()}-${this.fillZero(month)}`
    this.initDate = `${yMonth}-${this.fillZero(day + 1 - whatDay)}`
    // console.log('处理的this.initDate',this.initDate)

    // 处理 initDate得到日历初始展示日期
    const initDateArr = this.initDate.split('-')
    const initMonth = `${initDateArr[0]}年${Number(initDateArr[1])}月`
    // 找出初始月份索引
    this.weekDate.forEach((item, index) => {
      if (item.month === initMonth) this.weekIndex = index
    })
  },
  methods: {
    selWeek(item) {
      // 判断每周一的年月是否小于当前周的年月
      if (Number(item.day[0].replace(/\-/g, '')) < Number(this.monYearMonthDay.replace(/\-/g, ''))) {
        this.initDate = item.day[0]
        // 处理传出值为月日
        const outYear = item.day[0].split('-')[0]
        const outMonth = item.day[0].split('-')[1]
        const outDayOne = item.day[0].split('-')[2]
        const outDayTwo = item.day[6]
        let chooseTwo
        // 判断第二个值
        if (outDayTwo < outDayOne) {
          if (outMonth === 12) {
            chooseTwo = `${Number(outYear) + 1}/${Number(outMonth) + 1}/${this.fillZero(outDayTwo)}`
          } else {
            chooseTwo = `${outYear}/${Number(outMonth) + 1}/${this.fillZero(outDayTwo)}`
          }
        } else {
          chooseTwo = `${outYear}/${Number(outMonth)}/${this.fillZero(outDayTwo)}`
        }
        this.$emit('chooseWeek', [`${outYear}/${Number(outMonth)}/${outDayOne}`, chooseTwo])
      }
    },
    dealDay(itemDay, indexDay) {
      if (!indexDay) {
        return Number(itemDay.slice(-2))
      } else {
        return itemDay
      }
    },
    fillZero(num) {
      return num < 10 ? `0${num}` : num
    },
    judgeDay(itemDay, indexDay, itemDayArr) {
      // //获取今天的年月日
      const day = new Date().getDate()
      const whatDay = new Date().getDay()
      const month = (new Date().getMonth() + 1)
      // 获取年月
      const yMonth = `${new Date().getFullYear()}-${this.fillZero(month)}`
      this.monYearMonthDay = `${yMonth}-${this.fillZero(day + 1 - whatDay)}`
      // 得到日历中每周周一的年月
      const calMonday = itemDayArr[0].slice(0, 7)
      // 得到日历中每日
      let calDay
      itemDay.length > 2 ? calDay = itemDay.slice(-2) : calDay = itemDay
      // 判断是本月大于今天,或者是下个月
      if (calMonday === yMonth && (calDay >= day ||
        itemDayArr[indexDay - 1] > 28 ||
        itemDayArr[indexDay - 2] > 28 ||
        itemDayArr[indexDay - 3] > 28 ||
        itemDayArr[indexDay - 4] > 28 ||
        itemDayArr[indexDay - 5] > 28 ||
        itemDayArr[indexDay - 6] > 28)) {
        return true
      }
      // 判断月份是否大于本月
      // const monthCom=new Date(`${calMonday}`)
      if (Number(calMonday.replace(/\-/g, '')) > Number(yMonth.replace(/\-/g, ''))) return true
    },

    preMonth() {
      if (this.weekIndex) --this.weekIndex
    },
    nextMonth() {
      if (this.weekIndex < 48) ++this.weekIndex
    }
  }
}
</script>

<style lang='scss' scoped>
.calendar-week{
  width:7.28rem;
  padding:.12rem .14rem 0;
  background: #FFFFFF;
}
.week-top{
  display:flex;
  flex-direction:row;
  justify-content: space-around;
  li{
    font-size: .24rem;
    line-height: .68rem;
    color: #999999;
  }
}
.week-middle{
  li{
    display:flex;
    flex-direction:row;
    justify-content: space-around;
    margin-bottom:.16rem;
  }
  span{
    width:1.03rem;
    line-height: .68rem;
    font-size: .32rem;
    text-align:center;
    color: #000000;
  }
  .is-today{
    // background:red;
    color: #CCCCCC;
  }

}
.week-sel{
  background:#0084BF;
  border-radius:.34rem;
  span{
    color:#fff;
  }
}

.week-bottom{
  display:flex;
  flex-direction: row;
  align-items:center;
  padding:.24rem 0 .4rem;
}
.bottom-left,.bottom-right{
  display:flex;
  align-items: center;
  width:2.4rem;
  height:.36rem;
  img{
    width:.24rem;
    height:.24rem;
  }
}
.bottom-left{
  display:flex;
  justify-content:flex-end;
}
.bottom-middle{
  width:2.2rem;
  font-size: .32rem;
  color: #0084BF;
  line-height: .36rem;
  text-align:center;
}
</style>
