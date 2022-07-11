<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('net-mining.staking-information')" :visible.sync="isShowDialog" :width="dialogWidth"
            @close="stakingDialogClosed" custom-class="staking-dialog" :close-on-click-modal="false">
            <div class="content" v-loading="dialogLoading">
                <div class="info-item pledge-content">
                    <div class="tit">
                        {{ $t('net-mining.pledge-quantity') }}
                    </div>
                    <ul class="con">
                        <li class="con-item" v-for="(value, key) in stakingRarityMap" :key="key">
                            <div class="key" :style="{color: key}">{{ $t(`common.${key}`) }}</div>
                            <div class="val">{{  value.length || 0 }}</div>
                        </li>
                    </ul>
                </div>
                <div class="info-item time-content">
                    <div class="tit">
                        {{ $t('net-mining.staking-time') }}
                    </div>
                    <ul class="time-list">
                        <li class="time-item" v-for="(item, index) of pledgeTimes" :key="index"
                            :class="{'select': item.id === pledgeParams.time}"
                            @click="() => pledgeParams.time = item.id">
                            {{item.title}}
                        </li>
                    </ul>
                </div>
                <div class="staking-row-tickets">
                    <div class="title clearfix">
                        <div class="title-name l">
                            Staking ROM
                        </div>
                        <div class="title-value r">
                            Avail: 20
                        </div>
                    </div>
                    <div class="main-info">
                        <div class="left">
                            <img src="../../images/memory.png" alt="">
                            <span class="txt">5.7 Staking ROM</span>
                        </div>
                        <div class="right">
                            <a href="javascript:;" class="exp">EXP</a>
                        </div>
                    </div>
                </div>
                <div class="staking-row-tickets">
                    <div class="title clearfix">
                        <div class="title-name l">
                            {{ $t('net-mining.staking-tickets') }}
                        </div>
                        <div class="title-value r">
                            {{ $t('net-mining.balance') }}: {{ balanceCount }}
                        </div>
                    </div>
                    <div class="main-info">
                        <div class="left">
                            <img src="../../../../assets/images/amazing-team-token.png" alt="">
                            <span class="txt">{{ needAmazing }} AmazingTeam </span>
                        </div>
                        <div class="right">
                            <a class="buy"
                                href="https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x44ece1031e5b5e2d9169546cc10ea5c95ba96237"
                                target="_blank">
                                {{ $t('common.buy') }}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="opt-btns">
                    <el-button type="primary" v-debounce="beforeApprove">
                        {{ $t("common.confirmed")}}
                    </el-button>
                    <!-- <el-button type="primary" :disabled="balanceCount < needAmazing" :loading="comfirmLoading"
                        v-debounce="beforeApprove">
                        {{ balanceCount &lt; needAmazing ? $t("net-mining.insufficient-balance") : $t("common.confirmed")}}
                    </el-button> -->
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        netMiningFee
    } from '@/config/constant.js'
    import Approve from '@/utils/approve.js'
    import myAjax from '@/utils/ajax'
    import utils from '@/utils'
    import {
        dialogWidth
    } from '@/mixin/index'
    export default {
        name: 'net-mining-staking',
        components: {},
        mixins: [dialogWidth],
        props: {
            ids: {
                type: Array,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'views-net-mining-staking',
                isShowDialog: true,
                dialogLoading: true,
                stakingRarityMap: null,
                pledgeTimes: [{
                    id: 3,
                    title: this.$t('net-mining.3-day')
                }, {
                    id: 10,
                    title: this.$t('net-mining.10-days')
                }, {
                    id: 30,
                    title: this.$t('net-mining.30-days')
                }],
                pledgeParams: {
                    time: 3
                },
                balanceCount: 0
            }
        },
        computed: {
            needAmazing() {
                let feePrice = 0
                for (let key in this.stakingRarityMap) {
                    const count = this.stakingRarityMap[key].length
                    feePrice += utils.mul(count, netMiningFee[key])
                }
                return utils.mul(feePrice, this.pledgeParams.time)
            }
        },
        watch: {},
        created() {},
        mounted() {
            Promise.all([this.getUserTeamTokenBalance(), Approve.getChainInfo(0), ])
                .then(data => {
                    const [p1, contract_addr_abi] = data
                    this.contract_addr = contract_addr_abi.contract_addr
                    this.abi = contract_addr_abi.abi
                    this.dialogLoading = false
                })
            this.getPledgeQuantity()
        },
        beforeDestroy() {},
        methods: {
            getUserTeamTokenBalance() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/balance_query',
                        data: {
                            body: {
                                type: "amazing_team_token"
                            }
                        }

                    }).then(res => {
                        if (res.ok) {
                            this.balanceCount = (res.data || {}).balance || 0;
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            getPledgeQuantity() {
                const originMap = {}
                this.ids.map(x => {
                    originMap[x.rarity] = [...(originMap[x.rarity] || ''), x.goods_id]
                })
                this.stakingRarityMap = originMap
            },
            beforeApprove() {

            },
            stakingDialogClosed() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'views-net-mining-staking';

    .#{$prefixCls} {
        .content {
            .info-item {
                .tit {
                    height: .426666666666667rem;
                    line-height: .426666666666667rem;
                    color: #fff;
                    font-weight: bold;
                    font-size: .266666666666667rem;

                }

                .con {
                    display: flex;
                    margin: .16rem 0;
                    border: 1px solid #29374B;
                    border-radius: .133333333333333rem;

                    .con-item {
                        flex: 1;
                        text-align: center;
                        font-size: .24rem;

                        .key,
                        .val {
                            height: .533333333333333rem;
                            line-height: .533333333333333rem;
                            border-right: 1px solid #29374B;
                        }

                        .key {
                            border-bottom: 1px solid #29374B;
                        }

                        .val {
                            color: #fff;
                        }

                        &:last-child {

                            .key,
                            .val {
                                border-right: 0;
                            }
                        }
                    }
                }
            }

            .time-content {
                .time-list {
                    display: flex;
                    justify-content: space-between;
                    margin: .16rem 0;

                    li.time-item {
                        width: 1.733333333333333rem;
                        height: .48rem;
                        line-height: .48rem;
                        text-align: center;
                        border-radius: .133333333333333rem;
                        border: 1px solid #29374B;
                        color: #fff;
                        cursor: pointer;
                        font-size: .213333333333333rem;

                        &.select {
                            background: #32A3FF;
                        }
                    }
                }
            }

            .staking-row-tickets {
                margin-top: .293333333333333rem;
                border-radius: .133333333333333rem;
                color: #fff;
                border: 1px solid #29374B;
                overflow: hidden;

                .title {
                    padding: .16rem;
                    background-color: #29374B;
                    font-size: .213333333333333rem;
                    font-weight: bold;

                    .title-value {
                        font-size: .186666666666667rem;
                        font-weight: normal;
                    }
                }

                .main-info {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: .16rem;

                    .left {
                        img {
                            margin-right: .133333333333333rem;
                            width: .4rem;
                            vertical-align: middle;
                        }

                        .txt {
                            font-size: .266666666666667rem;
                            vertical-align: middle;
                        }
                    }

                    .right {
                        a {
                            display: block;
                            width: .8rem;
                            height: .4rem;
                            line-height: .4rem;
                            text-align: center;
                            color: #fff;
                            border-radius: .133333333333333rem;

                            &.exp {
                                background-color: $--color-primary;
                            }

                            &.buy {
                                background-color: #45B26B;
                            }
                        }
                    }
                }
            }

            .opt-btns {
                .el-button {
                    margin-top: .373333333333333rem;
                    width: 100%;
                    height: .8rem;
                    font-size: .32rem;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .content {
                .pledge-content {
                    .con {
                        .con-item {

                            .key,
                            .val {
                                height: 1rem;
                                line-height: 1rem;
                            }
                        }
                    }

                }

                .time-content {
                    .time-list {
                        li.time-item {
                            width: 2.4rem;
                            height: .9rem;
                            line-height: .9rem;
                        }
                    }
                }

                .staking-row-tickets {
                    a {
                        width: 1.6rem !important;
                        height: .8rem !important;
                        line-height: .8rem !important;
                    }
                }
            }
        }
    }
</style>