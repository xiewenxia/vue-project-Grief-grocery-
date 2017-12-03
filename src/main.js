import Vue from 'vue';

// ===========注册全局组件==================
import MyUl from './components/commons/MyUl.vue';
import MyLi from './components/commons/MyLi.vue';
// console.log(MyUl);
Vue.component(MyUl.name, MyUl);
Vue.component(MyLi.name, MyLi);


// =======路由相关组件===============
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Search from './components/Search/Search.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';

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
])
// ===========vue-router结束================


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
//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';
// =============Axios结束==============

new Vue({
    el: '#app',
    render: c => c(App),
    router
})