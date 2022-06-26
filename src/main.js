import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Filters from '@/filters'
import Web3 from 'web3'
import './vueI18n'
import {
    i18n
} from './vueI18n'
import './element'
import './style/common.scss'
import './style/element-rewrite.scss'
import '../rem.js'
import directives from './directives'
Vue.use(directives)
Vue.config.productionTip = false
Vue.prototype.Web3 = Web3
Object.keys(Filters).map(filtName => {
    Vue.filter(filtName, Filters[filtName])
})
router.afterEach((to, from, next) => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.pageYOffset = 0
})
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')