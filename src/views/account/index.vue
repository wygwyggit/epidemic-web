<template>
    <div :class="prefixCls">
        <div class="top">
            <div class="w">
                <img src="../../assets/images/nav-my-account.png" alt="">
                {{$t("account.my-account")}}
            </div>
        </div>
        <div class="main">
            <div class="w">
                <div class="left">
                    <ul>
                        <li>
                            <div class="title">
                                <span>{{$t("account.filter")}} ({{checkListFilter.length}})</span>
                                <a href="javascript:;"
                                    @click="doClearSearchQuery('checkListFilter')">{{$t("account.clear")}}</a>
                            </div>
                            <div class="filter-val filter">
                                <el-checkbox-group v-model="checkListFilter" @change="doSearch">
                                    <el-checkbox label="yellow" class="yellow">{{$t("account.yellow")}}</el-checkbox>
                                    <el-checkbox label="orange" class="orange">{{$t("account.orange")}}</el-checkbox>
                                    <el-checkbox label="red" class="red">{{$t("account.red")}}</el-checkbox>
                                    <el-checkbox label="blue" class="blue">{{$t("account.blue")}}</el-checkbox>
                                    <el-checkbox label="purple" class="purple">{{$t("account.purple")}}</el-checkbox>
                                    <el-checkbox label="diamond">{{$t("account.diamond")}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                        <li>
                            <div class="title" style="border-bottom: 0;">
                                <span>{{$t("account.sale")}}</span>
                                <a href="javascript:;"
                                    @click="doClearSearchQuery('checkListSale')">{{$t("account.clear")}}</a>
                            </div>
                            <div class="filter-val" style="padding-top: 0">
                                <el-checkbox-group v-model="checkListSale" @change="doSearch">
                                    <el-checkbox :label="1">{{$t("account.for-sale")}}</el-checkbox>
                                    <el-checkbox :label="2">{{$t("account.not-sale")}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                        <li>
                            <div class="title">
                                <span>{{$t("account.level")}} ({{checkListLvel.length}})</span>
                                <a href="javascript:;"
                                    @click="doClearSearchQuery('checkListLvel')">{{$t("account.clear")}}</a>
                            </div>
                            <div class="filter-val">
                                <el-checkbox-group v-model="checkListLvel" @change="doSearch">
                                    <el-checkbox label="1">Lv-1</el-checkbox>
                                    <el-checkbox label="2">Lv-2</el-checkbox>
                                    <el-checkbox label="3">Lv-3</el-checkbox>
                                    <el-checkbox label="4">Lv-4</el-checkbox>
                                    <el-checkbox label="5">Lv-5</el-checkbox>
                                    <el-checkbox label="6">Lv-6</el-checkbox>
                                    <el-checkbox label="7">Lv-7</el-checkbox>
                                    <el-checkbox label="8">Lv-8</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <div class="top-search">
                        <div class="total">
                            <span class="txt">{{total}} NFTs</span>
                            <span class="filter" @click="openFilterDrawer">
                                Filter(<i>{{ totalFilter }}</i>)
                            </span>
                        </div>
                        <div class="search">
                            <!-- <el-input :placeholder="placeholderTxt" v-model="query.keywords" class="input-keywords">
                                <a href="javascript:;" slot="append" class="search-icon"></a>
                            </el-input>
                            <el-select v-model="query.latest" placeholder="">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> -->
                        </div>
                    </div>
                    <div class="list clearfix">
                        <el-empty description="暂无数据" v-if="!netList.length && !isLoading"></el-empty>
                        <template v-if="netList.length && !isLoading">
                            <item-card v-for="(item, index) of netList" :key="index" :itemInfo="item" @select="goDetail"
                                @sale="doSale" @cancel="doCancelSale" @revise="doReviseSale" type="sale">
                            </item-card>
                        </template>

                    </div>
                    <!-- <div class="list">
                        <div class="soon-box">
                            <img src="../../assets/images/soon.png" alt="">
                            <div>
                                <p>Coming soon...</p>
                                <p>Stay tuned!</p>
                            </div>
                        </div>
                    </div> -->
                    <div class="page r" v-if="netList.length && !isLoading">
                        <el-pagination background layout="total, sizes, prev, pager, next" @size-change="onSizeChange"
                            @current-change="onPageChange" @prev-click="onPageChange" @next-click="onPageChange"
                            :page-size="Number(page.pageSize)" :total="Number(total)"
                            :current-page="Number(page.curPage)" :page-sizes="[10, 20, 50, 100]" v-if="netList.length">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </div>
        <el-drawer :visible.sync="isShowFilter" direction="btt">
            <div class="filter-content">
                <div class="filter-item">
                    <div class="title">
                        <span>{{$t("account.filter")}} ({{checkListFilter.length}})</span>
                        <a href="javascript:;" @click="doClearSearchQuery('checkListFilter')">Clear</a>
                    </div>
                    <div class="filter-val filter">
                        <el-checkbox-group v-model="checkListFilter" @change="doSearch">
                            <el-checkbox label="yellow" class="yellow">{{$t("account.yellow")}}</el-checkbox>
                            <el-checkbox label="orange" class="orange">{{$t("account.orange")}}</el-checkbox>
                            <el-checkbox label="red" class="red">{{$t("account.red")}}</el-checkbox>
                            <el-checkbox label="blue" class="blue">{{$t("account.blue")}}</el-checkbox>
                            <el-checkbox label="purple" class="purple">{{$t("account.purple")}}</el-checkbox>
                            <el-checkbox label="diamond">{{$t("account.diamond")}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="filter-item">
                    <div class="title">
                        <span>{{$t("account.sale")}}</span>
                        <a href="javascript:;" @click="doClearSearchQuery('checkListSale')">Clear</a>
                    </div>
                    <div class="filter-val">
                        <el-checkbox-group v-model="checkListSale" @change="doSearch">
                            <el-checkbox :label="1">{{$t("account.for-sale")}}</el-checkbox>
                            <el-checkbox :label="2">{{$t("account.not-sale")}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="filter-item">
                    <div class="title">
                        <span>{{$t("account.level")}} ({{checkListLvel.length}})</span>
                        <a href="javascript:;" @click="doClearSearchQuery('checkListLvel')">Clear</a>
                    </div>
                    <div class="filter-val">
                        <el-checkbox-group v-model="checkListLvel" @change="doSearch">
                            <el-checkbox :label="1">Lv-1</el-checkbox>
                            <el-checkbox :label="2">Lv-2</el-checkbox>
                            <el-checkbox :label="3">Lv-3</el-checkbox>
                            <el-checkbox :label="4">Lv-4</el-checkbox>
                            <el-checkbox :label="5">Lv-5</el-checkbox>
                            <el-checkbox :label="6">Lv-6</el-checkbox>
                            <el-checkbox :label="7">Lv-7</el-checkbox>
                            <el-checkbox :label="8">Lv-8</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-dialog :title="saleReviseDialogTitle" :visible.sync="saleReviseDialog" width="6.4rem"
            @closed="saleReviseDialogClosed" custom-class="sale-revise-dialog">
            <p class="tit">{{$t("account.price") }}</p>
            <div class="input-box">
                <div class="label">
                    <span>Adoge</span>
                </div>
                <el-input v-model="nets.salePrice" :placeholder="$t('common.please-enter-price')"
                    onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
            </div>
            <p class="tip">{{$t("common.net-price-modified-tip")}}</p>
            <div class="opt-btn">
                <button class="btn" :class="{'confirmed': nets.salePrice.length}">{{$t("common.confirmed") }} </button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import myAjax from '@/utils/ajax.js'
    import itemCard from '@/components/item-card'
    export default {
        name: '',
        components: {
            itemCard
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-account',
                page: {
                    pageSize: 20,
                    curPage: 1
                },
                total: 0,
                isLoading: true,
                account: null,
                nets: {
                    salePrice: ''
                },
                checkListFilter: [],
                checkListLvel: [],
                checkListSale: [],
                isShowFilter: false,
                saleReviseDialog: false,
                saleReviseDialogTitle: '',
                query: {
                    keywords: '',
                    latest: 0
                },
                options: [{
                    value: 0,
                    key: 'latest',
                    label: 'latest'
                }],
                netListCopy: [],
                netList: []
            }
        },
        computed: {
            placeholderTxt() {
                return this.$t("account.search-id-name")
            },
            totalFilter() {
                return this.checkListFilter.length + this.checkListLvel.length + this.checkListSale.length
            },
        },
        created() {
            Promise.all([this.getTotalNets(), this.getLiist()]).then(res => {
                this.isLoading = false
            })
            this.netListCopy = JSON.parse(JSON.stringify(this.netList))
            this.options.forEach(x => {
                x.label = this.$t(`account.${x.key}`)
            });
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            onSizeChange(size) {
                this.page.curPage = 1
                this.page.pageSize = size
                this.getLiist()
            },
            onPageChange(page) {
                this.page.curPage = page
                this.getLiist()
            },
            getTotalNets() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'nft/count',
                    }).then(res => {
                        if (res.ok && res.data) {
                            this.total = res.data.count || 0
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })

            },
            getLiist() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/nft_list',
                        data: {
                            page: this.page.curPage,
                            per_page: this.page.pageSize,
                            extra: {
                                color: this.checkListFilter,
                                on_sale: this.checkListSale,
                                level: this.checkListLvel,
                            }
                        }
                    }).then(res => {
                        const data = res.data || {}
                        this.netList = data.nft_list || []
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })

            },
            saleReviseDialogClosed() {
                this.nets.salePrice = ''
            },
            doSale(id) {
                this.saleReviseDialog = true
                this.saleReviseDialogTitle = this.$t("account.sale")
            },
            doCancelSale(id) {
                this.$confirm(`${this.$t("common.cancel-sale-tip")}?`, this.$t("common.remind"), {
                    confirmButtonText: this.$t("common.yes"),
                    showCancelButton: false,
                    closeOnClickModal: false,
                    width: '6.4rem'
                }).then(async () => {

                })
            },
            doReviseSale(row) {
                this.saleReviseDialog = true
                this.nets.salePrice = row.price
                this.saleReviseDialogTitle = this.$t("account.revise")
            },
            doClearSearchQuery(val) {
                this[val] = []
                this.doSearch()
            },
            openFilterDrawer() {
                this.isShowFilter = true
            },
            goDetail(id) {
                this.$router.push({
                    path: '/details',
                    query: {
                        id
                    }
                })
            },
            doSearch() {
                this.page.curPage = 1
                this.getLiist()
                // console.log(this.checkListFilter)
                // console.log(this.checkListSale)
                // console.log(this.checkListLvel)
                // if (this.checkListSale.length == 1) {
                //     let saleStatus = this.checkListSale[0]
                //     if (saleStatus === 'For sale') {
                //         this.netList = this.netListCopy.filter(x => x.isSaled)
                //     } else {
                //         this.netList = this.netListCopy.filter(x => !x.isSaled)
                //     }
                // }
                // if (this.checkListSale.length !== 1) {
                //     this.netList = this.netListCopy
                // }
                // if (this.checkListFilter.length) {
                //     let colorType = this.checkListFilter.map(item =>
                //         item = item.toLowerCase()
                //     )
                //     this.netList = this.netListCopy.filter(x => colorType.includes(x.type))
                // }

            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account";

    .#{$prefixCls} {
        .el-drawer {
            height: 90% !important;
            background: #000;
            overflow-y: scroll;

            .filter-content {
                .filter-item {
                    border-top: 1px solid #29374B;

                    .title {
                        padding: 0 .746666666666667rem;
                        height: 1.52rem;
                        line-height: 1.52rem;
                        color: #fff;
                        font-weight: 600;
                        font-size: .533333333333333rem;
                        border-bottom: 1px solid #29374B;

                        a {
                            float: right;
                        }
                    }
                }

                .filter-val {
                    padding: .373333333333333rem .746666666666667rem;

                    .el-checkbox {
                        width: 3.2rem;
                        height: .853333333333333rem
                    }
                }
            }
        }

        .search {

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
        }





        .top {
            height: 157px;
            line-height: 157px;
            background: #0B0F15;
            color: #fff;
            font-size: 48px;
            font-weight: 600;

            img {
                width: .8rem;
                height: .8rem;
                vertical-align: text-bottom;
            }
        }

        .main {
            padding: 38px 0;
            background: #14181f;

            .w {
                display: flex;
                justify-content: space-between;
            }

            .left {
                margin-right: 20px;
                width: 265px;
                max-height: 830px;
                background: #0B0F15;
                border-radius: 10px;

                li {
                    border-bottom: 1px solid #29374B;

                    .title {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 10px;
                        height: 80px;
                        line-height: 80px;
                        border-bottom: 1px solid #29374B;
                        font-size: 20px;
                        color: #fff;
                    }

                    .filter-val {
                        padding: 30px 20px;

                        &.filter .el-checkbox {
                            display: block;
                        }

                        .el-checkbox {
                            margin-bottom: 10px;
                        }
                    }
                }
            }

            .right {
                flex: 1;

                .list {
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

            .components-item-card {
                float: left;
                margin-top: .32rem;
                margin-right: 20px;
                width: 265px;

                &:nth-child(3n) {
                    margin-right: 0;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .top {
                height: 3.093333333333333rem;
                line-height: 3.093333333333333rem;
                font-size: .64rem;
                text-align: center;
            }

            .main {
                padding: .5rem;

                .left {
                    display: none;
                }

                .right {
                    width: 100%;

                    .list {
                        .soon-box {
                            margin: 1.333333333333333rem 0 1.866666666666667rem .8rem;
                        }
                    }

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
            }

            .page {
                margin-top: .266666666666667rem;
                width: 100%;
            }
        }
    }
</style>