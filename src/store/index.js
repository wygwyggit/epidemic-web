import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        offLineDialogVisible: false,
    },
    mutations: {
        UPDATE_USERINFO: (state, data) => {
            state.userInfo = data
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