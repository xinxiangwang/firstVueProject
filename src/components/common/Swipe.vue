<template>
 <mt-swipe :auto='4000'>
    <mt-swipe-item v-for = "(item, index) in imgs " :key = index>
      <img :src="item.img_url" alt="">
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  name: 'Swipe',
  props: ['url'],
  data () {
    return {
      imgs: []
    }
  },
  created () {
    this.$axios.get(this.url).then(res => {
      this.imgs = res.data.message
    }).catch(err => console.log(err))
  }
}
</script>
<style scoped>
.mint-swipe {
  width: 100%;
  height: 200px;
}
.mint-swipe img {
  width: 100%;
}
</style>
