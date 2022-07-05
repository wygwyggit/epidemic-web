import Vue from 'vue'
import Vuex from 'vuex'
import {
    getWalletAddr
} from '@/utils/auth'
import { getUserInfo } from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        walletAddr: getWalletAddr(),
        userInfo: {},
        offLineDialogVisible: false,
        adoge_balance: 0
    },
    getters: {
        userInfoAddr: state => state.userInfo.addr || ''
    },
    mutations: {
        SET_WALLETADDR: (state, data) => {
            state.walletAddr = data
        },
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
        getUserInfo: ({ commit }) => {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    if (response.ok && response.data) {
                        commit('UPDATE_USERINFO', response.data)
                        resolve(response.data)
                    } else {
                        reject('userInfo init faill')
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        upDateOffLineDialog: ( {
            commit
        }, data) => {
            commit('UPDATE_OFFLINEDIALOGVISIBLE', data)
        }
    },
    modules: {}
})