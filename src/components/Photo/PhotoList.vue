<template>
 <div class="tmpl">
   <nav-bar title="图文分享"></nav-bar>
   <div class="photo-header">
     <ul>
      <li v-for="(item, index) in imgCategory" :key="index">
        <a href="javascript:;" @click="routeChange(item.id)" :class="c_id == item.id ? 'active' : ''">{{ item.category }}</a>
        </li>
     </ul>
   </div>
   <div class="photo-list">
     <ul>
       <li v-for="(item, index) in imgs" :key="index">
         <router-link :to="{ name: 'PhotoDetail', params: { id: item.id } }">
           <img v-if="$route.query.categoryId === 0" v-lazy="item.img_url">
           <img v-else :src="item.img_url" alt="">
           <p>
             <span>{{ item.title }}</span>
             <br>
             <span>{{ item.zhaiyao }}</span>
           </p>
         </router-link>
       </li>
     </ul>
   </div>
 </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      imgs: [],
      imgCategory: [],
      c_id: 0
    }
  },
  methods: {
    routeChange (id) {
      console.log(id)
      this.$router.push({
        name: 'PhotoList',
        query: { categoryId: id }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 把每次变化的路由参数保存起来
    this.c_id = to.query.categoryId
    this.$axios.get('getimages.php?id=' + this.c_id).then(res => {
      this.imgs = res.data.message
    }).catch(err => { console.log(err) })
    next()
  },
  created () {
    // 解决图片懒加载缓存bug
    if (this.$route.query.categoryId === 0) {
      this.imgs = []
    }

    this.$axios.get('getimages.php?id=' + this.$route.query.categoryId).then(res => {
      this.imgs = res.data.message
    }).catch(err => { console.log(err) })

    // 获取分类列表
    this.$axios.get('getCategory.php').then(res => {
      this.imgCategory = res.data.message
      this.imgCategory.unshift({ id: 0, category: '全部' })
    }).catch(err => { console.log(err) })
  }
}
</script>
<style scoped>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}
.photo-header a.active {
    color: black;
}
.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}
/*下面的图片*/
.photo-list li {
    list-style: none;
    position: relative;
}
.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
    object-fit: cover;
}
.photo-list ul {
    padding-left: 0px;
    margin: 0;
}
.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}
.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
