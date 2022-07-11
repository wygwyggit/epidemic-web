<template>
    <div class="offline-notice-page">
        <el-dialog :title="$$t('offLine', 'off-line-title')" :visible.sync="offLineDialogVisible" width="8.9rem"
            custom-class="logout-dialog" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="dialog-content">
                <div class="icon">
                    <img src="../no-connect-wallet/no-wallet.png" alt="">
                </div>
                <div class="tips">
                    {{ $$t("offLine", "off-line")}}
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sign">{{ $$t("offLine", "please-authorize") }}</el-button>
                    <el-button @click="logOut">{{ $$t("offLine", "log-out") }}</el-button>
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        signMixin
    } from '../../mixin/index'
    import store from '@/store/index'
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import Cookie from "@/utils/cookie.js";
    export default {
        name: 'offline-notice',
        mixins: [signMixin],
        data() {
            return {}
        },
        created() {},
        computed: {
            ...mapState({
                userInfo: state => state.userInfo,

            }),
            offLineDialogVisible: {
                get() {
                    return store.state.offLineDialogVisible
                },
                set(val) {
                    store.dispatch('upDateOffLineDialog', val)
                }
            }
        },
        methods: {
            logOut() {
                Cookie.delCookie("ad_token")
                Cookie.delCookie("__account__")
                this.UPDATE_USERINFO({})
                location.reload()
            },
            ...mapMutations([
                'UPDATE_USERINFO'
            ]),
        }
    }
</script>

<style lang='scss' scoped>
    .offline-notice-page {
        .dialog-content {
            text-align: center;

            color: $--color-text-secondary;

            .icon {
                margin-top: 5px;

                img {
                    width: 2rem;
                }
            }

            .tips {
                font-size: 20px;
                font-weight: bold;
                margin-top: .2rem;
                word-break: break-word;
            }

            .el-button {
                margin-top: 47px;
                width: 204px;
                color: #fff;

                &.el-button--default {
                    background: #FF5E1A;

                }
            }
        }
    }
</style>