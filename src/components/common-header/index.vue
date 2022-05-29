<template>
    <div :class="prefixCls" :style="{ background: myBgColor }">
        <div class="left">
            <div class="page-logo">
                <img src="../../assets/images/logo.png" alt="" />
            </div>
            <div class="page-tabs">
                <div class="tab-item" :data-hover="tab.text" v-for="tab in tabs" :key="tab.name"
                    :class="{ 'tab-active': tab.name == currentTab }" @click="redirectTo(tab)">
                    {{ $t(`common.${tab.text}`) }}
                </div>
            </div>
        </div>

        <div class="right">
            <template v-if="!account">
                <div class="user-pc">
                    <div class="connect" @click="connectWalletMetaMask(false)">
                        {{ $t("common.connect") }}
                    </div>
                </div>
            </template>
            <template v-else>
                <p class="adoge-num"></p>
                <div class="user-pc">
                    <el-popover placement="bottom-start" trigger="click" :visible-arrow="false"
                        popper-class="el-popover-black">
                        <div class="pop-tip" slot="reference">
                            <div class="wallet">
                                <img src="../../assets/images/wallet.png" alt="" />
                                {{ smallAccount }}
                            </div>
                        </div>
                        <div class="dis-connect" @click="disconnected">
                            {{ $t("common.disConnect") }}
                            <img src="../../assets/images/out.png" alt="" />
                        </div>
                    </el-popover>
                </div>
            </template>
            <a href="javascript:;" class="header-above-slideicon" @click="openSlider">
                <img src="../../assets/images/line.png" alt="" />
            </a>
            <div class="lang-opt">
                <!-- <div class="item current">EN</div>
                <div class="item other">ZH</div> -->
                <el-popover placement="bottom-start" trigger="click" :visible-arrow="false"
                    popper-class="el-popover-black">
                    <div class="pop-tip" slot="reference">
                        <div class="item current">{{ lang }}</div>
                    </div>
                    <div class="other-lang" style="cursor: pointer" @click="doChangeLang">
                        {{ otherLang }}
                    </div>
                </el-popover>
                <!-- <el-dropdown @command="doChangeLang">
                    <span class="el-dropdown-link">
                        <div class="item current">{{lang}}</div>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>{{otherLang}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
            </div>
        </div>
        <div class="header-slideout" :style="{ width: isShowSlider ? '100%' : '0' }">
            <div class="content" v-show="isShowSlider">
                <div class="close" @click="closeSlider"></div>
                <nav>
                    <a href="javascript:;" v-for="tab in tabs" :key="tab.name" class="item" :class="tab.text"
                        @click="redirectTo(tab)">
                        <img src="../../assets/images/nav-home.png" alt="" v-if="tab.name === 'home'" />
                        <img src="../../assets/images/nav-blind-box.png" alt="" v-if="tab.name === 'blindBox'" />
                        <img src="../../assets/images/nav-marketplace.png" alt="" v-if="tab.name === 'marketplace'" />
                        <img src="../../assets/images/nav-my-account-m.png" alt="" v-if="tab.name === 'account'" />
                        <img src="../../assets/images/net-mining.png" alt="" v-if="tab.name === 'netMining'" />
                        {{ $t(`common.${tab.text}`) }}</a>
                    <a href="javascript:;" class="item lang" @click="selectLang">
                        <img src="../../assets/images/nav-lang.png" alt="" />
                        {{ $t("common.language") }}
                        <span class="r">{{ lang }}</span>
                    </a>
                </nav>
                <div class="bottom">
                    <div class="user-info">
                        <template v-if="account">
                            <div class="user-h5">
                                <div class="head-img">
                                    <img src="../../assets/images/reward-token.png" alt="" />
                                </div>
                                <div class="num-info">
                                    <p>BALANCE</p>
                                    <!-- <p class="num">10,000,000,000 Adoge</p> -->
                                </div>
                                <div class="buy-btn">
                                    {{ $t("detail.buy") }}
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="out-link">
                        <a href="https://twitter.com/AmazingDogeCoin" target="_blank">
                            <img src="../../assets/images/Twitter.png" alt="" />
                        </a>
                        <a href="https://t.me/amazingdoge_cn" target="_blank">
                            <img src="../../assets/images/Telegram App.png" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- <el-dialog :title="connectTitle" custom-class="connect-dialog" :visible.sync="isShowConnectDialog"
            :close-on-click-modal="false" :width="dialogWidth">
            <ul>
                <li class="c1" @click="connectWalletMetaMask(false)">MetaMask</li>
                <li class="c2" @click="openCodeDialog">{{$t("common.tokenPocket")}}</li>
            </ul>
        </el-dialog> -->
        <el-dialog custom-class="code-dialog" :visible.sync="isShowCodeDialog" :close-on-click-modal="false"
            :width="dialogWidth">
            <img src="../../assets/images/code.png" />
            <p class="tit">{{ $t("common.connect") }}</p>
            <p class="tip">Open on your mobile phone and scan <i>TokenPocket</i></p>
        </el-dialog>
        <el-dialog custom-class="lang-dialog" :visible.sync="isShowLangDialog" :close-on-click-modal="false"
            width="8.9rem">
            <ul>
                <li>{{ lang }}</li>
                <li @click="doChangeLang">{{ otherLang }}</li>
            </ul>
        </el-dialog>
    </div>
</template>
<script>
    import {
        mainDomain
    } from "@/config/config.js";
    import Cookie from "@/utils/cookie.js";
    import utils from "@/utils";
    import myAjax from "@/utils/ajax.js";
    import eventBus from "@/utils/eventBus";
    import web3Tool from '@/utils/web3'
    export default {
        name: "common-header",
        components: {},
        props: {
            bgColor: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                prefixCls: "components-common-header",
                account: null,
                chainId: 0,
                isConnect: false,
                isShowConnectDialog: false,
                myBgColor: "",
                isShowSlider: false,
                isShowLangDialog: false,
                isShowCodeDialog: false,
                dialogWidth: "400px",
                lang: "",
                otherLang: "",
                tabs: [{
                        text: "home",
                        name: "home",
                        path: "/home",
                    },
                    {
                        text: "blind-box",
                        name: "blindBox",
                        path: "/blindBox",
                    },
                    {
                        text: "marketplace",
                        name: "marketplace",
                        path: "/marketplace",
                    },
                    {
                        text: "my-account",
                        name: "account",
                        path: "/account",
                    },
                    {
                        text: "net-mining",
                        name: "netMining",
                        path: "/netMining",
                    },
                ],
                currentTab: "home",
            };
        },
        computed: {
            connectTitle() {
                return this.$t("common.connect");
            },
            smallAccount() {
                let firstCode = this.account.slice(0, 6);
                let lastCode = this.account.slice(-4);
                return `${firstCode}...${lastCode}`;
            },
        },
        watch: {
            $route: {
                immediate: true,
                deep: true,
                handler(val, oldval) {
                    switch (val.path.replace("/", "")) {
                        case "home":
                            this.currentTab = val.path.replace("/", "");
                            this.myBgColor = this.bgColor;
                            break;
                        default:
                            let width = window.innerWidth;
                            if (width < 768) {
                                this.myBgColor = "#14181f";
                            } else {
                                this.myBgColor = this.bgColor;
                            }
                            this.currentTab = val.path.replace("/", "");
                            break;
                    }
                },
            },
        },
        async created() {
            this.account = Cookie.getCookie("__account__") || null
            this.initRewardRef();
            this.lang = localStorage.getItem("lang") || "EN";
            this.otherLang = this.lang === "EN" ? "ZH" : "EN";
            let width = window.innerWidth;
            if (width < 768) {
                this.dialogWidth = "8.9rem";
            }
        },
        mounted() {
            // 监听账号变化
            this.listenerAccountChange()
        },
        beforeDestroy() {},
        methods: {
            listenerAccountChange() {
                ethereum.on('accountsChanged', accounts => {
                    if (accounts.length === 0) {
                        this.disconnected();
                    } else {
                        this.account = accounts[0];
                        Cookie.setCookie("__account__", this.account);
                        this.getToken()
                    }
                })
            },
            initRewardRef() {
                let ref = utils.getQueryString("ref");
                Cookie.setCookie("__rewardRef__", ref);
                if (location.pathname === "/blindBox" && ref) {
                    location.replace(`${mainDomain}blindBox`);
                }
            },
            async accountChanged(accounts, flag) {
                if (accounts.length === 0) {
                    this.disconnected();
                } else {
                    this.account = accounts[0];
                    Cookie.setCookie("__account__", this.account);
                    flag && eventBus.$emit("connect");
                    this.getToken()
                }
                //this.isShowConnectDialog = false
            },
            getToken() {
                myAjax({
                    url: 'auth/auth',
                    data: {
                        body: {
                            addr: this.account,
                            user_sign: this.account
                        }

                    }
                }).then(res => {
                    if (res.ok) {
                        res.token && (Cookie.setCookie('ad_token', res.data.token))
                    }
                    regUser()
                })
            },
            regUser() {
                myAjax({
                    url: "user/sign",
                    data: {
                        inviter: Cookie.getCookie("__rewardRef__"),
                    },
                })
            },
            chainChanged(chainId) {
                this.chainId = parseInt(chainId, 16);
                //this.isShowConnectDialog = false
            },
            async disconnected() {
                Cookie.delCookie("__account__");
                this.account = null;
                location.reload();
            },
            async connectWalletMetaMask(flag) {
                web3Tool.init.call(this, account => {
                    this.account = account
                    Cookie.setCookie("__account__", this.account);
                    this.getToken()
                })
                //   if (window.ethereum) {
                //     window.ethereum.enable().then((res) => {
                //       this.accountChanged(res)
                //     });
                //   } else {
                //     this.$showError("there is no web3 provider.");
                //   }
                // if (!this.web3Provider) {
                //   this.$showError("there is no web3 provider.");
                //   return false;
                // }
                // try {
                //   this.accountChanged(
                //     await window.ethereum.request({
                //       method: "eth_requestAccounts",
                //     }),
                //     flag
                //   );
                //   this.chainChanged(
                //     await window.ethereum.request({
                //       method: "eth_chainId",
                //     })
                //   );
                //   window.ethereum.on("disconnect", this.disconnected);
                //   window.ethereum.on("accountsChanged", this.accountChanged);
                //   window.ethereum.on("chainChanged", this.chainChanged);
                // } catch (e) {
                //   console.error("could not get a wallet connection.", e);
                //   return false;
                // }
                // return true;
            },
            selectLang() {
                this.isShowLangDialog = true;
            },
            openSlider() {
                this.isShowSlider = true;
            },
            closeSlider() {
                this.isShowSlider = false;
            },
            doChangeLang() {
                localStorage.setItem("lang", this.otherLang);
                window.location.reload();
            },
            redirectTo(tab) {
                this.isShowSlider = false;
                this.currentTab = tab.name;
                this.$router.push({
                    path: tab.path,
                });
            },
            openConnectDialog() {
                this.isShowConnectDialog = true;
            },
            openCodeDialog() {
                this.isShowCodeDialog = true;
            },
        },
    };
</script>

<style lang="scss">
    $prefixCls: "components-common-header";

    .#{$prefixCls} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.453333333333333rem;
        width: 100%;
        height: 100px;
        background: $--color-success;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
        z-index: 999;

        .left {
            display: flex;
            align-items: center;
        }

        .page-logo {
            margin-right: 41px;
            font-size: 28px;
            font-weight: 700;

            img {
                width: 170px;
                height: 60px;
            }
        }

        .page-tabs {
            display: flex;
            align-items: center;
            height: 100px;

            .tab-item {
                display: flex;
                align-items: center;
                position: relative;
                margin-right: 17px;
                padding: 0 10px;
                height: 100%;
                cursor: pointer;
                opacity: 1;
                color: #cbe8ff;
                font-size: 18px;
                transition: color 0.7s;

                &.tab-active {
                    color: #fff;
                    border-bottom: 2px solid #fff;
                }

                &:last-child {
                    margin-right: 0;
                }
            }
        }

        .right {
            display: flex;
            align-items: center;

            .header-above-slideicon {
                display: none;
            }

            .user {
                position: relative;
                margin-right: 20px;
            }

            .connect,
            .wallet {
                display: flex;
                align-items: center;
                height: 40px;
                line-height: 40px;
                border: 1px solid #fff;
                border-radius: 0.68rem;
                padding: 0 10px;
                font-size: 14px;
                color: #fff;
                cursor: pointer;

                img {
                    vertical-align: middle;
                }
            }

            .adoge-num {
                // width: 100px;
                // white-space: nowrap;
                // overflow: hidden;
                // text-overflow: ellipsis;
                margin-right: 20px;
                color: #fff;
                font-size: 18px;
            }

            .lang-opt {
                position: relative;
                margin-left: 20px;

                .item {
                    width: 51px;
                    height: 40px;
                    border-radius: 51px;
                    background: #fff;
                    color: $--color-success;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }

        .connect-dialog {
            li {
                margin-bottom: 20px;
                padding-left: 100px;
                width: 100%;
                height: 80px;
                line-height: 80px;
                cursor: pointer;
                font-size: 18px;

                &.c1 {
                    background: #1d2633 url("../../assets/images/c1.png");
                    background-repeat: no-repeat;
                    background-position: 40px center;
                    background-size: 40px 40px;
                }

                &.c2 {
                    background: #1d2633 url("../../assets/images/c2.png");
                    background-repeat: no-repeat;
                    background-position: 40px center;
                    background-size: 40px 40px;
                }
            }
        }

        .code-dialog {
            text-align: center;

            img {
                margin-bottom: 0.266666666666667rem;
                width: 240px;
                height: 240px;
                border-radius: 15px;
            }

            .tit {
                color: #777e90;
                font-size: 24px;
            }

            .tip {
                margin-top: 5px;
                color: #777e90;
                font-size: 12px;

                i {
                    color: $--color-success;
                }
            }
        }

        .header-slideout {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            min-height: 100%;
            background: #1d2633;
            color: #fff;
            z-index: 99;
            transition: all 0.3s;

            .content {
                margin: 1.28rem 0.853333333333333rem 1.333333333333333rem 0.853333333333333rem;
            }

            .close {
                margin-bottom: 0.64rem;
                width: 0.853333333333333rem;
                height: 0.853333333333333rem;
                background: url("../../assets/images/close.png");
                background-size: cover;
                cursor: pointer;
            }

            nav {
                .item {
                    display: block;
                    width: 100%;
                    height: 1.92rem;
                    line-height: 1.92rem;
                    font-size: 0.48rem;
                    color: #fff;
                    background: url("../../assets/images/link.png");
                    background-repeat: no-repeat;
                    background-position: right center;

                    img {
                        width: 0.586666666666667rem;
                        height: 0.586666666666667rem;
                        margin-right: 0.2rem;
                        vertical-align: text-top;
                    }

                    &.lang {
                        background: none;

                        span {
                            font-weight: bolder;
                        }
                    }
                }
            }

            .bottom {
                margin-top: 2.666666666666667rem;
            }

            .user-info {
                .user-h5 {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .head-img {
                        img {
                            width: 1.066666666666667rem;
                            height: 1.066666666666667rem;
                            vertical-align: middle;
                        }
                    }

                    .num-info {
                        margin: 0 0.4rem;
                        font-size: 0.426666666666667rem;
                    }

                    .buy-btn {
                        padding: 0 0.4rem;
                        height: 0.8rem;
                        line-height: 0.8rem;
                        background: #00cf08;
                        font-size: 0.373333333333333rem;
                        border-radius: 0.533333333333333rem;
                        cursor: pointer;
                    }
                }
            }

            .out-link {
                margin-top: 0.773333333333333rem;
                text-align: center;

                a {
                    img {
                        width: 0.72rem;
                        height: 0.72rem;
                    }

                    &:first-child img {
                        margin-right: 0.8rem;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            height: 2.186666666666667rem;
            background: #14181f;

            .el-dialog {
                .el-dialog__header {
                    min-height: 1rem;
                    padding: 0.266666666666667rem 0.4rem 0 0.4rem;

                    .el-dialog__title {
                        font-size: 0.48rem;
                    }
                }
            }

            .connect-dialog {
                .el-dialog__body {
                    padding: 0.8rem 0.533333333333333rem;

                    li {
                        padding-left: 2.133333333333333rem;
                        height: 1.6rem;
                        line-height: 1.6rem;
                        border: 1px solid #004d8c;
                        border-radius: 0.266666666666667rem;
                        font-size: 0.426666666666667rem;
                        background-size: 1.066666666666667rem 1.066666666666667rem;
                        background-position: 0.533333333333333rem center;
                    }
                }
            }

            .lang-dialog {
                .el-dialog__body {
                    li {
                        margin-bottom: 0.3rem;
                        width: 100%;
                        height: 1.6rem;
                        line-height: 1.6rem;
                        border: 1px solid #004d8c;
                        border-radius: 0.266666666666667rem;
                        padding-left: 0.266666666666667rem;
                        font-size: 0.533333333333333rem;
                        color: #fff;

                        &:first-child {
                            color: $--color-success;
                        }
                    }
                }
            }

            .page-logo {
                img {
                    width: 3.093333333333333rem;
                    height: 1.2rem;
                }
            }

            .page-tabs {
                display: none;
            }

            .adoge-num,
            .lang-opt {
                display: none;
            }

            .header-above-slideicon {
                margin-left: 0.266666666666667rem;
                display: block !important;
            }
        }
    }
</style>