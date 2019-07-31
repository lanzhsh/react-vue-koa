// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import Vant from 'vant';
import 'vant/lib/index.css';
import api from '@/utils/api';
import request from '@/utils/request';

Vue.use(Vant);

Vue.prototype.$api = api;
Vue.prototype.$request = request;

Vue.config.productionTip = false;

//设置axios拦截器
axios.interceptors.request.use(config => {
  config.headers.cityCode = window.sessionStorage.cityCode; //jsCookie.get('cityCode')
  return config;
});
axios.interceptors.response.use((response) => {
  //处理data
  return response;
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
