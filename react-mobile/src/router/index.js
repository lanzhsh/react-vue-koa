import Loadable from 'react-loadable';
import MainLayout from '@/layouts/MainLayout/index.tsx';
import Loading from '@/components/Loading/index.jsx';
// const createBrowserHistory=require("history").createBrowserHistory
import {createBrowserHistory} from 'history'


const Home = Loadable({loader: () => import('@/pages/home/index.tsx'),loading: Loading});
const Classify = Loadable({loader: () => import('@/pages/classify/index.tsx'),loading: Loading});
const Shop = Loadable({loader: () => import('@/pages/shop/index.tsx'),loading: Loading});
const ShopCart = Loadable({loader: () => import('@/pages/shopCart/index.tsx'),loading: Loading});
const My = Loadable({loader: () => import('@/pages/my/index.tsx'),loading: Loading});
const ShopType = Loadable({loader: () => import('@/pages/ShopType/index.tsx'),loading: Loading});

export const history = createBrowserHistory();

export const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    layout:MainLayout,
    component:Home
  },
  {
    path:'/classify',
    layout:MainLayout,
    component:Classify
  },
  {
    path:'/shop',
    layout:MainLayout,
    component:Shop
  },
  {
    path:'/shopCart',
    layout:MainLayout,
    component:ShopCart
  },
  {
    path:'/my',
    layout:MainLayout,
    component:My
  },
  {
    path:'/shopType/:type',
    component:ShopType
  },
]