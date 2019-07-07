<template>
 <div class="tmpl">
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span>
              <a href="">返回</a>
            </span>
          </div>
        </li>
        <li class="txt-comment">
          <textarea style="width:100%" id="" cols="30" rows="10" v-model="content"></textarea>
        </li>
        <li>
          <mt-button type="primary" size="large" @click="sendMsg()">发表评论</mt-button>
        </li>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>44条评论</span>
          </div>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in comments" :key="index">
          {{ item.user_name }}：{{ item.content }}<br/>发表于：{{ item.add_time | relTime() }}
        </li>
      </ul>
      <mt-button size="large" type="danger" plain @click="loadMsgByPage()" :disabled="disabled">加载更多按钮</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'comment',
  data () {
    return {
      content: '',
      comments: [],
      page: 0,
      disabled: false
    }
  },
  props: ['imgId'],
  created () {
    this.loadMsgByPage()
  },
  methods: {
    init () {
      this.page = 0
    },
    sendMsg () {
      this.$axios.post('postcomments.php', {
        img_id: this.imgId,
        content: this.content
      }).then(res => {
        this.loadMsgByPage()
        this.init()
      }).catch(console.log)
    },
    loadMsgByPage () {
      this.$axios.get(`getcomments.php?id=${this.imgId}&pageindex=${this.page}`).then(res => {
        if (this.page === 0) {
          this.comments = res.data.message
        } else {
          if (res.data.message) {
            this.comments = this.comments.concat(res.data.message)
          } else {
            this.$toast({
              message: '没有更多评论了',
              iconClass: ''
            })
            this.disabled = true
          }
        }
        console.log(this.comments)
        this.page++
      }).catch(console.log)
    }
  }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}
.photo-comment > div span:nth-child(2) {
    float: right;
}
.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}
.txt-comment {
    padding: 5 5;
}
.txt-comment textarea {
    margin-bottom: 5px;
}
.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}
li {
    list-style: none;
}
ul {
    margin: 0;
    padding: 0;
}
</style>
