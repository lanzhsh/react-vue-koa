import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/pages/Home.vue'),
      children:[
        {path:'/ComEcharts',name:'ComEcharts',component:()=>import('@/pages/ComEcharts.vue')},
      ]
    },
  ]
})

