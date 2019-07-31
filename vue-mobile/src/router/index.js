import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/home';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,

      children:[
        {
          path: '/main',
          name: 'Main',
          component: () => import('@/pages/main/main.vue')
        },
        {
          path: '/classify',
          name: 'Classify',
          component: () => import('@/pages/classify/classify.vue')
        },
        {
          path: '/product',
          name: 'Product',
          component: () => import('@/pages/product/product.vue')
        },
        {
          path: '/shopcart',
          name: 'Shopcart',
          component: () => import('@/pages/shopcart/shopcart.vue')
        },
        {
          path: '/my',
          name: 'My',
          component: () => import('@/pages/my/my.vue')
        },
      ]
    },
    {
      path:'/productDetail',
      name:'ProductDetail',
      component:()=> import('@/pages/productDetail/productDetail.vue')
    }
  ]
});
