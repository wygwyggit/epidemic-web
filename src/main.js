import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Filters from '@/filters'
import Web3 from 'web3'
import i18n from './lang/index'
import './element'
import './style/common.scss'
import './style/element-rewrite.scss'
import '../rem.js'
import './permission'
import directives from './directives'
Vue.use(directives)
Vue.config.productionTip = false
Vue.prototype.Web3 = Web3
Object.keys(Filters).map(filtName => {
    Vue.filter(filtName, Filters[filtName])
})
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')