<template>
 <div>
        <nav-bar title="商品详情"/>
        <div class="outer-swiper">
            <Swipe url="getlunbo.php"/>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                </span></li>
                <li class="price-li">市场价：
                    <s>{{ goodsDetail.BookPrice }}</s> 销售价：<span>{{ goodsDetail.BookMprice }}</span>
                </li>
                <li class="number-li">购买数量：<span @click="subtract">-</span><span>{{ buyNum }}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopCart" :disabled="buyNum == 0 ? true : false">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数：</li>
                <li>商品货号：{{ goodsDetail.Bookisbn }}</li>
                <li>成交量：{{ goodsDetail.BookDealmount }}</li>
                <li>上架时间：{{ goodsDetail.BookPubDate }}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="goGoodsComments()">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import MyBus from '@/MyBus.js'
import GoodsTools from '@/GoodsTools.js'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      goodsId: this.$route.query.GId,
      lunBoImg: [],
      goodsDetail: {},
      isShow: false,
      buyNum: 0
    }
  },
  created () {
    let reqLunBo = this.$axios.get('getlunbo.php')
    let reqGoodsDetail = this.$axios.get('getGoodsDetail.php?GId=' + this.goodsId)
    // 强行用一下这个$axios.all 如果里面有一个没请求成功，则整体算请求失败
    this.$axios.all([reqLunBo, reqGoodsDetail]).then(this.$axios.spread((reqLunBo, reqGoodsDetail) => {
      this.lunBoImg = reqLunBo.data.message
      this.goodsDetail = reqGoodsDetail.data.message[0]
    })).catch(console.log)
  },
  methods: {
    goGoodsComments () {
      this.$router.push({
        name: 'GoodsComments',
        params: {
          id: this.goodsId
        }
      })
    },
    subtract () {
      this.buyNum = this.buyNum === 0 ? 0 : --this.buyNum
    },
    add () {
      this.buyNum++
    },
    addShopCart () {
      this.isShow = true
    },
    afterEnter () {
      this.isShow = false
      // 调用父组件的方法（下方购物车图标数量）
      MyBus.$emit('addShopCart', this.buyNum)
      // 添加到购物车后把值存起来
      GoodsTools.addShopCart({
        id: this.goodsDetail.BookId,
        num: this.buyNum
      })
    }
  }
}
</script>
<style scoped>
.ball-leave {
  opacity: 0;
}
.ball-enter-active {
    animation: bounce-in 1s;
}
@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}
.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}
.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}
/*请ulpadding*/
.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}
.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}
.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}
.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}
.price-li span {
    color: red;
    font-size: 25px;
}
.price-li s {
    margin-right: 16px;
}
/*加减*/
.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}
/*商品参数*/
.product-props ul >:nth-child(1) {
    text-align: left;
}
.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}
.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}
.number-li span {
    text-align: center;
}
.number-li >:nth-child(2) {
    width: 40px;
}
.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: 441px;
    left: 128px;
    display: inline-block;
    z-index: 9999;
}
</style>
