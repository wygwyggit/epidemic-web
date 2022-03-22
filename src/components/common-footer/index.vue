<template>
    <div :class="prefixCls">
        <div class="w">
            <div class="item-box">
                <div class="left">
                </div>
                <div class="right">
                    <ul>
                        <li class="item">
                            <a href="">Home</a>
                        </li>
                        <li class="item">
                            <a href="">Blind box</a>
                        </li>
                        <li class="item">
                            <a href="">Marketplace</a>
                        </li>
                        <li class="item">
                            <a href="">Help</a>
                        </li>
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
        height: 135px;
        background: #0B0F15;
        text-align: center;
        color: #aaaaaa;

        .item-box {
            display: flex;
            justify-content: space-between;
            padding: 38px 0 45px 0;

            .left {
                width: 79px;
                height: 25px;
                background: url('../../assets/images/logo.png');
                background-size: 100% 100%;
            }

            .right {
                li {
                    float: left;

                    a {
                        color: #fff;
                        font-size: 12px;
                    }

                    img {
                        vertical-align: middle;
                    }

                    &.item {
                        margin-right: 23px;
                    }

                    &.item-img {
                        padding-left: 17px;
                        img {
                            width: 14px;
                            height: 14px;
                        }
                    }
                }
            }
        }

        .copyright {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.56);
        }
    }
</style>
