<template>
<div>
  <head-top></head-top>
  这是商品详情页
</div>
</template>

<script>
import headTop from '@/components/headTop';
export default {
  name: "productDetail",

  components:{
    headTop
  },

  data() {
    return {};
  },

  methods: {
    onClickMiniBtn() {
      // Toast('点击图标');
    },
    onClickBigBtn() {
      // Toast('点击按钮');
    }
  }
};
</script>

<style scoped lang='scss'>
</style>