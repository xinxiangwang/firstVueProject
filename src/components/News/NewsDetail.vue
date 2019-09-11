<template>
    <div class="tmpl">
        <nav-bar title="新闻列表"></nav-bar>
        <div class="news-title">
            <p>{{newsInfo.title}}</p>
            <div>
                <span v-show="isShow">{{newsInfo.click}}次点击</span>
                <span v-show="isShow">分类:新闻</span>
                <span v-show="isShow">添加时间:{{newsInfo.add_time | convertTime('YYYY-MM-DD')}}</span>
            </div>
        </div>
        <div class="news-content" v-text="newsInfo.content"></div>
    </div>
</template>
<script>
export default {
  name: 'NewsDetail',
  data () {
    return {
      newsInfo: [],
      isShow: false
    }
  },
  created () {
    let { id } = this.$route.params
    let url = 'getnewsdetails.php?id=' + id
    this.$axios.get(url).then(res => {
      console.log(res)
      this.newsInfo = res.data.message[0]
      this.isShow = true
    })
  }
}
</script>
<style scoped>

.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}
.news-title span {
    margin-right: 30px;
}
.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
/*主体文章的左右距离*/
.news-content {
    padding: 10 5;
}
</style>
