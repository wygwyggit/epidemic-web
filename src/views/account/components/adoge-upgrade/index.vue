<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('ego-wall.upgrade')" custom-class="adoge-upgrade-dialog" :close-on-click-modal="false"
            :show-close="false" :visible.sync="isShowDialog" width="9.06rem" v-if="isShowDialog">
            <div class="content">
                <p class="tip-info">
                    Please select props to complete the NFT upgrade
                </p>
                <div class="props-main">
                    <div class="fee">
                        <div class="label">
                            Upgrade Fee
                        </div>
                        <div class="price">
                            <img src="../../../../assets/images/adoge-token.png" alt="">
                            <span>33</span>
                            ADOGE
                        </div>
                    </div>
                </div>
                <div class="submit-btn">
                    <el-button type="primary">主要按钮</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        row: {
            type: Object,
            require: true
        },
        props: {

        },
        data() {
            return {
                prefixCls: 'views-account-adoge-upgrade',
                isShowDialog: true
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
    $prefixCls: "views-account-adoge-upgrade";

    .#{$prefixCls} {
        .tip-info {
            color: #777E90;
            font-size: .32rem;
        }

        .props-main {
            .fee {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: .266666666666667rem;
                padding: 0 .4rem;
                height: .666666666666667rem;
                line-height: .666666666666667rem;
                background: #1D2633;
                border: 1px solid #29374B;
                border-radius: .133333333333333rem;
                font-size: .266666666666667rem;
                img {
                    width: .453333333333333rem;
                    height: .453333333333333rem;
                }
                .label {
                    color: #777E90;
                }
                .price {
                    color: #fff;
                }
            }
        }

        .submit-btn {
            margin-top: .533333333333333rem;

            .el-button {
                width: 100%;
                height: .8rem;
                font-size: .293333333333333rem;
            }
        }
    }
</style>