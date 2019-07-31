<template>
  <div class="ajax-compare">
    <el-button @click="triggerNative">触发原生封装请求</el-button>
    <el-button @click="triggerJq" type="primary">触发jQuery请求</el-button>
    <el-button @click="triggerFetch" type="success">触发fetch请求</el-button>
    <el-button @click="triggerResource" type="info">触发Vue-Resource请求</el-button>
    <el-button @click="triggerAxios" type="success">触发Axios请求</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import ajaxNative from '@/utils/ajax'
import $ from 'jquery'
import vueResource from 'vue-resource'
import axios from 'axios'
Vue.use(vueResource)
export default{
  name:'ajaxCompare',
  data(){
    return{}
  },
  methods:{
    triggerNative(){
      ajaxNative({
        url:'/api/femaleNameApi?page=1',
        type:'get',
        success:(data)=>console.log('ajax原生请求的值为',data.data)
      })
    },

    triggerJq(){
      $.get('/api/femaleNameApi', { page:1 },
      function(data){
        console.log('ajax请求值为',data.data)
    });
    },

    triggerFetch(){
      fetch("/api/femaleNameApi?page=1", {
      method: "GET"})
      .then(res =>{
        console.log('请求状态值为',res.status)
        console.log('结果状态值为',res.statusText)
        console.log('请求头信息值为',res.headers)
        console.log('请求url 值为',res.url)
        return res.json()
      }//箭头函数一行默认 return
      ).then(data=>{
        console.log('fetch请求的值为',data.data)
      })
    },

    triggerResource(){
      this.$http.get('/api/femaleNameApi', [{
        body:{page:1}
      }]).then((res) => {
        // 响应成功回调
        console.log('vueResource值为',res.data.data)
      }, (err) => {
        // 响应错误回调
      });
    },

    triggerAxios(){
      axios.get('/api/femaleNameApi', {
      params: {page:1}
    }).then(res=>{
      console.log('axios值为',res.data)
    }).catch(err=>{
      //错误返回
    })
    },
  }
}
</script>

<style lang='scss' scoped>
</style>