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
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/home/index.vue')
    }, {
        path: '/about',
        name: 'about',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/about/index.vue')
    },
    {
        path: '/information',
        name: 'information',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/information/index.vue')
    },
    {
        path: '/development',
        name: 'development',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/development/index.vue')
    }, {
        path: '/impact',
        name: 'impact',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/impact/index.vue')
    }, {
        path: '/statistical',
        name: 'statistical',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/statistical/index.vue')
    },
    {
        path: '/worldStatistical',
        name: 'worldStatistical',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/worldStatistical/index.vue')
    },
    {
        path: '/measures',
        name: 'measures',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/measures/index.vue')
    }, {
        path: '/avoidRumors',
        name: 'avoidRumors',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/avoidRumors/index.vue')
    }, {
        path: '/avoidRumors/detail',
        name: 'detail',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/detail/index.vue')
    },
    {
        path: '/heroicDeeds',
        name: 'heroicDeeds',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/heroicDeeds/index.vue')
    }, {
        path: '*',
        component: () =>
            import( /* webpackChunkName: "home" */ '@/views/404/index.vue')
    }]
},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router