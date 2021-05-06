<template>
    <div :class="prefixCls">
        <div class="copyright">
            本系统仅供学习使用,不参与任何商业用途 Copyright © 2021 by
            <a target="_blank" href="http://heiyg.com" class="out-link">heiyg.com</a>
            . All rights reserved. |
            <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index" class="out-link">湘ICP备17003302号-2</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'common-footer',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'components-common-footer'
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
    $prefixCls: 'components-common-footer';

    .#{$prefixCls} {
        height: 88px;
        line-height: 88px;
        background: #5D5D5D;
        text-align: center;
        color: #AAAAAA;

        a {
            color: #AAAAAA;
        }
    }
</style>
