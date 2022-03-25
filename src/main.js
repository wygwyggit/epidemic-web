import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/common.scss'
import '../rem.js'
import en from '@/lang/en.json' //英文语言包
import zh from '@/lang/zh.json' //中文语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'




Vue.config.productionTip = false
Vue.use(VueI18n)

//语言包的读取
const langFiles = {
    'ZH': {
        ...zh,
        ...zhLocale
    },
    'EN': {
        ...en,
        ...enLocale
    }
}
let lang = localStorage.getItem('lang') || 'EN'
const i18n = new VueI18n({
    locale: lang, // 设置地区
    messages: langFiles, // 设置地区信息
})
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
