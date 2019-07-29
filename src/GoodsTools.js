let obj = {
  goodsList: {},
  addShopCart ({id, num}) {
    if (this.goodsList[id]) {
      // 判断是否存在这个商品id 存在就直接给value赋值 否则新增key属性
      this.goodsList[id] += num
    } else {
      this.goodsList[id] = num
    }
  },
  deleteGoods () {
  }
}
window.test = obj
export default obj
