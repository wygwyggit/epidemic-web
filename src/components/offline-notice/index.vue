<template>
    <div class="offline-notice-page">
        <el-dialog :title="$t('common.off-line-title')" :visible.sync="offLineDialogVisible" width="8.9rem"
            custom-class="logout-dialog" :close-on-click-modal="false" :close-on-press-escape="false"
            :show-close="false">
            <div class="dialog-content">
                <div class="icon">
                    <img src="../no-connect-wallet/no-wallet.png" alt="">
                </div>
                <div class="tips">
                    {{ $t("common.off-line")}}
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sign">{{ $t("common.please-authorize") }}</el-button>
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        signMixin
    } from '../../mixin/index'
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'offline-notice',
        mixins: [signMixin],
        data() {
            return {}
        },
        created() {
            console.log(signMixin)
        },
        computed: {
            ...mapState({
                userInfo: state => state.userInfo,
                offLineDialogVisible: state => state.offLineDialogVisible
            }),
        },
        methods: {
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
            }
        }
    }
</style>