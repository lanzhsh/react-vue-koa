<template>
  <div class="date-range">
    <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}</div>
    <div class="sel-inp" @click="open">
      <input class="text-inp inp" type="text" disabled v-model="valT.value"/>
      <img class="text-img" src="@/assets/activityDetail/more-sel.png" alt="">
    </div>
    <p v-if="check&&!date&&valT.required" class="required-field">{{valT.tip}}必填</p>
    <nut-datepicker
    :is-visible="isVisible"
    type="date"
    title="请选择日期"
    :is-show-chinese="false"
    @close="switchPicker('isVisible')"
    @choose="setChooseValue"
>
</nut-datepicker>
</div>
</template>

<script>
export default{
  name: 'DateRanage',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valT: this.val,
      isVisible: false,
      date: '',
      dateWeek: '',
      check: false

    }
  },
  methods: {
    switchPicker(param) {
      this[param] = !this[param]
    },
    setChooseValue(param) {
      this.date = param[3]
      this.valT.value = this.date.replace(/-/g, '/')
      console.log(`this.date值为${this.date}`)
    },
    open() {
      this.isVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
