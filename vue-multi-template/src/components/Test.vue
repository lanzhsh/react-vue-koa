<template>
  <div class="test">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
export default{
  name:'Test',
  props: {
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data(){
    return{}
  },
  methods:{
  }
}
</script>

<style lang='scss' scoped>
</style>