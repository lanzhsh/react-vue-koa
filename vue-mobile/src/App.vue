<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    <router-view v-else/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('assets/fonts/iconfont.css');
/* 全局样式 */
html,body{
  height: 100%;
}
</style>
