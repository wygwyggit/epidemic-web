<template>
    <div :class="prefixCls" v-loading="isLoading">
        <div class="content">
            <img src="../no-connect-wallet/no-wallet.png" alt="">
            <p>{{ $t("common.please-authorize") }}</p>
            <div class="btn" @click="sign">{{ $t("common.authorize-wallet") }}</div>
        </div>
    </div>
</template>

<script>
    import {
        signMixin
    } from '../../mixin/index'
    export default {
        name: 'components-no-connect-wallet',
        mixins: [signMixin],
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'components-no-connect-wallet',
                isLoading: false
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
    $prefixCls: 'components-no-connect-wallet';

    .#{$prefixCls} {
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: .506666666666667rem 0 .266666666666667rem;
            width: 3.466666666666667rem;
            height: 3.733333333333333rem;
            margin: .853333333333333rem auto;
            border: 2px solid #223146;
            border-radius: .266666666666667rem;

            img {
                width: .933333333333333rem;
            }

            p {
                margin-top: .16rem;
                color: #777E90;
                font-size: .24rem;
            }

            .btn {
                margin-top: .7rem;
                width: 2.933333333333333rem;
                height: .666666666666667rem;
                line-height: .666666666666667rem;
                text-align: center;
                font-size: .213333333333333rem;
                border: 1px solid #32A3FF;
                color: #32A3FF;
                border-radius: .133333333333333rem;
                cursor: pointer;
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .content {
                padding: 0;
                border: 0;
            }
        }
    }
</style>