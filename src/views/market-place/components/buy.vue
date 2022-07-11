<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('marketplace.title')" :visible.sync="isShowDialog" width="6.4rem"
            @closed="saleReviseDialogClosed" custom-class="sale-revise-dialog" :close-on-click-modal="false"
            v-loading="dialogLoading">
            <div v-loading="isLoading">
                <template>
                    <ul v-if="row.belong_type > 0">
                        <li class="item">
                            <div class="key">NFT ID:</div>
                            <div class="val">{{ row.goods_id }}</div>
                        </li>
                        <li class="item">
                            <div class="key">{{ $t("marketplace.nft-name")}}:</div>
                            <div class="val">{{ row.name }}</div>
                        </li>
                        <li class="item">
                            <div class="key">{{ $t("marketplace.price")}}:</div>
                            <div class="val">
                                <img class="amount-icon" src="../../../assets/images/group.png" alt=""
                                    v-if="row.payment_token_id == 1" />
                                <img class="amount-icon" src="../../../assets/images/busd.png" alt=""
                                    v-if="row.payment_token_id == 2" />
                                {{ row.amount | formatPriceData }} {{ row.payment_token_name }}
                            </div>
                        </li>
                    </ul>
                    <ul v-else>
                        <li class="item">
                            <div class="key">{{ $t("marketplace.commodity") }}:</div>
                            <div class="val">{{ row.rarity }}</div>
                        </li>
                        <li class="item">
                            <div class="key">{{ $t("marketplace.quantity") }}:</div>
                            <el-input-number v-model="num" :min="1" :max="row.num"></el-input-number>
                        </li>
                        <li class="item">
                            <div class="key">{{ $t("marketplace.total-price") }}:</div>
                            <div class="val">
                                <img class="amount-icon" src="../../../assets/images/group.png" alt=""
                                    v-if="row.payment_token_id == 1" />
                                <img class="amount-icon" src="../../../assets/images/busd.png" alt=""
                                    v-if="row.payment_token_id == 2" />
                                {{ totalPrice | formatPriceData }} {{ row.payment_token_name }}
                            </div>
                        </li>
                    </ul>
                </template>
                <div class="opt-btn">
                    <el-button class="btn" @click="doSubmit" :disabled="!hasBalance || !validQuantity"
                        :loading="submitLoading">
                        {{ !hasBalance ? $t("common.insufficient-balance") : $t("common.confirmed")}}
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Approve from '@/utils/approve.js'
    import Cookie from "@/utils/cookie.js";
    import myAjax from '@/utils/ajax.js'
    import web3Tool from '@/utils/web3'
    import utils from '@/utils/index'
    import {
        mapState
    } from 'vuex'
    export default {
        name: '',
        components: {},
        props: {
            row: {
                type: Object,
                require: true
            },
        },
        data() {
            return {
                prefixCls: 'views-ml-by',
                isLoading: true,
                dialogLoading: false,
                isShowDialog: true,
                submitLoading: false,
                num: 1,
                saleQuantity: 1,
                busd_balance: 0,
            }
        },
        computed: {
            validQuantity() {
                if (this.row.belong_type < 0) {
                    if (!this.num) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            },
            totalPrice() {
                if (!this.num) return 0
                return (this.row.unit_amount || this.row.amount) * this.num
            },
            ...mapState({
                userInfo: state => state.userInfo,
                adoge_balance: state => state.adoge_balance
            }),
            hasBalance() {
                if (this.row.payment_token_id == 1) {
                    return this.adoge_balance >= this.totalPrice
                } else if (this.row.payment_token_id == 2) {
                    return this.busd_balance >= this.totalPrice
                } else {
                    return false
                }
            }
        },
        watch: {},
        created() {},
        async mounted() {
            let data = null
            if (this.row.payment_token_id == 1) {
                data = await Approve.getChainInfo(5)
            } else if (this.row.payment_token_id == 2) {
                data = await Approve.getTokenContractInfo(this.row.payment_token_id)
            }
            if (this.row.payment_token_id == 2) {
                await this.getBusdBalance()
            }


            this.contract_addr = data.contract_addr
            this.abi = data.abi
            this.isLoading = false
        },
        beforeDestroy() {},
        methods: {
            getBusdBalance() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/balance_query',
                        data: {
                            body: {
                                type: 'busd_token'
                            }
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.busd_balance = (res.data || {}).balance || 0
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            doSubmit() {
                if (this.userInfo.addr === this.row.owner_addr) {
                    return this.$showError(this.$t("marketplace.do-not-buy"))
                }
                this.submitLoading = true
                myAjax({
                    url: 'goods/market/order/locking',
                    data: {
                        body: {
                            record_id: this.row.record_id
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        if (res.data.is_lockng) {
                            this.$showError(this.$t("marketplace.order-locked"))
                            this.submitLoading = false
                        } else {
                            Approve.getApproveAddress('token').then(token_approve_addr => {
                                this.token_approve_addr = token_approve_addr
                                this.doNftApprove()
                            })
                        }
                    }
                })
            },
            doNftApprove() {
                let amount
                if (this.row.payment_token_id == 1) {
                    amount = '500000000000000000000000000'
                } else if (this.row.payment_token_id == 2) {
                    amount = BigInt(utils.mul(this.totalPrice, 1000000000000000000) + 10000000000000000000)
                }
                web3Tool.contract({
                    contractAddress: this.contract_addr || '',
                    abi: this.abi,
                    authAddr: this.token_approve_addr,
                    amount: String(amount),
                    account: Cookie.getCookie("__account__") || null,
                }).then(hash => {
                    this.sendBuy(hash)
                }).catch(err => {
                    this.submitLoading = false
                })
            },
            sendBuy(hash) {
                if (this.row.belong_type < 0 && !this.row.num) return
                this.dialogLoading = true
                let url = 'goods/market/buy/goods',
                    params = {
                        record_id: this.row.record_id,
                        pay_amount: (this.row.unit_amount || this.row.amount) * (this.num || 1),
                        amount: (this.row.unit_amount || this.row.amount),
                        remark: '',
                        num: this.num || 1,
                        type: this.row.belong_type < 0 ? 2 : 1,
                        approve_txn: hash
                    };
                myAjax({
                    url,
                    data: {
                        body: params
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$emit('sendBuyOk')
                    }
                }).finally(() => {
                    this.dialogLoading = this.submitLoading = false
                })
            },
            saleReviseDialogClosed() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-ml-by";

    .#{$prefixCls} {
        .sale-revise-dialog {
            .el-dialog__header {
                padding: 0.373333333333333rem 0.266666666666667rem 0 0.266666666666667rem;
            }

            .el-dialog__body {
                padding: 0.533333333333333rem 0.266666666666667rem;
            }

            ul {
                .item {
                    display: flex;
                    margin-bottom: .4rem;
                    justify-content: space-between;
                    align-items: center;
                    font-size: .266666666666667rem;

                    .key {
                        color: #777E90;
                    }

                    .val {
                        text-align: right;
                        flex: 1;
                        color: #fff;
                    }

                    .amount-icon {
                        width: .2667rem;
                        height: .2667rem;
                        margin-right: .1467rem;
                        vertical-align: middle;
                    }

                    .el-input-number {
                        width: 2.133333333333333rem;
                        line-height: .533333333333333rem;

                        .el-input-number__decrease,
                        .el-input-number__increase {
                            width: .533333333333333rem;
                            background: #32A3FF;
                            color: #fff;
                            border: 0;
                        }

                        .el-input__inner {
                            height: .533333333333333rem;
                            padding: 0;
                            background: #1D2633;
                            border: 0;
                            color: #fff;
                        }

                        .is-disabled {
                            background: #777E90;
                        }
                    }
                }
            }

            .tit {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 600;
                color: #777e90;
                font-size: 0.32rem;

                .mini-tip {
                    font-size: .213333333333333rem;
                }
            }

            .input-box {
                display: flex;
                align-items: center;
                padding: 0.2rem 0;
                // margin: 0.133333333333333rem 0 0.293333333333333rem;
                font-size: 0.32rem;
                border-radius: 0.133333333333333rem;
                // background: #1d2633;

                .label {
                    // padding-left: 0.65rem;
                    width: 1.933333333333333rem;
                    height: 0.666666666666667rem;
                    line-height: 0.666666666666667rem;
                    color: $--color-primary;
                    font-weight: bold;
                    // background: url("../../../assets/images/info.png");
                    // background-repeat: no-repeat;
                    // background-position: 0.133333333333333rem center;
                    // background-size: 0.32rem 0.32rem;
                    // border-right: 1px solid #131922;
                }

                .el-input {
                    flex: 1;
                }

                .el-input__inner {
                    padding: 0.12rem 0.26rem;
                    height: 0.666666666666667rem;
                    color: #fff;
                    font-weight: 500;
                    font-size: 0.426666666666667rem;
                    background: transparent;
                    border: 0;

                    &::placeholder {
                        color: #777e90;
                        font-size: 0.24rem;
                    }
                }
            }

            .price-tip {
                padding-bottom: 0.133333333333333rem;
                text-align: center;
                color: $--color-warning;
                font-size: 0.186666666666667rem;
            }

            .opt-btn {
                .btn {
                    width: 100%;
                    height: 0.8rem;
                    text-align: center;
                    border: 0;
                    font-size: 0.32rem;
                    color: #fff;
                    border-radius: 0.133333333333333rem;
                    background: #00a73a;
                    cursor: pointer;

                    &.is-disabled {
                        background: #777E90;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
</style>