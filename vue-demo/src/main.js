// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import echarts from 'echarts';
import axios from 'axios';
import store from './store';
import QS from 'querystring';
import api from '@/utils/api';
import request from '@/utils/request';

Vue.use(ElementUI);

Vue.prototype.$echarts = echarts;
Vue.prototype.$QS = QS;
Vue.prototype.$api = api;
Vue.prototype.$request = request;
//设置axios拦截器
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.token //jsCookie.get('cityCode')
  return config
});
axios.interceptors.response.use((response) => {
  //处理data
  return response;
},
error=>{
  { // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
  
        case 401:
          err.message = '未授权，请登录'
          break
  
        case 403:
          err.message = '拒绝访问'
          break
  
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
  
        case 408:
          err.message = '请求超时'
          break
  
        case 500:
          err.message = '服务器内部错误'
          break
  
        case 501:
          err.message = '服务未实现'
          break
  
        case 502:
          err.message = '网关错误'
          break
  
        case 503:
          err.message = '服务不可用'
          break
  
        case 504:
          err.message = '网关超时'
          break
  
        case 505:
          err.message = 'HTTP版本不受支持'
          break
  
        default:
      }
    }
  
    return Promise.reject(err);
  }
});

//导航钩子守卫
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('userName');
  let path = to.path
  if (path === '/login') {
    next()
    return
  }
  if (token) {
    next();
  } else {
    // next({
      // path: '/login'
    // })
    next();
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
