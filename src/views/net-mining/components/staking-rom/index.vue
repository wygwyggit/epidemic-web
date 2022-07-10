<template>
    <div :class="prefixCls">
        <el-dialog title="Staking ROM" :visible.sync="isShowDialog" :width="dialogWidth" @close="stakingRomDialogClosed"
            custom-class="staking-rom-dialog" :close-on-click-modal="false">
            <div class="content">
                <div class="progress-wrap">
                    <img src="../../images/memory.png" alt="">
                    <p class="base-progress">
                        <span>AVAIL:</span>
                        <el-progress :percentage="50" color="#F6D440"></el-progress>
                    </p>
                </div>
                <ul class="list type-staking-rom-list">
                    <li class="list-item">
                        <div class="key">
                            Capacity
                        </div>
                        <div class="val">
                            0 Staking ROM
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="key">
                            Capacity
                        </div>
                        <div class="val">
                            0 Staking ROM
                        </div>
                    </li>
                </ul>
                <div class="title-list">
                    <p>tips:</p>
                    <ul class="list">
                        <li class="list-item tip-item">
                            1 Staking ROM = 10,000,000 ADOGE
                        </li>
                    </ul>
                </div>
                <div class="title-list">
                    <p>NFT staking needs to lock the Staking ROM</p>
                    <ul class="list">
                        <li class="list-item need-item">
                            <div class="key">
                                Yellow NFT
                            </div>
                            <div class="val">
                                1 Staking ROM/Card
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="other-tip-info">
                    The Staking ROM can be withdrawn at any time during the non-staking period.
                </div>
            </div>
            <div class="opt-btns">
                <el-button type="warning">Take Out</el-button>
                <el-button type="primary">Expand</el-button>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        dialogWidth
    } from '@/mixin/index'
    export default {
        name: 'net-mining-staking-rom',
        components: {},
        mixins: [dialogWidth],
        props: {},
        data() {
            return {
                prefixCls: 'views-net-mining-staking-rom',
                isShowDialog: true,
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            stakingRomDialogClosed() {
                this.$emit('close')
            }

        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'views-net-mining-staking-rom';

    .#{$prefixCls} {
        .content {
            padding: .2rem .16rem;
            border: 1px solid #29374B;
            border-radius: .266666666666667rem;

            .progress-wrap {
                text-align: center;

                img {
                    width: 1.866666666666667rem;
                }

                .base-progress {
                    display: flex;
                    padding: .213333333333333rem .8rem .266666666666667rem;

                    .el-progress {
                        flex: 1;
                    }
                }
            }

            .list {
                border: 1px solid #29374B;
                border-radius: .133333333333333rem;
                color: #fff;

                &.type-staking-rom-list {
                    font-size: .213333333333333rem;
                }

                .list-item {
                    display: flex;
                    height: .4rem;
                    line-height: .4rem;
                    border-bottom: 1px solid #29374B;

                    &:last-child {
                        border: 0;
                    }

                    &.tip-item {
                        padding-left: .266666666666667rem;
                        font-size: .186666666666667rem;
                        color: #777E90;
                    }

                    &.need-item {
                        font-size: .186666666666667rem;
                        color: #fff;
                    }

                    .key {
                        padding-left: .266666666666667rem;
                        width: 1.6rem;
                        border-right: 1px solid #29374B;
                    }

                    .val {
                        flex: 1;
                        text-align: center;
                    }
                }
            }

            .title-list {
                >p {
                    margin: .12rem 0;
                    color: #777E90;
                }
            }

            .other-tip-info {
                margin-top: .16rem;
                color: $--color-primary;
            }
        }

        .opt-btns {
            margin-top: .346666666666667rem;
            display: flex;
            justify-content: space-between;

            .el-button {
                flex: 1;
                height: .8rem;
                font-size: .32rem;
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .content {
                .list {
                    .list-item {
                        height: .853333333333333rem;
                        line-height: .853333333333333rem;

                        .key {
                            width: 3.2rem;
                        }
                    }
                }

                .title-list {
                    >p {
                        margin: .266666666666667rem 0;
                    }
                }

            }

            .opt-btns {
                .el-button {
                    height: 1.333333333333333rem;
                    font-size: .426666666666667rem;
                }
            }
        }
    }
</style>