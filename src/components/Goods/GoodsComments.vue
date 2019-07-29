<template>
 <div>
   <nav-bar title="商品评论"></nav-bar>
   <comment :id="$route.params.id" :post="post" :get="get"/>
 </div>
</template>
<script>
export default {
  name: 'GoodsComments',
  data () {
    return {
      post: 'postGoodsComments.php',
      get: 'getGoodsComments.php'
    }
  }
}
</script>
<style scoped>
</style>
