<template>
    <div> 
        <nav-bar title="图文详情"></nav-bar> 
        <div class="photo-title">
            <p>{{imgInfo.title}}</p>
            <span>发起日期：{{imgInfo.add_time|convertTime}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <my-ul>
            <my-li v-for="(img,index) in imgs" :key="index">
                <!-- 在使用前记得引入vue-preview -->
                <img :src="img.src" class="preview-img" @click="$preview.open(index, imgs)">
                <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)"> -->
            </my-li>    
        </my-ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>
        <!-- 使用评论组件 ,并将参数穿传过去，在评论组件里用cid查询-->
        <comment :cid="$route.params.imgId"></comment>
    </div>
</template>
<script>
export default{
    data() {
        return {
            imgInfo: {},
            imgs: []
        }
    },
    created() {
        // 接收图片分享页面传过来的id
        let imgId = this.$route.params.imgId;
        this.$axios.get( 'getimageInfo/' + imgId)
        .then( res => {
            this.imgInfo = res.data.message[0];
        })
        .catch( err => {
            console.log(err);
        });
        this.$axios.get('getthumimages/' + imgId)
        .then ( res => {
            this.imgs = res.data.message;
            this.imgs.forEach(ele => {
                ele.h = 400;
                ele.w = 600;
            })
        })
    }
}
</script>
<style scoped>
img {
    width: 100%;
    height: 100%;
}
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

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
