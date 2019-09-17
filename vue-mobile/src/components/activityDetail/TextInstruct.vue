<template>
  <div>
    <div :class="['two-title',{'text-req':val.required}]">{{val.tip}}</div>
  </div>
</template>

<script>
export default{
  name: 'TextInstruct',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
</style>
