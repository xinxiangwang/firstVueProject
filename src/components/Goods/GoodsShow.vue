<template>
 <div class="tmpl">
   <nav-bar title="商品列表"></nav-bar>
    <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
    :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore">
      <ul>
        <li v-for="(item, index) in goods" :key="index">
          <router-link :to="{ name: 'GoodsDetail', query: { GId: item.BookId } }" :title="item.BookName">
            <img :src="item.BookPic" alt="">
            <a class="title" href="javascript:void(0);">{{ item.BookName | cutTitle(10) }}</a>
            <div class="desc">
              <div class="sell">
                <span>{{ item.BookMprice }}</span><s>{{ item.BookPrice }}</s>
              </div>
              <div class="detail">
                <div class="hot">热卖中</div>
              </div>
              <div class="count">
                销量：{{ item.BookDealmount}}
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
 </div>
</template>
<script>
export default {
  name: 'GoodsShow',
  data () {
    return {
      goods: [],
      allLoaded: false,
      autoFill: false,
      page: this.$route.query.page
    }
  },
  methods: {
    loadBottom () {
      this.page++
      this.loadGoodsByPage()
      console.log('上拉调用了')
      this.$refs.loadmore.onBottomLoaded()
    },
    handleBottomChange (status) {
      console.log(status)
    },
    loadGoodsByPage () {
      this.$axios.get('getgoods.php?page=' + this.page).then(res => {
        if (res.data.message) {
          this.goods = this.page === 1 ? res.data.message : this.goods.concat(res.data.message)
        }
      }).catch(console.log)
    }
  },
  created () {
    this.loadGoodsByPage()
  }
}
</script>
<style scoped>
ul {
    padding: 0;
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
    height: 300px;
}
li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;
}
li > a:not(.mui-btn) img {
     width: 100%;
}
.sell > span {
    float: left;
    color: red;
    text-align: left;
}
.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}
.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}
/*撑开，去除浮动没有的高度*/
.detail {
    overflow: hidden;
}
.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
}
img {
    height: 200px;
}
</style>
