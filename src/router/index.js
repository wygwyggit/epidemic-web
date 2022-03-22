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
        redirect: '/details'
    }, {
        path: '/home',
        name: 'home',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/home/index.vue')
    },
    {
        path: '/details',
        name: 'details',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/details/index.vue')
    }]
},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
