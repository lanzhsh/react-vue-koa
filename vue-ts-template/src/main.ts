import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/fonts/iconfont.css'

import api from '@/utils/api'
import request from '@/utils/request'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$api = api
Vue.prototype.$request = request

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
