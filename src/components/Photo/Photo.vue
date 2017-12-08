<template>
    <div>
        <nav-bar title="图片分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="getImgs(category.id)">{{category.title}}</a>
                </li>
               
            </ul>
        </div>
        <div class="photo-list">
            <!-- 注意实现图片懒加载 ==在mint-ui中找到相关组件，使用即可-->
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name: 'photo.detail',params:{imgId:img.id}}">
                        <img v-lazy="img.img_url">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  created() {
    let categoryId = this.$route.params.categoryId;
    // 发送合并请求
    this.$axios
      .all([
        this.$axios.get("getimgcategory"),
        this.$axios.get("getimages/" + categoryId)
      ])
      .then(
        this.$axios.spread((categoryRes, imgRes) => {
          this.categorys = categoryRes.data.message;
          // 全部不在后台获取的数据中，需要自己添加到里面
          this.categorys.unshift({
            id: 0,
            title: "全部"
          });
          this.imgs = imgRes.data.message;
          if (this.imgs.length == 0) {
            this.$toast({
              message: "提示:没有图片了",
              duration: 5000
            });
          }
        })
      );
  },
  //   路由更新时间，由于在home.vue中，写死了地址参数id，所以直接在地址栏输入参数无法更改对应内容
  // 使用路由钩子beforeRouteUpdate，
  beforeRouteUpdate(to, from, next) {
    //   不管from到to是不是变化，只要刷新就会触发该路由钩子，重新加载
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    //console.log(to);//to里面有params.categoryId
    // 将该id通过请求获取新的信息
    // this.$axios.get("getimages/" + to.params.categoryId)
    // .then( res => {
    //     this.imgs = res.data.message;
    //     next();
    // })
    // next();
    this.getImgs(to.params.categoryId);
    next();
  },
  data() {
    return {
      categorys: [],
      imgs: []
    };
  },
  methods: {
    getImgs(id) {
      //按分类获取图片数据
      this.$axios
        .get("getimages/" + id)
        .then(res => {
          this.imgs = res.data.message;
          if (this.imgs.length == 0) {
            //   console.log(this.imgs)
            this.$toast({
              message: "没有更多图片了",
              duration: 5000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
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
</style>
