// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import store from './store'
import QS from 'querystring'
import api from '@/utils/api';
import request from '@/utils/request';

Vue.use(ElementUI);

Vue.prototype.$echarts = echarts;
Vue.prototype.$QS = QS;
Vue.prototype.$api = api;
Vue.prototype.$request = request;

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
