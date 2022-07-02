<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('upgrade.select')" :custom-class="prefixCls + '-dialog'" :close-on-click-modal="false"
            :visible.sync="isShowDialog" width="9.06rem" v-if="isShowDialog" @close="doClose">
            <div class="content">
                <div class="search-wrap">
                    <span class="tip">{{ $t("upgrade.please-click")}}</span>
                    <el-input size="mini" placeholder="Search ID" suffix-icon="el-icon-search" v-model="keyWord">
                    </el-input>
                </div>
                <div class="main-list" v-loading="isLoading">
                    <template v-if="!isLoading && listData.length">
                        <item-card v-for="(item, index) of listData" :key="index" :itemInfo="item" :isShowName="false"
                            @select="selectNftCard">
                        </item-card>
                    </template>
                    <template v-if="!isLoading && !listData.length">
                        <el-empty :image="emptyImage" :description="$t('common.no-data')">
                            <p class="tip">
                                {{ $t("upgrade.you-can-get-it")}}
                            </p>
                        </el-empty>
                    </template>
                </div>
                <div class="confirm-btn">
                    <el-button type="primary">
                        {{ $t("common.confirmed")}}
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import myAjax from '@/utils/ajax.js'
    import itemCard from '@/components/item-card'
    import emptyImage from '@/assets/images/empty.png'
    export default {
        name: '',
        components: {
            itemCard
        },
        props: {
            ajaxUrl: {
                type: String,
                default: 'user/goods/list',
            }
        },
        data() {
            return {
                prefixCls: 'views-account-adoge-upgrade-select',
                emptyImage,
                isShowDialog: true,
                isLoading: true,
                keyWord: '',
                listData: [],
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {
            Promise.all([this.getList()]).then(() => {
                this.isLoading = false
            })
        },
        beforeDestroy() {},
        methods: {
            doClose() {
                this.$emit('close')
            },
            selectNftCard({
                goods_id
            }) {
                this.listData.forEach(x => {
                    x.select = false
                })
                const item = this.listData.find(x => x.goods_id === goods_id)
                item.select = !item.select
            },
            getList() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: this.ajaxUrl,
                        data: {
                            body: {
                                page: 1,
                                per_page: 100000
                            }
                        }
                    }).then(res => {
                        if (res.ok) {
                            const items = (res.data || {}).items || []
                            this.listData = items.map(x => ({
                                ...x,
                                select: false
                            }))
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account-adoge-upgrade-select";

    .#{$prefixCls} {

        // 隐藏页面的滚动条
        ::-webkit-scrollbar {
            width: 0 !important
        }

        .content {
            .search-wrap {
                display: flex;
                justify-content: space-between;
                color: #777E90;

                .el-input {
                    width: 3.386666666666667rem;

                    .el-input__inner {
                        border-color: #29374B;
                        background: transparent;
                    }
                }
            }


            .main-list {
                margin-top: .266666666666667rem;
                padding: .266666666666667rem;
                height: 6.066666666666666rem;
                border: 1px solid #29374B;
                border-radius: .266666666666667rem;
                overflow: auto;

                .el-empty {
                    height: 100%;

                    .el-empty__bottom {
                        margin-top: .133333333333333rem;
                    }

                    .tip {
                        color: #909399;
                    }
                }

                .components-item-card {
                    width: 3.533333333333333rem;
                    margin-right: .266666666666667rem;
                    display: inline-block;

                    &:nth-child(2n) {
                        margin-right: 0;
                    }
                }
            }

            .confirm-btn {
                margin-top: .533333333333333rem;

                .el-button {
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    padding: 0;
                    text-align: center;
                    font-size: .293333333333333rem;
                }
            }
        }
    }

    .#{$prefixCls}-dialog {
        .el-dialog__body {
            padding: .16rem .58rem;
        }
    }
</style>