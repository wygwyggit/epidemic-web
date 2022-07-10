<template>
    <div :class="prefixCls">
        <el-dialog title="Take Out" :visible.sync="isShowDialog" width="6.4rem" @close="takeOutDialogClosed"
            custom-class="memory-expand-dialog" :close-on-click-modal="false">
            <div class="content">
                <img src="./take-out.png" alt="">
                <template v-if="!isSucceeded">
                    <el-input v-model="quantity" placeholder="Please enter quantity"></el-input>
                    <ul class="descriptions">
                        <li class="description-item">
                            <div class="label-name">
                                <span>Avail:</span>
                                <span>1.5 Staking ROM</span>
                            </div>
                            <div class="value-info">
                                <a href="javascript:;">MAX</a>
                            </div>
                        </li>
                        <li class="description-item">
                            <div class="label-name">Take out:</div>
                            <div class="value-info">
                                <img src="../../../../assets/images/adoge-token.png" alt="">
                                1,000,000,000 ADOGE
                            </div>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <p class="take-out-success">
                        Expansion succeeded Please wait for confirmation
                    </p>
                </template>

                <el-button type="warning">主要按钮</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'net-mining-take-out',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'views-net-mining-take-out',
                isShowDialog: true,
                isSucceeded: false,
                quantity: ''
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            takeOutDialogClosed() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: 'views-net-mining-take-out';

    .#{$prefixCls} {
        .content {
            text-align: center;

            .el-input {
                margin: .4rem 0 .266666666666667rem;

                .el-input__inner {
                    height: .8rem;
                    line-height: .8rem;
                    border: 0;
                    background: #1D2633;
                    color: #fff;
                    font-size: .373333333333333rem;
                    text-align: center;
                    border-radius: .133333333333333rem;

                    &::placeholder {
                        font-size: .24rem;
                        color: #777E90;
                    }
                }
            }
            .take-out-success {
                width: 3.76rem;
                margin: .4rem auto;
                font-size: .266666666666667rem;
                color: #777E90;
            }

            .descriptions {
                .description-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: .4rem;
                    font-size: .266666666666667rem;

                    .label-name {
                        color: #777E90;
                    }

                    .value-info {
                        color: #fff;

                        img {
                            width: .4rem;
                            vertical-align: middle;

                        }
                    }
                }
            }
            .el-button {
                height: .8rem;
                font-size: .32rem;
            }
        }
    }
</style>