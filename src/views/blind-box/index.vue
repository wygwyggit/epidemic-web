<template>
    <div :class="prefixCls">
        <div class="banner">
            <div class="before-txt">
                <span>
                    <!-- {{$t("home.open-blind-box")}} -->
                </span>
                <div class="timer-countdown">
                    <div class="days">
                        <p class="val">{{ timer.days }}</p>
                        <p class="txt">{{$t("home.days")}}</p>
                    </div>
                    <div class="dot">:</div>
                    <div class="hrs">
                        <p class="val">{{ timer.hrs }}</p>
                        <p class="txt">{{$t("home.hrs")}}</p>
                    </div>
                    <div class="dot">:</div>
                    <div class="mins">
                        <p class="val">{{ timer.mins }}</p>
                        <p class="txt">{{$t("home.mins")}}</p>
                    </div>
                    <div class="dot">:</div>
                    <div class="secs">
                        <p class="val">{{ timer.secs }}</p>
                        <p class="txt">{{$t("home.secs")}}</p>
                    </div>
                </div>
                <el-popover placement="bottom-start" width="340" trigger="click" :visible-arrow="false"
                    popper-class="el-popover-black">
                    <div class="pop-tip" slot="reference">{{$t("common.rules")}}</div>
                    <div class="item">
                        <p class="highlight-color">{{$t("home.pay-with-adoge-tokens")}}</p>
                        <p>
                            <span class="highlight-color">{{$t("account.price")}}:</span>
                            {{$t("home.price-int")}}
                        </p>
                        <p>
                            <span class="highlight-color">{{$t("home.limit")}}:</span>
                            {{$t("home.limit-int")}}
                        </p>
                        <p>
                            <span class="highlight-color">{{$t("home.probability")}}:</span>
                            {{$t("home.probability-int")}}
                        </p>
                    </div>
                    <div class="item">
                        <p class="highlight-color">{{$t("home.invitation-reward")}}</p>
                        <p>
                            {{$t("home.invitation-reward-int")}}
                        </p>
                    </div>
                </el-popover>
            </div>

            <div class="blind-box">
            </div>
        </div>
        <div class="content-box">
            <p>{{$t("home.open-tip-l")}} <span class="num">10</span> {{$t("home.open-tip-r")}}</p>
            <div class="open-btn-info">
                <div class="ipt">10,000,000Adoge/BOX</div>
                <el-button type="primary" @click="openBlindBox">{{$t("home.open")}}</el-button>
            </div>
        </div>
        <div class="invitation-reward">
            <div class="w">
                <div class="left">
                    <p class="label">{{$t("home.your-invitation")}}</p>
                    <div class="val">
                        <span class="val-t">{{ shareUrl }}</span>
                        <el-button type="primary" @click="copyLink">{{$t("home.copy")}}</el-button>
                    </div>
                    <p class="small-tip">{{$t("home.invitation-reward-txt")}}</p>
                </div>
                <div class="right">
                    <p class="label">{{$t("home.you-reward")}}</p>
                    <div class="val">
                        <span class="val-t">{{reward}} Adoge</span>
                        <el-button type="primary" @click="reciveReward">{{$t("home.receive")}}</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="resultTxt" custom-class="token-dialog" :visible.sync="isShowTokenDialog"
            :close-on-click-modal="false" :width="dialogWidth">
            <div class="dialog-content">
                <div class="img-box">
                    <img src="../../assets/images/reward-token.png" alt="">
                </div>
                <div class="token-num">
                    <p class="num">2,000,000</p>
                    <p class="sub-txt">Adoge token</p>
                </div>
            </div>
            <div class="accept-btn" @click="doAccept">{{$t("common.accept")}}</div>
        </el-dialog>
        <el-dialog :title="resultTxt" custom-class="blindBox-dialog" :visible.sync="isShowBlindBoxDialog"
            :close-on-click-modal="false" :width="dialogWidth">
            <div class="dialog-content">
                <div class="index">
                    # 0001001
                </div>
                <div class="img-box">
                    <img src="../../assets/images/product.png" alt="">
                </div>
                <div class="name">
                    CZ Hoodie Limited NFT
                </div>
                <p class="lv">Lv-1</p>
                <p class="txt yellow">{{$t("account.yellow")}}</p>

            </div>
            <div class="accept-btn" @click="doAccept">{{$t("common.accept")}}</div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from "vue"
    import VueClipboard from "vue-clipboard2"
    export default {
        name: "home",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "views-blind-box",
                isShowBlindBoxDialog: false,
                isShowTokenDialog: false,
                dialogWidth: "400px",
                reward: "1,000,000,000",
                shareUrl: 'https://amazingdogebsc.com/nft?ref=5q9h4j1gyad8v1sao5ljzctgwm810uj',
                timer: {
                    days: '',
                    hrs: '',
                    mins: '',
                    secs: ''
                }
            };
        },
        computed: {
            resultTxt() {
                return this.$t("common.result")
            }
        },
        watch: {},
        created() {
            this.countTime()
        },
        mounted() {
            let width = window.innerWidth
            if (width < 768) {
                this.dialogWidth = '8.9rem'
            }
            Vue.use(VueClipboard)
        },
        beforeDestroy() {},
        methods: {
            countTime() {
                let data = new Date(),
                    dataTime = data.getTime(),
                    str = "2022/04/05 12:00:00",
                    endTime = new Date(str),
                    end = endTime.getTime(),
                    leftTime = end - dataTime;
                if (leftTime > 0) {
                    this.timer.days = (Math.floor(leftTime / 1000 / 60 / 60 / 24)).toString().padStart(2, '0');
                    this.timer.hrs = (Math.floor(leftTime / 1000 / 60 / 60 % 24)).toString().padStart(2, '0');
                    this.timer.mins = (Math.floor(leftTime / 1000 / 60 % 60)).toString().padStart(2, '0');
                    this.timer.secs = (Math.floor(leftTime / 1000 % 60)).toString().padStart(2, '0');
                }
                setTimeout(this.countTime, 1000);
            },
            doAccept() {
                this.isShowBlindBoxDialog = this.isShowTokenDialog = false
            },
            reciveReward() {
                if (this.reward <= 0) {
                    this.$showInfo(`${this.$t("home.no-reward-yet")}`)
                } else {
                    this.$showOk(`${this.$t("home.received-suc")}`)
                }
            },
            copyLink() {
                this.$copyText(this.shareUrl).then(() => {
                    this.$showOk(`${this.$t("home.copy-success")}`)
                });
            },
            openBlindBox() {
                let n = Math.random()
                if (n > 0.5) {
                    this.isShowBlindBoxDialog = true
                } else if (n < 0.2) {
                    this.$showError(`${this.$t(("common.pay-fail"))}`)
                } else {
                    this.isShowTokenDialog = true
                }
            }
        },
    };
</script>
<style lang="scss" scoped>
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

        .blindBox-dialog {
            .dialog-content {
                padding: 10px 10px 21px 10px;
                margin: 0 auto;
                width: 265px;
                border: 1px solid #004D8C;
                border-radius: 10px;
                text-align: center;

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
                    padding: 10px 0;
                    color: #fff;
                    font-size: 18px;
                    border-bottom: 1px solid #131922;
                }

                .lv {
                    margin-top: 10px;
                    color: #777E90;
                    font-size: 18px;
                }

                .txt {
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

        .token-dialog {
            .img-box {
                width: 160px;
                height: 160px;
                margin: 60px auto;
            }

            .token-num {
                text-align: center;

                .num {
                    color: #fff;
                    font-size: 32px;
                }

                .sub-txt {
                    margin-top: 5px;
                    color: #C4C4C4;
                    font-size: 14px;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .banner {
                padding-top: 0;
                height: 6.88rem;
                background: linear-gradient(180deg, #131922 44%, #163858 100%);
                .before-txt {
                    .timer-countdown {
                        .val,.dot {
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
