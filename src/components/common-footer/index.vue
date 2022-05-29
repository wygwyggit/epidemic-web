<template>
    <div :class="prefixCls">
        <div class="w">
            <div class="item-box">
                <div class="left">
                </div>
                <div class="right">
                    <ul class="clearfix">
                        <li class="item">
                            <router-link tag="a" :to="{path: 'home'}">{{$t("common.home")}}</router-link>
                        </li>
                        <li class="item">
                            <router-link tag="a" :to="{path: 'blindBox'}">{{$t("common.blind-box")}}</router-link>
                        </li>
                        <li class="item">
                            <router-link tag="a" :to="{path: 'marketplace'}">{{$t("common.marketplace")}}</router-link>
                        </li>
                        <li class="item">
                            <router-link tag="a" :to="{path: 'netMining'}">{{$t("common.net-mining")}}</router-link>
                        </li>
                        <li class="item">
                            <router-link tag="a" :to="{path: 'account'}">{{$t("common.my-account")}}</router-link>
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
                                <a href="https://www.instagram.com/accounts/login/?next=/amazingdogecoin/" target="_blank">
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
                                <a href="https://bscscan.com/address/0x0EBc30459551858e81306d583025d12C7d795FA2" target="_blank">
                                    <img src="../../assets/images/bsc.png" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
            <div class="copyright">
                © 2022 AmazingDogeNFT All rights reserved
            </div>
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
        background: #0B0F15;
        text-align: center;
        color: #aaaaaa;

        .item-box {
            display: flex;
            justify-content: space-between;
            padding: 60px 0 18px 0;
            width: 100%;

            .left {
                margin-top: -18px;
                width: 140px;
                height: 45px;
                background: url('../../assets/images/logo.png');
                background-size: 100% 100%;
            }

            .right {
                display: flex;

                li {
                    float: left;

                    a {
                        color: #fff;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    img {
                        vertical-align: middle;
                    }

                    &.item {
                        margin-right: 40px;
                    }

                    &.item-img {
                        margin-bottom: 20px;
                        padding-left: 30px;

                        img {
                            width: 24px;
                            height: 24px;
                        }
                    }
                }
            }
        }

        .copyright {
            padding: 28px 0;
            font-size: 16px;
            border-top: 1px solid #29374B;
            color: rgba(255, 255, 255, 0.56);
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            height: auto;
            padding: .906666666666667rem .7rem;

            .item-box {
                flex-direction: column;
                padding: 0;

                ul {
                    margin-top: .533333333333333rem;
                    display: flex;
                }

                .right {
                    display: block;

                    li.item {
                        margin-right: .4rem;
                        &:last-child {
                            margin: 0;
                        }
                        a {
                            font-size: .266666666666667rem;
                        }
                    }

                    li.item-img {
                        padding-left: 0;
                        padding-right: .8rem;
                    }
                    .out-link {
                        display: flex;
                    }
                }
            }

            .copyright {
                margin-top: .533333333333333rem;
                padding-top: .533333333333333rem;
                padding-bottom: 2.133333333333333rem;
                font-size: .32rem;
            }
        }
    }
</style>
