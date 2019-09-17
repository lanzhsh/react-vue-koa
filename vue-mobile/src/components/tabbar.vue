<template>
<div class="tabbar pos-f">
  <ul class="tabbar-list">
    <li @click="tabChange(0)" :class="{'active':tabActive[0]}">
      <span class="iconfont icon-home"></span><p>首页</p>
    </li>
    <li @click="tabChange(1)" :class="{'active':tabActive[1]}">
      <span class="iconfont icon-classifi"></span><p>活动</p>
    </li>
    <li @click="tabChange(2)" :class="{'active':tabActive[2]}">
      <span class="iconfont icon-product"></span><p>商品</p>
    </li>
    <li @click="tabChange(3)" :class="{'active':tabActive[3]}">
      <span class="iconfont icon-cartshop"></span><p>购物车</p>
    </li>
    <li @click="tabChange(4)" :class="{'active':tabActive[4]}">
      <span class="iconfont icon-my"></span><p>我的</p>
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Tabbar',

  data() {
    return {
      tabActive: [true, false, false, false, false]
    }
  },

  computed: {
    ...mapGetters({
      tabIndex: 'allTabIndex'
    })
  },

  created() {
    this.changeTabActive(this.tabIndex)
  },

  methods: {
    // tab点击事件
    tabChange(activeIndex) {
      this.changeTabActive(activeIndex)
      this.switchTab(activeIndex)
      // 传惨
      this.$store.dispatch('getAllTabIndex', activeIndex)
    },

    // 改变tabActive值
    changeTabActive(activeIndex) {
      this.tabActive.map((item, index) => {
        this.$set(this.tabActive, index, false)
      })
      this.$set(this.tabActive, activeIndex, true)
    },

    // 切换tabbar
    switchTab(activeIndex) {
      const arrUrl = ['main', 'activity-detail', 'product', 'shopcart', 'my']
      arrUrl.map((item, index) => {
        if (index === activeIndex) this.$router.push('/' + item)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.tabbar {
  background:#ffffff;
  bottom: 0;
  border-top: 1px solid rgba(69, 90, 100, 0.6);
}
.tabbar-list {
  li {
    float: left;
    width: ptr(130);
    padding: ptr(10);
  }

  li.active {
    color: rgba(16, 247, 16, 0.822);
  }

  p,
  span {
    float: left;
    width: 100%;
    text-align: center;
  }

  p {
    font-size: ptr(40);
  }

  span {
    padding-bottom: ptr(10);
    font-size: ptr(50);
  }
}
</style>
