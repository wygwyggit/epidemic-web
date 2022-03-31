import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    // 主路由在main中
    component: () =>
        import( /* webpackChunkName: "main" */ '@/Main.vue'),
    children: [{
        path: '/',
        redirect: '/blindBox'
    }, {
        path: '/blindBox',
        name: 'blindBox',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/blind-box/index.vue')
    },
    {
        path: '/details',
        name: 'details',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/details/index.vue')
    }, {
        path: '/account',
        name: 'account',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/account/index.vue')
    }]
},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
