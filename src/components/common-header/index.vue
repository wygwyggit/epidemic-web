<template>
    <div :class="prefixCls">
        <div class="left">
            <div class="page-logo">
                <img src="../../assets/images/logo.png" alt="">
            </div>
            <div class="page-tabs">
                <div class="tab-item" :data-hover="tab.text" v-for="tab in tabs" :key="tab.name"
                    :class="{ 'tab-active': tab.name == currentTab }" @click="redirectTo(tab)">
                    {{ tab.text }}
                </div>
            </div>
        </div>

        <div class="right">
            <template v-if="!isConnect">
                <div class="user">
                    <div class="connect" @click=openConnectDialog>
                        Connect Wollet
                    </div>
                </div>
            </template>
            <template v-else>
                <p class="adoge-num">10,000,000,000 Adoge</p>
                <div class="user">
                    <div class="wallet">
                        <img src="../../assets/images/wallet.png" alt="">
                        0xf235...2809</div>
                    <div class="dis-connect">
                        Disconnect
                        <img src="../../assets/images/out.png" alt="">
                    </div>
                </div>
            </template>
            <div class="lang-opt">
                <div class="item current">EN</div>
                <div class="item other">ZH</div>
            </div>
        </div>

        <el-dialog title="Connect wallet" custom-class="connect-dialog" :visible.sync="isShowConnectDialog"
            :close-on-click-modal="false" width="400px">
            <ul>
                <li class="c1">MetaMask</li>
                <li class="c2" @click="openCodeDialog">TokenPocket</li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "common-header",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "components-common-header",
                isConnect: false,
                isShowConnectDialog: false,
                isShowCodeDialog: false,
                tabs: [{
                        text: "Home",
                        name: "home",
                        path: "/home",
                    },
                    {
                        text: "Blind box",
                        name: "Blind",
                        path: "/blind",
                    },
                    {
                        text: "Marketplace",
                        name: "Marketplace",
                        path: "/marketplace",
                    },
                    {
                        text: "My account",
                        name: "account",
                        path: "/account",
                    }
                ],
                currentTab: "home",
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            redirectTo(tab) {
                this.currentTab = tab.name;
                this.$router.push({
                    path: tab.path,
                });
            },
            openConnectDialog() {
                this.isShowConnectDialog = true
            },
            openCodeDialog() {
                this.isShowCodeDialog = true
            }
        },
    };
</script>

<style lang="scss" scoped>
    $prefixCls: "components-common-header";

    .#{$prefixCls} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        height: 100px;
        background: #32A3FF;
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

            .tab-item {
                position: relative;
                margin-right: 17px;
                padding: 0 10px;
                line-height: 100px;
                cursor: pointer;
                opacity: 1;
                color: #CBE8FF;
                font-size: 18px;
                transition: color 0.7s;

                &.tab-active {
                    color: #fff;
                    border-bottom: 2px solid #fff;
                }
            }
        }

        .right {
            display: flex;
            align-items: center;

            .user {
                position: relative;
                margin-right: 20px;
            }

            .connect,
            .wallet,
            .dis-connect {
                height: 40px;
                line-height: 40px;
                border: 1px solid #fff;
                border-radius: 51px;
                padding: 0 10px;
                font-size: 14px;
                color: #fff;
                cursor: pointer;

                img {
                    vertical-align: middle;
                }
            }

            .wallet:hover+.dis-connect {
                opacity: 1;
            }

            .dis-connect {
                position: absolute;
                bottom: -45px;
                right: 0;
                width: 100%;
                background-color: #131922;
                border-color: #131922;
                text-align: center;
                opacity: 0;
                transition: all .3s;
            }

            .adoge-num {
                margin-right: 20px;
                color: #fff;
                font-size: 18px;
                line-height: 100px;
            }

            .lang-opt {
                position: relative;

                .item {
                    width: 51px;
                    height: 40px;
                    border-radius: 51px;
                    background: #fff;
                    color: #32A3FF;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;

                    &.current:hover+.other {
                        opacity: 1;
                    }

                    &.other {
                        position: absolute;
                        bottom: -45px;
                        background: #131922;
                        color: #fff;
                        opacity: 0;
                        transition: all .3s;
                    }
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
                    background: #1D2633 url('../../assets/images/c1.png');
                    background-repeat: no-repeat;
                    background-position: 40px center;
                    background-size: 40px 40px;
                }

                &.c2 {
                    background: #1D2633 url('../../assets/images/c2.png');
                    background-repeat: no-repeat;
                    background-position: 40px center;
                    background-size: 40px 40px;
                }
            }
        }
    }
</style>
