import Vue from 'vue'
import Vuex from 'vuex'
import {
    getWalletAddr,
    getSignToken,
    setSignToken,
    removeSignToken,
    removeWalletAddr
} from '@/utils/auth'
import { getUserInfo } from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        walletAddr: getWalletAddr(),
        signToken: getSignToken(),
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
        SET_SIGNTOKEN: (state, data) => {
            state.signToken = data
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
        logOut: ({ commit }) => {
            commit('UPDATE_USERINFO', {})
            commit('SET_WALLETADDR', '')
            commit('UPDATE_ADOGE_BALANCE', '')
            commit('SET_SIGNTOKEN', '')
            removeSignToken()
            removeWalletAddr()
        },
        upDateOffLineDialog: ( {
            commit
        }, data) => {
            commit('UPDATE_OFFLINEDIALOGVISIBLE', data)
        },
        updateSignToken: ({
            commit
        }, data) => {
            commit('SET_SIGNTOKEN', data)
            setSignToken(data)
        }
    },
    modules: {}
})