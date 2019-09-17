<template>
  <div>
    <img class="img" :src="val.url" alt="">
  </div>
</template>

<script>
export default{
  name: 'PreviewImg',
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
.img{
  width:100%;
  height:auto;
}
</style>
