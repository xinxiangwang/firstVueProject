<template>
 <div class="tmpl">
   <nav-bar title="图片详情"></nav-bar>
   <div class="photo-title">
     <p>图片标题：{{ imgInfo.title }}</p>
     <span>发起日期：{{ imgInfo.add_time }}</span>
     <span>{{ imgInfo.click }}次浏览</span>
     <span>分类：{{ imgInfo.category }}</span>
   </div>
   <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
   <div class="photo-desc">
     <p>{{ imgInfo.content }}</p>
   </div>
    <comment :id="$route.params.id" :post="post" :get="get"/>
 </div>
</template>
<script>
export default {
  name: 'PhotoDetail',
  data () {
    return {
      post: 'postcomments.php',
      get: 'getcomments.php',
      imgInfo: [],
      slide1: [
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  created () {
    let { id } = this.$route.params
    this.$axios.get('getimageinfo.php?id=' + id).then(res => {
      this.imgInfo = res.data.message[0]
      console.log(this.imgInfo)
    }).catch(console.log)
  },
  methods: {
    handleClose () {
      console.log('close event')
    }
  }
}
</script>
<style scoped>

.photo-title {
    overflow: hidden;
}
.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}
.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}
.photo-title span {
    margin-right: 20px;
}
.photo-desc p {
    font-size: 18px;
}
</style>
