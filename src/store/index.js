import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        offLineDialogVisible: false,
        adoge_balance: undefined
    },
    mutations: {
        UPDATE_USERINFO: (state, data) => {
            state.userInfo = data
        },
        UPDATE_ADOGE_BALANCE: (state, data) => {
            state.adoge_balance = data
        },
        SHOW_OFFLINEDIALOGVISIBLE: state => {
            state.offLineDialogVisible = true
        }
    },
    actions: {
        showOffLineDialog: ( {
            commit
        }) => {
            commit('SHOW_OFFLINEDIALOGVISIBLE')
        }
    },
    modules: {}
})