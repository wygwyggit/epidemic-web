<template>
    <div :class="prefixCls">
        <div class="page-title">
            <div class="w">
                <img src="../../assets/images/nav-my-account.png" alt="">
                {{$t("account.my-account")}}
            </div>
        </div>
        <div class="main">
            <template v-if="isSign && isConnectWallet">
                <div class="w">
                    <page-tabs :tabs="tabs" :currentTabId="currentTabId" @on-select="onSelectTab"></page-tabs>
                    <div class="top-search">
                        <div class="filter-wrap">
                            <div class="filter-content">
                                <ul class="check-list">
                                    <li class="check-item">
                                        <div class="label-name">{{ checkObj[currentTabId].label }}：</div>
                                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                            @change="handleCheckAllChange" class="all">All</el-checkbox>
                                        <el-checkbox-group v-model="checkListFilter"
                                            @change="handleCheckedCitiesChange">
                                            <el-checkbox v-for="row in checkObj[currentTabId].list" :label="row.id"
                                                :key="row.id" :checked="row.isActive">
                                                {{ row.val }}</el-checkbox>
                                        </el-checkbox-group>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="list-content" v-loading="isLoading">
                        <div class="list clearfix">
                            <el-empty :image="emptyImage" :description="$t('common.no-data')"
                                v-if="!netList.length && !isLoading">
                            </el-empty>
                            <template v-if="netList.length && !isLoading">
                                <item-card v-for="(item, index) of netList" :key="index" :itemInfo="item"
                                    @select="goDetail" @revise="doReviseSale" @deliver="doDeliver" type="sale">
                                    <div class="btns-wrap">
                                        <template v-if="item.status == 0">
                                            <div class="btn btn-open" v-if="item.belong_type == -1"
                                                @click="openGiftBag(item)">
                                                {{$t("account.open")}}
                                            </div>
                                            <div class="btn btn-synthetic" v-if="item.type_id == 2"
                                                @click="doSynthetic(item)">
                                                {{$t("account.synthetic")}}</div>
                                            <div class="btn btn-synthetic" v-if="item.belong_type == -2"
                                                @click="doSynthetic(item)">
                                                {{$t("account.synthetic")}}</div>
                                            <div class="btn btn-deliver" @click="doDeliver(item)"
                                                v-if="item.belong_type == 1">{{$t("common.deliver")}}</div>
                                            <div class="btn btn-sale" @click="doSale(item)">{{$t("account.sale")}}</div>
                                        </template>
                                        <template v-if="item.status == 2 || item.status == 8">
                                            <!-- <div class="btn btn-on-sale">{{ $t("account.on-sale")}}</div> -->
                                            <div class="btn btn-cancel-sale" @click="doCancelSale(item)">
                                                {{ $t("account.cancel-sale")}}</div>
                                        </template>
                                        <template v-if="item.status == 1">
                                            <div class="btn btn-on-staking">{{ $t("account.staking")}}</div>
                                        </template>
                                        <template v-if="item.status == -2 || item.status == 4">
                                            <div class="btn btn-on-sending">{{ $t("account.sending")}}</div>
                                        </template>
                                    </div>
                                </item-card>
                            </template>

                        </div>
                        <div class="page-warp" v-if="netList.length && !isLoading">
                            <div class="r">
                                <el-pagination background :hide-on-single-page="true" layout="total, prev, pager, next"
                                    @current-change="onPageChange" @prev-click="onPageChange" @next-click="onPageChange"
                                    :page-size="Number(page.pageSize)" :total="Number(total)"
                                    :current-page="Number(page.curPage)" :page-sizes="[10, 20, 50, 100]">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template>
                <no-connect-wallet v-if="!isConnectWallet"></no-connect-wallet>
                <no-sign v-if="isConnectWallet && !isSign"></no-sign>
            </template>

        </div>

        <sale :row="currentGoodRow" v-if="saleReviseDialog" @close="() => this.saleReviseDialog = false"
            @sendSaleOk="sendSaleOk"></sale>
        <deliver-dialog v-if="isShowDeliverDialog" :goods_id="currentGoodRow.goods_id" :goods_name="currentGoodRow.name"
            :addr="currentGoodRow.user_addr" :belong_type="currentGoodRow.belong_type" @sendOk="deliverSuccess"
            @close="() => this.isShowDeliverDialog = false"></deliver-dialog>
        <gift-bag v-if="isShowGiftBag" :rowList="giftBagList" @close="doGiftClose"></gift-bag>
        <compound v-if="isShowCompound" :row="currentGoodRow" @close="() => this.isShowCompound = false"
            @compoundSuc="compoundSuc"></compound>
        <open :row="currentGoodRow" v-if="isShowOpenGift" @close="() => this.isShowOpenGift = false"
            @openGiftOk="openGiftOk"></open>
    </div>
</template>

<script>
    import eventBus from "@/utils/eventBus";
    import myAjax from '@/utils/ajax.js'
    import cookie from "@/utils/cookie.js";
    import PageTabs from '@/components/page-tabs'
    import itemCard from '@/components/item-card'
    import DeliverDialog from '@/components/deliver-dialog'
    import emptyImage from '@/assets/images/empty.png'
    import giftBag from './components/gift-bag'
    import compound from './components/compound'
    import Sale from './components/sale'
    import Open from './components/open'
    import NoConnectWallet from '@/components/no-connect-wallet'
    import NoSign from '@/components/no-sign'
    export default {
        name: '',
        components: {
            PageTabs,
            itemCard,
            DeliverDialog,
            giftBag,
            compound,
            Sale,
            Open,
            NoConnectWallet,
            NoSign
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-account',
                emptyImage,
                page: {
                    pageSize: 20,
                    curPage: 1
                },
                total: 0,
                isShowGiftBag: false,
                isShowCompound: false,
                isShowOpenGift: false,
                giftBagList: [],
                isLoading: true,
                tabs: [{
                    id: 1,
                    title: this.$t("marketplace.nfts"),
                    num: 0
                }, {
                    id: 2,
                    title: this.$t("marketplace.other"),
                    num: 0
                }],
                selectedStatus: 0,
                currentTabId: 1,
                checkObj: {
                    1: {
                        label: this.$t("account.status"),
                        list: [{
                            id: 0,
                            val: this.$t("account.available")
                        }, {
                            id: 8,
                            val: this.$t("account.on-sale")
                        }, {
                            id: 1,
                            val: this.$t("account.staking")
                        }, {
                            id: 4,
                            val: this.$t("account.sending")
                        }, {
                            id: 2,
                            val: this.$t("account.processing")
                        }]
                    },
                    2: {
                        label: this.$t("account.status"),
                        list: [{
                            id: 0,
                            val: this.$t("account.available")
                        }, {
                            id: 8,
                            val: this.$t("account.on-sale")
                        }, {
                            id: 4,
                            val: this.$t("account.sending")
                        }]
                    }
                },
                checkAll: false,
                isIndeterminate: true,
                checkListFilter: [],
                isShowDeliverDialog: false,
                saleReviseDialog: false,
                saleReviseDialogTitle: '',
                netList: [],
                isSign: false,
                isConnectWallet: false
            }
        },
        computed: {
            placeholderTxt() {
                return this.$t("account.search-id-name")
            },
        },
        created() {
            let width = window.innerWidth;
            if (width < 768) {
                this.page.pageSize = 100000
            }
            this.initSignConnectData()
            if (this.isSign && this.isConnectWallet) {
                Promise.all([this.getTotalInfo(), this.getLiist()]).then(res => {
                    this.isLoading = false
                })
            } else {
                this.isLoading = false
            }

        },
        mounted() {
            eventBus.$on('sign-fail', this.initSignConnectData)
        },
        beforeDestroy() {},
        methods: {

            initSignConnectData() {
                this.isSign = cookie.getCookie('ad_token') || null
                this.isConnectWallet = cookie.getCookie('__account__') || null
            },
            sendSaleOk() {
                this.page.curPage = 1
                this.saleReviseDialog = false
                this.getLiist()
            },
            compoundSuc(data) {
                this.isShowCompound = false
                this.isShowGiftBag = true
                this.giftBagList = data
            },
            deliverSuccess() {
                this.isShowDeliverDialog = false
                this.getLiist()
            },
            doGiftClose() {
                this.isShowGiftBag = false
                this.getLiist()
            },
            doSynthetic(row) {
                return false
                this.currentGoodRow = row
                this.isShowCompound = true
            },
            openGiftBag(row) {
                this.currentGoodRow = row
                this.isShowOpenGift = true
            },
            openGiftOk(data) {
                this.isShowOpenGift = false
                this.isShowGiftBag = true
                this.giftBagList = data
                this.giftBagList.forEach(x => {
                    if (x.name.includes('-')) {
                        x.title = x.name.split('-')[3]
                    } else {
                        x.title = x.name
                    }
                });
            },
            handleCheckAllChange(val) {
                let arr = this.checkObj[this.currentTabId].list.map(x => x.id)
                this.checkListFilter = val ? arr : [];
                this.isIndeterminate = false;
                this.page.curPage = 1
                this.getLiist()
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.checkObj[this.currentTabId].list.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkObj[this.currentTabId].list
                    .length;
                this.page.curPage = 1
                this.getLiist()
            },
            onSelectTab(item) {
                if (this.isLoading) return
                this.currentTabId = item.id
                this.page.curPage = 1
                this.checkListFilter = []
                this.isLoading = true
                this.getLiist()
            },
            doDeliver(row) {
                return false
                this.currentGoodRow = row
                this.isShowDeliverDialog = true
            },
            onPageChange(page) {
                this.page.curPage = page
                this.getLiist()
            },
            getTotalInfo() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/goods/count',
                        isPassFalse: true,
                        data: {
                            body: {
                                status: this.checkListFilter.length ? this.checkListFilter : (this
                                    .currentTabId == 1 ? [0, 8, 1, 4, 2] : [0, 8, 4]),
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
                    this.isLoading = true
                    myAjax({
                        url: 'user/goods/list',
                        isPassFalse: true,
                        data: {
                            body: {
                                page: this.page.curPage,
                                per_page: this.page.pageSize,
                                status: this.checkListFilter.length ? this.checkListFilter : (this
                                    .currentTabId == 1 ? [0, 8, 1, 4, 2] : [0, 8, 4]),
                                type: this.currentTabId
                            }
                        }
                    }).then(res => {
                        const data = res.data || {}
                        this.netList = data.items || []
                        if (this.checkListFilter.length) {
                            this.tabs[this.currentTabId - 1].num = data.total
                        } else {
                            this.getTotalInfo()
                        }
                        this.total = data.total
                        this.isLoading = false
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })

            },
            saleReviseDialogClosed() {
                this.nets.salePrice = ''
            },
            doSale(row) {
                this.currentGoodRow = row
                this.saleReviseDialog = true
            },
            doCancelSale(row) {
                this.currentGoodRow = row
                this.$confirm(`${this.$t("common.cancel-sale-tip")}?`, this.$t("common.remind"), {
                    confirmButtonText: this.$t("common.yes"),
                    showCancelButton: false,
                    closeOnClickModal: false,
                    width: '6.4rem'
                }).then(async () => {
                    const idName = row.num ? 'type_id' : 'goods_id'
                    myAjax({
                        url: row.num ? 'goods/sale/others/cancel' : 'goods/sale/nft/cancel',
                        data: {
                            body: {
                                [idName]: row[idName],
                                record_id: row.record_id || ''
                            }
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.$showOk(this.$t("common.ope-suc"))
                            this.getLiist()
                        }
                    })
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

            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account";

    .#{$prefixCls} {
        .page-title {
            height: 157px;
            line-height: 157px;
            background: #0B0F15;
            color: #fff;
            font-size: 48px;
            font-weight: 600;

            img {
                display: none;
                width: .85rem;
                height: .85rem;
                vertical-align: text-bottom;
            }
        }

        .main {
            padding: 30px 0;
            background: #14181f;

            .list-content {
                .components-item-card {

                    .btns-wrap {
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

                        &:nth-child(2n) {
                            margin: 0 .1rem;
                        }

                        &:last-child {
                            margin-right: 0;
                        }

                        &.btn-deliver,
                        &.btn-open {
                            background: #F1AE00;
                        }
                         &.btn-deliver {
                             cursor: not-allowed;
                             opacity: .6;
                         }

                        &.btn-sale {
                            background: #00A73A;
                        }

                        &.btn-synthetic {
                            background: #9E00FF;
                        }

                        &.btn-on-sale,
                        &.btn-on-staking,
                        &.btn-on-sending {
                            background: #777E90;
                            cursor: not-allowed;
                        }

                        &.btn-cancel-sale {
                            background: #FF5E1A;
                        }
                    }
                }
            }

            .filter-wrap {
                width: 100%;
                margin-top: .2667rem;
                padding: .1867rem .2667rem;
                background: #1D2633;
                border-radius: .1333rem;
                opacity: 1;
                border: 1px solid #29374B;
                box-sizing: border-box;
            }

            .check-item {
                display: flex;
                align-items: center;
                // margin-bottom: .2667rem;

                .el-checkbox__inner {
                    border: 2px solid #131922;
                    background-color: #000;
                }

                .el-checkbox__input.is-checked .el-checkbox__inner,
                .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                    background-color: #409EFF;
                    border-color: #409EFF;
                }

                .label-name {
                    width: .9333rem;
                    font-size: .24rem;
                    font-weight: 400;
                    color: #777E90;
                }

                .all {
                    margin-left: .2667rem;
                }

                .el-checkbox {
                    // width: 1.3333rem;
                    margin-right: .6667rem;

                    &.w-check {
                        width: 2.8rem;
                    }
                }

                .el-checkbox__label {
                    font-size: .2133rem;
                    color: #fff;
                    font-weight: normal;
                }
            }

            .list-content {
                flex: 1;


                .list {
                    min-height: 5rem;
                    padding: .266666666666667rem 0;
                }

                .page-warp {
                    padding-bottom: .373333333333333rem
                }
            }

            .components-item-card {
                float: left;
                margin-right: 20px;
                width: 265px;

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .page-title {
                height: 1.866666666666667rem;
                line-height: 1.866666666666667rem;
                font-size: .64rem;
                text-align: center;
                background: #14181f;

                img {
                    display: inline-block;
                }
            }

            .main {
                .check-item {

                    .el-checkbox-group {
                        display: flex;
                        width: 100%;
                        overflow-x: auto;
                    }

                    .all,
                    .label-name {
                        display: none;
                    }

                    .el-checkbox {
                        margin-right: 10px;

                        .el-checkbox__label {
                            padding-left: 5px;
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

            .page {
                display: none;
            }
        }
    }
</style>