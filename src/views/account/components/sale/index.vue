<template>
    <div :class="prefixCls">
        <el-dialog :title="row.amount ? $t('account.revise') : $t('account.sale')" :visible.sync="isShowDialog"
            width="6.4rem" @close="saleReviseDialogClosed" custom-class="sale-revise-dialog"
            :show-close="!submitLoading" :close-on-click-modal="false">
            <!-- 有Num表示是碎片或礼包 -->
            <div v-loading="isLoading">
                <template v-if="row.belong_type < 0">
                    <ul>
                        <li class="item">
                            <div class="key">{{ $t("account.available") }}</div>
                            <div class="val">{{ row.num }}</div>
                        </li>
                        <li class="item">
                            <div class="key">{{ $t("account.quantity-for-sale") }}</div>
                            <div class="val">
                                <el-input-number v-model="saleQuantity" :min="1" :max="row.num" :disabled="row.amount">
                                </el-input-number>
                            </div>
                        </li>
                        <li class="input-box">
                            <div class="label" :class="{'busd': row.payment_token_id == 2}">
                                <span>{{ row.payment_token_name }}</span>
                            </div>
                            <el-input v-model="salePrice" :placeholder="$t('common.please-enter-unit-price')" maxlength='11'
                                onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <p class="tit">
                        <span>{{ $t("account.price") }}</span>
                        <span class="mini-tip">{{ $t("account.sale-price-mini") }}</span>
                    </p>
                    <div class="input-box">
                        <div class="label" :class="{'busd': row.payment_token_id == 2}">
                            <span>{{ row.payment_token_name }}</span>
                        </div>
                        <el-input v-model="salePrice" :placeholder="$t('common.please-enter-price')" maxlength='11'
                            onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                    </div>
                    <p class="price-tip" v-if="row.amount">{{$t("common.net-price-modified-tip")}}</p>
                </template>
                <div class="opt-btn">
                    <el-button class="btn" :disabled="!salePrice.length || ( salePrice > 30000000000)" :loading="submitLoading" v-debounce="doSubmit">
                        {{$t("common.confirmed") }} </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Cookie from "@/utils/cookie.js";
    import Approve from '@/utils/approve.js'
    import myAjax from '@/utils/ajax.js'
    import web3Tool from '@/utils/web3'
    export default {
        name: '',
        components: {},
        props: {
            row: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'views-account-sale',
                isLoading: true,
                isShowDialog: true,
                submitLoading: false,
                salePrice: '',
                saleQuantity: 1,
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {
            if (this.row.amount) {
                this.salePrice = this.row.amount
                this.saleQuantity = this.row.num
            }
            if (this.row.belong_type < 0 || this.row.amount) {
                this.isLoading = false
                return false
            }
            Promise.all([Approve.getChainInfo(this.row.belong_type), Approve.getApproveAddress('nft')]).then(data => {
                const [contract_addr_abi, nft_approve_addr] = data
                this.contract_addr = contract_addr_abi.contract_addr
                this.abi = contract_addr_abi.abi
                this.approve_addr = nft_approve_addr
                this.isLoading = false
            })
        },
        beforeDestroy() {},
        methods: {
            doSubmit() {
                if (!this.salePrice) return
                if (this.row.belong_type < 0 || this.row.amount) {
                    this.sendSale()
                } else {
                    this.doNftApprove()
                }
            },
            doNftApprove() {
                this.submitLoading = true
                web3Tool.contract({
                    contractAddress: this.contract_addr || '',
                    abi: this.abi,
                    authAddr: this.approve_addr,
                    amount: this.row.goods_id,
                    account: Cookie.getCookie("__account__") || null,
                }).then(hash => {
                    this.sendSale(hash)
                }).catch(err => {
                    this.submitLoading = false
                })
            },
            sendSale(hash) {
                if (!this.salePrice) return
                this.submitLoading = true
                let url = '',
                    params = {}
                if (this.row.belong_type < 0) {
                    if (this.row.amount) {
                        url = 'goods/sale/others/update'
                        params = {
                            amount: Number(this.salePrice),
                            type_id: this.row.type_id,
                            record_id: this.row.record_id
                        }
                    } else {
                        url = 'goods/sale/others'
                        params = {
                            type_id: this.row.type_id,
                            amount: Number(this.salePrice),
                            num: this.saleQuantity,
                            approve_txn: hash,
                            belong_type: this.row.belong_type
                        }
                    }

                } else {
                    if (this.row.amount) {
                        url = 'goods/sale/nft/update'
                        params = {
                            amount: Number(this.salePrice),
                            goods_id: this.row.goods_id,
                            record_id: this.row.record_id
                        }
                    } else {
                        url = 'goods/sale/nft'
                        params = {
                            goods_id: this.row.goods_id,
                            type_id: this.row.type_id,
                            amount: Number(this.salePrice),
                            num: this.saleQuantity,
                            approve_txn: hash,
                            belong_type: this.row.belong_type
                        }
                    }
                }
                myAjax({
                    url,
                    data: {
                        body: params
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$emit('sendSaleOk')
                    }
                }).finally(() => {
                    this.submitLoading = false
                })
            },
            saleReviseDialogClosed() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account-sale";

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
                margin: 0.133333333333333rem 0 0.293333333333333rem;
                font-size: 0.32rem;
                border-radius: 0.133333333333333rem;
                background: #1d2633;

                .label {
                    padding-left: 0.65rem;
                    width: 1.933333333333333rem;
                    height: 0.666666666666667rem;
                    line-height: 0.666666666666667rem;
                    color: $--color-primary;
                    font-weight: bold;
                    background: url("../../../../assets/images/info.png");
                    background-repeat: no-repeat;
                    background-position: 0.133333333333333rem center;
                    background-size: 0.32rem 0.32rem;
                    border-right: 1px solid #131922;
                    &.busd {
                        background-image: url('../../../../assets/images/busd.png');
                    }
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
                    &.is-disabled {
                        background: #777E90;
                    }
                }
            }
        }
    }
</style>