import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import {
    getWalletAddr
} from '@/utils/auth'
// 不重定向白名单
const whiteList = ['/login', '/home', '/marketplace']
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (whiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        if (getWalletAddr()) {
            if (!store.getters.userInfoAddr.length) {
                store.dispatch('getUserInfo').then(res => {
                    next()
                }).catch(err => {
                    store.dispatch('logOut')
                    Message.error(err || 'Verification failed, please login again')
                    next({
                        path: '/'
                    })
                })
            } else {
                next()
            }
        } else {
            next('/login')
        }
    }
})
router.afterEach(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.pageYOffset = 0
    NProgress.done() // 结束Progress
})