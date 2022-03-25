<template>
    <div :class="prefixCls">
        <div class="top">
            <div class="w">
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
                                <a href="javascript:;">{{$t("account.clear")}}</a>
                            </div>
                            <div class="filter-val filter">
                                <el-checkbox-group v-model="checkListFilter" @change="doSearch">
                                    <el-checkbox label="Yellow" class="yellow">{{$t("account.yellow")}}</el-checkbox>
                                    <el-checkbox label="Orange" class="orange">{{$t("account.orange")}}</el-checkbox>
                                    <el-checkbox label="Red" class="red">{{$t("account.red")}}</el-checkbox>
                                    <el-checkbox label="Blue" class="blue">{{$t("account.blue")}}</el-checkbox>
                                    <el-checkbox label="Purple" class="purple">{{$t("account.purple")}}</el-checkbox>
                                    <el-checkbox label="Diamond">{{$t("account.diamond")}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                        <li>
                            <div class="title" style="border-bottom: 0;">
                                <span>{{$t("account.sale")}}</span>
                            </div>
                            <div class="filter-val" style="padding-top: 0">
                                <el-checkbox-group v-model="checkListSale" @change="doSearch">
                                    <el-checkbox label="For sale">{{$t("account.for-sale")}}</el-checkbox>
                                    <el-checkbox label="Not sold">{{$t("account.not-sale")}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                        <li>
                            <div class="title">
                                <span>{{$t("account.level")}} ({{checkListLvel.length}})</span>
                                <a href="javascript:;">{{$t("account.clear")}}</a>
                            </div>
                            <div class="filter-val">
                                <el-checkbox-group v-model="checkListLvel" @change="doSearch">
                                    <el-checkbox label="Lv-1">Lv-1</el-checkbox>
                                    <el-checkbox label="Lv-2">Lv-2</el-checkbox>
                                    <el-checkbox label="Lv-3">Lv-3</el-checkbox>
                                    <el-checkbox label="Lv-4">Lv-4</el-checkbox>
                                    <el-checkbox label="Lv-5">Lv-5</el-checkbox>
                                    <el-checkbox label="Lv-6">Lv-6</el-checkbox>
                                    <el-checkbox label="Lv-7">Lv-7</el-checkbox>
                                    <el-checkbox label="Lv-8">Lv-8</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <div class="top-search">
                        <div class="total">
                            <span class="txt">20 NFTs</span>
                            <span class="filter" @click="openFilterDrawer">
                                Filter(<i>4</i>)
                            </span>
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
                    <div class="list clearfix" v-if="netList.length">
                        <item-card v-for="(item, index) of netList" :key="index" :itemInfo="item" @select="goDetail">
                        </item-card>
                    </div>
                    <div class="page r">
                        <el-pagination background layout="total, sizes, prev, pager, next" :total="netList.length"
                            v-if="netList.length">
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
                        <a href="javascript:;">Clear</a>
                    </div>
                    <div class="filter-val filter">
                        <el-checkbox-group v-model="checkListFilter" @change="doSearch">
                            <el-checkbox label="Yellow" class="yellow">{{$t("account.yellow")}}</el-checkbox>
                            <el-checkbox label="Orange" class="orange">{{$t("account.orange")}}</el-checkbox>
                            <el-checkbox label="Red" class="red">{{$t("account.red")}}</el-checkbox>
                            <el-checkbox label="Blue" class="blue">{{$t("account.blue")}}</el-checkbox>
                            <el-checkbox label="Purple" class="purple">{{$t("account.purple")}}</el-checkbox>
                            <el-checkbox label="Diamond">{{$t("account.diamond")}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="filter-item">
                    <div class="title">
                        <span>{{$t("account.sale")}}</span>
                        <a href="javascript:;">Clear</a>
                    </div>
                    <div class="filter-val">
                        <el-checkbox-group v-model="checkListSale" @change="doSearch">
                            <el-checkbox label="For sale">{{$t("account.for-sale")}}</el-checkbox>
                            <el-checkbox label="Not sold">{{$t("account.not-sale")}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="filter-item">
                    <div class="title">
                        <span>{{$t("account.level")}} ({{checkListLvel.length}})</span>
                        <a href="javascript:;">Clear</a>
                    </div>
                    <div class="filter-val">
                        <el-checkbox-group v-model="checkListLvel" @change="doSearch">
                            <el-checkbox label="Lv-1">Lv-1</el-checkbox>
                            <el-checkbox label="Lv-2">Lv-2</el-checkbox>
                            <el-checkbox label="Lv-3">Lv-3</el-checkbox>
                            <el-checkbox label="Lv-4">Lv-4</el-checkbox>
                            <el-checkbox label="Lv-5">Lv-5</el-checkbox>
                            <el-checkbox label="Lv-6">Lv-6</el-checkbox>
                            <el-checkbox label="Lv-7">Lv-7</el-checkbox>
                            <el-checkbox label="Lv-8">Lv-8</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </el-drawer>
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
                prefixCls: 'views-account',
                checkListFilter: [],
                checkListLvel: [],
                checkListSale: [],
                isShowFilter: false,
                query: {
                    keywords: '',
                    latest: 0
                },
                options: [{
                    value: 0,
                    key: 'latest',
                    label: 'latest'
                }],
                netList: [{
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
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
                let n = Math.floor(Math.random() * 10 + 1)
                let arr = Array.from({
                    length: n
                }, (v, i) => ({
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: i % 2 === 0 ? '' : '1,000,000,000 Adoge'
                }))
                console.log(arr)
                this.netList = arr
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
            height: 157px;
            line-height: 157px;
            background: #0B0F15;
            color: #fff;
            font-size: 48px;
            font-weight: 600;
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
                        color: #32A3FF;
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
                                    color: #32A3FF;
                                }
                            }
                        }

                        .search {
                            margin-top: .4rem;

                            .input-keywords {
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

                    &:nth-child(2n) {
                        margin-right: 0;
                    }

                    &:nth-child(3n) {
                        margin-right: .266666666666667rem;
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
