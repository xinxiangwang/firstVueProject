<template>
    <div>
        <nav-bar title="购物车"/>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="books in shopcart" :key="books.BookId">
                    <mt-switch v-model="books.isSelected"></mt-switch>
                    <img :src="books.BookPic">
                    <div class="pay-calc">
                        <p>{{ books.BookName | cutTitle(15) }}</p>
                        <div class="calc">
                            <span>${{ books.BookPrice }}</span>
                            <span @click="subtract(books)">-</span>
                            <span>{{ books.buyNum }}</span>
                            <span @click="add(books)">+</span>
                            <a href="javascript:;">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品件，总价￥元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ShopCart',
  data () {
    return {
      shopcart: [],
      test: window.test
    }
  },
  async created () {
    let url = 'getShopCart.php?id=' + Object.keys(window.test.goodsList).join(',')
    this.shopcart = (await this.$axios.get(url)).data.message
    for (let i = 0; i < this.shopcart.length; i++) {
      let book = this.shopcart[i]
      let num = this.test.goodsList[book.BookId]
      if (num) {
        // 用下面两个方法添加属性，赋值后  属性值改变时并不会出发视图更新
        // book.buyNum = num
        // book.isSelected = false
        this.$set(book, 'buyNum', num)
        this.$set(book, 'isSelected', true)
      }
    }
    console.log(this.shopcart)
  },
  methods: {
    subtract (books) {
      books.buyNum--
    },
    add (books) {
      books.buyNum++
    }
  }
}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}
.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}
.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}
.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}
.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}
.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}
.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}
.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}
.calc a {
    margin-left: 20px;
}
.show-1,
.show-2 {
    display: inline-block;
}
.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
