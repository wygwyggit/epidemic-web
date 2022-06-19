<template>
    <div :class="prefixCls">
        <div class="w one-floor">
            <div class="left">
                <div class="amazing-doge-txt">
                    <div class="tit">
                        {{ $t("home.amazing-doge") }}
                    </div>
                    <div class="sub-tit">
                        {{ $t("home.amazing-tip") }}
                    </div>
                </div>
                <div class="white-paper">
                    <p>{{ $t("home.white-paper") }}
                        <img src="../../assets/images/arrow-right.png" alt="">
                    </p>
                </div>
                <div class="adog-amazing">
                </div>
            </div>
            <div class="right">

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "views-home",
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
    $prefixCls: "views-home";

    .#{$prefixCls} {
        padding: .866666666666667rem 0 0 0;
        background: #000;

        .one-floor {
            display: flex;
            justify-content: space-between;
            background: url('../../assets/images/home-one-floor-bg.png');
            background-size: 11.693333333333333rem auto;
            background-repeat: no-repeat;
            background-position: right bottom;

            .left {
                max-width: 10.146666666666667rem;
                padding-bottom: .933333333333333rem;

            }

            .amazing-doge-txt {
                padding: .586666666666667rem 0 0 0;


                .tit {
                    position: relative;
                    width: 9.613333333333333rem;
                    line-height: .7rem;
                    font-size: .533333333333333rem;
                    color: #fff;
                    font-weight: 600;
                    z-index: 999;
                }

                .sub-tit {
                    width: 7.693333333333333rem;
                    margin: .4rem 0;
                    line-height: .4rem;
                    font-weight: 400;
                    font-size: .266666666666667rem;
                    color: #fff;

                }
            }

            .white-paper {
                >p {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.466666666666667rem;
                    height: .746666666666667rem;
                    line-height: .746666666666667rem;
                    color: #fff;
                    font-size: .24rem;
                    border-radius: .133333333333333rem;
                    background: linear-gradient(31deg, #2563EB 2%, #BD00FF 100%);

                    img {
                        width: .4rem;
                    }
                }
            }

            .adog-amazing {
                margin-top: .8rem;
                height: 1.066666666666667rem;
                line-height: 1.066666666666667rem;
                border-radius: .133333333333333rem;
            }

            .right {
                position: relative;
                width: 6.746666666666667rem;
                background:  url("../../assets/images/home-big-adoge.png");
                background-size: 100% auto;
                background-position: right top;
                background-repeat: no-repeat;
                z-index: 999;

                &::before {
                    content: "";
                    position: absolute;
                    bottom: .853333333333333rem;
                    left: -0.933333333333333rem;
                    width: .933333333333333rem;
                    height: .933333333333333rem;
                    background: url('../../assets/images/dot-left.png');
                    background-size: cover;
                }

                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: .746666666666667rem;
                    height: .746666666666667rem;
                     background: url('../../assets/images/dot-right.png');
                    background-size: cover;
                }

            }
        }




    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            padding-bottom: 0;

            .amazing-doge {
                padding: 0;
                padding-bottom: 1.28rem;
                text-align: center;

                .tit {
                    font-size: 1.28rem;
                }

                .line {
                    right: .7rem;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .sub-tit {
                    height: 13rem;
                    line-height: 1.146666666666667rem;
                    font-size: 0.533333333333333rem;
                }

                .contract {
                    display: flex;
                    margin: .133333333333333rem 0.533333333333333rem 0;

                    .con-key {
                        display: none;
                    }

                    .con-txt {
                        display: inline-block;
                        width: 7.6rem;
                        white-space: wrap;
                        padding-right: .4rem;
                    }
                }
            }

            .img-ul {
                position: relative;
                top: -1rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 0.533333333333333rem;

                .item-img {
                    margin-bottom: .15rem;
                    float: left;

                    img {
                        display: block;
                        height: 2.8rem;
                        width: 2.8rem;
                    }

                    &:last-child,
                    &:nth-child(4n) {
                        img {
                            width: 4.266666666666667rem;
                            height: 4.266666666666667rem;
                        }

                    }
                }
            }
        }
    }
</style>