import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        offLineDialogVisible: false,
        adoge_balance: 0
    },
    mutations: {
        UPDATE_USERINFO: (state, data) => {
            state.userInfo = data
        },
        UPDATE_ADOGE_BALANCE: (state, data) => {
            state.adoge_balance = data
        },
        UPDATE_OFFLINEDIALOGVISIBLE: (state, data) => {
            state.offLineDialogVisible = data
        }
    },
    actions: {
        upDateOffLineDialog: ( {
            commit
        }, data) => {
            commit('UPDATE_OFFLINEDIALOGVISIBLE', data)
        }
    },
    modules: {}
})