<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('account.sale')" :visible.sync="isShowDialog" width="6.4rem"
            @closed="saleReviseDialogClosed" custom-class="sale-revise-dialog" :close-on-click-modal="false">
            <!-- 有Num表示是碎片或礼包 -->
            <template v-if="row.num">
                <ul>
                    <li class="item">
                        <div class="key">{{ $t("account.available") }}</div>
                        <div class="val">{{ row.num }}</div>
                    </li>
                    <li class="item">
                        <div class="key">{{ $t("account.quantity-for-sale") }}</div>
                        <div class="val">
                            <el-input-number v-model="saleQuantity" :min="1" :max="row.num"></el-input-number>
                        </div>
                    </li>
                    <li class="input-box">
                        <div class="label">
                            <span>Adoge</span>
                        </div>
                        <el-input v-model="salePrice" :placeholder="$t('common.please-enter-unit-price')"
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
                    <div class="label">
                        <span>Adoge</span>
                    </div>
                    <el-input v-model="salePrice" :placeholder="$t('common.please-enter-price')"
                        onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                </div>
                <p class="price-tip">{{$t("common.net-price-modified-tip")}}</p>
            </template>
            <div class="opt-btn">
                <button class="btn" :class="{'confirmed': salePrice.length}"
                    @click="doSubmit">{{$t("common.confirmed") }} </button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Cookie from "@/utils/cookie.js";
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
                isLoading: false,
                isShowDialog: true,
                salePrice: '',
                saleQuantity: 1,
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {
            if (this.row.belong_type < 0) return
            this.getChainInfo()
            this.getContractAddress()
        },
        beforeDestroy() {},
        methods: {
            getContractAddress() {
                myAjax({
                    url: 'chain/approve_addr',
                    method: 'GET'
                }).then(res => {
                    this.approve_addr = res.data.approve_addr
                })
            },
            getChainInfo() {
                myAjax({
                    url: `chain/chain_info?belong_type=${this.row.belong_type}`,
                    method: 'GET',

                }).then(res => {
                    this.contract_addr = res.data.contract_addr
                    this.abi = res.data.abi
                })
            },
            doSubmit() {
                if (this.row.belong_type < 0) {
                    this.sendSale()
                } else {
                    this.doNftApprove()
                }
            },
            doNftApprove() {
                web3Tool.contract.call(this, {
                    contractAddress: this.contract_addr || '',
                    abi: this.abi,
                    authAddr: this.approve_addr,
                    amount: this.row.goods_id,
                    account: Cookie.getCookie("__account__") || null,
                }).then(hash => {
                    this.sendSale(hash)
                })
            },
            sendSale(hash) {
                console.log('111')
                if (!this.salePrice) return
                let url = '',
                    params = {}
                if (this.row.num) {
                    url = 'goods/sale/others'
                    params = {
                        type_id: this.row.type_id,
                        amount: Number(this.salePrice),
                        num: this.saleQuantity,
                        tx: hash,
                        belong_type: this.row.belong_type
                    }
                } else {
                    url = 'goods/sale/nft'
                    params = {
                        amount: Number(this.salePrice),
                        goods_id: this.row.goods_id,
                        tx: hash,
                        type_id: this.row.type_id,
                        belong_type: this.row.belong_type
                    }
                }
                this.isLoading = true
                myAjax({
                    url,
                    data: {
                        body: params
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$emit('sendSaleOk')
                    }
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
                    line-height: 0.8rem;
                    text-align: center;
                    border: 0;
                    font-size: 0.32rem;
                    color: #fff;
                    border-radius: 0.133333333333333rem;
                    background: #777e90;
                    cursor: not-allowed;

                    &.confirmed {
                        background: #00a73a;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>