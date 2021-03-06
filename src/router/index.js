import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决tab点击切换路由报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [{
    path: '/',
    // 主路由在main中
    component: () =>
        import( /* webpackChunkName: "main" */ '@/Main.vue'),
    children: [{
            path: '/',
            redirect: '/home'
        }, {
            path: '/home',
            name: 'home',
            component: () =>
                import( /* webpackChunkName: "home" */ '@/views/home/index.vue')
        }, {
            path: '/blindBox',
            name: 'blindBox',
            component: () =>
                import( /* webpackChunkName: "home" */ '@/views/blind-box/index.vue')
        }, {
            path: '/marketplace',
            name: 'marketplace',
            component: () =>
                import( /* webpackChunkName: "marketplace" */ '@/views/market-place/index.vue')
        },
        {
            path: '/details',
            name: 'details',
            component: () =>
                import( /* webpackChunkName: "details" */ '@/views/details/index.vue')
        }, {
            path: '/account',
            name: 'account',
            component: () =>
                import( /* webpackChunkName: "account" */ '@/views/account/index.vue')
        }, {
            path: '/netMining',
            name: 'netMining',
            component: () =>
                import( /* webpackChunkName: "netMining" */ '@/views/net-mining/index.vue')
        }, {
            path: '/account/egoWall',
            name: 'egoWall',
            component: () =>
                import( /* webpackChunkName: "netMining" */ '@/views/ego-wall/index.vue')
        }, {
            path: '/login',
            name: 'login',
            component: () =>
                import( /* webpackChunkName: "netMining" */ '@/views/login/index.vue')
        },
    ]
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router