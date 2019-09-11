import Vue from 'vue'
import Router from 'vue-router'

// 优化首页加载速度 没有必要加载所有组件(路由懒加载)
const Home = () => import('@/components/Home')
const Member = () => import('@/components/Member/Member')
const Search = () => import('@/components/Search/Search')
const Shopcart = () => import('@/components/Shopcart/Shopcart')
const NewsList = () => import('@/components/News/NewsList')
const NewsDetail = () => import('@/components/News/NewsDetail')
const PhotoList = () => import('@/components/Photo/PhotoList')
const PhotoDetail = () => import('@/components/Photo/PhotoDetail')
const GoodsShow = () => import('@/components/Goods/GoodsShow')
const GoodsDetail = () => import('@/components/Goods/GoodsDetail')
const GoodsComments = () => import('@/components/Goods/GoodsComments')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Shopcart',
      name: 'Shopcart',
      component: Shopcart
    },
    {
      path: '/news/list',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/news/detail/:id',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/photo/list/:categoryId',
      name: 'PhotoList',
      component: PhotoList
    },
    {
      path: '/photo/detail/:id',
      name: 'PhotoDetail',
      component: PhotoDetail
    },
    {
      path: '/goods/list',
      name: 'GoodsShow',
      component: GoodsShow
    },
    {
      path: '/goods/detail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/goods/comments',
      name: 'GoodsComments',
      component: GoodsComments
    }
  ]
})
