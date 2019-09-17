<template>
  <div class="title">
    {{val.tip}}
  </div>
</template>

<script>
export default{
  name: 'TitleText',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.title{
  box-sizing: border-box;
  height:.54rem;
  padding:.24rem 0 .08rem 0;
  font-size: .18rem;
  font-weight: 700;
  color: #333333;
  line-height: 22px;
}
</style>
