<template>
    <div class="tmpl">
        
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols='50' v-model="content"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} {{comment.add_time|convertTime}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loadMore">加载更多{{page}}</mt-button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'comment',
  props:['cid'],
  data() {
    return {
      comments: [],
      page: 1,
      id: "",
      hasData: true,
      content: ''
    };
  },
  created() {
    //写死ID值测试
    //创建组件的时候，接收父组件参数，传递值
    // =========初始加载页面===============================
    this.id = this.cid;
    //写死页码 1;
    this.page = this.$route.query.pageindex || 1;
    // 调用函数，加载页面
    this.loadByPage(this.page);

  },
  methods: {
    //   =================点击加载更多==================
    loadMore() {
        // 如果没有更多数据，不再发送请求
    if(!this.hasData)return;
    //   this.page = this.$route.query.pageindex || 1;
      this.$axios
        .get(`getcomments/${this.id}?pageindex=${this.page}`)
        .then(res => {
          this.comments = this.comments.concat(res.data.message);
          if (res.data.message.length == 0) {
            this.hasData = false;
            this.$toast("没有更多数据了");
            return;
          }
        //   给点击加载自增
          this.page++;
        });
    },
    // ===============点击发送评论=================
    sendComment() {
        this.$axios.post(`postcomment/${this.id}`
                ,`content=${this.content}`)
        .then( res => {
            // console.log(1)
            // 添加成功后显示第一页
            this.loadByPage(1);
            // 添加成功，将页码更改为1
            this.page = 1;
            // 清空当前数据
            this.content = '';
            console.log('添加成功')
        })
        .catch( err => {
            console.log(err);
        })
    },
    // 记载
    loadByPage(page) {
        console.log(page);//1
        console.log(this.page);//2
      this.$axios
        .get(`getcomments/${this.id}?pageindex=${page}`)
        .then(res => {
          this.comments = res.data.message;
          this.page++;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
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
