<template>
<div class="head-top">
  <van-nav-bar
  :title="titleText"
  :left-text="leftText"
  :left-arrow="arrowFlag"
  @click-left="onClickLeft"
/>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "headTop",

  props:{
    leftText:{
      type:String,
      default:''
    },
    arrowFlag:{
      type:Boolean,
      default:false
    }
  },

  computed: {
    ...mapGetters({
        tabIndex: "allTabIndex",
    }),
    titleText(){
      let arrText=['首页','分类','商品','购物车','我的'];
      return arrText[this.tabIndex];
    }
  },
    

  data() {
    return {};
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }

};
</script>

<style scoped lang='scss'>
.head-top{
  border-bottom: 1px solid rgba(69, 90, 100, 0.6);
}
</style>