<template>
    <div>
        <nav-bar title="商品列表"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
        <ul>
            <li v-for="goods in goodslist" :key="goods.id">
                <a>
                    <img :src="goods.img_url">
                    <div class="title">{{goods.title|convertTitle(25)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goods.sell_price}}</span>
                            <s>￥{{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{goods.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
   methods:{
      changeStatus(s) {
          console.log(s);
      },
      loadBottom() {
          console.log('上拉刷新');
        //   this.allLoaded = true; //一次后，禁止该函数的调用
        // this.$refs.loadmore.onBottomLoaded();
      }
  },
  data() {
    return {
      goodslist: [],
      page: "",
    //   allLoaded:false,
      // isAutoFill:false,//是否自动检测，并调用loadBottom
    };
  },
  created() {
    //
    let page = this.$route.query.page || 1;
    console.log(page);
    this.$axios
      .get(`getgoods?pageindex=${page}`)
      .then(res => {
        console.log(res);
        this.goodslist = res.data.message;
      })
      .catch(err => {
        console.log(err);
      });
  }
 
};
</script>
<style scoped>
ul {
  overflow: hidden;
}
li {
  width: 50%;
  float: left;
  padding: 6px;
  box-sizing: border-box;
}

li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #5c5c5c;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}

li > a:not(.mui-btn) img {
  width: 100%;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}

.detail > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}

/*撑开，去除浮动没有的高度*/

.detail {
  overflow: hidden;
}

.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 200px;
}
</style>
