<template>
    <div :class="prefixCls">
        <div class="top">
            <div class="w">
                <div class="tit-tab">
                    <p>
                        <img src="../../assets/images/nav-marketplace.png" alt="">
                        Marketplace</p>
                    <!-- <div class="tab-filter">
                        <li :class="{'active': query.tabFilterIndex === index}" v-for="(item, index) of tabFilterList"
                            :key="index" @click="selectTabFilter(index)">
                            {{$t(`marketplace.${item.name}`)}}
                        </li>
                    </div>
                    <div class="tab-filter-h5">
                        <div>
                            {{$t(`marketplace.${(tabFilterList[query.tabFilterIndex]).name}`)}}
                            <img src="../../assets/images/down.png" alt="">
                        </div>
                    </div> -->
                </div>
                <div class="bnb-box clearfix">
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            0 BNB
                        </div>
                        <div class="sub-info">Total value</div>
                    </div>
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            0 <span>BNB</span>
                        </div>
                        <div class="sub-info">Total value</div>
                    </div>
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            0 <span>BNB</span>
                        </div>
                        <div class="sub-info">Total value</div>
                    </div>
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            0 <span>BNB</span>
                        </div>
                        <div class="sub-info">Total value</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="main">
            <div class="w">
                <page-tabs :tabs="tabs" :currentTab="currentTab" @on-select="onSelectTab"></page-tabs>
                <div class="top-search">
                    <div class="filter-btn">
                        <img src="../../assets/images/filter.png" alt="">
                        {{$t("account.filter")}}
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
                <!-- <div class="left">
                    <ul>
                        <li>
                            <div class="title">
                                <span>{{$t("account.filter")}} ({{checkListFilter.length}})</span>
                                <a href="javascript:;"
                                    @click="doClearSearchQuery('checkListFilter')">{{$t("account.clear")}}</a>
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
                                <span>{{$t("marketplace.my-sale")}}</span>
                                <a href="javascript:;"
                                    @click="doClearSearchQuery('checkListSale')">{{$t("account.clear")}}</a>
                            </div>
                            <div class="filter-val" style="padding-top: 0">
                                <el-checkbox-group v-model="checkListSale" @change="doSearch">
                                    <el-checkbox label="my sale">{{$t("marketplace.my-sale")}}</el-checkbox>
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
                            <span class="txt">0 NFTs</span>
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
                    <div class="list">
                        <div class="soon-box">
                            <img src="../../assets/images/soon.png" alt="">
                            <div>
                                <p>Coming soon...</p>
                                <p>Stay tuned!</p>
                            </div>
                        </div>
                    </div>
                </div> -->
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
                        <span>{{$t("marketplace.my-sale")}}</span>
                        <a href="javascript:;" @click="doClearSearchQuery('checkListSale')">Clear</a>
                    </div>
                    <div class="filter-val">
                        <el-checkbox-group v-model="checkListSale" @change="doSearch">
                            <el-checkbox label="my sale">{{$t("marketplace.my-sale")}}</el-checkbox>
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
    import PageTabs from '@/components/page-tabs'
    export default {
        name: '',
        components: {
            PageTabs
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-market-place',
                tabs: [{
                    title: this.$t("marketplace.nfts"),
                    num: 8
                }, {
                    title: this.$t("marketplace.other"),
                    num: 0
                }],
                currentTab: 'NFTs',
                checkListFilter: [],
                checkListSale: [],
                checkListLvel: [],
                query: {
                    keywords: '',
                    latest: 0,
                    tabFilterIndex: 0
                },
                options: [{
                    value: 0,
                    key: 'latest',
                    label: 'latest'
                }],
                isShowFilter: false,
                tabFilterList: [{
                    id: 0,
                    name: 'all'
                }, {
                    id: 1,
                    name: 'last-24'
                }, {
                    id: 2,
                    name: '7-days'
                }, {
                    id: 3,
                    name: '30days'
                }],

            }
        },
        computed: {},
        watch: {},
        created() {
            this.options.forEach(x => {
                x.label = this.$t(`account.${x.key}`)
            });
        },
        computed: {
            placeholderTxt() {
                return this.$t("account.search-id-name")
            }
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            onSelectTab(item) {
                this.currentTab = item.title
            },
            doClearSearchQuery() {

            },
            doSearch() {},
            openFilterDrawer() {
                this.isShowFilter = true
            },
            selectTabFilter(idx) {
                this.query.tabFilterIndex = idx
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-market-place";

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

        .top {
            padding: 64px 0 40px;
            background: #0B0F15;
            color: #fff;

            .tit-tab {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 44px;

                p {
                    font-size: 48px;
                    font-weight: 600;

                    img {
                        display: none;
                        margin-right: .266666666666667rem;
                    }
                }
            }

            .tab-filter {
                li {
                    float: left;
                    margin-left: 5px;
                    width: 80px;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid $--border-color-base;
                    border-radius: 10px;
                    text-align: center;
                    font-size: 14px;
                    cursor: pointer;

                    &.active {
                        background: $--color-primary;
                        border: 0;
                    }
                }
            }

            .tab-filter-h5 {
                display: none;
            }

            .bnb-box {
                display: flex;
                justify-content: space-between;

                .bnb-item {
                    width: 265px;
                    padding: 15px 0;
                    text-align: center;
                    border: 1px solid $--border-color-base;
                    border-radius: 12px;

                    .num {
                        position: relative;
                        margin: 0 auto .16rem;
                        width: max-content;
                        font-size: 30px;

                        .icon {
                            width: 24px;
                            height: 24px;
                            vertical-align: middle;
                        }
                    }

                    .sub-info {
                        color: #777E90;
                        font-size: 14px;

                    }
                }
            }
        }

        .el-input__inner,
        .el-select {
            border-color: #29374B;
            background: #14181f;
            color: #777E90;
            &::placeholder {
                 color: #777E90;
            }
            &:hover {
                border-color: #29374B;
            }
        }

        .input-keywords .el-input__inner {
            border-right: 0;
        }

        .el-input-group__append {
            background: inherit;
            border-color: #29374B;

            .search-icon {
                display: inline-block;
                width: 24px;
                height: 24px;
                background: url('../../assets/images/icon-search.png');
                background-size: contain;
            }
        }

        .main {
            padding: 38px 0;
            background: #14181f;

            .top-search {
                display: flex;
                justify-content: space-between;
                margin: 20px 0;

                .filter-btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 1.56rem;
                    height: .64rem;
                    border: 1px solid #29374B;
                    font-size: .24rem;
                    color: #777E90;
                    border-radius: .066666666666667rem;
                    cursor: pointer;

                    img {
                        width: .266666666666667rem;
                        height: .266666666666667rem;
                        margin-right: .16rem;

                    }
                }
                .search {
                    display: flex;
                    .input-keywords {
                        width: 7.333333333333333rem;
                        height: .64rem;
                        .el-input__inner {
                            height: 100%;
                        }
                    }
                    .el-select {
                        margin-left: .266666666666667rem;
                        .el-input {
                            width: 3.533333333333333rem;
                            height: .64rem;
                            .el-input__inner {
                                height: 100%;
                            }
                        }
                    }
                }
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
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .top {
                padding: .8rem .533333333333333rem .533333333333333rem;

                .tit-tab {
                    margin-bottom: .533333333333333rem;
                    flex-direction: column;

                    p {
                        font-size: .64rem;

                        img {
                            display: inline-block;
                        }
                    }

                    .tab-filter {
                        display: none;
                    }

                    .tab-filter-h5 {
                        display: block;
                        margin-top: .266666666666667rem;
                        height: .64rem;
                        line-height: .64rem;
                        padding: 0 .16rem;
                        border: 1px solid #29374B;
                        border-radius: .133333333333333rem;

                        img {
                            width: .426666666666667rem;
                            height: .426666666666667rem;
                            margin-left: .1rem;
                            vertical-align: middle;
                        }
                    }
                }

                .bnb-box {
                    display: initial;

                    .bnb-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        float: left;
                        width: 33.3%;
                        border-color: #29374B;
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        text-align: left;

                        .num {
                            font-size: .64rem;

                            span {
                                display: none;
                            }
                        }

                        .sub-info {
                            font-size: .373333333333333rem;
                        }

                        &:first-child {
                            width: 100%;
                            border-radius: .32rem;
                            border-bottom-left-radius: 0;
                            border-bottom-right-radius: 0;
                        }

                        &:nth-child(2) {
                            border-bottom-right-radius: 0;
                        }

                        &:nth-child(4) {
                            border-bottom-left-radius: 0;
                        }

                        &:nth-child(3) {
                            border-bottom-left-radius: 0;
                            border-bottom-right-radius: 0;
                        }
                    }
                }
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
                        .soon-box {
                            margin: 1.333333333333333rem 0 1.866666666666667rem .8rem;
                        }
                    }
                }
            }
        }
    }
</style>