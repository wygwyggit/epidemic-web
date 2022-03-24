import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/common.scss'
import en from '@/lang/en.json' //英文语言包
import zh from '@/lang/zh.json' //中文语言包
import VueI18n from 'vue-i18n'



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)
//语言包的读取
const langFiles = {
    'zh': {
        ...zh
    },
    'en': {
        ...en
    }
}
let lang = localStorage.getItem('lang') || 'en'
const i18n = new VueI18n({
    locale: lang, // 设置地区
    messages: langFiles, // 设置地区信息
})
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
