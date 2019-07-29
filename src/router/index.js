import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member/Member'
import Search from '@/components/Search/Search'
import Shopcart from '@/components/Shopcart/Shopcart'
import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/Photo/PhotoList'
import PhotoDetail from '@/components/Photo/PhotoDetail'
import GoodsShow from '@/components/Goods/GoodsShow'
import GoodsDetail from '@/components/Goods/GoodsDetail'
import GoodsComments from '@/components/Goods/GoodsComments'
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
      path: '/photo/list',
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
