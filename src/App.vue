<template>
  <div>
    <!-- 头部 -->
    <mt-header title="信息管理系统"></mt-header>
    <router-view/>
    <!-- 底部tabbar -->
    <mt-tabbar v-model="selected">
      <div class="box" @click="change('Home')">
        <mt-tab-item id="Home">
          <img slot="icon" src="../static/img/index.png">
          首页
        </mt-tab-item>
      </div>
      <div class="box" @click="change('Member')">
        <mt-tab-item id="Member">
          <img slot="icon" src="../static/img/vip.png">
          会员
        </mt-tab-item>
      </div>
      <div class="box" @click="change('Shopcart')">
        <mt-tab-item id="Shopcart">
          <img slot="icon" src="../static/img/goodsShow.png">
          购物车 <mt-badge size="small" type="error">{{ totalNum }}</mt-badge>
        </mt-tab-item>
      </div>
      <div class="box" @click="change('Search')">
        <mt-tab-item id="Search">
          <img slot="icon" src="../static/img/find.png">
          查找
        </mt-tab-item>
      </div>
    </mt-tabbar>
  </div>
</template>

<script>
import MyBus from './MyBus'
export default {
  name: 'App',
  data () {
    return {
      selected: '',
      totalNum: 0
    }
  },
  methods: {
    change (val) {
      this.selected = val
      this.$router.push({
        name: val
      })
    }
  },
  created () {
    // 商品详情页 添加到购物车触发小球 商品数量变化
    MyBus.$on('addShopCart', (num) => {
      this.totalNum += num
    })
  },
  watch: {
  }
}
</script>

<style scoped>
.mint-tabbar  .mint-tab-item.is-selected {
    background-color: #eaeaea;
    color: #26a2ff;
}
.box {
  width: 25%;
}
.mint-tabbar {
  position: fixed;
  bottom: 0;
}
</style>
