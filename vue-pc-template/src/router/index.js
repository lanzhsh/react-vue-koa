import Vue from 'vue'
import Router from 'vue-router'
//路由懒加载
const Login=()=>import('@/page/Login')
const Home=()=>import('@/page/Home')
const ComEcharts=()=>import('@/page/ComEcharts')
const AjaxCompare=()=>import('@/page/AjaxCompare')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {path:'/comEcharts',name:'ComEcharts',component:ComEcharts},
        {path:'/ajaxCompare',name:'AjaxCompare',component:AjaxCompare},
      ]
    },
    {
      path:'/login',name:'login',component:Login
    },
  ]
})
