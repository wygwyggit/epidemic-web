<template>
    <div :class="prefixCls">
        <div class="top" v-if="isSign && isConnectWallet">
            <div class="w">
                <div class="left">
                    <img src="../../assets/images/net-mining.png" alt="">
                    {{$t("common.net-mining")}}
                </div>
                <div class="right">
                    <div class="net-n">
                        <p>{{$t("account.staking")}}</p>
                        <p style="margin-top:3px">{{ coinCountData.count }} NFTs</p>
                    </div>
                    <ul>
                        <li v-for="(value, key, index) in coinCountData.items" :key="index">
                            <p class="color" :style="{color: key}">{{$t(`account.${key}`)}}</p>
                            <p class="num">{{ value }}</p>
                        </li>
                    </ul>
                    <div class="received-box">
                        <div class="my-reward">
                            <img src="../../assets/images/net-header.png" alt="">
                            <div>
                                <p class="key">
                                    {{$t("net-mining.reward")}}
                                </p>
                                <p class="value">{{ coinCountData.reward }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <template v-if="isSign && isConnectWallet">
                <div class="w">
                    <page-tabs :tabs="tabs" :currentTabId="currentTabId" @on-select="onSelectTab"></page-tabs>
                    <div class="content-list" v-loading="isLoading">
                        <template v-if="(currentTabId === 0) && list.length && !isLoading">
                            <div class="select-wrap">
                                <div class="select-info">
                                    <span class="txt">{{ $t("net-mining.please-click-to-select") }}</span>
                                    <span class="selected-num">
                                        {{ $t("net-mining.selected") }}: {{selectIds.length}}
                                    </span>
                                    <el-checkbox v-model="isSelectAll" @change="doSelectAll">
                                        {{ $t("net-mining.select-all") }}</el-checkbox>
                                </div>
                                <div class="staking" @click="doPledge(1)" :class="{'active': selectIds.length > 0}">
                                    {{ $t("net-mining.stacking-now") }}
                                </div>
                            </div>
                            <div class="select-wrap-h5">
                                {{ $t("net-mining.please-click-to-select") }}
                            </div>
                            <div class="select-info-h5">
                                <div>
                                    <el-checkbox v-model="isSelectAll" @change="doSelectAll">
                                        {{ $t("net-mining.select-all") }}</el-checkbox>
                                    <span class="selected-num">
                                        {{ $t("net-mining.selected") }}: {{selectIds.length}}
                                    </span>
                                </div>
                                <el-button type="primary" @click="doPledge(0)" :disabled="selectIds.length <= 0">
                                    {{ $t("net-mining.stacking-now") }}
                                </el-button>
                            </div>
                        </template>
                        <template v-if="list.length && !isLoading">
                            <div class="list-card">
                                <item-card v-for="(item, index) of list" :key="index" :itemInfo="item"
                                    @select="selectNftCard">
                                    <div class="time-left" v-if="item.left_days">
                                        <div class="label">{{  $t("net-mining.time-left") }}</div>
                                        <div class="value">{{ item.left_days }}</div>
                                    </div>
                                </item-card>
                            </div>

                            <!-- <ul>
                            <li v-for="(item, index) of list" :key="index" @click="doSelect(item.id)"
                                :class="{'select': item.select}">
                                <div class="mark" v-if="item.select">

                                </div>
                                <div class="title">
                                    <div class="left">
                                        #{{item.goods_id}}
                                    </div>
                                    <div class="right">
                                        {{item.rarity}}
                                    </div>
                                </div>
                                <div class="img-box">
                                    <img :src="item.images" alt="">
                                </div>
                                <div class="name">
                                    {{item.name}}
                                </div>
                            </li>
                        </ul> -->
                        </template>
                        <template v-if="!list.length && !isLoading">
                            <el-empty :image="emptyImage" :description="$t('common.no-data')"></el-empty>
                        </template>
                    </div>
                </div>
            </template>
            <template>
                <no-connect-wallet v-if="!isConnectWallet"></no-connect-wallet>
                <no-sign v-if="isConnectWallet && !isSign"></no-sign>
            </template>


        </div>
        <el-dialog :title="$t('net-mining.staking-information')" :visible.sync="dialogVisible" width="480px"
            :close-on-click-modal="false" custom-class="pledge-dialog" :show-close="!comfirmLoading">
            <div class="content" v-loading="dialogLoading">
                <div class="info-item pledge-content">
                    <div class="tit">
                        {{ $t('net-mining.please-confirm-the-staking-content') }}
                    </div>
                    <div class="con">
                        <ul>
                            <li v-for="(value, key) in stakingRarityMap" :key="key">
                                <div class="key" :style="{color: key}">{{ $t(`account.${key}`) }}</div>
                                <div class="val">{{  value.length || 0 }}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-item time-content">
                    <div class="tit">
                        {{ $t('net-mining.staking-time') }}
                    </div>
                    <div class="con">
                        <div v-for="(item, index) of pledgeTimes" :key="index"
                            :class="{'select': item.id === pledgeParams.time}"
                            @click="() => pledgeParams.time = item.id">
                            {{item.title}}
                        </div>
                    </div>
                </div>
                <div class="info-item balance-content">
                    <div class="tit">
                        {{ $t('net-mining.staking-tickets') }}
                    </div>
                    <div class="con">
                        <div class="left">
                            <p><span>{{ needAmazing }}</span>AmazingTeam</p>
                            <p class="balance">{{ $t('net-mining.balance') }}: {{ balanceCount }}</p>
                        </div>
                        <div class="right">
                            <a class="buy"
                                href="https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x44ece1031e5b5e2d9169546cc10ea5c95ba96237"
                                target="_blank">
                                {{ $t('detail.buy') }}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <!-- <el-button type="primary" :loading="comfirmLoading" v-debounce="beforeApprove">
                        {{ $t("common.confirmed")}}
                    </el-button> -->
                    <el-button type="primary" :disabled="balanceCount < needAmazing" :loading="comfirmLoading"
                        v-debounce="beforeApprove">
                        {{ balanceCount &lt; needAmazing ? $t("net-mining.insufficient-balance") : $t("common.confirmed")}}
                    </el-button>
                </div>
            </div>

        </el-dialog>
        <el-drawer title="Pledge Information" :visible.sync="drawer" direction="btt" :show-close="!comfirmLoading">
            <div class="content" v-loading="dialogLoading">
                <div class="info-item pledge-content">
                    <div class="tit">
                        {{ $t('net-mining.please-confirm-the-staking-content') }}
                    </div>
                    <div class="con">
                        <ul>
                            <li v-for="(value, key) in stakingRarityMap" :key="key">
                                <div class="key" :style="{color: key}">{{ $t(`account.${key}`) }}</div>
                                <div class="val">{{  value.length || 0 }}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-item time-content">
                    <div class="tit">
                        {{ $t('net-mining.staking-time') }}
                    </div>
                    <div class="con">
                        <div v-for="(item, index) of pledgeTimes" :key="index"
                            :class="{'select': item.id === pledgeParams.time}"
                            @click="() => pledgeParams.time = item.id">
                            {{item.title}}
                        </div>
                    </div>
                </div>
                <div class="info-item balance-content">
                    <div class="tit">
                        {{ $t('net-mining.staking-tickets') }}
                    </div>
                    <div class="con">
                        <div class="left">
                            <p><span>{{ needAmazing }}</span>AmazingTeam</p>
                            <p class="balance">{{ $t('net-mining.balance') }}: {{ balanceCount }}
                                <a class="buy"
                                    href="https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x44ece1031e5b5e2d9169546cc10ea5c95ba96237"
                                    target="_blank">
                                    {{ $t('detail.buy') }}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <!-- <el-button type="primary" :loading="comfirmLoading" v-debounce="beforeApprove" >
                        {{ $t("common.confirmed")}}
                    </el-button> -->
                    <el-button type="primary" :disabled="balanceCount < needAmazing" :loading="comfirmLoading"
                        v-debounce="beforeApprove">
                        {{ balanceCount &lt; needAmazing ? $t("net-mining.insufficient-balance") : $t("common.confirmed")}}
                    </el-button>
                </div>
            </div>

        </el-drawer>
    </div>
</template>

<script>
    import eventBus from "@/utils/eventBus";
    import myAjax from '@/utils/ajax.js'
    import itemCard from '@/components/item-card'
    import PageTabs from '@/components/page-tabs'
    import emptyImage from '@/assets/images/empty.png'
    import Cookie from "@/utils/cookie.js";
    import Approve from '@/utils/approve.js'
    import web3Tool from '@/utils/web3'
    import NoConnectWallet from '@/components/no-connect-wallet'
    import NoSign from '@/components/no-sign'
    export default {
        name: '',
        components: {
            PageTabs,
            itemCard,
            NoConnectWallet,
            NoSign
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-net-mining',
                emptyImage,
                isLoading: true,
                dialogLoading: true,
                coinCountData: {
                    count: 0
                },
                tabs: [{
                    id: 1,
                    title: this.$t("common.staking"),
                    num: 0
                }, {
                    id: 0,
                    title: this.$t("account.available"),
                    num: 0
                }],
                currentTabId: 1,
                list: [],
                stakingRarityMap: null,
                isSelectAll: false,
                dialogVisible: false,
                drawer: false,
                pledgeTimes: [{
                    id: 1,
                    title: this.$t('net-mining.1-day')
                }, {
                    id: 10,
                    title: this.$t('net-mining.10-days')
                }, {
                    id: 30,
                    title: this.$t('net-mining.30-days')
                }],
                pledgeParams: {
                    time: 1
                },
                balanceCount: 0,
                page: {
                    pageSize: 200000,
                    curPage: 1
                },
                comfirmLoading: false,
                isSign: false,
                isConnectWallet: false
            }
        },
        computed: {
            placeholderTxt() {
                return this.$t("account.search-id-name")
            },
            selectIds() {
                return this.list.filter(x => x.select)
            },
            needAmazing() {
                return this.selectIds.length * this.pledgeParams.time * 0.08
            }

        },
        watch: {},
        created() {

        },
        mounted() {
            this.initSignConnectData()
            eventBus.$on('sign-fail', this.initSignConnectData)
            if (this.isSign && this.isConnectWallet) {
                Promise.all([this.getCoinCount(), this.getList()]).finally(() => {
                    this.isLoading = false
                })
            } else {
                this.isLoading = false
            }


        },
        beforeDestroy() {},
        methods: {
            getPledgeContent() {
                const obj = {}
                this.selectIds.map(x => {
                    obj[x.rarity] = [...(obj[x.rarity] || ''), x.goods_id]
                })
                this.stakingRarityMap = obj
            },
            initSignConnectData() {
                this.isSign = Cookie.getCookie('ad_token') || null
                this.isConnectWallet = Cookie.getCookie('__account__') || null
            },
            getCoinCount() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/stake/coin'
                    }).then(res => {
                        this.coinCountData = res.data || {}
                        let keys = Object.keys(this.coinCountData.items)
                        if (!keys.length) {
                            this.coinCountData.items = {
                                'blue': 0,
                                'red': 0,
                                'orange': 0,
                                'yellow': 0
                            }
                        }
                        this.tabs[0].num = this.coinCountData.count || 0
                        this.tabs[1].num = this.coinCountData.not_pledged || 0
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            getList() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/goods/list',
                        data: {
                            body: {
                                page: this.page.curPage,
                                per_page: this.page.pageSize,
                                status: [this.currentTabId],
                                addr: this.isConnectWallet,
                                belong_type: this.currentTabId === 1 ? undefined : 1
                            }
                        }
                    }).then(res => {
                        if (res.ok) {
                            const items = (res.data || {}).items || []
                            if (this.currentTabId === 0) {
                                 this.list = items.filter(x => x.can_pawn)
                            }
                            this.list = this.list.map(x => ({
                                ...x,
                                goods_level: '',
                                select: false
                            }))
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            stakingConfirm(hash) {
                myAjax({
                    url: 'user/goods/pledged',
                    data: {
                        body: {
                            goods_ids: Object.values(this.stakingRarityMap).flat(),
                            days: this.pledgeParams.time,
                            approve_txn: hash
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$showOk(this.$t("common.ope-suc"))
                        Promise.all([this.getCoinCount(), this.getList()]).then(() => {
                            this.dialogVisible = this.drawer = false
                        })
                    }
                }).finally(() => {
                    this.comfirmLoading = false
                })
            },
            selectNftCard({
                goods_id
            }) {
                if (this.currentTabId === 1) return
                const item = this.list.find(x => x.goods_id === goods_id)
                item.select = !item.select
                if (this.list.length === this.selectIds.length) {
                    this.isSelectAll = true
                } else {
                    this.isSelectAll = false
                }
            },
            doPledge(flag) {
                if (!this.selectIds.length) return
                if (flag) {
                    this.dialogVisible = true
                } else {
                    this.drawer = true
                }
                this.dialogLoading = true
                Promise.all([this.getUserTeamTokenBalance(), Approve.getChainInfo(0), ])
                    .then(data => {
                        const [p1, contract_addr_abi] = data
                        this.contract_addr = contract_addr_abi.contract_addr
                        this.abi = contract_addr_abi.abi
                        this.dialogLoading = false
                    })
                this.getPledgeContent()
            },
            getUserTeamTokenBalance() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/balance_query',
                        data: {
                            body: {
                                type: "amazing_team_token"
                            }
                        }

                    }).then(res => {
                        if (res.ok) {
                            this.balanceCount = (res.data || {}).balance || 0;
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            doPledgeH5() {
                this.drawer = true
            },
            async beforeApprove() {
                const token_approve_addr = await Approve.getApproveAddress('token')
                this.token_approve_addr = token_approve_addr
                this.doApprove()
            },
            doApprove() {
                this.comfirmLoading = true
                web3Tool.contract({
                    contractAddress: this.contract_addr || '',
                    abi: this.abi,
                    authAddr: this.token_approve_addr,
                    amount: '50000000000000000000',
                    account: Cookie.getCookie("__account__") || null,
                }).then(hash => {
                    this.stakingConfirm(hash)
                }).catch(err => {
                    this.comfirmLoading = false
                })
            },
            doSelectAll(flag) {
                this.list = this.list.map(x => ({
                    ...x,
                    select: flag
                }))
            },
            doSelect(id) {
                const item = this.list.find(x => x.id === id)
                item.select = !item.select
                if (this.list.length === this.selectIds.length) {
                    this.isSelectAll = true
                } else {
                    this.isSelectAll = false
                }
            },
            onSelectTab(item) {
                if (this.isLoading) return
                this.isLoading = true
                this.currentTabId = item.id
                this.getList().then(() => {
                    this.isLoading = false
                })
            },
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
        .el-drawer {
            height: 60% !important;
            background: #000;
            overflow-y: scroll;

            #el-drawer__title {
                padding: .4rem;
                margin-bottom: .16rem;
                color: #fff;
                font-size: .533333333333333rem;
            }

            .content {
                padding: 0 .8rem;
            }

            .info-item {
                .tit {
                    height: .853333333333333rem;
                    line-height: .853333333333333rem;
                    color: #777E90;
                    font-size: .426666666666667rem;

                }

                .con {
                    margin: 10px 0;
                }
            }

            .pledge-content {
                .con {
                    border: 1px solid #29374B;
                    border-radius: .266666666666667rem;

                    ul {
                        li {
                            display: flex;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            border-bottom: 1px solid #29374B;
                            font-size: .48rem;

                            .val {
                                flex: 1;
                                color: #fff;
                                border-left: 1px solid #29374B;
                            }

                            .key {
                                width: 2.666666666666667rem;
                            }

                            &:last-child {
                                border: 0;
                            }
                        }
                    }
                }
            }

            .time-content {
                .con {
                    display: flex;
                    justify-content: space-between;

                    div {
                        width: 2.666666666666667rem;
                        height: 1.066666666666667rem;
                        line-height: 1.066666666666667rem;
                        text-align: center;
                        border-radius: .266666666666667rem;
                        border: 1px solid #29374B;
                        color: #fff;
                        cursor: pointer;
                        font-size: .48rem;

                        &.select {
                            background: #32A3FF;
                        }
                    }
                }
            }

            .balance-content {

                .left {
                    color: #fff;
                    font-size: .64rem;

                    span {
                        margin-right: .16rem;
                    }

                    .balance {
                        margin-top: .16rem;
                        font-size: .373333333333333rem;
                        color: #777E90;
                    }
                }

                .buy {
                    display: inline-block;
                    margin-left: .266666666666667rem;
                    color: #45B26B;
                }
            }

            .btn-wrap {
                padding-bottom: .72rem;
                margin-top: .586666666666667rem;

                .el-button {
                    width: 100%;
                }
            }
        }

        .pledge-dialog {

            .info-item {
                .tit {
                    height: 32px;
                    line-height: 32px;
                    color: #777E90;
                    font-size: 20px;

                }

                .con {
                    margin: 10px 0;
                }
            }

            .pledge-content {
                .con {
                    border: 1px solid #29374B;
                    border-radius: 5px;

                    ul {
                        li {
                            display: flex;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            border-bottom: 1px solid #29374B;

                            .val {
                                flex: 1;
                                color: #fff;
                                border-left: 1px solid #29374B;
                            }

                            .key {
                                width: 120px;
                            }

                            &:last-child {
                                border: 0;
                            }
                        }
                    }
                }
            }

            .time-content {
                .con {
                    display: flex;
                    justify-content: space-between;

                    div {
                        width: 130px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border-radius: 5px;
                        border: 1px solid #29374B;
                        color: #fff;
                        cursor: pointer;

                        &.select {
                            background: #32A3FF;
                        }
                    }
                }
            }

            .balance-content {
                .con {
                    display: flex;
                    justify-content: space-between;
                }

                .left {
                    color: #fff;
                    font-size: 24px;

                    .balance {
                        margin-top: 5px;
                        font-size: 16px;
                        color: #777E90;
                    }
                }

                .buy {
                    display: inline-block;
                    width: 130px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: #45B26B;
                    color: #fff;
                    border-radius: 10px;
                    cursor: pointer;
                }
            }

            .btn-wrap {
                margin-top: 43px;

                .el-button {
                    width: 100%;
                    font-size: .32rem;
                    border-radius: .133333333333333rem;
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
            padding: 60px 0 57px;
            background: #0B0F15;

            .w {
                display: flex;
                justify-content: space-between;

                .left {
                    color: #fff;
                    font-size: .64rem;
                    font-weight: 600;

                    img {
                        display: none;
                    }
                }

                .right {
                    display: flex;
                    align-items: center;
                    padding: 18px 20px;
                    border: 1px solid #29374B;
                    border-radius: 12px 12px 12px 12px;

                    .net-n {
                        margin-right: 60px;

                        p:first-child {
                            color: #777E90;
                            font-size: 14px;
                        }

                        p:last-child {
                            color: #fff;
                            font-size: 20px;
                        }
                    }

                    ul {
                        li {
                            position: relative;
                            float: left;
                            padding: 0 30px;
                            text-align: center;

                            &::after {
                                content: "";
                                width: 1px;
                                height: 18px;
                                position: absolute;
                                right: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                background: #29374B;
                            }

                            &:last-child::after {
                                display: none;
                            }

                            .color {
                                font-size: 14px;
                                margin-bottom: 5px;
                            }

                            .num {
                                color: #fff;
                                font-size: 20px;
                            }
                        }
                    }

                    .received-box {
                        display: flex;
                        align-items: center;
                        margin-left: .4rem;
                        padding-left: .5rem;
                        border-left: 1px solid #29374B;

                        .my-reward {
                            display: flex;
                            align-items: center;
                            margin-right: .533333333333333rem;

                            img {
                                margin-right: .16rem;
                                width: 50px;
                                height: 50px;
                            }

                            .value {
                                color: #BF8368;
                                font-size: 20px;
                                text-align: left;
                            }

                            .key {
                                color: #777E90;
                                font-size: 14px;
                            }
                        }

                        .opt {
                            .el-button {
                                padding: .16rem .3rem;
                                border: 0;
                                background: #AC6F51;
                            }
                        }
                    }
                }
            }


        }

        .main {
            background: #14181f;
            padding: .506666666666667rem 0 1.946666666666667rem;

            .content-list {
                min-height: 6rem;
                overflow: hidden;

                .list-card {
                    padding: .266666666666667rem 0;
                }

                .components-item-card {
                    float: left;
                    margin-right: .52rem;
                    width: 3.6rem;

                    &:nth-child(4n) {
                        margin-right: 0;
                    }

                    .time-left {
                        display: flex;
                        justify-content: space-between;
                        font-size: .266666666666667rem;

                        .label {
                            color: #C4C4C4;
                        }

                        .value {
                            color: #fff;
                        }
                    }
                }

                .select-wrap {
                    display: flex;
                    justify-content: space-between;
                    margin-top: .266666666666667rem;

                    .select-info {
                        padding: 0 24px;
                        height: 60px;
                        line-height: 60px;
                        background: #29374B;
                        border-radius: 10px;
                        font-size: 20px;
                        flex: 1;

                        .txt {
                            margin-right: 100px;
                            color: #FD671D;

                        }

                        .selected-num {
                            margin-right: 80px;
                            color: #fff;
                        }
                    }

                    .staking {
                        margin-left: 20px;
                        width: 265px;
                        height: 60px;
                        line-height: 60px;
                        text-align: center;
                        background: #777E90;
                        color: #fff;
                        border-radius: 10px;
                        cursor: not-allowed;

                        &.active {
                            background: #32A3FF;
                            cursor: pointer;
                        }
                    }
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    width: auto;
                    margin: 0 -0.133333333333333rem;
                }

            }

            .select-info-h5,
            .select-wrap-h5 {
                display: none;
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .top {
                padding: .533333333333333rem .5rem 0;
                background: #14181f;
                font-size: .64rem;
                text-align: center;

                .w {
                    flex-direction: column;

                    .left {
                        img {
                            display: inline-block;
                            width: .8rem;
                            height: .8rem;
                            vertical-align: sub;
                        }
                    }

                    .right {
                        position: relative;
                        flex-direction: column;
                        margin: .266666666666667rem 0 0 0;
                        padding: .266666666666667rem 0;

                        .net-n {
                            position: absolute;
                            top: .55rem;
                            left: .5rem;

                            p:first-child {
                                font-size: .32rem;
                            }

                            p:last-child {
                                font-size: .426666666666667rem;
                            }
                        }

                        ul {
                            width: 100%;
                            display: flex;
                            margin-top: 1.8rem;


                            li {
                                flex: 1;
                                padding: .17rem 0 0 0;
                                border-top: 1px solid #29374B;
                            }
                        }

                        .received-box {
                            position: absolute;
                            right: .5rem;
                            top: .5rem;

                            .my-reward {
                                img {
                                    width: 40px;
                                    height: 40px;
                                }
                            }


                            .opt {}
                        }

                    }
                }


            }

            .main {

                padding: .5rem;

                .w {
                    .list-card {
                        .components-item-card {
                            margin-right: 0.26rem;
                            width: 48.5%;

                            &:nth-child(3n) {
                                margin-right: .26rem;
                            }

                            &:nth-child(2n) {
                                margin-right: 0 !important;
                            }
                        }

                    }
                }

                .select-wrap-h5 {
                    display: block !important;
                    margin-top: .26rem;
                    height: .853333333333333rem;
                    line-height: .853333333333333rem;
                    text-align: center;
                    color: #FD671D;
                    font-size: .373333333333333rem;
                }

                .select-info-h5 {
                    display: block;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    padding: .693333333333333rem .533333333333333rem 0;
                    width: 100%;
                    height: 3.733333333333333rem;
                    z-index: 99;
                    background: linear-gradient(360deg, #131922 0%, rgba(19, 25, 34, 0) 100%);

                    >div {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: .16rem;
                        color: #fff;
                        font-size: .426666666666667rem;
                    }

                    .el-button {
                        width: 100%;
                        height: 1.493333333333333rem;
                        line-height: 1.493333333333333rem;
                        padding: 0;
                        text-align: center;
                        font-size: .48rem;
                        border: 0;

                    }
                }

                .select-wrap {
                    display: none !important;
                }
            }
        }
    }
</style>