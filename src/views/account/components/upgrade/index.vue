<template>
    <div :class="prefixCls">
        <el-dialog custom-class="upgrade-dialog" :close-on-click-modal="false" top="11vh" :visible.sync="isShowDialog"
            :width="dialogWidth" @close="upgradeDialogClosed" v-if="isShowDialog" :show-close="!submitLoading">
            <div slot="title">
                <div class="upgrade-thing">
                    <img src="./images/sliver/main.png" alt="" v-if="row.type_id == 16">
                    <img src="./images/gold/main.png" alt="" v-if="row.type_id == 17">
                </div>
            </div>
            <div v-loading="isLoading">
                <div class="upgrade-content">
                    <div class="arrow-icon">
                        <img src="../compound/images/arrow.png" alt="">
                    </div>
                    <div class="debris-list">
                        <div class="debris-thing">
                            <img src="./images/copper/small.png" alt="" v-if="row.type_id == 16">
                            <img src="./images/sliver/small.png" alt="" v-if="row.type_id == 17">
                            <div class="count-info">
                                <span class="has-count">{{ 1 }} </span>
                                /
                                <span class="consume-count">{{ 1 }}</span>
                            </div>
                        </div>
                        <img src="./images/add.png" alt="">
                        <div class="debris-thing">
                            <img src="./images/amazing-adoge.png" alt="">
                            <div class="count-info">
                                <span class="has-count">{{ amazingAdogeBalance }} </span>
                                /
                                <span class="consume-count">{{ row.type_id == 16 ? 2000 : 4000 }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="tip-content">
                        <template
                            v-if="row.type_id == 16">{{ $t("ego-wall.you-will-burn-1-Bronze-Flatbread")}}</template>
                        <template
                            v-if="row.type_id == 17">{{ $t("ego-wall.you-will-burn-1-Silver-Flatbread")}}</template>
                    </div>
                    <el-button type="primary" :loading="submitLoading" @click="doNftApprove">
                        {{ $t("ego-wall.upgrade") }}</el-button>
                </div>
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
        components: {},
        props: {
            row: {
                type: Object,
                require: true
            },
        },
        data() {
            return {
                prefixCls: 'views-account-upgrade',
                isShowDialog: true,
                isLoading: true,
                submitLoading: false,
                dialogWidth: '480px',
                amazingAdogeBalance: '',
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.userInfo
            }),
        },
        watch: {},
        created() {},
        mounted() {
            let width = window.innerWidth;
            if (width < 768) {
                this.dialogWidth = "8.9rem";
            }
            Promise.all([this.getBalance(), Approve.getChainInfo(0), Approve.getChainInfo(this.row.belong_type), Approve
                .getApproveAddress(
                    'nft'), Approve.getApproveAddress('token')
            ]).then(data => {
                const [p1, token_contract_addr_abi, nft_contract_addr_abi, nft_approve_addr,
                token_approve_addr] = data
                this.nftInfo = {
                    contract_addr: nft_contract_addr_abi.contract_addr,
                    abi: nft_contract_addr_abi.abi
                }
                this.tokenInfo = {
                    contract_addr: token_contract_addr_abi.contract_addr,
                    abi: token_contract_addr_abi.abi
                }
                this.nft_approve_addr = nft_approve_addr
                this.token_approve_addr = token_approve_addr
                this.isLoading = false
            })
        },
        beforeDestroy() {},
        methods: {
            upgradeDialogClosed() {
                this.$emit('close')
            },
            doNftApprove() {
                this.submitLoading = true
                web3Tool.contract({
                    contractAddress: this.nftInfo.contract_addr || '',
                    abi: this.nftInfo.abi,
                    authAddr: this.nft_approve_addr,
                    amount: this.row.goods_id,
                    account: this.userInfo.addr || null,
                }).then(hash => {
                    this.nftHash = hash
                    this.doTokenApprove()
                })
            },
            doTokenApprove() {
                web3Tool.contract({
                    contractAddress: this.tokenInfo.contract_addr || '',
                    abi: this.tokenInfo.abi,
                    authAddr: this.token_approve_addr,
                    amount: '50000000000000000000',
                    account: this.userInfo.addr || null,
                }).then(hash => {
                    this.tokenHash = hash
                    this.doSend()
                }).catch(err => {
                     this.submitLoading = false
                })
            },
            doSend() {
                if (!this.nftHash || !this.tokenHash) return
                myAjax({
                    url: 'user/btc/upgrade',
                    data: {
                        body: {
                            goods_id: this.row.goods_id,
                            nft_approve_txn: this.nftHash,
                            token_approve_txn: this.tokenHash
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        this.submitLoading = false
                        this.$showOk(this.$t("common.ope-suc"))
                        this.$emit('submitOk')
                    }
                }).finally(() => {
                    this.submitLoading = false
                })
            },
            getBalance() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/balance_query',
                        data: {
                            body: {
                                type: 'amazing_team_token'
                            }
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.amazingAdogeBalance = res.data.balance
                        }
                        resolve()
                    })
                })
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account";

    .#{$prefixCls} {
        .upgrade-dialog {
            .el-dialog__header {
                padding: 0;
            }

            .el-dialog__body {
                padding: 0;
            }
        }

        .upgrade-thing {
            img {
                width: 100%;
            }
        }

        .upgrade-content {
            padding-bottom: .4rem;
            text-align: center;



            .arrow-icon {
                margin: .266666666666667rem 0;
                text-align: center;

                img {
                    width: .426666666666667rem;

                }
            }

            .debris-list {
                display: flex;
                align-items: center;

                img {
                    width: .24rem;
                    height: .24rem;
                }

                .debris-thing {
                    position: relative;
                    width: 2.133333333333333rem;
                    height: 2.133333333333333rem;
                    padding-top: .2rem;
                    text-align: center;
                    margin: 0 auto;
                    border: 2px solid #29374B;
                    border-radius: .266666666666667rem;

                    img {
                        width: 1.6rem;
                        height: 1.6rem;
                    }

                    .count-info {
                        position: absolute;
                        bottom: -.24rem;
                        left: 50%;
                        width: 1.6rem;
                        height: .48rem;
                        padding: 0 .16rem;
                        line-height: .48rem;
                        text-align: center;
                        border: 2px solid #777E90;
                        border-radius: .266666666666667rem;
                        font-size: .24rem;
                        color: #777E90;
                        background: #131922;
                        transform: translateX(-50%);
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        .has-count {
                            color: #00A73A;
                        }
                    }
                }
            }

            .tip-content {
                width: 5.453333333333333rem;
                margin-top: .533333333333333rem;
                margin: .53rem auto;
                text-align: center;
                color: #777E90;
            }

            .el-button {
                margin: 0 auto;
                width: 5.866666666666666rem;
                height: .8rem;
                font-size: .293333333333333rem;
                font-weight: bold;
                background: #9E00FF;
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .content {
                padding-bottom: .8rem;

                .arrow-icon {
                    img {
                        width: .8rem;
                    }
                }

                .tip-content {
                    width: 100%;
                    padding: .4rem;
                }

                .el-button {
                    width: 7.866666666666666rem;
                    height: 1.333333333333333rem;
                    font-size: .586666666666667rem;
                }

                .debris-list {
                    padding: 0 1.013333333333333rem;

                    >img {
                        width: .48rem;
                        height: .48rem;
                    }

                    .debris-thing {
                        padding-top: .1rem;
                        width: 2.666666666666667rem;
                        height: 2.666666666666667rem;

                        img {
                            width: 2.133333333333333rem;
                            height: 2.133333333333333rem;
                        }

                        .count-info {
                            width: 2.4rem;
                            bottom: -.55rem;
                            height: .8rem;
                            line-height: .8rem;
                            border-radius: .533333333333333rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }

        }
    }
</style>