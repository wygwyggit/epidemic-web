<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('account.open')" :visible.sync="isShowDialog" width="6.4rem" @close="openGiftDialogClosed"
            custom-class="open-gift-dialog" :close-on-click-modal="false">

            <ul>
                <li class="item">
                    <div class="key">{{ $t("account.available") }}</div>
                    <div class="val">{{ row.num }}</div>
                </li>
                <li class="item">
                    <div class="key">{{ $t("account.quantity-for-open") }}</div>
                    <div class="val">
                        <el-input-number v-model="openQuantity" :min="1" :max="row.num > 5 ? 5 : row.num"></el-input-number>
                    </div>
                </li>
            </ul>

            <div class="opt-btn">
                <el-button class="btn" :loading="isLoading" v-debounce="doOpenGift">{{$t("common.confirmed") }} </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import myAjax from '@/utils/ajax.js'
    export default {
        name: 'open',
        components: {},
        props: {
            row: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'views-account-open',
                isLoading: false,
                isShowDialog: true,
                openQuantity: 1,
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            doOpenGift() {
                this.isLoading = true
                myAjax({
                    url: 'user/prize/lottery/open',
                    data: {
                        body: {
                            type_id: this.row.type_id,
                            open_num: this.openQuantity
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        const data = (res.data || {}).rewards
                        data.forEach(x => {
                            if (x.name.includes('-')) {
                                x.title = x.name.split('-')[3]
                            } else {
                                x.title = x.name
                            }
                        });
                        this.$emit('openGiftOk', data)
                    } else {
                        this.$showError('操作失败')
                    }
                    this.isLoading = false
                })
            },
            openGiftDialogClosed() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account-open";

    .#{$prefixCls} {
        .open-gift-dialog {
            .el-dialog__header {
                padding: 0.373333333333333rem 0.266666666666667rem 0 0.266666666666667rem;
            }

            .el-dialog__body {
                padding: 0.533333333333333rem 0.266666666666667rem;
            }

            ul {
                .item {
                    display: flex;
                    margin-bottom: .4rem;
                    justify-content: space-between;
                    align-items: center;
                    font-size: .266666666666667rem;

                    .key {
                        color: #777E90;
                    }

                    .val {
                        text-align: right;
                        flex: 1;
                        color: #fff;
                    }

                    .el-input-number {
                        width: 2.133333333333333rem;
                        line-height: .533333333333333rem;

                        .el-input-number__decrease,
                        .el-input-number__increase {
                            width: .533333333333333rem;
                            background: #32A3FF;
                            color: #fff;
                            border: 0;
                        }

                        .el-input__inner {
                            height: .533333333333333rem;
                            padding: 0;
                            background: #1D2633;
                            border: 0;
                            color: #fff;
                        }
                    }
                }
            }

            .opt-btn {
                .btn {
                    width: 100%;
                    height: 0.8rem;
                    text-align: center;
                    border: 0;
                    font-size: 0.32rem;
                    color: #fff;
                    border-radius: 0.133333333333333rem;
                    background: #00a73a;
                    cursor: pointer;
                }
            }
        }
    }
</style>