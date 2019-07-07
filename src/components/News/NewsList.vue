<template>
 <div class="tmpl">
   <nav-bar :title="title"></nav-bar>
   <!-- 新闻列表 -->
    <div class="demo">
      <ul>
        <li v-for="(news, index) in newsList" :key="index">
          <router-link :to="{ name: 'NewsDetail', params: { id: news.id } }">
            <img :src="news.img_url" alt="">
            <div>
              <span>{{ news.title }}</span>
              <div class="news-desc">
                <p>点击数:{{ news.click }}</p>
                <p>发表时间: {{ news.add_time | convertTime('YYYY-MM-DD') }}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
 </div>
</template>
<script>
export default {
  name: 'NewsList',
  data () {
    return {
      title: '新闻列表',
      newsList: []
    }
  },
  methods: {
  },
  created () {
    this.$axios.get('getnewslist.php').then(res => {
      this.newsList = res.data.message
    }).catch(
      err => { console.log(err) })
  }
}
</script>
<style scoped>
.tmpl {
  margin-bottom: 55px;
}
.demo a {
    display: block;
    width: 330px;
    height: 44px;
    color: #000;
    padding-left:15px;
}
.demo img {
    float: left;
    width: 42px;
    height: 42px;
    margin-right: 20px;
}
.demo a div {
    float: left;
    width: 238px;
    margin-right: 20px;
}
.demo span {
    display: block;
    width: 100%;
    font-size: 17px;
    line-height: 21px;
}
.demo a p {
    float: left;
    color: #0bb0f5;
    font-size: 14px;
    line-height: 21px;
}
.demo p:nth-child(2) {
    float: right;
}
.demo ul {
    padding: 0;
    margin: 0;
}
.demo li {
  height: 100px;
  margin-top: 10px;
  border-bottom: 1px solid #eee;
}
.news-desc {
    height: 35px;
}
</style>
