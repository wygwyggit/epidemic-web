import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/common.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/echarts/map/js/province/hunan.js'


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
