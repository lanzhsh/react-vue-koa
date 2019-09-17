<template>
  <div class="time-point">
    <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}</div>
    <div class="sel-inp" @click="open">
      <input class="text-inp inp" type="text" v-model="valT.value" disabled/>
      <img class="text-img" src="@/assets/activityDetail/more-sel.png" alt="">
    </div>
    <p v-if="check&&!valT.value&&valT.required" class="required-field">{{valT.tip}}必填</p>
    <nut-datepicker
    :is-visible="isVisible3"
    type="time"
    title="请选择时间"
    @close="switchPicker('isVisible3')"
    @choose="setChooseValue"
    :is-use12-hours="false"
    defaultValue="01:07"
    :is-am="false"
    >
    </nut-datepicker>
  </div>
</template>

<script>
export default{
  name: 'TimePoint',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valT: this.val,
      isVisible3: false,
      time1: '',
      check: false
    }
  },
  methods: {
    switchPicker(param) {
      this[param] = !this[param]
    },
    setChooseValue(param) {
      this.valT.value = param[2]
    },
    open() {
      this.isVisible3 = true
    }
  }
}
</script>

<style lang='scss' scoped>
.text-inp {
    width: 100%;
    height: 0.76rem;
    margin-bottom: 0.16rem;
  }
</style>
