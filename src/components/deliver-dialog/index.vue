<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('common.deliver')" custom-class="deliver-dialog" :close-on-click-modal="false"
            :visible.sync="isShowDialog" @close="doClose" width="6.4rem" v-if="isShowDialog" v-loading="dialogLoading">
            <div class="content" v-loading="isLoading">
                <div class="addr">
                    <div class="tit">{{$t('common.enter-address')}}</div>
                    <el-input v-model="addressTxt" :placeholder="$t('common.enter-ad-tip')"></el-input>
                </div>
                <div class="remaining-times">
                    {{$t('common.remain-times')}}: <span>{{ userInfo.user_give_left_count }}</span>
                </div>
                <div class="tip">
                    {{$t('common.transferred-tip')}}
                </div>
                <el-button type="primary" :disabled="!addressTxt && user_give_left_count > 0" :loading="submitLoading"
                    @click="doNftApprove">
                    {{$t('common.deliver')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Approve from '@/utils/approve.js'
    import myAjax from '@/utils/ajax.js'
    import web3Tool from '@/utils/web3'
    import {
        mapState
    } from 'vuex'
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
                dialogLoading: false,
                submitLoading: false,
                addressTxt: '',
                user_give_left_count: '',
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.userInfo
            }),
        },
        watch: {},
        created() {
            Promise.all([Approve.getChainInfo(this.belong_type), Approve.getApproveAddress('nft')]).then(data => {
                const [contract_addr_abi, nft_approve_addr] = data
                this.contract_addr = contract_addr_abi.contract_addr
                this.abi = contract_addr_abi.abi
                this.nft_approve_addr = nft_approve_addr
                this.isLoading = false
            })
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            doClose() {
                this.$emit('close')
            },
            doDeliver(hash) {
                this.dialogLoading = true
                myAjax({
                    url: 'user/give/create',
                    data: {
                        body: {
                            owner_addr: this.userInfo.addr  || null,
                            belong_type: this.belong_type || 1,
                            goods_id: this.goods_id,
                            give_num: 1,
                            to_addr: this.addressTxt,
                            goods_name: this.goods_name,
                            approve_txn: hash
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$emit('sendOk')
                    }
                }).finally(() => {
                    this.submitLoading = this.dialogLoading = false
                })
            },
            doNftApprove() {
                this.submitLoading = true
                web3Tool.contract({
                    contractAddress: this.contract_addr || '',
                    abi: this.abi,
                    authAddr: this.nft_approve_addr,
                    amount: this.goods_id,
                    account: this.userInfo.addr || null,
                }).then(hash => {
                    this.doDeliver(hash)
                }).catch(err => {
                    this.submitLoading = false
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
                text-align: left;

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