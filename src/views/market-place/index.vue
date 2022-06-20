<template>
    <div :class="prefixCls">
        <div class="page-top">
            <div class="w">
                <div class="tit-tab">
                    <div class="left">
                        <img src="../../assets/images/nav-marketplace.png" alt="">
                        {{ $t("common.marketplace")}}
                    </div>
                    <div class="right" @click="handleRecored">
                        <img src="../../assets/images/clock.png" alt="">
                        {{ $t("marketplace.order-record")}}
                    </div>
                    <div class="right min" @click="handleRecoredDrawer">
                        <img src="../../assets/images/clock_w.png" alt="">
                    </div>
                </div>
                <div class="bnb-box clearfix">
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            {{ amountInfo.sum_amount_bnb }} BNB
                        </div>
                        <div class="sub-info">{{$t("marketplace.total-value")}} </div>
                    </div>
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            {{ amountInfo.max_amount_bnb }} <span>BNB</span>
                        </div>
                        <div class="sub-info">{{$t("marketplace.highest-price")}}</div>
                    </div>
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            {{ amountInfo.min_amount_bnb }} <span>BNB</span>
                        </div>
                        <div class="sub-info">{{$t("marketplace.lowest-price")}}</div>
                    </div>
                    <div class="bnb-item">
                        <div class="num">
                            <img src="../../assets/images/bnb-icon.png" alt="" class="icon">
                            {{ amountInfo.average_amount_bnb }} <span>BNB</span>
                        </div>
                        <div class="sub-info">{{$t("marketplace.average-price")}}</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="main" v-loading="isLoading">
            <div class="w">
                <page-tabs :tabs="tabs" :currentTabId="currentTabId" @on-select="onSelectTab"></page-tabs>
                <div class="top-search">
                    <div :class="['filter-btn', {'is-filter': isShowFilter}]" @click="openFilterDrawer">
                        <img src="../../assets/images/filter.png" alt="" v-show="!isShowFilter">
                        <img src="../../assets/images/is_filter.png" alt="" v-show="isShowFilter">
                        {{$t("account.filter")}}
                    </div>
                    <div class="search">
                        <el-input :placeholder="$t('marketplace.search-id-or-name')" v-model="query.keywords" clearable
                            @clear="doSearch" @keyup.enter.native="doSearch" class="input-keywords"
                            v-show="currentTabId === 1">
                            <a href="javascript:;" slot="append" class="search-icon" @click="doSearch"></a>
                        </el-input>
                        <el-select v-model="query.sortField" placeholder="" @change="doSearch">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="filter-btn-h5" @click="openFilterDrawer2">
                            <img src="../../assets/images/filter.png" alt="">
                        </div>
                    </div>
                    <div class="filter-wrap" v-show="isShowFilter">
                        <div class="filter-content">
                            <ul class="check-list" v-if="currentTabId === 1">
                                <li class="check-item">
                                    <div class="label-name">{{$t("account.sale")}}：</div>
                                    <el-radio-group v-model="checkListSale">
                                        <el-radio :label="1">{{$t("marketplace.all-sale")}}</el-radio>
                                        <el-radio :label="2">{{$t("marketplace.my-sale")}}</el-radio>
                                    </el-radio-group>
                                </li>
                                <li class="check-item">
                                    <div class="label-name">{{$t("detail.color")}}：</div>
                                    <el-checkbox-group v-model="checkListColor">
                                        <el-checkbox label="yellow" class="yellow">{{$t("account.yellow")}}
                                        </el-checkbox>
                                        <el-checkbox label="orange" class="orange">{{$t("account.orange")}}
                                        </el-checkbox>
                                        <el-checkbox label="red" class="red">{{$t("account.red")}}</el-checkbox>
                                        <el-checkbox label="blue" class="blue">{{$t("account.blue")}}</el-checkbox>
                                        <el-checkbox label="purple" class="purple">{{$t("account.purple")}}
                                        </el-checkbox>
                                        <el-checkbox label="diamond">{{$t("account.diamond")}}</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                                <li class="check-item">
                                    <div class="label-name">{{$t("marketplace.props")}}：</div>
                                    <el-checkbox-group v-model="checkListProps">
                                        <el-checkbox :label="10">{{$t("marketplace.shoes")}}</el-checkbox>
                                        <el-checkbox :label="11">{{$t("marketplace.pants")}}</el-checkbox>
                                        <el-checkbox :label="12">{{$t("marketplace.clothes")}}</el-checkbox>
                                        <el-checkbox :label="13">{{$t("marketplace.hat")}}</el-checkbox>
                                        <el-checkbox :label="14">{{$t("marketplace.gloves")}}</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                                <li class="check-item">
                                    <div class="label-name">{{$t("account.level")}}：</div>
                                    <el-checkbox-group v-model="checkListLvel">
                                        <el-checkbox :label="1">Lv-1</el-checkbox>
                                        <el-checkbox :label="2">Lv-2</el-checkbox>
                                        <el-checkbox :label="3">Lv-3</el-checkbox>
                                        <el-checkbox :label="4">Lv-4</el-checkbox>
                                        <el-checkbox :label="5">Lv-5</el-checkbox>
                                        <el-checkbox :label="6">Lv-6</el-checkbox>
                                        <el-checkbox :label="7">Lv-7</el-checkbox>
                                        <el-checkbox :label="8">Lv-8</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                            </ul>
                            <ul class="check-list" v-else>
                                <li class="check-item">
                                    <div class="label-name">{{$t("account.sale")}}：</div>
                                    <el-radio-group v-model="checkListSale">
                                        <el-radio :label="1">{{$t("marketplace.all-sale")}}</el-radio>
                                        <el-radio :label="2">{{$t("marketplace.my-sale")}}</el-radio>
                                    </el-radio-group>
                                </li>
                                <li class="check-item">
                                    <div class="label-name">{{$t("marketplace.pack")}}：</div>
                                    <el-checkbox-group v-model="checkListPack">
                                        <el-checkbox :label="2" class="w-check">
                                            {{$t("marketplace.silver-pack")}}</el-checkbox>
                                        <el-checkbox :label="1" class="w-check">{{$t("marketplace.gold-pack")}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </li>
                                <li class="check-item">
                                    <div class="label-name">{{$t("marketplace.frag")}}：</div>
                                    <el-checkbox-group v-model="checkListFrag">
                                        <el-checkbox :label="24" class="w-check">
                                            {{$t("marketplace.panamera-fragments")}}</el-checkbox>
                                        <el-checkbox :label="23" class="w-check">
                                            {{$t("marketplace.car-fragments")}}</el-checkbox>
                                        <el-checkbox :label="22" class="w-check">
                                            {{$t("marketplace.phone-fragments")}}</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                            </ul>
                            <div class="search-btns">
                                <el-button type="primary" @click="doSearch">{{ $t("marketplace.done") }}</el-button>
                                <el-button @click="doResetFilter">{{ $t("marketplace.reset") }}</el-button>
                            </div>
                        </div>
                    </div>
                    <div :class="['filter-btn', 'filter-right', {'is-filter': isShowFilter}]"
                        @click="openFilterDrawer2">
                        <img src="../../assets/images/filter.png" alt="" v-show="!isShowFilter">
                        <img src="../../assets/images/is_filter.png" alt="" v-show="isShowFilter">
                    </div>
                </div>
                <div class="list-content">
                    <div class="list clearfix">
                        <el-empty :image="emptyImage" description="No items for sale" v-if="!list.length && !isLoading">
                        </el-empty>
                        <item-card v-for="(item, index) of list" :key="index" :itemInfo="item"
                            @goDetail="goCardDetail(item)">
                            <div class="price">
                                Price
                                <div class="money_w">
                                    <div class="money">
                                        {{ item.amount }}
                                    </div>
                                    <img class="amount-icon" src="../../assets/images/group.png" alt="" />
                                </div>
                            </div>

                            <div class="btns-wrap" v-if="item.status === 8 && isCanBuy">
                                <template>
                                    <div class="btn btn-sale" @click="doBuy(item)">{{$t("detail.buy")}}</div>
                                </template>
                            </div>
                        </item-card>
                    </div>
                </div>
                <el-pagination background layout="total, prev, pager, next" @current-change="onPageChange"
                    :page-size="Number(page.pageSize)" @prev-click="onPageChange" @next-click="onPageChange"
                    :total="Number(total)" :hide-on-single-page="true" :current-page="Number(page.curPage)"
                    v-if="list.length && !isLoading">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="Order record" custom-class="recored-dialog" :visible.sync="isShowRecored"
            :close-on-click-modal="false" width="70%">
            <div slot="title" class="header-title">
                <img src="../../assets/images/clock.png" alt="">
                <span>Order record</span>
            </div>
            <div class="dialog-content" v-loading="openIsLoading">
                <el-empty :image="emptyImage" description="No items for sale"
                    v-if="!recordList.length && !openIsLoading">
                </el-empty>
                <table v-if="recordList.length">
                    <thead>
                        <th>Type</th>
                        <th>Order ID</th>
                        <th>Txn Hash</th>
                        <th>NFT ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date UTC</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in recordList" :key="index">
                            <td :class="{orange: item.type === 'SELL', green: item.type === 'BUY'}">
                                {{ item.type }}
                            </td>
                            <td>
                                {{ item.order_id }}
                            </td>
                            <td>
                                <span class="hash-txt">
                                    {{ item.transfer_txn || item.approve_txn }}</span>
                            </td>
                            <td>
                                {{ item.goods_id }}
                            </td>
                            <td>
                                {{ lang == 'ZH' ? item.name : item.english_name}}
                            </td>
                            <td>
                                {{ item.amount || '-' }}
                            </td>
                            <td>
                                {{ item.order_time }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="page r" v-if="recordList.length && !openIsLoading">
                <el-pagination background layout="total, prev, pager, next" @current-change="onPageChange2"
                    @prev-click="onPageChange2" @next-click="onPageChange2" :page-size="Number(page2.pageSize)"
                    :total="Number(total2)" :current-page="Number(page2.curPage)" :page-sizes="[10, 20, 50, 100]">
                </el-pagination>
            </div>
        </el-dialog>
        <el-drawer :visible.sync="buyRecoredDrawer" direction="btt" custom-class="el-drawer2">
            <div slot="title">
                <img src="../../assets/images/clock.png" alt="" />
                <span>
                    Order record
                </span>
            </div>
            <div class="content" v-loading="openIsLoading">
                <el-empty :image="emptyImage" description="No items for sale"
                    v-if="!recordList.length && !openIsLoading">
                </el-empty>
                <table v-if="recordList.length && !openIsLoading">
                    <thead>
                        <th>Type</th>
                        <th>Order ID</th>
                        <th>Txn Hash</th>
                        <th>NFT ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date UTC</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in recordList" :key="index">
                            <td :class="{orange: item.type === 'SELL', green: item.type === 'BUY'}">
                                {{ item.type }}
                            </td>
                            <td>
                                {{ item.order_id }}
                            </td>
                            <td>
                                <span class="hash-txt">
                                    {{ item.transfer_txn || item.approve_txn }}</span>
                            </td>
                            <td>
                                {{ item.goods_id }}
                            </td>
                            <td>
                                {{ lang == 'ZH' ? item.name : item.english_name}}
                            </td>
                            <td>
                                {{ item.amount || '-' }}
                            </td>
                            <td>
                                {{ item.order_time }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page r" v-if="recordList.length && !openIsLoading">
                    <el-pagination background layout="total, prev, pager, next" @current-change="onPageChange2"
                        @prev-click="onPageChange2" @next-click="onPageChange2" :page-size="Number(page2.pageSize)"
                        :total="Number(total2)" :current-page="Number(page2.curPage)" :page-sizes="[10, 20, 50, 100]">
                    </el-pagination>
                </div>
            </div>
        </el-drawer>
        <el-drawer :visible.sync="isFilterDrawer" direction="btt" custom-class="el-drawer2" :show-close="false">
            <div class="filter-content">
                <div class="top-btn">
                    <img src="../../assets/images/close.png" alt="" @click="handleClose">
                    <div @click="handleClose" class="done-search">{{ $t("marketplace.done") }}</div>
                </div>
                <ul class="check-list">
                    <ul class="check-list" v-if="currentTabId === 1">
                        <li class="check-item">
                            <div class="label-name">{{$t("account.sale")}}</div>
                            <el-radio-group v-model="checkListSale">
                                <el-radio :label="1">{{$t("marketplace.all-sale")}}</el-radio>
                                <el-radio :label="2">{{$t("marketplace.my-sale")}}</el-radio>
                            </el-radio-group>
                        </li>
                        <li class="check-item">
                            <div class="label-name">{{$t("detail.color")}}</div>
                            <el-checkbox-group v-model="checkListColor">
                                <el-checkbox label="yellow" class="yellow">{{$t("account.yellow")}}</el-checkbox>
                                <el-checkbox label="orange" class="orange">{{$t("account.orange")}}</el-checkbox>
                                <el-checkbox label="red" class="red">{{$t("account.red")}}</el-checkbox>
                                <el-checkbox label="blue" class="blue">{{$t("account.blue")}}</el-checkbox>
                                <el-checkbox label="purple" class="purple">{{$t("account.purple")}}</el-checkbox>
                                <el-checkbox label="diamond">{{$t("account.diamond")}}</el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li class="check-item">
                            <div class="label-name">{{$t("marketplace.props")}}</div>
                            <el-checkbox-group v-model="checkListProps">
                                <el-checkbox :label="10">{{$t("marketplace.shoes")}}</el-checkbox>
                                <el-checkbox :label="11">{{$t("marketplace.pants")}}</el-checkbox>
                                <el-checkbox :label="12">{{$t("marketplace.clothes")}}</el-checkbox>
                                <el-checkbox :label="13">{{$t("marketplace.hat")}}</el-checkbox>
                                <el-checkbox :label="14">{{$t("marketplace.gloves")}}</el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li class="check-item">
                            <div class="label-name">{{$t("account.level")}}</div>
                            <el-checkbox-group v-model="checkListLvel">
                                <el-checkbox :label="1">Lv-1</el-checkbox>
                                <el-checkbox :label="2">Lv-2</el-checkbox>
                                <el-checkbox :label="3">Lv-3</el-checkbox>
                                <el-checkbox :label="4">Lv-4</el-checkbox>
                                <el-checkbox :label="5">Lv-5</el-checkbox>
                                <el-checkbox :label="6">Lv-6</el-checkbox>
                                <el-checkbox :label="7">Lv-7</el-checkbox>
                                <el-checkbox :label="8">Lv-8</el-checkbox>
                            </el-checkbox-group>
                        </li>
                    </ul>
                    <ul class="check-list" v-else>
                        <li class="check-item">
                            <div class="label-name">{{$t("account.sale")}}：</div>
                            <el-radio-group v-model="checkListSale">
                                <el-radio :label="1">{{$t("marketplace.all-sale")}}</el-radio>
                                <el-radio :label="2">{{$t("marketplace.my-sale")}}</el-radio>
                            </el-radio-group>
                        </li>
                        <li class="check-item">
                            <div class="label-name">{{$t("marketplace.pack")}}：</div>
                            <el-checkbox-group v-model="checkListPack">
                                <el-checkbox :label="2" class="w-check">{{$t("marketplace.silver-pack")}}
                                </el-checkbox>
                                <el-checkbox :label="1" class="w-check">{{$t("marketplace.gold-pack")}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li class="check-item">
                            <div class="label-name">{{$t("marketplace.frag")}}：</div>
                            <el-checkbox-group v-model="checkListFrag">
                                <el-checkbox :label="24" class="block-item">
                                    {{$t("marketplace.panamera-fragments")}}</el-checkbox>
                                <el-checkbox :label="23" class="block-item">{{$t("marketplace.car-fragments")}}
                                </el-checkbox>
                                <el-checkbox :label="22" class="block-item">
                                    {{$t("marketplace.phone-fragments")}}</el-checkbox>
                            </el-checkbox-group>
                        </li>
                    </ul>
                </ul>
            </div>
        </el-drawer>
        <Details :row="currentGoodRow" v-if="isShowDetails" @on-close="detailsDrawerClose" from="marketplace"></Details>
        <buy :row="currentGoodRow" v-if="buyReviseDialog" @close="() => this.buyReviseDialog = false"
            @sendBuyOk="sendBuyOk"></buy>
    </div>
</template>

<script>
    import moment from 'moment'
    import myAjax from '@/utils/ajax.js'
    import Cookie from "@/utils/cookie.js";
    import itemCard from '@/components/item-card'
    import PageTabs from '@/components/page-tabs'
    import emptyImage from '@/assets/images/empty.png'
    import {
        netImgBaseUrl
    } from '@/config/config.js'
    import Buy from './components/buy'
    import Details from '../details'

    export default {
        name: '',
        components: {
            PageTabs,
            itemCard,
            Buy,
            Details
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-market-place',
                tabs: [{
                    id: 1,
                    title: this.$t("marketplace.nfts"),
                    num: 0
                }, {
                    id: 2,
                    title: this.$t("marketplace.other"),
                    num: 0
                }],
                amountInfo: {},
                isLoading: true,
                currentTabId: 1,
                checkListColor: [],
                checkListSale: 1,
                checkListLvel: [],
                checkListProps: [],
                checkListFrag: [],
                checkListPack: [],
                query: {
                    keywords: '',
                    sortField: 0,
                    tabFilterIndex: 0
                },
                options: [{
                    // 升序
                    value: 0,
                    order_by: 'price',
                    sort: 'asc',
                    label: this.$t("marketplace.lowest-price")
                }, {
                    // 降序
                    value: 1,
                    order_by: 'price',
                    sort: 'desc',
                    label: this.$t("marketplace.highest-price")
                }, {
                    // 升序
                    value: 2,
                    order_by: 'on_sale_time',
                    sort: 'desc',
                    label: this.$t("marketplace.recently-listed")
                }, {
                    // 降序
                    value: 3,
                    order_by: 'on_sale_time',
                    sort: 'asc',
                    label: this.$t("marketplace.longest-listed")
                }],
                isShowFilter: false,
                isFilterDrawer: false,
                isShowRecored: false,
                openIsLoading: true,
                buyRecoredDrawer: false,
                buyReviseDialog: false,
                isShowDetails: false,
                list: [],
                recordList: [],
                page: {
                    pageSize: 20,
                    curPage: 1
                },
                total: 0,
                page2: {
                    pageSize: 20,
                    curPage: 1
                },
                total2: 0,
                currentGoodRow: {},
                netImgBaseUrl,
                moment,
                emptyImage,
                lang: '',
            }
        },
        watch: {},
        created() {
            this.lang = localStorage.getItem('lang') || 'EN'
            this.isLoading = true
            Promise.all([this.getLiist(), this.getTotalInfo(), this.getAmountInfo()])
                .then(res => {
                    this.isLoading = false
                })
        },
        computed: {
            isCanBuy() {
                const addr = Cookie.getCookie('__account__'),
                    token = Cookie.getCookie('ad_token')
                if (addr && token) {
                    return true
                }
                return false
            }
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            detailsDrawerClose(updata) {
                if (updata) {
                    this.getLiist()
                }
                this.isShowDetails = false
            },
            goCardDetail(row) {
                this.currentGoodRow = row
                this.isShowDetails = true
            },
            doResetFilter() {
                this.checkListSale = 1
                this.checkListColor = []
                this.checkListPack = []
                this.checkListProps = []
                this.checkListLvel = []
                this.checkListFrag = []
                this.isShowFilter = false
                this.getLiist()
            },
            sendBuyOk() {
                this.page.curPage = 1
                this.buyReviseDialog = false
                this.getLiist()
            },
            doBuy(row) {
                this.currentGoodRow = row
                this.buyReviseDialog = true
            },
            goDetail(id) {
                //     this.$router.push({
                //         path: '/details',
                //         query: {
                //             id
                //         }
                //     })
            },
            getAmountInfo() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'goods/market/price/amount',
                    }).then(res => {
                        if (res.ok && res.data) {
                            this.amountInfo = res.data
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            getRecords() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/records/list',
                        isPassFalse: true,
                        data: {
                            body: {
                                page: this.page2.curPage,
                                per_page: this.page2.pageSize,
                                addr: Cookie.getCookie("__account__") || ''
                            }
                        }
                    }).then(res => {
                        if (res.ok && res.data) {
                            const data = res.data.data
                            this.recordList = data.items || []
                            this.total2 = data.total
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    }).finally(() => {
                        this.openIsLoading = false
                    })
                })

            },
            getTotalInfo() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'market/goods/count',
                        data: {
                            body: {
                                status: [8]
                            }
                        }
                    }).then(res => {
                        if (res.ok && res.data) {
                            this.tabs[0].num = res.data.nft || 0
                            this.tabs[1].num = res.data.others || 0
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })

            },
            getLiist() {
                return new Promise((resolve, reject) => {
                    let type_id = [],
                        optionItem = this.options.find(x => x.value === this.query.sortField)
                    if (this.currentTabId === 1) {
                        type_id = this.checkListProps
                    } else if (this.currentTabId === 2) {
                        type_id = this.checkListFrag.concat(this.checkListPack)
                    }
                    if (this.query.sortField) {

                    }
                    myAjax({
                        url: 'market/goods/list',
                        data: {
                            body: {
                                page: this.page.curPage,
                                per_page: this.page.pageSize,
                                type: this.currentTabId,
                                status: [8],
                                type_id,
                                name: this.query.keywords,
                                color: this.checkListColor,
                                level: this.checkListLvel,
                                sort: optionItem.sort,
                                order_by: optionItem.order_by,
                                addr: this.checkListSale === 1 ? null : Cookie.getCookie("__account__")
                            }
                        }
                    }).then(res => {
                        const data = res.data || {}
                        this.list = (data.items || []).map(x => {
                            delete x.goods_level
                            if (this.currentTabId === 1) {
                                delete x.num
                            }
                            return x
                        })
                        this.tabs[this.currentTabId - 1].num = data.total || 0
                        this.total = data.total
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            handleClose(type) {
                // 完成
                this.doSearch()
                this.isFilterDrawer = false
            },
            onPageChange(page) {
                this.page.curPage = page
                this.getLiist()
            },
            onPageChange2(page) {
                this.page2.curPage = page
                this.getRecords()
            },
            handleRecoredDrawer() {
                this.buyRecoredDrawer = true
                this.openIsLoading = true
                this.getRecords()
            },
            handleRecored() {
                this.isShowRecored = true
                this.openIsLoading = true
                this.getRecords()
            },
            onSelectTab(item) {
                if (this.isLoading) return
                this.isShowFilter = false
                this.currentTabId = item.id
                this.page.curPage = 1
                this.query.keywords = ''
                this.isLoading = true
                this.doResetFilter()
                this.getLiist().then(() => {
                    this.isLoading = false
                })
            },
            doSearch() {
                this.isShowFilter = false
                this.page.curPage = 1
                this.isLoading = true
                this.getLiist().then(() => {
                    this.isLoading = false
                })
            },
            openFilterDrawer() {
                this.isShowFilter = !this.isShowFilter
            },
            openFilterDrawer2() {
                this.isFilterDrawer = true
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
        .el-drawer2 {
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

        .page-top {
            padding: 64px 0 40px;
            background: #0B0F15;
            color: #fff;

            .tit-tab {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 44px;

                .left {
                    display: flex;
                    align-items: center;
                    font-size: 48px;
                    font-weight: 600;

                    img {
                        display: none;
                        margin-right: .266666666666667rem;
                    }
                }

                .right {
                    font-size: .24rem;
                    font-weight: 400;
                    color: #777E90;
                    cursor: pointer;

                    img {
                        width: .3733rem;
                        height: .3733rem;
                        vertical-align: middle;
                    }

                    &.min {
                        display: none;
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
            width: 100%;

            .top-search {
                display: flex;
                position: relative;
                justify-content: space-between;
                margin: 20px 0;
                width: 100%;

                .filter-btn-h5 {
                    display: none;
                }

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
                    color: #fff;

                    &.filter-right {
                        display: none;
                    }

                    &.is-filter {
                        border: 1px solid #32A3FF;
                        color: #32A3FF;
                    }

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

                .filter-wrap {
                    position: absolute;
                    top: 0.7rem;
                    left: 0;
                    width: 100%;
                    padding: .4rem .1333rem .1333rem;
                    background: #1D2633;
                    border-radius: .1333rem;
                    opacity: 1;
                    border: 1px solid #29374B;
                    box-sizing: border-box;
                    z-index: 9;
                }

                .check-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: .2667rem;

                    .label-name {
                        width: .9333rem;
                        font-size: .24rem;
                        font-weight: 400;
                        color: #777E90;
                    }

                    .el-radio-group {
                        margin-left: .2667rem;

                        .el-radio__label {
                            color: #fff;
                            font-size: .2133rem;
                        }
                    }

                    .el-checkbox-group {
                        margin-left: .2667rem;

                        .el-checkbox {
                            width: 1.3333rem;
                            margin-right: .1333rem;

                            &.w-check {
                                width: 2.8rem;
                            }
                        }

                        .el-checkbox__inner {
                            border: 2px solid #131922;
                            background-color: #000;
                        }

                        .el-checkbox__input.is-checked .el-checkbox__inner,
                        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                            background-color: #409EFF;
                            border-color: #409EFF;
                        }

                        .el-checkbox__label {
                            font-size: .2133rem;
                            color: #fff;
                            font-weight: normal;
                        }
                    }
                }
            }

            .list-content {
                padding-top: .266666666666667rem;
                min-height: 5rem;
                flex: 1;
                padding-bottom: .3rem;

                .components-item-card {
                    float: left;
                    margin-right: .52rem;
                    width: 3.6rem;


                    &:nth-child(4n) {
                        margin-right: 0;
                    }

                    .btns-wrap {
                        margin-top: 10px;
                        display: flex;
                        justify-content: space-between;
                    }

                    .btn {
                        flex: 1;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border-radius: .133333333333333rem;
                        color: #fff;
                        cursor: pointer;
                        font-size: .213333333333333rem;

                        &.btn-sale {
                            background: #00A73A;
                        }
                    }
                }

                // ul {
                //     display: flex;
                //     flex-wrap: wrap;
                //     width: auto;
                //     margin: 0 -0.133333333333333rem;
                // }

                li {
                    // position: relative;
                    // width: 3.533333333333333rem;
                    // flex-shrink: 0;
                    // margin: .266666666666667rem .133333333333333rem 0;
                    // padding: .266666666666667rem .16rem;
                    // background: #1D2633;
                    // border-radius: .133333333333333rem;
                    // border: 1px solid #32A3FF;
                    // cursor: pointer;

                    .mark {
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, .8) url('../../assets/images/select.png');
                        background-size: .8rem .8rem;
                        background-position: center center;
                        background-repeat: no-repeat;
                        border: 1px solid #32A3FF;
                        border-radius: .133333333333333rem;
                    }

                    .price {
                        font-size: .1867rem;
                        font-weight: 500;
                        color: #777E90;
                        text-align: left;
                    }

                    .money_w {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 10px;

                        .money {
                            font-size: .2667rem;
                            font-weight: 500;
                            color: #32A3FF;
                        }

                        .amount-icon {
                            width: .2667rem;
                            height: .2667rem;
                        }
                    }
                }
            }

            // .left {
            //     margin-right: 20px;
            //     width: 265px;
            //     max-height: 830px;
            //     background: #0B0F15;
            //     border-radius: 10px;

            //     li {
            //         border-bottom: 1px solid #29374B;

            //         .title {
            //             display: flex;
            //             justify-content: space-between;
            //             padding: 0 10px;
            //             height: 80px;
            //             line-height: 80px;
            //             border-bottom: 1px solid #29374B;
            //             font-size: 20px;
            //             color: #fff;
            //         }

            //         .filter-val {
            //             padding: 30px 20px;

            //             &.filter .el-checkbox {
            //                 display: block;
            //             }

            //             .el-checkbox {
            //                 margin-bottom: 10px;
            //             }
            //         }
            //     }
            // }

            // .right {
            //     flex: 1;


            //     .top-search {
            //         display: flex;
            //         justify-content: space-between;
            //     }

            //     .search {
            //         display: flex;
            //     }

            //     .total {
            //         font-size: 32px;

            //         .txt {
            //             color: $--color-success;
            //         }

            //         .filter {
            //             display: none;
            //         }
            //     }

            //     .input-keywords {
            //         width: 265px;
            //         margin-right: 20px;
            //         background: #14181f;
            //     }

            //     .list {
            //         .soon-box {
            //             position: relative;
            //             width: max-content;
            //             margin: 63px auto 0;
            //             text-align: center;

            //             img {
            //                 width: 230px;
            //                 height: 230px;
            //             }

            //             div {
            //                 position: absolute;
            //                 right: -60px;
            //                 top: 8px;
            //                 color: #FFE2C3;
            //                 font-size: 18px;
            //                 text-align: left;
            //             }
            //         }
            //     }
            // }
        }

        .recored-dialog {

            .el-dialog__body {
                height: 550px;
            }

            .dialog-content {
                height: 450px;
                overflow-y: auto;
            }

            .header-title {
                display: flex;
                align-items: center;

                img {
                    width: .4rem;
                    height: .4rem;
                }

                span {
                    margin-left: .2667rem;
                    font-size: .32rem;
                    font-weight: 500;
                    color: #fff;
                }
            }

            table {
                width: 100%;
                color: #777e90;

                thead {
                    th {
                        height: 0.533333333333333rem;
                        font-size: .266666666666667rem;
                        line-height: 0.533333333333333rem;
                        border-top: 1px solid #152132;
                    }
                }

                tbody {
                    td {
                        height: 0.853333333333333rem;
                        font-size: .24rem;
                        border-top: 1px solid #152132;

                        &.orange {
                            color: #FF5E19;
                        }

                        &.green {
                            color: #00CF08;
                        }

                        .hash-txt {
                            display: inline-block;
                            width: 1.866666666666667rem;
                            line-height: 0.853333333333333rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }

        .el-pagination {
            margin-top: 0.266666666666667rem;
            text-align: right;
        }

        .el-drawer {
            .el-drawe2 {
                height: 80% !important;
            }

            .filter-content {
                border-top: 1px solid #29374B;
            }

            .top-btn {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: .5333rem;
                font-weight: 400;
                color: #fff;
                padding: .1333rem .5333rem;

                .done-search {
                    width: 2.133333333333333rem;
                    height: .96rem;
                    line-height: .96rem;
                    text-align: center;
                    background: #29374B;
                    border-radius: .266666666666667rem;
                    cursor: pointer;
                }
            }

            .other-list {
                .el-checkbox {
                    width: 3.2rem;
                    margin-right: 1.0667rem;
                    margin-bottom: .48rem;
                }
            }

            .check-item {
                padding: .4rem .8rem 0 .4rem;
                margin-bottom: .2667rem;
                border-top: 1px solid #29374B;

                .label-name {
                    margin-bottom: .2667rem;
                    font-size: .533333333333333rem;
                    font-weight: 600;
                    color: #fff;
                }

                .el-checkbox-group {
                    margin-left: 0;

                    .el-checkbox {
                        width: 3.2rem;
                        margin-right: 1.0667rem;
                        margin-bottom: .48rem;
                    }

                    .block-item {
                        display: block;
                    }

                    .el-checkbox__inner {
                        border: 2px solid #131922;
                        background-color: #000;
                    }

                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        background-color: #409EFF;
                        border-color: #409EFF;
                    }

                    .el-checkbox__label {
                        font-size: .4267rem;
                        color: #fff;
                        font-weight: 500;
                    }
                }
            }
        }

        .el-drawer2 {
            height: 55% !important;
            background: #000;
            overflow-y: scroll;

            .el-drawer__header {
                padding: 0.1rem 0.533333333333333rem;
                margin-bottom: 0.1rem;

                img {
                    vertical-align: middle;
                    width: 0.426666666666667rem;
                    height: 0.426666666666667rem;
                }

                span {
                    margin-left: 0.266666666666667rem;
                    font-size: 0.32rem;
                    color: #fff;
                }
            }

            .content {
                min-height: 5rem;
                padding: 0 0.533333333333333rem;

                table {
                    color: #777e90;
                    font-size: 0.266666666666667rem;

                    thead {
                        th {
                            min-width: 55px;
                            height: 0.533333333333333rem;
                            line-height: 0.533333333333333rem;
                            border-top: 1px solid #152132;
                        }
                    }

                    tbody {
                        td {
                            height: 0.853333333333333rem;
                            padding-right: .2133rem;
                            border-top: 1px solid #152132;
                            white-space: nowrap;

                            &.orange {
                                color: #FF5E19;
                            }

                            &.green {
                                color: #00CF08;
                            }

                            .hash-txt {
                                display: inline-block;
                                width: 1.866666666666667rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .page-top {
                padding: .8rem .533333333333333rem .533333333333333rem;

                .tit-tab {
                    margin-bottom: .533333333333333rem;

                    .left {
                        margin-left: 1.8933rem;
                        font-size: .64rem;

                        img {
                            display: inline-block;
                        }
                    }

                    .right {
                        display: none;

                        &.min {
                            position: relative;
                            display: inline-block;

                            img {
                                width: .7467rem;
                                height: .7467rem;
                            }

                            &::after {
                                position: absolute;
                                top: 0;
                                right: 0;
                                content: "";
                                display: table;
                                width: .2667rem;
                                height: .2667rem;
                                background: #FF3D00;
                                border-radius: 50%;
                            }
                        }
                    }

                    .tab-filter {
                        display: none;
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

                .top-search {

                    .filter-btn {
                        display: none;

                        &.filter-right {
                            width: .9067rem;
                            height: .9067rem;

                            img {
                                width: .3733rem;
                                height: .3733rem;
                                ;
                                margin: 0;
                            }
                        }
                    }

                    .filter-btn-h5 {
                        display: inline-block;
                        flex: 1;
                        margin-left: .186666666666667rem;
                        height: .906666666666667rem;
                        border-radius: .133333333333333rem;
                        border: 1px solid #29374B;
                        text-align: center;
                        cursor: pointer;
                    }

                    .search {
                        display: flex;
                        width: 100%;

                        .input-keywords {
                            width: 4.3733rem;
                            height: .9067rem;

                            .el-input__inner {
                                height: 100%;
                                font-size: .2667rem;
                            }

                            .el-input-group__append,
                            .el-input-group__prepend {
                                padding: 0 .2133rem 0 0;
                            }

                            .search-icon {
                                width: .4267rem;
                                height: .4267rem;
                            }
                        }

                        .el-select {
                            margin-left: .266666666666667rem;

                            .el-input {
                                width: 3.28rem;
                                height: .9067rem;

                                .el-input__inner {
                                    height: 100%;
                                    font-size: .2667rem;
                                }
                            }
                        }
                    }
                }

                .list-content {
                    width: 100%;

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

                        .btn {
                            height: .693333333333333rem;
                            line-height: .693333333333333rem;
                        }
                    }
                }
            }
        }
    }
</style>