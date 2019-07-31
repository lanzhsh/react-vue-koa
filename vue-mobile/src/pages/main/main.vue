<template>
<div class="main">
  <pull-refresh>
    <div class="main-swiper">
      <van-swipe :autoplay="2000" @change="onChange" :width="750" :height="400">
        <van-swipe-item v-for="(item,index) in swiperList" :key="index">
          <img :src="item" @click="toShopDetail(index)">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="main-product">
      <div v-for="(item,index) in productList" :key="index">
        <img :src="item">
      </div>
    </div>
  </pull-refresh>
</div>
</template>

<script>
import pullRefresh from "@/components/pullRefresh";
import bannerOne from "@/pages/main/img/banner1.jpg";
import bannerTwo from "@/pages/main/img/banner2.jpg";
import productOne from "@/pages/main/img/product1.jpg";
import productTwo from "@/pages/main/img/product2.jpg";
import productThree from "@/pages/main/img/product3.jpg";
import productFour from "@/pages/main/img/product4.jpg";
export default {
  name: "mainPage",

  components: {
    pullRefresh
  },

  data() {
    return {
      swiperList:[bannerOne,bannerTwo],
      productList:[productOne,productTwo,productThree,productFour]
    };
  },

  methods: {
    onChange(index) {
    },

    //去商品详情页
    toShopDetail(index){
      console.log('index值为',index);
      this.$router.push({
        path:'/productDetail'
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.main-swiper{
  width:ptr(750);
  height:ptr(400);
}

.van-swipe{
  height:ptr(400);
}

.main-product{
  display:flex;
}

.main-product img{
  box-sizing: border-box;
  width:ptr(187.5);
  padding:ptr(10);
}
</style>