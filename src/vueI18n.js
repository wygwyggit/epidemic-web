import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/lang/en.json' //英文语言包
import zh from '@/lang/zh.json' //中文语言包
import enLocale from 'element-ui/lib/locale/lang/en' // element英文语言包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // element中文语言包

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

export {
    i18n
}