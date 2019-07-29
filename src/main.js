// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入Mint-ui
import MintUI from 'mint-ui'

// 引入css
import 'mint-ui/lib/style.css'

// axios
import Axios from 'axios'

// 引入全局样式
import '../static/css/global.css'

// 定义全局过滤器
import Moment from 'moment'

// 引入图片预览插件
import VuePreview from 'vue-preview'

// 引入自定义组件
import MyUl from './components/common/MyUl'
import MyLi from './components/common/MyLi'
import NavBar from './components/common/NavBar'
import Comment from './components/common/Comment'
import Swipe from './components/common/Swipe'
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)
Vue.component(Swipe.name, Swipe)

Moment.locale('zh-cn')
// 定义时间格式过滤器 转换时间格式
Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})

// 定义相对时间过滤器
Vue.filter('relTime', function (time) {
  return Moment(time).fromNow()
})

// 定义去掉文章冗长标题过滤器
Vue.filter('cutTitle', function (title, num) {
  // return title.replace(/（.*）|\(.*\)/, '') 只去除括号里不够 shit!
  if (title.length < num) {
    return title
  } else {
    return title.substr(0, num - 1) + '...'
  }
})

// 是否为生产环境
Vue.config.productionTip = false

// 安装插件
Vue.use(MintUI)

// 给vue的原型挂在$axios属性
Vue.prototype.$axios = Axios

// 定义axios基础请求地址
Axios.defaults.baseURL = 'http://www.myapi.devs/'

// 定义axios请求拦截器mint-ui请求动画
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '玩命加载中...',
    spinnerType: 'fading-circle'
  })
  return config
})

// 定义axios请求拦截器mint-ui请求结束动画
Axios.interceptors.response.use(function (response) {
  MintUI.Indicator.close()
  return response
})

// 安装vue-preview
Vue.use(VuePreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
