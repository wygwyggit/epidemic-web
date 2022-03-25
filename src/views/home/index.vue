<template>
    <div :class="prefixCls">
        <div class="banner">
            <span class="before-txt">{{$t("home.open-blind-box")}}</span>
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
                </div>
                <div class="right">
                    <p class="label">{{$t("home.you-reward")}}</p>
                    <div class="val">
                        <span class="val-t">1,000,000,000 Adoge</span>
                        <el-button type="primary">{{$t("home.receive")}}</el-button>
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
            <div class="accept-btn">{{$t("common.accept")}}</div>
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
            <div class="accept-btn">{{$t("common.accept")}}</div>
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
                prefixCls: "views-home",
                isShowBlindBoxDialog: false,
                isShowTokenDialog: false,
                dialogWidth: "400px",
                shareUrl: 'https://amazingdogebsc.com/nft?ref=5q9h4j1gyad8v1sao5ljzctgwm810uj'
            };
        },
        computed: {
            resultTxt() {
                return this.$t("common.result")
            }
        },
        watch: {},
        created() {},
        mounted() {
            let width = window.innerWidth
            if (width < 768) {
                this.dialogWidth = '8.9rem'
            }
            Vue.use(VueClipboard)
        },
        beforeDestroy() {},
        methods: {
            copyLink() {
                this.$copyText(this.shareUrl).then(() => {
                    alert(`${this.$t("home.copy-success")}`);
                });
            },
            openBlindBox() {
                let n = Math.random()
                if (n > 0.5) {
                    this.isShowBlindBoxDialog = true
                } else {
                    this.isShowTokenDialog = true
                }

            }
        },
    };
</script>
<style lang="scss" scoped>
    $prefixCls: "views-home";

    .#{$prefixCls} {
        .banner {
            position: relative;
            padding-top: .533333333333333rem;
            height: 440px;
            background: url('../../assets/images/home-bg.png');
            background-size: cover;
            text-align: center;

            .before-txt {
                font-size: .64rem;
                color: #fff;
                font-weight: 600;
            }

            .blind-box {
                position: absolute;
                top: 1.6rem;
                left: 50%;
                width: 594px;
                height: 506px;
                background: url('../../assets/images/blindbox.png');
                transform: translate(-55%, 0);
                background-size: 100% 100%;
                cursor: pointer;
                text-align: center;
                z-index: 9;
            }
        }

        >.content-box {
            position: relative;
            padding-top: 130px;
            height: 320px;
            background: #16161C;
            text-align: center;

            >p {
                color: #fff;
                font-size: 18px;

                .num {
                    color: #32A3FF;
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
                    width: 100%;
                    border: 2px solid #004D8C;
                    border-radius: .266666666666667rem;
                    color: #32A3FF;
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
                    border-radius: .266666666666667rem;
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

                    .label {
                        margin-bottom: 10px;
                        color: #fff;
                        font-size: 18px;
                    }

                    .val {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: .8rem;
                        padding-left: 10px;
                        border: 1px solid #fff;
                        border-radius: 10px;
                        color: #fff;
                        font-size: 12px;

                        .val-t {
                            display: inline-block;
                            width: 5.386666666666667rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .el-button--primary {
                            position: absolute;
                            right: 4px;
                            padding: 0;
                            width: 1.6rem;
                            height: .7rem;
                            line-height: .7rem;
                            text-align: center;
                            font-size: 18px;
                        }
                    }

                    &:first-child {
                        margin-right: 39px;
                    }

                    &.right {
                        .val-t {
                            font-size: .426666666666667rem;
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
            background: #32A3FF;
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
                background: #32A3FF;
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
                height: 6.88rem;
                background: linear-gradient(180deg, #131922 15%, #1E9AFF 100%);

                .blind-box {
                    width: 9.573333333333334rem;
                    height: 8.4rem;
                }
            }

            >.content-box {
                height: 7.6rem;
                padding-top: 2.186666666666667rem;

                .open-btn-info {
                    margin-top: .3rem;
                    flex-direction: column;

                    .ipt {
                        flex: 1;
                    }

                    .el-button--primary {
                        width: 100%;
                    }
                }
            }

            .invitation-reward {
                background: #00457D;
                padding: .373333333333333rem .746666666666667rem 1.333333333333333rem .853333333333333rem;

                .w {
                    flex-direction: column;

                    >div {
                        &.left {
                            margin-bottom: .266666666666667rem;
                            margin-right: 0;
                        }

                        .label {
                            font-size: .373333333333333rem;
                        }

                        .val {
                            font-size: .32rem;
                            border-color: #0077D8;
                            border-radius: .2rem;

                            .el-button--primary {
                                font-size: .32rem;

                            }
                        }
                    }
                }
            }
        }
    }
</style>
