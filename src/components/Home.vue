<template>
  <div class="hello">

    <!-- 轮播图S -->
    <mt-swipe :auto='4000'>
      <mt-swipe-item v-for = "(item, index) in imgs " :key = index>
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图E -->

    <!-- 九宫格S -->
    <div class="grid">
      <my-ul>
        <my-li v-for="(module, index) in modules" :key="index">
          <router-link :to="module.route">
            <span :class="module.className"></span>
            <div>{{ module.title }}</div>
          </router-link>
        </my-li>
      </my-ul>
    </div>
    <!-- 九宫格E -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      imgs: [],
      modules: [
        {
          title: '新闻资讯',
          className: 'back-news',
          route: {name: 'NewsList', query: {categoryId: 0}}
        },
        {
          title: '图文分享',
          className: 'back-picShare',
          route: {
            name: 'PhotoList',
            query: { categoryId: 0 }
          }
        },
        {
          title: '商品展示',
          className: 'back-goods',
          route: {name: 'Home'}
        },
        {
          title: '留言反馈',
          className: 'back-feed',
          route: {name: 'Home'}
        },
        {
          title: '搜索资讯',
          className: 'back-search',
          route: {name: 'Home'}
        },
        {
          title: '联系我们',
          className: 'back-callme',
          route: {name: 'Home'}
        }
      ]
    }
  },
  created () {
    this.$axios.get('getlunbo.php').then(res => {
      this.imgs = res.data.message
    }).catch(err => console.log(err))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe {
  width: 100%;
  height: 200px;
}
.mint-swipe img {
  width: 100%;
}
/* 九宫格样式 */
.grid span {
  display: inline-block;
  margin: 10px 0;
  width: 50px;
  height: 50px;
  background-repeat: round;
}
.back-callme {
  background-image: url(../../static/img/callme.png);
}
.back-news {
  background-image: url(../../static/img/news.png);
}
.back-picShare {
  background-image: url(../../static/img/picShare.png);
}
.back-goods {
  background-image: url(../../static/img/goodsShow.png);
}
.back-search {
  background-image: url(../../static/img/search.png);
}
.back-feed {
  background-image: url(../../static/img/feedback.png);
}
</style>
