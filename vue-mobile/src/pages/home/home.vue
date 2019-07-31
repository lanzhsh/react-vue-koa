<!--  -->
<template>
  <div class="home">
    <head-top></head-top>
    <router-view/>
    <transition name="fade"><tabbar></tabbar></transition>
  </div>
</template>

<script>
import headTop from '@/components/headTop'
import tabbar from '@/components/tabbar'
export default {
  name: 'Home',

  props: {},

  components: {
    headTop,
    tabbar
  },

  data() {
    return {

    }
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {

  }
}
</script>
<style lang='scss' scoped>
.home-bgc {
  // @include setBg('./img/banner.png', ptr(750), ptr(240));
}
// .swiper-container {
//   width: ptr(750);
//   height: ptr(400);
// }
// .swiper-slide {
//   background-color: red;
// }
</style>
