import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        web3Provider: null
    },
    mutations: {
        UPDATE_WEB3PROVIDER: (state, data) => {
            state.web3Provider = data
        },
    },
    actions: {},
    modules: {}
})