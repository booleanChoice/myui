/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Artery from '../src/index';
// import locale from '../src/locale/lang/en-US';
import locale from '../src/locale/lang/zh-CN';

Vue.use(VueRouter);
Vue.use(Artery, { locale });

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    routes: [
        {
            path: '/button',
            component: require('./routers/button.vue')
        },
        {
            path: '/input',
            component: require('./routers/input.vue')
        },
        {
            path: '/loading-bar',
            component: require('./routers/loading-bar.vue')
        },
        {
            path: '/message',
            component: require('./routers/message.vue')
        },
        {
            path: '/notice',
            component: require('./routers/notice.vue')
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
