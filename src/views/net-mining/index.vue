<template>
    <div :class="prefixCls">
        <div class="top">
            <div class="w">
                <img src="../../assets/images/net-mining.png" alt="">
                {{$t("common.net-mining")}}</div>
        </div>
        <div class="main">
            <div class="w">
                <div class="left">
                    <ul>
                        <li>
                            <div>
                                <p class="tit-txt">
                                    {{$t("net-mining.participate")}}
                                </p>
                                <p class="val p-val">
                                    <span>0</span>NFTs
                                </p>
                            </div>

                        </li>
                        <li>
                            <div>
                                <p class="tit-txt">
                                    {{$t("net-mining.total-reward")}}
                                </p>
                                <p class="val">
                                    <span>0</span> Adoge
                                </p>
                            </div>

                        </li>
                        <li>
                            <div>
                                <p class="tit-txt">
                                    {{$t("net-mining.reward")}}
                                </p>
                                <p class="val reward-val">
                                    <span>0</span> Adoge
                                </p>
                            </div>
                            <el-button type="primary"> {{$t("blind-box.receive")}}</el-button>
                            <p class="tip">Update every day at <span class="timer">0:00 UTC</span> </p>

                        </li>
                    </ul>
                </div>
                <div class="right">
                    <div class="top-search">
                        <div class="total">
                            <span class="txt">{{total}} NFTs</span>
                        </div>
                        <div class="search">
                            <el-input :placeholder="placeholderTxt" v-model="query.keywords" class="input-keywords">
                                <a href="javascript:;" slot="append" class="search-icon"></a>
                            </el-input>
                            <el-select v-model="query.latest" placeholder="">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="list">
                        <el-empty description="暂无数据" v-if="!list.length && !isLoading"></el-empty>
                        <template v-if="list.length && !isLoading">
                            <item-card v-for="(item, index) of list" :key="index" :itemInfo="item" @select="goDetail"
                                @staking="doStaking" @cancel-staking="doCancelStaking" type="staking">
                            </item-card>
                        </template>
                        <!-- <div class="soon-box">
                            <img src="../../assets/images/soon.png" alt="">
                            <div>
                                <p>Coming soon...</p>
                                <p>Stay tuned!</p>
                            </div>
                        </div> -->
                    </div>
                    <div class="page r" v-if="list.length && !isLoading">
                        <el-pagination background layout="total, sizes, prev, pager, next" @size-change="onSizeChange"
                            @current-change="onPageChange" @prev-click="onPageChange" @next-click="onPageChange"
                            :page-size="Number(page.pageSize)" :total="Number(total)"
                            :current-page="Number(page.curPage)" :page-sizes="[10, 20, 50, 100]" v-if="list.length">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import itemCard from '@/components/item-card'
    export default {
        name: '',
        components: {
            itemCard
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-net-mining',
                isLoading: false,
                page: {
                    pageSize: 20,
                    curPage: 1
                },
                total: 0,
                query: {
                    keywords: '',
                    latest: 0
                },
                options: [{
                    value: 0,
                    key: 'latest',
                    label: 'latest'
                }],
                list: [{
                    id: '010001',
                    color: 'yellow',
                    class: 2,
                    name: '哈哈哈',
                    on_staking: true
                }, {
                    id: '010001',
                    color: 'yellow',
                    class: 2,
                    name: '哈哈哈',
                    on_staking: false
                }, {
                    id: '010001',
                    color: 'yellow',
                    class: 2,
                    name: '哈哈哈',
                    on_staking: true
                }, {
                    id: '010001',
                    color: 'yellow',
                    class: 2,
                    name: '哈哈哈',
                    on_staking: true
                }, {
                    id: '010001',
                    color: 'yellow',
                    class: 2,
                    name: '哈哈哈',
                    on_staking: true
                }]
            }
        },
        computed: {
            placeholderTxt() {
                return this.$t("account.search-id-name")
            }
        },
        watch: {},
        created() {
            this.options.forEach(x => {
                x.label = this.$t(`account.${x.key}`)
            });
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            onPageChange() {

            },
            onSizeChange() {

            },
            doStaking(id) {
                this.$confirm(`${this.$t("net-mining.cancel-staking-tip")}?`, this.$t("common.remind"), {
                    confirmButtonText: this.$t("common.yes"),
                    showCancelButton: false,
                    closeOnClickModal: false,
                    width: '6.4rem'
                }).then(async () => {

                })
            },
            doCancelStaking() {
                this.$confirm(`${this.$t("net-mining.staking-tip")}?`, this.$t("common.remind"), {
                    confirmButtonText: this.$t("common.yes"),
                    showCancelButton: false,
                    closeOnClickModal: false,
                    width: '6.4rem'
                }).then(async () => {

                })
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-net-mining";

    .#{$prefixCls} {

        .el-input__inner,
        .el-select {
            border-color: #004D8C;
            background: #14181f;
            color: #777E90;
        }

        .input-keywords .el-input__inner {
            border-right: 0;
        }

        .el-input-group__append {
            background: inherit;
            border-color: #004D8C;

            .search-icon {
                display: inline-block;
                width: 24px;
                height: 24px;
                background: url('../../assets/images/icon-search.png');
            }
        }

        .top {
            padding: 60px 0 57px;
            background: #0B0F15;
            color: #fff;
            font-size: .64rem;
            font-weight: 600;

            img {
                display: none;
            }
        }

        .main {
            background: #14181f;
            padding: 38px 0;

            .w {
                display: flex;
                justify-content: space-between;
            }

            .left {
                margin-right: 20px;
                width: 265px;
                background: #000;
                border: 1px solid #29374B;
                border-radius: 10px;

                li {
                    padding: 30px 0;
                    text-align: center;

                    &:nth-child(1),
                    &:nth-child(2) {
                        border-bottom: 1px solid #29374B;
                    }

                    .tit-txt {
                        font-size: 16px;
                        color: #777E90;
                    }

                    .val {
                        margin-top: 10px;
                        font-size: 20px;
                        color: #fff;

                        &.p-val {
                            font-size: 32px;
                            font-weight: 600;
                        }

                        &.reward-val {
                            font-weight: 600;
                            color: $--color-primary;
                        }
                    }

                    .el-button {
                        padding: 0;
                        width: 90px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        margin-top: 10px;

                    }

                    .tip {
                        margin-top: 26px;
                        color: #777E90;
                        font-size: 12px;

                        .timer {
                            color: $--color-primary;
                        }
                    }
                }
            }

            .right {
                flex: 1;

                .list {
                    .components-item-card {
                        float: left;
                        margin-top: .32rem;
                        margin-right: 20px;
                        width: 265px;

                        &:nth-child(3n) {
                            margin-right: 0;
                        }
                    }

                    .soon-box {
                        position: relative;
                        width: max-content;
                        margin: 63px auto 0;
                        text-align: center;

                        img {
                            width: 230px;
                            height: 230px;
                        }

                        div {
                            position: absolute;
                            right: -60px;
                            top: 8px;
                            color: #FFE2C3;
                            font-size: 18px;
                            text-align: left;
                        }
                    }
                }

                .top-search {
                    display: flex;
                    justify-content: space-between;
                }

                .search {
                    display: flex;
                }

                .total {
                    font-size: 32px;

                    .txt {
                        color: $--color-success;
                    }

                    .filter {
                        display: none;
                    }
                }

                .input-keywords {
                    width: 265px;
                    margin-right: 20px;
                    background: #14181f;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .top {
                padding: .533333333333333rem 0 .133333333333333rem;
                background: #14181f;
                font-size: .64rem;
                text-align: center;

                img {
                    display: inline-block;
                    width: .8rem;
                    height: .8rem;
                    vertical-align: sub;
                }
            }

            .main {

                padding: .5rem;

                .w {
                    flex-direction: column;
                }

                .left {
                    width: 100%;
                    margin-right: 0;
                    margin-bottom: .8rem;
                    background: transparent;

                    li {
                        padding: .666666666666667rem 0 .4rem .5rem;
                        width: 50%;
                        float: left;
                        border: none !important;
                        text-align: left;

                        .tit-txt {
                            font-size: .373333333333333rem;
                        }

                        .val {
                            font-size: .426666666666667rem !important;
                        }

                        &:first-child>div {
                            border-right: 1px solid #29374B !important;
                        }

                        &:last-child {
                            display: flex;
                            padding: .266666666666667rem .533333333333333rem;
                            width: 100%;
                            border-top: 1px solid #29374B !important;

                            >div {
                                flex: 1;
                            }

                            .el-button {
                                width: 2.4rem;
                                height: .8rem;
                                line-height: .8rem;
                            }

                            .tip {
                                display: none;
                            }
                        }
                    }
                }

                .right {
                    width: 100%;

                    .top-search {
                        flex-direction: column;

                        .total {
                            display: flex;
                            justify-content: space-between;
                            font-size: .48rem;

                            .filter {
                                display: block;
                                padding-left: .6rem;
                                color: #777E90;
                                background: url('../../assets/images/filter.png');
                                background-repeat: no-repeat;
                                background-position: left center;

                                i {
                                    color: $--color-success;
                                }
                            }
                        }

                        .search {
                            margin-top: .4rem;

                            .input-keywords {
                                flex: 1;
                                margin-right: .266666666666667rem;
                            }

                            .el-input {
                                font-size: .2rem;
                            }

                            .el-input-group__append {
                                padding: 0 .2rem;

                                .search-icon {
                                    width: .426666666666667rem;
                                    height: .426666666666667rem;
                                    background-size: contain;
                                }
                            }
                        }
                    }

                    .list {
                        .components-item-card {
                            margin-right: .266666666666667rem;
                            width: 48.5%;

                            >li {
                                margin-bottom: 0;
                            }



                            &:nth-child(3n) {
                                margin-right: .266666666666667rem;
                            }

                            &:nth-child(2n) {
                                margin-right: 0 !important;
                            }

                        }

                        .soon-box {
                            margin: 1.333333333333333rem 0 1.866666666666667rem .8rem;
                        }
                    }

                    .page {
                        margin-top: .266666666666667rem;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>