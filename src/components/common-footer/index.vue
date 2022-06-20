<template>
    <div :class="prefixCls">
        <div class="w">
            <div class="legal-document left-link">
                <h3>{{ $t("home.legal-document") }}</h3>
                <div class="link-wrap">
                    <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/ADOGE%20GLOCAL.pdf"
                        target="_blank">{{ $t("home.adoge-glocal") }}</a>
                    <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/Adoge_Stepplan.pdf"
                        target="_blank">{{ $t("home.adoge-step") }}</a>
                    <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/ADOGE%20Certik.pdf"
                        target="_blank">{{ $t("home.certik-audit") }}</a>
                </div>
                <div class="link-wrap">
                    <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/ADOGE%20MSB.pdf"
                        target="_blank">{{ $t("home.adoge-msb") }}</a>
                    <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/ADOGE%20NFT_EN.pdf"
                        target="_blank">{{ $t("home.adoge-whiteParer") }}</a>
                    <a href="https://github.com/solidproof/projects/blob/main/AmazingDoge/SmartContract_Audit_Solidproof_AmazingDoge.pdf"
                        target="_blank">{{ $t("home.solid-proof") }}</a>
                </div>
                <div class="link-wrap">
                    <a href="https://github.com/AmazingDogebsc/WhitePaper/blob/main/Legal%20Opinion%20ADOGE%20Token.pdf"
                        target="_blank">{{ $t("home.legal-opinion") }}</a>
                </div>
            </div>
            <div class="site-navigation left-link">
                <h3>{{ $t("home.site-navigation") }}</h3>
                <div class="link-wrap">
                    <router-link :to="{path: 'home'}">{{ $t("home.home") }}</router-link>
                    <router-link :to="{path: 'marketplace'}">{{ $t("home.marketplace") }}</router-link>
                </div>
                <div class="link-wrap">
                    <router-link :to="{path: 'blindBox'}">{{ $t("home.blind-box") }}</router-link>
                    <router-link :to="{path: 'netMining'}">{{ $t("home.nft-mining") }}</router-link>
                </div>
                <div class="link-wrap">
                    <router-link :to="{path: 'account'}">{{ $t("home.my-account") }}</router-link>
                </div>
            </div>
            <div class="follow-us">
                <h3>{{ $t("home.follow-us") }}</h3>
                <div class="main-web-logo">
                    <img src="../../assets/images/logo.png" alt="" class="logo-img">
                    <img src="../../assets/images/close.png" alt="" class="line-img">
                    <img src="../../assets/images/amazing-logo.png" alt="" class="logo-img">
                </div>
                <div class="nav-link">
                    <router-link :to="{path: 'home'}">{{ $t("home.home") }}</router-link>
                    <router-link :to="{path: 'blindBox'}">{{ $t("home.marketplace") }}</router-link>
                    <router-link :to="{path: 'marketplace'}">{{ $t("home.blind-box") }}</router-link>
                    <router-link :to="{path: 'netMining'}">{{ $t("home.nft-mining") }}</router-link>
                    <router-link :to="{path: 'account'}">{{ $t("home.my-account") }}</router-link>
                </div>
                <div class="out-link">
                    <li class="item-img">
                        <a href="https://twitter.com/AmazingDogeCoin/" target="_blank">
                            <img src="../../assets/images/Twitter.png" alt="">
                        </a>
                    </li>
                    <li class="item-img">
                        <a href="https://t.me/amazingdoge_cn" target="_blank">
                            <img src="../../assets/images/Telegram App.png" alt="">
                        </a>
                    </li>
                    <li class="item-img">
                        <a href="https://www.instagram.com/accounts/login/?next=/amazingdogecoin/" target="_blank">
                            <img src="../../assets/images/ig.png" alt="">
                        </a>
                    </li>
                    <li class="item-img">
                        <a href="https://github.com/AmazingDogebsc" target="_blank">
                            <img src="../../assets/images/github.png" alt="">
                        </a>
                    </li>
                    <li class="item-img">
                        <a href="https://coinmarketcap.com/currencies/amazingdoge/" target="_blank">
                            <img src="../../assets/images/cmc.png" alt="">
                        </a>
                    </li>
                    <li class="item-img">
                        <a href="https://bscscan.com/address/0x0EBc30459551858e81306d583025d12C7d795FA2"
                            target="_blank">
                            <img src="../../assets/images/bsc.png" alt="">
                        </a>
                    </li>

                </div>
            </div>
            <!-- <div class="item-box">
                <div class="left">
                </div>
                <div class="right">
                    <ul class="clearfix">
                        <li class="item">
                            <router-link :to="{path: 'home'}">
                                <a>{{$t("common.home")}}</a>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link :to="{path: 'blindBox'}">
                                <a>{{$t("common.blind-box")}}</a>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link :to="{path: 'marketplace'}">
                                <a>{{$t("common.marketplace")}}</a>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link :to="{path: 'account'}">
                                <a>{{$t("common.my-account")}}</a>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link :to="{path: 'netMining'}">
                                <a>{{$t("common.net-mining")}}</a>
                            </router-link>
                        </li>
                    </ul>
                    <div class="out-link">
                        <ul class="clearfix">
                            <li class="item-img">
                                <a href="https://twitter.com/AmazingDogeCoin/" target="_blank">
                                    <img src="../../assets/images/Twitter.png" alt="">
                                </a>
                            </li>
                            <li class="item-img">
                                <a href="https://t.me/amazingdoge_cn" target="_blank">
                                    <img src="../../assets/images/Telegram App.png" alt="">
                                </a>
                            </li>
                            <li class="item-img">
                                <a href="https://www.instagram.com/accounts/login/?next=/amazingdogecoin/"
                                    target="_blank">
                                    <img src="../../assets/images/ig.png" alt="">
                                </a>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li class="item-img">
                                <a href="https://github.com/AmazingDogebsc" target="_blank">
                                    <img src="../../assets/images/github.png" alt="">
                                </a>
                            </li>
                            <li class="item-img">
                                <a href="https://coinmarketcap.com/currencies/amazingdoge/" target="_blank">
                                    <img src="../../assets/images/cmc.png" alt="">
                                </a>
                            </li>
                            <li class="item-img">
                                <a href="https://bscscan.com/address/0x0EBc30459551858e81306d583025d12C7d795FA2"
                                    target="_blank">
                                    <img src="../../assets/images/bsc.png" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>


                </div>
            </div> -->

        </div>
        <div class="copyright">
            © 2022 AmazingDoge All rights reserved
        </div>

    </div>
</template>

<script>
    export default {
        name: "common-footer",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "components-common-footer",
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {},
    };
</script>

<style lang="scss" scoped>
    $prefixCls: "components-common-footer";

    .#{$prefixCls} {
        padding-top: .4rem;
        background: #0B0F15;
        text-align: center;
        color: #aaaaaa;

        .w {
            display: flex;
            justify-content: space-between;

            .left-link {
                text-align: left;

                &.legal-document {
                    width: 4.72rem;
                }

                &.site-navigation {
                    width: 2.52rem;
                }

                .link-wrap {
                    margin-bottom: .266666666666667rem;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
            }

            .follow-us {
                .nav-link {
                    display: none;
                    margin: .533333333333333rem 0;
                }

                .out-link {
                    margin-top: .4rem;
                    display: flex;
                    justify-content: space-between;

                    img {
                        width: .266666666666667rem;
                        height: .266666666666667rem;
                    }
                }

                .main-web-logo {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    img {
                        height: .186666666666667rem;
                    }

                    .line-img {
                        margin: 0 .266666666666667rem;
                    }

                    .logo-img {
                        height: .466666666666667rem;
                    }
                }
            }


            h3 {
                margin-bottom: .4rem;
                font-size: .213333333333333rem;
                color: #fff;
                text-align: left;

            }

            a {
                font-size: .186666666666667rem;
                color: #999;
            }
        }

        .copyright {
            margin-top: .133333333333333rem;
            padding: 28px 0;
            font-size: 16px;
            border-top: 1px dashed #999;
            color: #999;
        }





    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            height: auto;

            .w {
                flex-direction: column;
                padding: .8rem .533333333333333rem 0;

                .left-link {
                    width: 100% !important;

                    h3 {
                        margin-bottom: .8rem;
                        font-size: .426666666666667rem;
                    }

                    .link-wrap {
                        margin-bottom: .533333333333333rem;
                    }

                    &.site-navigation {
                        display: none;
                    }
                }

                .follow-us {
                    margin-top: .533333333333333rem;

                    .nav-link {
                        display: flex;
                        justify-content: space-between;
                    }

                    .out-link {
                        img {
                            width: .533333333333333rem;
                            height: auto;
                        }
                    }

                    h3 {
                        display: none;
                    }

                    .main-web-logo {
                        padding-right: 9rem;

                        img {
                            height: .64rem !important;
                        }
                    }
                }

            }

            .copyright {

                margin-top: .533333333333333rem;
                font-size: .32rem;
            }
        }
    }
</style>