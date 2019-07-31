<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('assets/fonts/iconfont.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height: 100%;
}
.el-login-input input{
  padding-left: 40px;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {    
  width: 10px;
  height:10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {    
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);   
   border-radius: 10px;
   }
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {    
  border-radius: 10px;    
  background: #bbb;    
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
/*激活滚动条样式*/
::-webkit-scrollbar-thumb:window-inactive {   
}

/* 设置滚动条的样式 */
.tab::-webkit-scrollbar {    
  width: 5px;
  height:5px;
  display: none;
}
.tab:hover::-webkit-scrollbar { 
  display:block;
}
/* 滚动槽 */
.tab::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  border-radius: 0;    
  background-color: rgb(48, 65, 86);
}
</style>
