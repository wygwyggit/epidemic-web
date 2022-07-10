/**
 * @description use element-ui
 * @author wyg
 */
import Vue from 'vue'
import i18n from './lang'
import ElementUI, {
    Message,
    Loading
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

Vue.mixin({
    created: function () {
        this.$showOk = (str = '') => {
            Message.closeAll();
            Message({
                type: 'success',
                message: str,
            })
        };
        this.$showError = (str = '') => {
            Message.closeAll();
            Message({
                type: 'error',
                message: str
            })
        };
        this.$showWarning = (str = '') => {
            Message.closeAll();
            Message({
                type: 'warning',
                message: str
            })
        };
        this.$showInfo = (str = '') => {
            Message.closeAll();
            Message({
                type: 'info',
                message: str
            })
        };
        this.$loading = () => {
            return Loading.service({
                fullscreen: true
            })
        }
    },

    methods: {}
});