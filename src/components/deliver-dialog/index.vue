<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('common.deliver')" custom-class="deliver-dialog" :close-on-click-modal="false"
            :visible.sync="isShowDialog" @close="doClose" width="6.4rem" v-if="isShowDialog" v-loading="isLoading">
            <div class="content">
                <div class="addr">
                    <div class="tit">{{$t('common.enter-address')}}</div>
                    <el-input v-model="addressTxt" :placeholder="$t('common.enter-ad-tip')"></el-input>
                </div>
                <div class="remaining-times">
                    {{$t('common.remain-times')}}: <span>{{ user_give_left_count }}</span>
                </div>
                <div class="tip">
                    {{$t('common.transferred-tip')}}
                </div>
                <el-button type="primary" :disabled="!addressTxt && user_give_left_count > 0" @click="doNftApprove">
                    {{$t('common.deliver')}}</el-button>
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
        components: {

        },
        props: {
            goods_id: {
                type: Number,
                require: true
            },
            goods_name: {
                type: String,
                require: true
            },
            belong_type: {
                type: Number,
                require: true
            },
            addr: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'deliver-dialog',
                isShowDialog: true,
                isLoading: true,
                addressTxt: '',
                user_give_left_count: '',
            }
        },
        computed: {},
        watch: {},
        created() {
            Promise.all([this.getChainInfo(), this.getUserInfo(), this.getContractAddress()]).then(res => {
                this.isLoading = false
            })
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            getContractAddress() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'chain/approve_addr',
                        method: 'GET'
                    }).then(res => {
                        this.approve_addr = res.data.approve_addr
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })

            },
            getUserInfo() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: `user/user_info`,
                        data: {
                            body: {
                                addr: this.addr
                            }
                        }

                    }).then(res => {
                        this.user_give_left_count = res.data.user_give_left_count
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            getChainInfo() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: `chain/chain_info?belong_type=${this.belong_type}`,
                        method: 'GET',

                    }).then(res => {
                        this.contract_addr = res.data.contract_addr
                        this.abi = res.data.abi
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            doClose() {
                this.$emit('close')
            },
            doDeliver(hash) {
                myAjax({
                    url: 'user/give/create',
                    data: {
                        body: {
                            owner_addr: Cookie.getCookie("__account__") || null,
                            belong_type: this.belong_type || 1,
                            goods_id: this.goods_id,
                            give_num: 1,
                            to_addr: this.addressTxt,
                            goods_name: this.goods_name,
                            tx: hash
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$emit('sendOk')
                    }
                })
            },
            doNftApprove() {
                web3Tool.contract.call(this, {
                    contractAddress: this.contract_addr || '',
                    abi: this.abi,
                    authAddr: this.approve_addr,
                    amount: this.goods_id,
                    account: Cookie.getCookie("__account__") || null,
                }).then(hash => {
                    this.doDeliver(hash)
                })
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "deliver-dialog";

    .#{$prefixCls} {
        .deliver-dialog {
            .content {
                color: #777E90;

                .addr {
                    .tit {
                        font-size: .3rem;
                    }

                    .el-input {
                        input {
                            margin: .08rem 0;
                            height: 1.066666666666667rem;
                            line-height: 1.066666666666667rem;
                            background: #1D2633;
                            font-size: .24rem;
                            color: #777E90;
                            border-radius: .133333333333333rem;
                            border: 0;

                            &::-webkit-input-placeholder {
                                color: #777E90;

                            }
                        }
                    }
                }

                .remaining-times {
                    font-size: .24rem;
                }

                .tip {
                    margin: .426666666666667rem auto .15rem;
                    color: #FD671D;
                    text-align: center;
                }

                .el-button {
                    background-color: #F1AE00;
                    width: 100%;
                    border: 0;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    padding: 0;
                    font-size: .32rem;
                    border-radius: .133333333333333rem;

                    &.is-disabled {
                        background: #777E90;
                    }
                }

            }
        }
    }
</style>