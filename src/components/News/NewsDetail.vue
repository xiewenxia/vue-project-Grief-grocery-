<template>
    <div>
        <nav-bar title="新闻详情"></nav-bar>
        <div class="news-title">
            <p>{{newsInfo.title|convertTitle(15)}}</p>
            <div>
                <span>{{newsInfo.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsInfo.add_time|convertTime}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsInfo.content"></div>
    </div>
</template>
<script>
    export default {
        created() {
            // 接受传递过来的参数
            console.log(this.$route);
            let newsId = this.$route.query.newsId;
            this.$axios.get('getnew/' + newsId)
            .then( res => {
                this.newsInfo = res.data.message[0];
            })
            .catch( err => {
                console.log(err);
            })
        },
        data() {
            return {
                newsInfo:{},
            }
        },
        methods: {

        }
    }
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>
