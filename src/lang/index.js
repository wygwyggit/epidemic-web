import Vue from 'vue'
import VueI18n from 'vue-i18n'
import I18nFn from './i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en/index'
import zhLocale from './zh/index'

Vue.use(VueI18n)
Vue.mixin(I18nFn)

const langFiles = {
    'ZH': {
        ...elementZhLocale,
        ...zhLocale
    },
    'EN': {
        ...elementEnLocale,
        ...enLocale
    }
}
export function getLanguage() {
    const chooseLanguage = localStorage.getItem('lang')
    if (chooseLanguage) {
        return chooseLanguage
    }
    const language = (navigator.language || navigator.browserLanguage).toUpperCase()
    const locales = Object.keys(langFiles)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'EN'
}
const i18n = new VueI18n({
    locale: getLanguage(), 
    messages: langFiles,
    // silentTranslationWarn: true
})

export default i18n
