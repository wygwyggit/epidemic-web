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
                <div class="connect" @click=openConnectDialog>
                    Connect Wollet
                </div>
            </template>
            <el-dropdown>
                <div class="lang">EN</div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>EN</el-dropdown-item>
                    <el-dropdown-item>ZH</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-dialog title="Connect wallet" custom-class="connect-dialog" :visible.sync="isShowConnectDialog"
            :close-on-click-modal="false" width="400px" >
            <ul>
                <li class="c1">MetaMask</li>
                <li class="c2">TokenPocket</li>
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

            .connect {
                height: 40px;
                line-height: 40px;
                border: 1px solid #fff;
                border-radius: 51px;
                margin-right: 10px;
                padding: 0 10px;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
            }

            .lang {
                width: 51px;
                height: 40px;
                border-radius: 51px;
                background: #fff;
                color: #32A3FF;
                text-align: center;
                line-height: 40px;
                font-size: 14px;
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
