<template>
<div class="main">
  这是首页(里面有request的调用)
  <van-button type="primary" @click="toShopDetail">跳转去商品详情页</van-button>
</div>
</template>

<script>
export default {
  name: "mainPage",

  data() {
    return {};
  },

  mounted() {
    this.$request({
      url: this.$api.tableData,
      method: "GET",
      params: {}
    }).then(res => {
      //这里特别坑爹,axios读取本地的json转化为字符串了,所以要通过eval转化为对象
      console.log("res值为", res);
    });
  },

  methods: {
    //去商品详情页
    toShopDetail(index) {
      console.log("index值为", index);
      this.$router.push({
        path: "/productDetail"
      });
    }
  }
};
</script>

<style scoped lang='scss'>
</style>