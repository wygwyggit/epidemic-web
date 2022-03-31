import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './vueI18n'
import { i18n } from './vueI18n'
import './element'
import './style/common.scss'
import './style/element-rewrite.scss'
import '../rem.js'


Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
