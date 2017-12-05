import Vue from 'vue';


// =============注册全局过滤器=======
import Moment from 'moment';
Vue.filter('convertTime', (value) => {
    return Moment(value).format('YYYY-MM-DD');
});
Vue.filter('convertTitle', (value,limit) => {
    if(!value)return;
    //判断
    if(value.length > limit){
        return value.substr(0,limit) + '...'
     }
     //返回原数据
     return value;
});


// ===========注册全局组件==================
import MyUl from './components/commons/MyUl.vue';
import MyLi from './components/commons/MyLi.vue';
import NavBar from './components/commons/NavBar.vue'
// console.log(MyUl);
Vue.component(MyUl.name, MyUl);
Vue.component(MyLi.name, MyLi);
Vue.component(NavBar.name, NavBar);


// =======路由相关组件===============
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Search from './components/Search/Search.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import NewsList from './components/News/NewsList.vue';
import NewsDetail from './components/News/NewsDetail.vue';
import PhotoList from './components/Photo/Photo.vue';
import PhotoDetail from './components/Photo/PhotoDetail.vue';

// ===========vue-router开始================
import VueRouter from 'vue-router';
// 安装插件
Vue.use(VueRouter);
// 配置路由规则
let router = new VueRouter();
router.addRoutes([
    {path: '/',redirect:{
        name: 'home'
    }},
    {name: 'home', path: '/home', component: Home},
    {name: 'member', path: '/member', component: Member},
    {name: 'shopcart', path: '/shopcart', component: Shopcart},
    {name: 'search', path: '/search', component: Search},
    {name: 'news.list', path: '/news/list', component: NewsList},
    {name: 'news.detail', path: '/news/detail', component: NewsDetail},
    {name: 'photo.list', path: '/photo/list/:categoryId', component: PhotoList},
    {name: 'photo.detail', path: '/photo/detail/:imgId', component: PhotoDetail}
])
// ===========vue-router结束================

//VuePreview 开始
import VuePreview from 'vue-preview';
Vue.use(VuePreview)
//VuePreview 结束

//======== MintUi开始===============
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
//======== MintUi开始===============

// 引入公共css样式,保证在mint-ui之后，可以覆盖上面的样式
import './static/css/global.css';

// =============Axios开始==============
import Axios from 'axios';
Vue.prototype.$axios = Axios;
//设置默认URL请求基础路径192.168.159.80:8899/api/
// http://vue.studyit.io/api/
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';
// =============Axios结束==============

new Vue({
    el: '#app',
    render: c => c(App),
    router
})