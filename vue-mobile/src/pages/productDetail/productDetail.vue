<template>
<div>
  <head-top leftText="返回" :arrowFlag="true"></head-top>
  <img src="@/pages/productDetail/img/product-detail1.jpg" alt="">

  <van-goods-action>
  <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
  <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" />
  <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn" />
  <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
</van-goods-action>
</div>
</template>

<script>
import headTop from '@/components/headTop'

export default {
  name: 'ProductDetail',

  components: {
    headTop
  },

  data() {
    return {}
  },

  methods: {
    onClickMiniBtn() {
      // Toast('点击图标');
    },
    onClickBigBtn() {
      // Toast('点击按钮');
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
