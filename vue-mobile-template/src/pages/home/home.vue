<!--  -->
<template>
  <div class="home">
    <head-top></head-top>
    <router-view/>
    <transition name="fade"><tabbar></tabbar></transition>
  </div>
</template>

<script>
import headTop from '@/components/headTop';
import tabbar from '@/components/tabbar';
export default {
  name: "home",

  props: {},

  components: {
    headTop,
    tabbar
  },

  data() {
    return {
      
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    
  }
};
</script>
<style lang='scss' scoped>
</style>
