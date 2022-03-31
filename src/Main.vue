<template>
    <div :class="prefixCls">
        <common-header></common-header>
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
                isShowFooter: true
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
                        case 'details':
                            if (width < 768) {
                                this.isShowFooter = false
                            }
                            break;
                        default:
                            this.isShowFooter = true
                            break;
                    }
                }
            }
        },
        created() {

        },
        mounted() {},
        beforeDestroy() {},
        methods: {

        },
    }
</script>

<style lang="scss" scoped>
</style>