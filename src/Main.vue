<template>
    <div :class="prefixCls">
        <common-header></common-header>
        <router-view class="router-view "></router-view>
        <common-footer></common-footer>
    </div>
</template>

<script>
    import CommonHeader from '@/components/common-header'
    import CommonFooter from '@/components/common-footer'
    export default {
        name: 'app',
        components: {
            CommonHeader,
            CommonFooter
        },
        props: {},
        data() {
            return {
                prefixCls: ''
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {

        },
    }
</script>

<style lang="scss" scoped>

</style>
