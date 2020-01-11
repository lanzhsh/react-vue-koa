// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
import Confirm from '@/components/confirm/index.js'
import messageBox from '@/components/messageBox/index.js'
import 'vant/lib/index.css'
import VueScroller from 'vue-scroller'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/nutui.css'

Vue.use(Vant)
Vue.use(VueScroller)
NutUI.install(Vue)
Vue.use(Confirm)
Vue.use(messageBox)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
