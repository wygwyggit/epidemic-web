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
                            this.bgColor = "#FF9330"
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
        },
        beforeDestroy() {},
        methods: {
            doConnectAccount() {
                this.$refs.commonHeader.connectWalletMetaMask(true)
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>
