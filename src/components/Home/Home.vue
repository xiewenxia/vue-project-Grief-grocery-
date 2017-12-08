<template>
    <div class="tmpl">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(pic,index) in imgs" :key="index">
                <a :href="pic.url">
                    <img :src="pic.img">
                </a>
            </mt-swipe-item>   
        </mt-swipe>
        <!-- 由于在别的地方也会用到九宫格，所以考虑将其抽离为公共的组件 -->
        <my-ul>
         <my-li v-for="(r,index) in homeRouters" :key="index">
             
            <router-link :to="r.router">
               <div :class="'back-img ' + r.className">
                   {{r.title}}
               </div>
            </router-link>
        </my-li>
    </my-ul>
    </div>
</template>
<script>
export default {
  // 在数据创建之后，发送请求，拿到轮播图的数据
  created() {
    this.$axios.get("getlunbo").then(res => {
      // console.log(res);
      //res.data.message结果是一个数组，里面包含返回来的图片信息
      this.imgs = res.data.message;
    });
  },
  data() {
    return {
      imgs: [],
      homeRouters:[
          {
              className: 'news',
              title: '新闻列表',
              router:  {name: 'news.list'}
          },
          {
              className: 'pic',
              title: '图文分享',
              router:  {name: 'photo.list',params:{categoryId: 0}}
          },
          {
              className: 'goods',
              title: '商品列表',
              router:  {name: 'goods.list',query:{page:1}}
          },
          {
              className: 'feedback',
              title: '留言反馈',
              router:  {name: 'news.list'}
          },
          {
              className: 'search',
              title: '搜索咨询',
              router:  {name: 'news.list'}
          },
          {
              className: 'callme',
              title: '联系我们',
              router:  {name: 'news.list'}
          }
      ]
    };
  }
};
</script>
<style scoped>
/* 轮播图 */
.mint-swipe-item img {
  width: 100%;
}
.mint-swipe {
  height: 30%;
}
/* 九宫格 */
.back-img {
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: 40px 35px;
  font-size: 20px;
  font-family: "Microsoft YaHei";
}

ul {
  overflow: hidden;
}

li a {
  text-decoration: none;
  color: black;
}

.news {
    background-image: url(../../static/img/news.png);
}
.pic {
    background-image: url(../../static/img/picShare.png);
}
.goods{
    background-image: url(../../static/img/goodShow.png)
}
.feedback{
    background-image: url(../../static/img/feedback.png)
}
.search{
    background-image: url(../../static/img/search.png)
}
.callme{
    background-image: url(../../static/img/callme.png)
}
</style>