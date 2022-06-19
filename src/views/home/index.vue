<template>
    <div :class="prefixCls">
        <div class="w">
            <div class="amazing-doge">
                <div class="tit">
                    {{ $t("home.amazing-doge") }}
                </div>
                <div class="sub-tit">
                    {{ $t("home.amazing-tip") }}
                </div>
                <div class="contract" @click="copyContractTxt('A')">
                    <img src="../../assets/images/home-contract-1.png" alt="">
                    <span class="con-txt">{{ contractTxtA }}</span>
                    <span class="line"></span>
                </div>
                <div class="contract" @click="copyContractTxt('B')">
                    <img src="../../assets/images/home-contract-2.png" alt="">
                    <span class="con-txt">{{ contractTxtB }}</span>
                    <span class="line"></span>
                </div>
                <div class="contract" @click="copyContractTxt('C')">
                    <img src="../../assets/images/home-contract-3.png" alt="">
                    <span class="con-txt">{{ contractTxtC }}</span>
                    <span class="line"></span>
                </div>
            </div>
            <ul class="img-ul clearfix">
                <li class="item-img">
                    <img src="../../assets/images/home-img-1.png" alt="" />
                </li>
                <li class="item-img">
                    <img src="../../assets/images/home-img-2.png" alt="" />
                </li>
                <li class="item-img">
                    <img src="../../assets/images/home-img-3.png" alt="" />
                </li>
                <li class="item-img">
                    <img src="../../assets/images/home-img-4.png" alt="" />
                </li>
                <li class="item-img">
                    <img src="../../assets/images/home-img-5.png" alt="" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import VueClipboard from "vue-clipboard2";
    export default {
        name: "",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "views-home",
                contractTxtA: "0x0EBc30459551858e81306d583025d12C7d795FA2",
                contractTxtB: "0x44Ece1031e5b5e2D9169546cC10EA5C95BA96237",
                contractTxtC: "0x1aac0c12be72d8e1fe13db7a59e0262bd0fb789c",
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {
            Vue.use(VueClipboard);
        },
        beforeDestroy() {},
        methods: {
            copyContractTxt(code) {
                const cName = 'contractTxt' + code
                this.$copyText(this[cName]).then(() => {
                    this.$showOk(`${this.$t("blind-box.copy-success")}`);
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    $prefixCls: "views-home";

    .#{$prefixCls} {
        padding: 0.1rem 0 0.693333333333333rem 0;
        background: linear-gradient(180deg, #FF9330 0%, #FFDE49 100%);

        .amazing-doge {
            padding-top: 53px;
            padding-bottom: 80px;
            background: url("../../assets/images/home-content-bg.png");
            background-size: 364px 528px;
            background-position: right top;
            background-repeat: no-repeat;

            .tit {
                font-size: 110px;
                color: #181E34;
                font-family: home-amazing;
            }

            .sub-tit {
                margin-bottom: 46px;
                font-family: home-amazing;
                font-size: 42px;
                color: #181E34;
            }
        }


        .contract {
            position: relative;
            margin-bottom: .293333333333333rem;
            max-width: 560px;
            padding: 0.09rem .2rem 0.09rem .75rem;
            border-radius: .133333333333333rem;
            font-size: .24rem;
            color: #271E05;
            background: rgba(255, 255, 255, 0.5) url("../../assets/images/contract.png");
            background-position: right center;
            background-repeat: no-repeat;
            background-size: 0.426666666666667rem 0.426666666666667rem;
            background-origin: content-box;
            text-align: left;
            font-family: home-amazing;
            cursor: pointer;

            .con-txt {
                word-break: break-all;
            }

            img {
                position: absolute;
                top: 50%;
                left: -0.133333333333333rem;
                width: .693333333333333rem;
                height: .693333333333333rem;
                transform: translateY(-50%);
            }

            .line {
                position: absolute;
                right: 54px;
                display: inline-block;
                margin-left: .133333333333333rem;
                width: 1px;
                height: .28rem;
                background: #F49B3B;
            }
        }

        .img-ul {
            display: flex;
            justify-content: space-between;

            .item-img {
                img {
                    width: 220px;
                    height: 220px;
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
                background: url("../../assets/images/home-content-bg.png");
                background-size: 100% auto;
                background-position: center 3rem;
                background-repeat: no-repeat;
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
