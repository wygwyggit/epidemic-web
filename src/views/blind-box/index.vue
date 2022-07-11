<template>
    <div :class="prefixCls">
        <div class="banner">
            <div class="before-txt">
                <span>
                    {{ $t("blind-box.open-blind-box") }}
                </span>
                <el-popover placement="bottom-start" width="340" trigger="click" :visible-arrow="false"
                    popper-class="el-popover-black">
                    <div class="pop-tip" slot="reference">{{ $t("blind-box.rules") }}</div>
                    <div class="item">
                        <p class="highlight-color">
                            {{ $t("blind-box.pay-with-adoge-tokens") }}
                        </p>
                        <p>
                            <span class="highlight-color">{{ $t("account.price") }}:</span>
                            {{ $t("blind-box.price-int") }}
                        </p>
                        <p>
                            <span class="highlight-color">{{ $t("blind-box.limit") }}:</span>
                            {{ $t("blind-box.limit-int") }}
                        </p>
                        <p>
                            <span class="highlight-color">{{ $t("blind-box.probability") }}:</span>
                            {{ $t("blind-box.probability-int") }}
                        </p>
                    </div>
                    <div class="item">
                        <p class="highlight-color">
                            {{ $t("blind-box.invitation-reward") }}
                        </p>
                        <p>
                            {{ $t("blind-box.invitation-reward-int") }}
                        </p>
                    </div>
                </el-popover>
            </div>

            <div class="blind-box"></div>
            <div class="buy-history" @click="openBuyHistoryDialog(true)">
                {{ $t("blind-box.history") }}
            </div>
            <div class="buy-history-h5" @click="openBuyHistoryDrawer"></div>
        </div>
        <div class="content-box">
            <p>
                {{ $t("blind-box.open-tip-l") }}
                <span class="num">{{ (userInfo && userInfo.left_chance) || 0 }}</span>
                {{ $t("blind-box.open-tip-r") }}
            </p>
            <div class="open-btn-info">
                <div class="ipt">10,000,000Adoge/BOX</div>
                <el-button type="primary" disabled @click="openBlindBox" :loading="isLoading">
                    <span v-if="!isLoading">售罄</span></el-button>
            </div>
        </div>
        <div class="invitation-reward">
            <div class="w">
                <div class="left">
                    <p class="label">{{ $t("blind-box.your-invitation") }}</p>
                    <div class="val">
                        <span class="val-t">{{ userInfo && userInfo.promo_link }}</span>
                        <el-button type="primary" @click="copyLink">{{
              $t("blind-box.copy")
            }}</el-button>
                    </div>
                    <p class="small-tip">{{ $t("blind-box.invitation-reward-txt") }}</p>
                </div>
                <!-- <div class="right">
                    <p class="label">{{ $t("blind-box.you-reward") }}</p>
                    <div class="val">
                        <span class="val-t">{{ userInfo && userInfo.award }}
                            <i v-if="userInfo">Adoge</i></span>
                        <el-button type="primary" @click="reciveReward">{{
              $t("blind-box.receive")
            }}</el-button>
                    </div>
                </div> -->
            </div>
        </div>
        <el-dialog :title="resultTxt" custom-class="blindBox-dialog" :visible.sync="isShowResultDialog"
            :close-on-click-modal="false" :width="dialogWidth">
            <div class="dialog-content" v-loading="openIsLoading">
                <template v-if="!openIsLoading">
                    <div class="dialog-info">
                        <template v-if="openResultType === 1">
                            <div class="index"># {{ nft_info.id }}</div>
                            <div class="img-box">
                                <img :src="netImgBaseUrl + nft_info.image_url" alt="" />
                            </div>
                            <div class="name">
                                {{ nft_info.name }}
                            </div>
                            <p class="lv">Lv-{{ nft_info.class }}</p>
                            <p class="txt" :class="nft_info.color">
                                {{ $t("account." + nft_info.color + "") }}
                            </p>
                        </template>
                        <template v-if="openResultType === 2">
                            <div class="token-img-box">
                                <img src="../../assets/images/reward-token.png" alt="" />
                            </div>
                            <div class="token-num">
                                <p class="num">{{ token_info && token_info.amount }}</p>
                                <p class="sub-txt">Adoge token</p>
                            </div>
                        </template>
                    </div>
                    <div class="accept-btn" @click="doAccept">
                        {{ $t("common.accept") }}
                    </div>
                </template>
            </div>
        </el-dialog>
        <el-dialog :width="dialogWidth" custom-class="loading-dialog" :close-on-click-modal="false" :show-close="false"
            :visible.sync="isShowLoadingDialog">
            <div class="loading-content" v-loading="isShowLoadingDialog"
                :element-loading-text="$t('common.wait-serve')"></div>
        </el-dialog>
        <el-dialog :visible.sync="isShowBuyHistoryDialog" width="12rem" custom-class="buy-history-dialog"
            :close-on-click-modal="false">
            <div slot="title">
                <img src="../../assets/images/clock.png" alt="" width="24" height="24" />
                <span>
                    {{ $t("blind-box.blindbox-history") }}
                </span>
            </div>
            <div class="content" v-loading="buyHLoading">
                <table v-if="!buyHLoading">
                    <thead>
                        <th>ID</th>
                        <th>Txn Hash</th>
                        <th>Date UTC</th>
                        <th>Prize</th>
                        <th>Receive</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) of buy_history_list" :key="index">
                            <td class="hot">
                                {{ item.order_id }}
                            </td>
                            <td class="hot hash">
                                {{ item.txn_hash }}
                            </td>
                            <td>
                                {{ item.date_time }}
                            </td>
                            <td class="hot">
                                {{ item.prize }}
                            </td>
                            <td>
                                <template v-if="item.received == 0 && item.type == 1">
                                    <el-button type="primary" @click="doReceived(item.order_id)">{{
                    $t("blind-box.receive")
                  }}</el-button>
                                </template>
                                <template v-else-if="item.received == 0 && item.type == 2">
                                    <span>{{$t("blind-box.receive")}}</span>
                                </template>
                                <template v-else-if="item.received == 1">
                                    <span>Received</span>
                                </template>
                                <template v-else-if="item.received == 2">
                                    <span>Receiving...</span>
                                </template>
                                <template v-else-if="item.received == 3">
                                    <span>fail</span>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page r" v-if="buy_history_list.length && !buyHLoading">
                    <el-pagination background layout="total, sizes, prev, pager, next" @size-change="onSizeChange"
                        @current-change="onPageChange" @prev-click="onPageChange" @next-click="onPageChange"
                        :page-size="Number(page.pageSize)" :total="Number(total)" :current-page="Number(page.curPage)"
                        :page-sizes="[10, 20, 50, 100]">
                    </el-pagination>
                </div>
            </div>
        </el-dialog>
        <el-drawer :visible.sync="buyHistoryDrawer" direction="btt">
            <div slot="title">
                <img src="../../assets/images/clock.png" alt="" />
                <span>
                    {{ $t("blind-box.blindbox-history") }}
                </span>
            </div>
            <div class="content">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Txn Hash</th>
                        <th>Date UTC</th>
                        <th>Prize</th>
                        <th>Receive</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) of buy_history_list" :key="index">
                            <td class="hot">
                                {{ item.order_id }}
                            </td>
                            <td class="hot hash">
                                {{ item.txn_hash }}
                            </td>
                            <td>
                                {{ item.date_time }}
                            </td>
                            <td class="hot">
                                {{ item.prize }}
                            </td>
                            <td>
                                <template v-if="item.received == 0 && item.type == 1">
                                    <el-button type="primary" @click="doReceived(item.order_id)">{{
                    $t("blind-box.receive")
                  }}</el-button>
                                </template>
                                <template v-else-if="item.received == 0 && item.type == 2">
                                    <span>{{$t("blind-box.receive")}}</span>
                                </template>
                                <template v-else-if="item.received == 1">
                                    <span>Received</span>
                                </template>
                                <template v-else-if="item.received == 2">
                                    <span>Receiving...</span>
                                </template>
                                <template v-else-if="item.received == 3">
                                    <span>fail</span>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page r" v-if="buy_history_list.length && !buyHLoading">
                    <el-pagination background layout="total, sizes, prev, pager, next" @size-change="onSizeChange2"
                        @current-change="onPageChange2" @prev-click="onPageChange2" @next-click="onPageChange2"
                        :page-size="Number(page.pageSize)" :total="Number(total)" :current-page="Number(page.curPage)"
                        :page-sizes="[10, 20, 50, 100]">
                    </el-pagination>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import Vue from "vue";
    import VueClipboard from "vue-clipboard2";
    import eventBus from "@/utils/eventBus";
    import myAjax from "@/utils/ajax.js";
    import cookie from "@/utils/cookie.js";
    import web3Tool from '@/utils/web3'
    import {
        netImgBaseUrl,
        payAddress,
        payAmount,
        contractAddress,
    } from "@/config/config.js";
    import VOTE_ABI from "@/contracts/vote.js";
    export default {
        name: "home",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "views-blind-box",
                isLoading: true,
                isCanOpen: false,
                total: 0,
                contract: null,
                isShowResultDialog: false,
                openIsLoading: false,
                isShowLoadingDialog: false,
                isShowBuyHistoryDialog: false,
                buyHistoryDrawer: false,
                netImgBaseUrl,
                dialogWidth: "400px",
                userInfo: null,
                page: {
                    curPage: 1,
                    pageSize: 10
                },
                openResultType: "",
                nft_info: null,
                token_info: null,
                buy_history_list: [],
                buyHLoading: false
            };
        },
        computed: {
            resultTxt() {
                return this.$t("common.result");
            },
        },
        watch: {},
        async created() {
            Promise.all([this.initData(), this.getOpenStatus()]).then(() => {
                this.isLoading = false
            })
        },
        mounted() {
            eventBus.$on("connect", () => {
                this.initData().then(() => {
                    this.openBlindBox();
                });
            });
            let width = window.innerWidth;
            if (width < 768) {
                this.dialogWidth = "8.9rem";
            }
            Vue.use(VueClipboard);
        },
        beforeDestroy() {},
        methods: {
            getOpenStatus() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'nft/blindbox_status',
                        method: 'GET'
                    }).then(res => {
                        this.isCanOpen = (res.data || {}).blindbox_status || false
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })

            },
            onSizeChange(size) {
                this.page.curPage = 1
                this.page.pageSize = size
                this.openBuyHistoryDialog()
            },
            onPageChange(page) {
                this.page.curPage = page
                this.openBuyHistoryDialog()
            },
            onSizeChange2(size) {
                this.page.curPage = 1
                this.page.pageSize = size
                this.openBuyHistoryDrawer()
            },
            onPageChange2(page) {
                this.page.curPage = page
                this.openBuyHistoryDrawer()
            },
            getHistoryCount() {
                myAjax({
                    url: 'user/history_count',
                    data: {
                        addr: this.account,
                    }
                }).then(res => {
                    this.total = (res.data || {}).count
                })
            },
            doReceived(order_id, type) {
                myAjax({
                    url: 'nft/get_nft',
                    data: {
                        addr: this.account,
                        order_id
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$showOk(this.$t("blind-box.received-suc"))
                        type ? this.openBuyHistoryDrawer : this.openBuyHistoryDialog()
                    }
                })
            },
            openBuyHistoryDrawer() {
                this.getHistoryCount()
                this.buyHistoryDrawer = true;
                myAjax({
                    url: "user/history",
                    data: {
                        addr: this.account,
                        page: this.page.curPage,
                        per_page: this.page.pageSize,
                    },
                }).then((res) => {
                    const {
                        data: {
                            history
                        }
                    } = res
                    this.buy_history_list = history || []
                });
            },
            openBuyHistoryDialog(flag) {
                flag && (this.buyHLoading = true)
                this.getHistoryCount()
                this.isShowBuyHistoryDialog = true
                myAjax({
                    url: "user/history",
                    data: {
                        addr: this.account,
                        page: this.page.curPage,
                        per_page: this.page.pageSize,
                    },
                }).then((res) => {
                    const {
                        data: {
                            history
                        }
                    } = res
                    this.buy_history_list = history || []
                    this.buyHLoading = false
                });
            },
            initData() {
                return new Promise((resolve, reject) => {
                    this.account = cookie.getCookie("__account__");
                    if (!this.account) return resolve()
                    this.getUserInfo()
                        .then((res) => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            },
            vote(act) {
                return new Promise((resolve, reject) => {
                    this.isShowLoadingDialog = true;
                    let web3 = new Web3(window.web3.currentProvider)
                    let abiContract = new web3.eth.Contract(VOTE_ABI, contractAddress)
                    //授权数量
                    var amount = payAmount
                    abiContract.methods.approve(payAddress, amount).send({
                        from: this.account
                    }, function (err, res) {
                        if (err) {
                            reject(err)
                        }
                        resolve(res)
                    })
                })

                // return new Promise((resolve, reject) => {
                //     this.contract = new ethers.Contract(
                //         contractAddress,
                //         VOTE_ABI,
                //         this.web3Provider.getSigner()
                //     );
                //     this.contract
                //         .transfer(payAddress, payAmount)
                //         .then((res) => {
                //             resolve(res);
                //         })
                //         .catch((err) => {
                //             reject(err);
                //         })
                //         .finally(() => {
                //             this.isShowLoadingDialog = false;
                //         });
                // });

                // let tx = await this.contract.transfer(payAddress, payAmount);
                // await tx.wait(1);
                // console.log(tx)
            },
            getUserInfo() {
                return new Promise((resolve, reject) => {
                    myAjax({
                            url: "user/user_info",
                            isPassFalse: true,
                            data: {
                                addr: this.account,
                            },
                        })
                        .then((res) => {
                            if (res.ok) {
                                this.userInfo = res.data;
                            }
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            },
            doAccept() {
                this.isShowResultDialog = false;
            },
            reciveReward() {
                if (!this.userInfo) return;
                if (this.userInfo.award <= 0) {
                    this.$showInfo(`${this.$t("blind-box.no-reward-yet")}`);
                } else {
                    myAjax({
                        url: "user/get_award",
                        data: {
                            addr: this.account,
                        },
                    }).then((res) => {
                        if (res.ok) {
                            this.$showOk(`${this.$t("blind-box.received-suc")}`);
                        }
                    });
                }
            },
            copyLink() {
                if (!this.userInfo || !this.userInfo.promo_link) return;
                this.$copyText(this.userInfo.promo_link).then(() => {
                    this.$showOk(`${this.$t("blind-box.copy-success")}`);
                });
            },
            openBlindBox(act) {
                if (!window.ethereum)
                    return this.$showError("there is no web3 provider");
                if (!this.account) {
                    this.$parent.doConnectAccount();
                    return false;
                }
                if ((this.userInfo || {}).left_chance <= 0) {
                    return false;
                }
                const {
                    token
                } = contractAddress
                web3Tool.contract.call(this, {
                    abi: VOTE_ABI,
                    contractAddress: token.adoge,
                    authAddr: payAddress,
                    amount: payAmount,
                    account: this.account
                }).then(hash => {
                    this.doOpen(hash);
                }).catch((err) => {
                    this.$showError(this.$t("common.pay-fail"));
                })
            },
            doOpen(hash) {
                this.openIsLoading = this.isShowResultDialog = true;
                myAjax({
                    url: "nft/lottery",
                    data: {
                        body: {
                            addr: this.account,
                            tx: hash,
                        }
                    },
                }).then((res) => {
                    if (res.ok) {
                        const {
                            type,
                            nft_info,
                            token_info
                        } = res.data;
                        this.openResultType = type;
                        if (this.openResultType === 1) {
                            this.nft_info = nft_info;
                        } else if (this.openResultType === 2) {
                            this.token_info = token_info || {};
                        }
                    } else {
                        this.$showError(this.$t("blind-box.open-fail"));
                    }
                    this.getUserInfo();
                    this.openIsLoading = false;
                });
            },
        },
    };
</script>
<style lang="scss">
    $prefixCls: "views-blind-box";

    .#{$prefixCls} {
        .el-drawer {
            height: 55% !important;
            background: #000;
            overflow-y: scroll;

            .el-drawer__header {
                padding: 0.1rem 0.533333333333333rem;
                margin-bottom: 0.1rem;

                img {
                    vertical-align: middle;
                    width: 0.426666666666667rem;
                    height: 0.426666666666667rem;
                }

                span {
                    margin-left: 0.266666666666667rem;
                    font-size: 0.32rem;
                    color: #fff;
                }
            }

            .content {
                padding: 0 0.533333333333333rem;

                table {
                    color: #777e90;
                    font-size: 0.266666666666667rem;

                    thead {
                        th {
                            height: 0.533333333333333rem;
                            line-height: 0.533333333333333rem;
                            border-top: 1px solid #152132;
                        }
                    }

                    tbody {
                        td {
                            height: 0.853333333333333rem;
                            line-height: 0.853333333333333rem;
                            border-top: 1px solid #152132;

                            .el-button {
                                padding: 0.2rem;
                                font-size: 12px;
                            }

                            &.hot {
                                color: #5b82e3;
                            }

                            &.hash {
                                max-width: 2rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }

        .banner {
            position: relative;
            padding-top: 0.65rem;
            padding-bottom: 4.5rem;
            background: url("../../assets/images/home-bg.png");
            background-size: cover;
            text-align: center;

            .buy-history {
                position: absolute;
                top: 0.2rem;
                right: 2.1rem;
                padding: 0 0.16rem 0 0.4rem;
                height: 0.506666666666667rem;
                line-height: 0.506666666666667rem;
                font-size: 0.24rem;
                color: $--color-primary;
                border-radius: 0.133333333333333rem;
                background: #fff url("../../assets/images/clock.png");
                background-position: 0.02rem center;
                background-size: 0.373333333333333rem 0.373333333333333rem;
                background-repeat: no-repeat;
                cursor: pointer;

                &::after {
                    position: absolute;
                    right: -0.106666666666667rem;
                    top: -0.106666666666667rem;
                    content: "";
                    width: 0.213333333333333rem;
                    height: 0.213333333333333rem;
                    border-radius: 50%;
                    background: #ff3d00;
                }
            }

            .buy-history-h5 {
                display: none;
            }

            .before-txt {
                position: relative;
                display: inline-block;

                >span {
                    font-size: 0.64rem;
                    color: #fff;
                    font-weight: 600;
                }
            }

            .pop-tip {
                position: absolute;
                right: -1.3rem;
                top: -0.2rem;
                padding-left: 0.4rem;
                padding-right: 0.13rem;
                height: 0.48rem;
                line-height: 0.48rem;
                border: 1px solid $--color-success;
                border-radius: 0.8rem;
                font-size: 0.266666666666667rem;
                color: $--color-success;
                background: url("../../assets/images/tip.png");
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 0.373333333333333rem 0.373333333333333rem;
                vertical-align: top;
                cursor: pointer;
            }

            .blind-box {
                position: absolute;
                top: 1.7rem;
                left: 50%;
                width: 480px;
                height: 449px;
                background: url("../../assets/images/blindbox.png");
                transform: translate(-50%, 0);
                background-size: 100% 100%;
                text-align: center;
                z-index: 9;
            }
        }

        >.content-box {
            position: relative;
            padding-top: 135px;
            background: #16161c;
            text-align: center;

            >p {
                color: #fff;
                font-size: 18px;

                .num {
                    color: $--color-success;
                    font-size: 28px;
                }
            }

            .open-btn-info {
                display: flex;
                justify-content: center;
                margin: 0.186666666666667rem auto 0;
                width: 8.4rem;

                .ipt {
                    margin-bottom: 0.266666666666667rem;
                    margin-right: 10px;
                    padding: 14px 0;
                    width: 300px;
                    border: 2px solid #004d8c;
                    border-radius: 10px;
                    color: $--color-success;
                    font-size: 24px;
                    text-align: center;
                }

                .el-button--primary {
                    padding: 0;
                    line-height: 60px;
                    width: 120px;
                    height: 60px;
                    text-align: center;
                    font-size: 24px;
                    border-radius: 10px;
                    cursor: pointer;
                }
            }
        }

        .invitation-reward {
            padding: 52px 0;
            background: #00457d;

            .w {
                display: flex;

                >div {
                    flex: 1;

                    .small-tip {
                        margin: 0 auto;
                        width: 594px;
                        margin: 0 auto;
                        padding-top: 16px;
                        color: #a6a6a6;
                        font-size: 14px;
                    }

                    .label {
                        margin: 0 auto;
                        width: 594px;
                        margin-bottom: 10px;
                        color: #fff;
                        font-size: 18px;
                    }

                    .val {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 52px;
                        padding-left: 10px;
                        border: 1px solid #fff;
                        border-radius: 10px;
                        color: #fff;
                        font-size: 12px;

                        .val-t {
                            display: inline-block;
                            width: 6.5rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: bolder;
                        }

                        .el-button--primary {
                            position: absolute;
                            right: 4px;
                            padding: 0;
                            width: 120px;
                            height: 42px;
                            line-height: 42px;
                            text-align: center;
                            font-size: 18px;
                        }
                    }

                    &:first-child {

                        .val {
                            margin: 0 auto;
                            width: 594px;
                        }
                    }

                    &.right {
                        .val-t {
                            font-size: 24px;
                        }
                    }
                }
            }
        }

        .accept-btn {
            margin: 20px auto 0;
            width: 265px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: $--color-success;
            color: #fff;
            font-size: 24px;
            border-radius: 10px;
            cursor: pointer;
        }

        .loading-dialog {
            .el-dialog__header {
                display: none;
            }

            .loading-content {
                min-height: 1.5rem;

                .el-loading-text {
                    color: #bbbbbb;
                    font-size: 18px;
                }
            }
        }

        .buy-history-dialog {
            .el-dialog__header {
                img {
                    vertical-align: middle;
                }

                span {
                    color: #fff;
                    font-size: 0.32rem;
                }
            }

            .content {
                min-height: 5rem;
            }

            table {
                width: 100%;

                thead {
                    th {
                        height: 0.533333333333333rem;
                        line-height: 0.533333333333333rem;
                        border-top: 1px solid #152132;
                    }
                }

                tbody {
                    tr {
                        td {
                            height: 1.066666666666667rem;
                            line-height: 1.066666666666667rem;
                            border-top: 1px solid #152132;

                            &.hot {
                                color: #5b82e3;
                            }

                            &.hash {
                                max-width: 2rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }

        .blindBox-dialog {
            .dialog-content {
                min-height: 4rem;
            }

            .dialog-info {
                padding: 0.133333333333333rem 0.133333333333333rem 0.28rem 0.133333333333333rem;
                margin: 0 auto;
                width: 265px;
                min-height: 2.4rem;
                border: 1px solid #004d8c;
                border-radius: 10px;
                text-align: center;

                .token-img-box {
                    width: 160px;
                    height: 160px;
                    margin: 0.8rem auto;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .token-num {
                    text-align: center;

                    .num {
                        color: #fff;
                        font-weight: bold;
                        font-size: 0.426666666666667rem;
                    }

                    .sub-txt {
                        margin-top: 5px;
                        color: #c4c4c4;
                        font-size: 14px;
                    }
                }

                .img-box {
                    margin-top: 15px;
                    width: 245px;
                    height: 245px;
                    overflow: hidden;
                    border-radius: 10px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .name {
                    padding: 0.2rem 0 0.133333333333333rem 0;
                    color: #fff;
                    font-size: 18px;
                    font-weight: bold;
                    border-bottom: 1px solid #131922;
                }

                .lv {
                    color: #777e90;
                    font-size: 18px;
                }

                .txt {
                    margin-top: 0.133333333333333rem;

                    &.yellow {
                        margin-top: 10px;
                        font-size: 18px;
                        color: #ffc700;
                    }
                }
            }

            .accept-btn {
                margin: 20px auto 0;
                width: 265px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background: $--color-success;
                color: #fff;
                font-size: 24px;
                border-radius: 10px;
            }
        }

        .token-dialog {}
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .blindBox-dialog {
                .dialog-info {
                    border: 0;

                    .token-img-box {
                        width: 4.266666666666667rem;
                        height: 4.266666666666667rem;
                    }

                    .name {
                        font-size: 0.48rem;
                    }
                }
            }

            .banner {
                padding-top: 0;
                height: 6.88rem;
                background: linear-gradient(180deg, #131922 44%, #163858 100%);

                .buy-history {
                    display: none;
                }

                .buy-history-h5 {
                    position: absolute;
                    right: 0.7rem;
                    top: 0.4rem;
                    display: block;
                    width: 0.746666666666667rem;
                    height: 0.746666666666667rem;
                    background: url("../../assets/images/clock_w.png");
                    background-size: 100% 100%;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 0.266666666666667rem;
                        height: 0.266666666666667rem;
                        background: #ff3d00;
                        border-radius: 50%;
                    }
                }

                .blind-box {
                    top: 1.5rem;
                    margin: 0 auto;
                    width: 10rem;
                    height: 9.5rem;
                    background: url("../../assets/images/blindbox-h5.png");
                    background-size: 100% 100%;
                }

                .pop-tip {
                    right: -2rem;
                    top: -0.3rem;
                }
            }

            >.content-box {
                height: auto;
                padding-top: 2.186666666666667rem;
                overflow: hidden;

                .num {
                    font-weight: bolder;
                }

                .open-btn-info {
                    margin: 0.186666666666667rem auto 0.613333333333333rem;
                    flex-direction: column;

                    .ipt {
                        flex: 1;
                        width: 100%;
                        border-radius: 0.266666666666667rem;
                    }

                    .el-button--primary {
                        width: 100%;
                        font-weight: bolder;
                        border-radius: 0.266666666666667rem;
                    }
                }
            }

            .invitation-reward {
                background: #00457d;
                padding: 0.373333333333333rem 0.746666666666667rem 1.333333333333333rem 0.853333333333333rem;

                .w {
                    flex-direction: column;

                    >div {
                        .small-tip {
                            display: none;
                        }

                        &.left {
                            margin-bottom: 0.266666666666667rem;
                            padding-right: 0;
                        }

                        .label {
                            font-size: 0.373333333333333rem;
                        }

                        .val {
                            width: 100% !important;
                            height: 1.066666666666667rem;
                            font-size: 0.32rem;
                            border-color: #0077d8;
                            border-radius: 0.2rem;

                            .el-button--primary {
                                font-size: 0.32rem;
                                width: 1.6rem;
                                height: 0.7rem;
                                line-height: 0.7rem;
                            }
                        }

                        .val-t {
                            font-size: 0.426666666666667rem;
                        }
                    }
                }
            }
        }
    }
</style>