<template>
    <div :class="prefixCls">
        <div class="top">
            <div class="w">
                <div class="left">
                    <img src="../../assets/images/net-mining.png" alt="">
                    {{$t("common.net-mining")}}
                </div>
                <div class="right">
                    <div class="net-n">
                        <p>{{$t("common.pledged")}}</p>
                        <p style="margin-top:3px">12 NFTs</p>
                    </div>
                    <ul>
                        <li>
                            <p class="color blue">{{$t("account.blue")}}</p>
                            <p class="num">1</p>
                        </li>
                        <li>
                            <p class="color red">{{$t("account.red")}}</p>
                            <p class="num">1</p>
                        </li>
                        <li>
                            <p class="color orange">{{$t("account.orange")}}</p>
                            <p class="num">1</p>
                        </li>
                        <li>
                            <p class="color yellow">{{$t("account.yellow")}}</p>
                            <p class="num">1</p>
                        </li>
                    </ul>
                    <div class="received-box">
                        <div class="my-reward">
                            <img src="../../assets/images/net-header.png" alt="">
                            <div>
                                <p class="key">
                                    {{$t("net-mining.reward")}}
                                </p>
                                <p class="value">100</p>
                            </div>
                        </div>
                        <div class="opt">
                            <el-button type="primary">{{$t("blind-box.receive")}}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="w">
                <page-tabs :tabs="tabs" :currentTab="currentTab" @on-select="onSelectTab"></page-tabs>
                <div class="content-list">
                    <template v-if="currentTab === 'Not Pledged' && list.length">
                        <div class="select-wrap">
                            <div class="select-info">
                                <span class="txt">Please click on the NFT card to select</span>
                                <span class="selected-num">
                                    Selected: {{selectIds.length}}
                                </span>
                                <el-checkbox v-model="isSelectAll" @change="doSelectAll">Select All</el-checkbox>
                            </div>
                            <div class="pledge" @click="doPledge">Pledge Now</div>
                        </div>
                        <div class="select-wrap-h5">
                            Please click on the NFT card to select
                        </div>
                        <div class="select-info-h5">
                            <div>
                                <el-checkbox v-model="isSelectAll" @change="doSelectAll">Select All</el-checkbox>
                                <span class="selected-num">
                                    Selected: {{selectIds.length}}
                                </span>
                            </div>
                            <el-button type="primary" @click="doPledgeH5">Pledge Now</el-button>
                        </div>
                    </template>
                    <template v-if="list.length && !isLoading">
                        <ul>
                            <li v-for="(item, index) of list" :key="index" @click="doSelect(item.id)"
                                :class="{'select': item.select}">
                                <div class="mark" v-if="item.select">

                                </div>
                                <div class="title">
                                    <div class="left">
                                        #{{item.idx}}
                                    </div>
                                    <div class="right">
                                        {{item.classes}}
                                    </div>
                                </div>
                                <div class="img-box">
                                    <img :src="item.images" alt="">
                                </div>
                                <div class="name">
                                    {{item.name}}
                                </div>
                            </li>
                        </ul>
                    </template>
                    <template v-if="!list.length && !isLoading">
                        <el-empty :image="emptyImage" description="No unstaking NFTs"></el-empty>
                    </template>
                </div>
            </div>


        </div>
        <el-dialog title="Pledge Information" :visible.sync="dialogVisible" width="480px" custom-class="pledge-dialog">
            <div class="info-item pledge-content">
                <div class="tit">
                    Please confirm the pledge content
                </div>
                <div class="con">
                    <ul>
                        <li>
                            <div class="key blue">Blue</div>
                            <div class="val">1</div>
                        </li>
                        <li>
                            <div class="key red">Red</div>
                            <div class="val">1</div>
                        </li>
                        <li>
                            <div class="key orange">Orange</div>
                            <div class="val">1</div>
                        </li>
                        <li>
                            <div class="key yellow">Yellow</div>
                            <div class="val">1</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="info-item time-content">
                <div class="tit">
                    Pledge time
                </div>
                <div class="con">
                    <div v-for="(item, index) of pledgeTimes" :key="index"
                        :class="{'select': item.id === pledgeParams.time}" @click="() => pledgeParams.time = item.id">
                        {{item.title}}
                    </div>
                </div>
            </div>
            <div class="info-item balance-content">
                <div class="tit">
                    Pledge tickets
                </div>
                <div class="con">
                    <div class="left">
                        <p><span>0.8</span>AmazingTeam</p>
                        <p class="balance">Balance: 100</p>
                    </div>
                    <div class="right">
                        <div class="buy">
                            Buy
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <el-button type="primary">Confirm</el-button>
                <!-- <el-button type="info" disabled>Insufficient Balance</el-button> -->
            </div>
        </el-dialog>
        <el-drawer title="Pledge Information" :visible.sync="drawer" direction="btt">
            <div class="content">
                <div class="info-item pledge-content">
                    <div class="tit">
                        Please confirm the pledge content
                    </div>
                    <div class="con">
                        <ul>
                            <li>
                                <div class="key blue">Blue</div>
                                <div class="val">1</div>
                            </li>
                            <li>
                                <div class="key red">Red</div>
                                <div class="val">1</div>
                            </li>
                            <li>
                                <div class="key orange">Orange</div>
                                <div class="val">1</div>
                            </li>
                            <li>
                                <div class="key yellow">Yellow</div>
                                <div class="val">1</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-item time-content">
                    <div class="tit">
                        Pledge time
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
                        Pledge tickets
                    </div>
                    <div class="con">
                        <div class="left">
                            <p><span>0.8</span>AmazingTeam</p>
                            <p class="balance">Balance: 100
                                <a href="javascript:;" class="buy">buy</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <!-- <el-button type="primary">Confirm</el-button> -->
                    <el-button type="info" disabled>Insufficient Balance</el-button>
                </div>
            </div>

        </el-drawer>
    </div>
</template>

<script>
    //import itemCard from '@/components/item-card'
    import PageTabs from '@/components/page-tabs'
    import emptyImage from '@/assets/images/empty.png'
    export default {
        name: '',
        components: {
            PageTabs
            //itemCard
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-net-mining',
                emptyImage,
                tabs: [{
                    title: this.$t("common.ypledged"),
                    num: 8
                }, {
                    title: this.$t("common.not-pledged"),
                    num: 0
                }],
                currentTab: 'Pledged',
                list: [{
                    id: 0,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im4.png',
                    classes: '',
                    name: 'MANCITY CLUB',
                    select: false,
                }, {
                    id: 2,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im1.png',
                    classes: '',
                    name: 'SU BINGTIAN',
                    select: false,
                }, {
                    id: 3,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im2.png',
                    classes: '',
                    name: 'KOBE BEAN BRYANT',
                    select: false,
                }, {
                    id: 4,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im6.png',
                    classes: '',
                    name: 'EILEEN GU',
                    select: false,
                }, {
                    id: 5,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im5.png',
                    classes: '',
                    name: 'KOBE BEAN BRYANT',
                    select: false,
                }, {
                    id: 6,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im1.png',
                    classes: '',
                    name: 'KOBE BEAN BRYANT',
                    select: false,
                }, {
                    id: 7,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im2.png',
                    classes: 'Red',
                    name: 'KOBE BEAN BRYANT',
                    select: false,
                }, {
                    id: 8,
                    idx: '00001',
                    images: 'https://adoge-api-test.ctstatus.com/nftimgs/im3.png',
                    classes: '',
                    name: 'EILEEN GU',
                    select: false,
                }],
                isSelectAll: false,
                isLoading: false,
                dialogVisible: false,
                drawer: false,
                pledgeTimes: [{
                    id: 1,
                    title: '1 day'
                }, {
                    id: 2,
                    title: '10 day'
                }, {
                    id: 3,
                    title: '30 day'
                }],
                pledgeParams: {
                    time: 1
                },
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
            }
        },
        computed: {
            placeholderTxt() {
                return this.$t("account.search-id-name")
            },
            selectIds() {
                return this.list.filter(x => x.select)
            },

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
            doPledge() {
                this.dialogVisible = true
            },
            doPledgeH5() {
                this.drawer = true
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
                this.currentTab = item.title
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
                    margin-left: 71px;
                    border: 1px solid #29374B;
                    border-radius: 12px 12px 12px 12px;

                    .net-n {
                        margin-right: 20px;

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
                            padding: 0 20px;
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
                        padding-left: .266666666666667rem;
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
                overflow: hidden;

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

                    .pledge {
                        margin-left: 20px;
                        width: 265px;
                        height: 60px;
                        line-height: 60px;
                        text-align: center;
                        background: #777E90;
                        color: #fff;
                        border-radius: 10px;
                        cursor: pointer;
                    }
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    width: auto;
                    margin: 0 -0.133333333333333rem;
                }

                li {
                    position: relative;
                    width: 3.533333333333333rem;
                    flex-shrink: 0;
                    margin: .266666666666667rem .133333333333333rem 0;
                    padding: .266666666666667rem .16rem;
                    background: #1D2633;
                    border-radius: .133333333333333rem;
                    border: 1px solid #32A3FF;
                    cursor: pointer;

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

                    &.select {
                        border: 0;
                    }

                    .title {
                        display: flex;
                        justify-content: space-between;
                        font-size: .186666666666667rem;

                        .left {

                            color: #C4C4C4;
                        }

                        .right {
                            color: #fff;
                        }
                    }

                    .img-box {
                        width: 100%;
                        text-align: center;

                        img {
                            margin: .16rem 0;
                            width: 100%;
                            height: auto;
                            border-radius: .16rem;
                        }

                    }

                    .name {
                        text-align: center;
                        color: #fff;
                        font-size: .213333333333333rem;
                    }
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
                            display: flex;
                            margin-top: 2rem;
                            padding-top: .16rem;
                            border-top: 1px solid #29374B;
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
                    .content-list {
                        li {

                            border: 1px solid #29374B;
                            width: 4rem;
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

                    }
                }

                .select-wrap {
                    display: none !important;
                }
            }
        }
    }
</style>