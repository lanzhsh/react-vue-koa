<template>
  <div class="multiple-sel">
    <div :class="['two-title',{'text-req':val.required}]">{{val.tip}}</div>
    <nut-checkboxgroup
    :checkBoxData="data"
    v-model="group"
    >
</nut-checkboxgroup>
  <p v-if="check&&valT.required&&group&&!group.length" class="required-field">{{valT.tip}}必填</p>
  </div>
</template>

<script>
export default{
  name: 'MultipleSel',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valT: this.val,
      group: [],
      data: this.val.radio,
      check: false
    }
  },
  watch: {
    group: {
      handler(oldVal, newVal) {
        this.valT.value = newVal.join(';')
      },
      deep: true
    }
  },
  mounted() {
    this.data.forEach((item, index) => {
      item.value = item.name
    })
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
</style>
