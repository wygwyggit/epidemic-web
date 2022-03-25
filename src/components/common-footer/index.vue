<template>
    <div :class="prefixCls">
        <div class="w">
            <div class="item-box">
                <div class="left">
                </div>
                <div class="right">
                    <ul class="clearfix">
                        <li class="item">
                            <a href="">{{$t("common.home")}}</a>
                        </li>
                        <li class="item">
                            <a href="">{{$t("common.blind-box")}}</a>
                        </li>
                        <li class="item">
                            <a href="">{{$t("common.marketplace")}}</a>
                        </li>
                        <li class="item">
                            <a href="">{{$t("common.help")}}</a>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li class="item-img">
                            <a href="">
                                <img src="../../assets/images/Twitter.png" alt="">
                            </a>
                        </li>
                        <li class="item-img">
                            <a href="">
                                <img src="../../assets/images/Telegram App.png" alt="">
                            </a>
                        </li>
                    </ul>
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
        height: 240px;
        background: #0B0F15;
        text-align: center;
        color: #aaaaaa;

        .item-box {
            display: flex;
            justify-content: space-between;
            padding: 60px 0 74px 0;

            .left {
                width: 140px;
                height: 45px;
                background: url('../../assets/images/logo.png');
                background-size: 100% 100%;
            }

            .right {
                li {
                    float: left;

                    a {
                        color: #fff;
                        font-size: 18px;
                    }

                    img {
                        vertical-align: middle;
                    }

                    &.item {
                        margin-right: 40px;
                    }

                    &.item-img {
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
            padding: 10px 0;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.56);
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            height: auto;
            padding: .906666666666667rem .853333333333333rem;

            .item-box {
                flex-direction: column;
                padding: 0;

                ul {
                    margin-top: .533333333333333rem;
                    display: flex;
                }

                .right {
                    li.item {
                        margin-right: .533333333333333rem;

                        a {
                            font-size: .32rem;
                        }
                    }
                    li.item-img {
                        padding-left: 0;
                        padding-right: .8rem;
                    }
                }
            }
            .copyright {
                margin-top: .533333333333333rem;
                padding-top: .533333333333333rem;
                padding-bottom: 2.133333333333333rem;
                border-top: 1px solid #29374B;
                font-size: .32rem;
            }
        }
    }
</style>
