<template>
    <div :class="prefixCls">
        <common-header :bgColor="bgColor" ref="commonHeader"></common-header>
        <router-view class="router-view "></router-view>
        <common-footer v-if="isShowFooter"></common-footer>
    </div>
</template>

<script>
    import CommonHeader from '@/components/common-header'
    import CommonFooter from '@/components/common-footer'
    import {
        mapMutations,
    } from 'vuex'
    import {
        getWeb3Provider
    } from '@/utils/adpp'
    export default {
        components: {
            CommonHeader,
            CommonFooter
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
                            this.bgColor = "#31BCFF"
                            break;
                        }
                        case 'details':
                            if (width < 768) {
                                this.isShowFooter = false
                            }
                            this.bgColor = "#32A3FF"
                            break;
                        default:
                            this.bgColor = "#32A3FF"
                            this.isShowFooter = true
                            break;
                    }
                }
            }
        },
        created() {

        },
        async mounted() {
            let web3Provider = await getWeb3Provider()
            this.UPDATE_WEB3PROVIDER(web3Provider)
        },
        beforeDestroy() {},
        methods: {
            ...mapMutations({
                UPDATE_WEB3PROVIDER: 'UPDATE_WEB3PROVIDER'
            }),
            doConnectAccount() {
                this.$refs.commonHeader.connectWalletMetaMask(true)
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>