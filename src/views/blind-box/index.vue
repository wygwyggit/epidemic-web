<template>
    <div :class="prefixCls">
        <div class="banner">
            <div class="before-txt">
                <span v-if="!timerS">
                    {{$t("blind-box.open-blind-box")}}
                </span>
                <div class="timer-countdown" v-else>
                    <div class="days">
                        <p class="val">{{ timer.days }}</p>
                        <p class="txt">{{$t("blind-box.days")}}</p>
                    </div>
                    <div class="dot">:</div>
                    <div class="hrs">
                        <p class="val">{{ timer.hrs }}</p>
                        <p class="txt">{{$t("blind-box.hrs")}}</p>
                    </div>
                    <div class="dot">:</div>
                    <div class="mins">
                        <p class="val">{{ timer.mins }}</p>
                        <p class="txt">{{$t("blind-box.mins")}}</p>
                    </div>
                    <div class="dot">:</div>
                    <div class="secs">
                        <p class="val">{{ timer.secs }}</p>
                        <p class="txt">{{$t("blind-box.secs")}}</p>
                    </div>
                </div>
                <el-popover placement="bottom-start" width="340" trigger="click" :visible-arrow="false"
                    popper-class="el-popover-black">
                    <div class="pop-tip" slot="reference">{{$t("common.rules")}}</div>
                    <div class="item">
                        <p class="highlight-color">{{$t("blind-box.pay-with-adoge-tokens")}}</p>
                        <p>
                            <span class="highlight-color">{{$t("account.price")}}:</span>
                            {{$t("blind-box.price-int")}}
                        </p>
                        <p>
                            <span class="highlight-color">{{$t("blind-box.limit")}}:</span>
                            {{$t("blind-box.limit-int")}}
                        </p>
                        <p>
                            <span class="highlight-color">{{$t("blind-box.probability")}}:</span>
                            {{$t("blind-box.probability-int")}}
                        </p>
                    </div>
                    <div class="item">
                        <p class="highlight-color">{{$t("blind-box.invitation-reward")}}</p>
                        <p>
                            {{$t("blind-box.invitation-reward-int")}}
                        </p>
                    </div>
                </el-popover>
            </div>

            <div class="blind-box">
            </div>
        </div>
        <div class="content-box">
            <p>{{$t("blind-box.open-tip-l")}} <span class="num">{{(userInfo && userInfo.left_chance) || 0}}</span>
                {{$t("blind-box.open-tip-r")}}</p>
            <div class="open-btn-info">
                <div class="ipt">10,000,000Adoge/BOX</div>
                <el-button type="primary" @click="openBlindBox">{{$t("blind-box.open")}}</el-button>
            </div>
        </div>
        <div class="invitation-reward">
            <div class="w">
                <div class="left">
                    <p class="label">{{$t("blind-box.your-invitation")}}</p>
                    <div class="val">
                        <span class="val-t">{{ userInfo && userInfo.promo_link }}</span>
                        <el-button type="primary" @click="copyLink">{{$t("blind-box.copy")}}</el-button>
                    </div>
                    <p class="small-tip">{{$t("blind-box.invitation-reward-txt")}}</p>
                </div>
                <div class="right">
                    <p class="label">{{$t("blind-box.you-reward")}}</p>
                    <div class="val">
                        <span class="val-t">{{userInfo && userInfo.award}}
                            <i v-if="userInfo">Adoge</i></span>
                        <el-button type="primary" @click="reciveReward">{{$t("blind-box.receive")}}</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="resultTxt" custom-class="blindBox-dialog" :visible.sync="isShowResultDialog"
            :close-on-click-modal="false" :width="dialogWidth">
            <div class="dialog-content" v-loading="openIsLoading">
                <template v-if="!openIsLoading">
                    <div class="dialog-info">
                        <template v-if="openResultType === 1">
                            <div class="index">
                                # {{ nft_info.id }}
                            </div>
                            <div class="img-box">
                                <img :src="netImgBaseUrl + nft_info.image_url" alt="">
                            </div>
                            <div class="name">
                                {{ nft_info.name }}
                            </div>
                            <p class="lv">Lv-{{ nft_info.class }}</p>
                            <p class="txt" :class="nft_info.color">{{$t("account."+ nft_info.color +"")}}</p>
                        </template>
                        <template v-if="openResultType === 2">
                            <div class="token-img-box">
                                <img src="../../assets/images/reward-token.png" alt="">
                            </div>
                            <div class="token-num">
                                <p class="num">{{ token_info && token_info.amount }}</p>
                                <p class="sub-txt">Adoge token</p>
                            </div>
                        </template>
                    </div>
                    <div class="accept-btn" @click="doAccept">{{$t("common.accept")}}</div>
                </template>

            </div>
        </el-dialog>
        <el-dialog :width="dialogWidth" custom-class="loading-dialog" :close-on-click-modal="false" :show-close="false"
            :visible.sync="isShowLoadingDialog">
            <div class="loading-content" v-loading="isShowLoadingDialog"
                :element-loading-text="$t('common.wait-serve')">

            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from "vue"
    import VueClipboard from "vue-clipboard2"
    import eventBus from '@/utils/eventBus'
    import myAjax from '@/utils/ajax.js'
    import cookie from '@/utils/cookie.js'
    import {
        netImgBaseUrl,
        payAddress,
        payAmount,
        contractAddress
    } from '@/config/config.js'
    import {
        mapState
    } from 'vuex'
    import VOTE_ABI from "@/contracts/vote.js"
    export default {
        name: "home",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "views-blind-box",
                contract: null,
                isShowResultDialog: false,
                openIsLoading: false,
                isShowLoadingDialog: false,
                netImgBaseUrl,
                dialogWidth: "400px",
                userInfo: null,
                timer: {
                    days: '',
                    hrs: '',
                    mins: '',
                    secs: ''
                },
                timerS: null,
                openResultType: '',
                nft_info: null,
                token_info: null,
            };
        },
        computed: {
            resultTxt() {
                return this.$t("common.result")
            },
            ...mapState({
                web3Provider: state => state.web3Provider,
            }),
        },
        watch: {},
        async created() {
            this.initData()
            this.countTime()
        },
        mounted() {
            eventBus.$on('connect', () => {
                this.initData()
                this.openBlindBox()
            })
            let width = window.innerWidth
            if (width < 768) {
                this.dialogWidth = '8.9rem'
            }
            Vue.use(VueClipboard)
        },
        beforeDestroy() {},
        methods: {
            initData() {
                this.account = cookie.getCookie('__account__')
                this.getUserInfo()
            },
            vote(act) {
                this.isShowLoadingDialog = true
                return new Promise((resolve, reject) => {
                    this.contract = new ethers.Contract(contractAddress, VOTE_ABI, this.web3Provider
                    .getSigner())
                    this.contract.transfer(payAddress, payAmount).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }).finally(() => {
                        this.isShowLoadingDialog = false
                    })
                })

                // let tx = await this.contract.transfer(payAddress, payAmount);
                // await tx.wait(1);
                // console.log(tx)
            },
            getUserInfo() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: "user/user_info",
                        data: {
                            addr: this.account
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.userInfo = res.data
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            countTime() {
                let data = new Date(),
                    dataTime = data.getTime(),
                    str = "2022/04/06 08:00:00",
                    endTime = new Date(str),
                    end = endTime.getTime(),
                    leftTime = end - dataTime;
                if (leftTime > 0) {
                    this.timer.days = (Math.floor(leftTime / 1000 / 60 / 60 / 24)).toString().padStart(2, '0');
                    this.timer.hrs = (Math.floor(leftTime / 1000 / 60 / 60 % 24)).toString().padStart(2, '0');
                    this.timer.mins = (Math.floor(leftTime / 1000 / 60 % 60)).toString().padStart(2, '0');
                    this.timer.secs = (Math.floor(leftTime / 1000 % 60)).toString().padStart(2, '0');
                    this.timerS = setTimeout(this.countTime, 1000);
                } else {
                    clearInterval(this.timerS)
                    this.timerS = null
                }

            },
            doAccept() {
                this.isShowResultDialog = false
            },
            reciveReward() {
                if (!this.userInfo) return
                if (this.userInfo.award <= 0) {
                    this.$showInfo(`${this.$t("blind-box.no-reward-yet")}`)
                } else {
                    myAjax({
                        url: 'user/get_award',
                        data: {
                            addr: this.account
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.$showOk(`${this.$t("blind-box.received-suc")}`)
                        }
                    })
                }
            },
            copyLink() {
                if (!this.userInfo || !this.userInfo.promo_link) return
                this.$copyText(this.userInfo.promo_link).then(() => {
                    this.$showOk(`${this.$t("blind-box.copy-success")}`)
                });
            },
            openBlindBox(act) {
                if (!this.web3Provider) return this.$showError('there is no web3 provider')
                if (!this.account) {
                    this.$parent.doConnectAccount()
                    return false
                }
                if (this.userInfo.left_chance <= 0) {
                    return false
                }
                this.vote(act).then(res => {
                    this.doOpen(res.hash)
                }).catch(err => {
                    this.$showError(this.$t("common.pay-fail"))
                })
            },
            doOpen(hash) {
                this.openIsLoading = this.isShowResultDialog = true
                myAjax({
                    url: 'nft/lottery',
                    data: {
                        addr: this.account,
                        tx: hash
                    }
                }).then(res => {
                    if (res.ok) {
                        const {
                            type,
                            nft_info,
                            token_info
                        } = res.data
                        this.openResultType = type
                        if (this.openResultType === 1) {
                            this.nft_info = nft_info
                        } else if (this.openResultType === 2) {
                            this.token_info = token_info || {}
                        }
                    } else {
                        this.$showError(this.$t("blind-box.open-fail"))
                    }
                    this.getUserInfo()
                    this.openIsLoading = false
                })
            }
        },
    };
</script>
<style lang="scss">
    $prefixCls: "views-blind-box";

    .#{$prefixCls} {
        .banner {
            position: relative;
            padding-top: .65rem;
            height: 440px;
            background: url('../../assets/images/home-bg.png');
            background-size: cover;
            text-align: center;

            .before-txt {
                position: relative;
                display: inline-block;

                >span {
                    font-size: .64rem;
                    color: #fff;
                    font-weight: 600;
                }

                .timer-countdown {
                    margin-bottom: 10px;
                    display: flex;

                    .val,
                    .dot {
                        font-size: .64rem;
                        color: #fff;
                        font-weight: 600;
                    }

                    .txt {
                        color: #7B7B7B;
                        font-size: 14px;
                    }
                }
            }

            .pop-tip {
                position: absolute;
                right: -2.2rem;
                top: -.2rem;
                padding-left: .4rem;
                padding-right: .13rem;
                height: .48rem;
                line-height: .48rem;
                border: 1px solid $--color-success;
                border-radius: .8rem;
                font-size: .266666666666667rem;
                color: $--color-success;
                background: url("../../assets/images/tip.png");
                background-repeat: no-repeat;
                background-position: left center;
                background-size: .373333333333333rem .373333333333333rem;
                vertical-align: top;
                cursor: pointer;
            }

            .blind-box {
                position: absolute;
                top: 1.7rem;
                left: 50%;
                width: 480px;
                height: 449px;
                background: url('../../assets/images/blindbox.png');
                transform: translate(-50%, 0);
                background-size: 100% 100%;
                text-align: center;
                z-index: 9;
            }
        }

        >.content-box {
            position: relative;
            padding-top: 135px;
            height: 320px;
            background: #16161C;
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
                margin: .186666666666667rem auto 0;
                width: 8.4rem;

                .ipt {
                    margin-bottom: .266666666666667rem;
                    margin-right: 10px;
                    padding: 14px 0;
                    width: 300px;
                    border: 2px solid #004D8C;
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
            background: #00457D;

            .w {
                display: flex;

                >div {
                    flex: 1;

                    .small-tip {
                        padding-top: 16px;
                        color: #A6A6A6;
                        font-size: 14px;
                    }

                    .label {
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
                        padding-right: 70px;

                        .val {
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
                    color: #BBBBBB;
                    font-size: 18px;
                }
            }
        }

        .blindBox-dialog {
            .dialog-content {
                min-height: 4rem;
            }

            .dialog-info {
                padding: .133333333333333rem .133333333333333rem .28rem .133333333333333rem;
                margin: 0 auto;
                width: 265px;
                min-height: 2.4rem;
                border: 1px solid #004D8C;
                border-radius: 10px;
                text-align: center;

                .token-img-box {
                    width: 160px;
                    height: 160px;
                    margin: .8rem auto;

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
                        font-size: .426666666666667rem;
                    }

                    .sub-txt {
                        margin-top: 5px;
                        color: #C4C4C4;
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
                    padding: .2rem 0 .133333333333333rem 0;
                    color: #fff;
                    font-size: 18px;
                    font-weight: bold;
                    border-bottom: 1px solid #131922;
                }

                .lv {
                    color: #777E90;
                    font-size: 18px;
                }

                .txt {
                    margin-top: .133333333333333rem;

                    &.yellow {
                        margin-top: 10px;
                        font-size: 18px;
                        color: #FFC700;
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
                        font-size: .48rem;
                    }
                }
            }

            .banner {
                padding-top: 0;
                height: 6.88rem;
                background: linear-gradient(180deg, #131922 44%, #163858 100%);

                .before-txt {
                    .timer-countdown {

                        .val,
                        .dot {
                            font-size: .96rem;
                            font-weight: 500;
                        }

                        .txt {
                            font-size: .213333333333333rem;
                        }
                    }
                }

                .blind-box {
                    top: 1.5rem;
                    margin: 0 auto;
                    width: 10rem;
                    height: 9.5rem;
                    background: url('../../assets/images/blindbox-h5.png');
                    background-size: 100% 100%;
                }

                .pop-tip {
                    right: -2rem;
                    top: -.3rem;
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
                    margin: .186666666666667rem auto .613333333333333rem;
                    flex-direction: column;

                    .ipt {
                        flex: 1;
                        width: 100%;
                        border-radius: .266666666666667rem;
                    }

                    .el-button--primary {
                        width: 100%;
                        font-weight: bolder;
                        border-radius: .266666666666667rem;
                    }
                }
            }

            .invitation-reward {
                background: #00457D;
                padding: .373333333333333rem .746666666666667rem 1.333333333333333rem .853333333333333rem;

                .w {
                    flex-direction: column;

                    >div {
                        .small-tip {
                            display: none;
                        }

                        &.left {
                            margin-bottom: .266666666666667rem;
                            padding-right: 0;

                        }

                        .label {
                            font-size: .373333333333333rem;
                        }

                        .val {
                            width: 100% !important;
                            height: 1.066666666666667rem;
                            font-size: .32rem;
                            border-color: #0077D8;
                            border-radius: .2rem;

                            .el-button--primary {
                                font-size: .32rem;
                                width: 1.6rem;
                                height: .7rem;
                                line-height: .7rem;
                            }
                        }

                        .val-t {
                            font-size: .426666666666667rem;
                        }
                    }
                }
            }
        }
    }
</style>
