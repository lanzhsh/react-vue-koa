<template>
  <div class="place-box" :style="`height:${val.height}px`">
    <div v-show="val.display==='show'&&val.pos==='top'" :style="`height:${val.height-17}px`" class="line-top">
    </div>
    <div v-show="val.display==='show'&&val.pos==='center'" :style="`height:${val.height-17}px`" class="box-center">
      <div class="line-center"></div>
    </div>
    <div v-show="val.display==='show'&&val.pos==='bottom'" :style="`height:${val.height-17}px`" class="line-bottom">
    </div>
  </div>
</template>

<script>
export default{
  name: 'PlaceOperat',
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
.place-box{
  box-sizing: border-box;
  padding:8px 0;
}
.box-center{
  display: flex;
  flex-direction: row;
  align-items:center;
}
.line-top{
  border-top:1px solid #D5D5D5;
}
.line-center{
  width:100%;
  border-top:1px solid #D5D5D5;
}
.line-bottom{
  border-bottom:1px solid #D5D5D5;
}
</style>
