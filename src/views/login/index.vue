<template>
    <div :class="prefixCls">
        <no-connect-wallet @connectOk="connectOk"></no-connect-wallet>
    </div>
</template>

<script>
    import NoConnectWallet from '@/components/no-connect-wallet'
    import store from '@/store'
    export default {
        name: 'login',
        components: {
            NoConnectWallet
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-login'
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            connectOk(data) {
                data && store.dispatch('updateSignToken', data)
                this.$router.push({
                    path: '/'
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: "views-login";

    .#{$prefixCls} {
        padding: 30px 0;
        background: #14181f;
    }
</style>