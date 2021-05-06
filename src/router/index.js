import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        // 主路由在main中
        component: () =>
            import ( /* webpackChunkName: "main" */ '@/Main.vue'),
        children: [{
            path: '/',
            redirect: '/home'
        }, {
            path: '/home',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "home" */ '@/views/home/index.vue')
        }, {
            path: '/about',
            name: 'about',
            component: () =>
                import ( /* webpackChunkName: "home" */ '@/views/about/index.vue')
        },
        {
            path: '/development',
            name: 'development',
            component: () =>
                import ( /* webpackChunkName: "home" */ '@/views/development/index.vue')
        }]
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router