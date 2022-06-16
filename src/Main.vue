<template>
    <div :class="prefixCls">
        <common-header :bgColor="bgColor" ref="commonHeader"></common-header>
        <offline-notice></offline-notice>
        <router-view class="router-view"></router-view>
        <common-footer v-if="isShowFooter"></common-footer>
    </div>
</template>

<script>
    import myAjax from '@/utils/ajax.js'
    import eventBus from '@/utils/eventBus.js'
    import Cookie from "@/utils/cookie.js";
    import OfflineNotice from '@/components/offline-notice';
    import CommonHeader from '@/components/common-header'
    import CommonFooter from '@/components/common-footer'
    import {
        mapMutations,
    } from 'vuex'
    export default {
        components: {
            CommonHeader,
            CommonFooter,
            OfflineNotice
        },
        props: {},
        data() {
            return {
                prefixCls: '',
                isShowFooter: true,
                bgColor: ""
            }
        },
        computed: {},
        watch: {
            $route: {
                immediate: true,
                deep: true,
                handler(val, oldval) {
                    let width = window.innerWidth
                    switch (val.path.replace('/', '')) {
                        case 'home': {
                            this.bgColor = "#FF9330"
                            break;
                        }
                        case 'details':
                            if (width < 768) {
                                this.isShowFooter = false
                            }
                            this.bgColor = "#32A3FF"
                            break;
                        case 'account':
                        case 'netMining':
                        case 'account/egoWall':
                            this.bgColor = "#32A3FF"
                            this.getUserInfo()
                            break;
                        default:
                            this.bgColor = "#32A3FF"
                            this.isShowFooter = true
                            break;
                    }
                }
            }
        },
        created() {},
        async mounted() {},
        beforeDestroy() {},
        methods: {
            getUserInfo() {
                return new Promise((resolve, reject) => {
                    if (!Cookie.getCookie('__account__') || !Cookie.getCookie('ad_token')) {
                        return resolve()
                    }
                    myAjax({
                            url: 'user/user_info',
                            isPassFalse: true
                        }).then(res => {
                            if (res.ok) {
                                this.UPDATE_USERINFO(res.data || {})
                            }
                            resolve()
                        }).catch(error => {})
                        .finally(err => {
                            eventBus.$emit('initUserOk')
                        })
                })
            },
            doConnectAccount() {
                this.$refs.commonHeader.connectWalletMetaMask(true)
            },
            ...mapMutations([
                'UPDATE_USERINFO',
            ])
        },
    }
</script>

<style lang="scss" scoped>
</style>