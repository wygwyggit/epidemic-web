<template>
    <div :class="prefixCls" v-loading.fullscreen="isLoading">
        <el-drawer :visible.sync="isShowDetailsDrawer" direction="ttb" size="100%" :show-close="false"
            :custom-class="prefixCls + '-drawer'">
            <div slot="title">

            </div>
            <div class="detail-con" v-if="!isLoading">
                <div class="detail-main w">
                    <div class="back" @click="handlerClose">
                        {{ $t("common.back") }}
                    </div>
                    <div class="min-back" @click="handlerClose">
                        <img src="../../assets/images/back2.png" />
                        <span class="con" v-if="rowInfo.goods_id"># {{ rowInfo.goods_id }}</span>
                    </div>
                    <div class="blind-box">
                        <div class="left">
                            <img :src="netImgBaseUrl + rowInfo.image" v-if="rowInfo.image" />
                        </div>
                        <div class="right">
                            <div class="anchor" v-if="rowInfo.goods_id"># {{ rowInfo.goods_id }}</div>
                            <div class="title">{{ rowInfo.name }}</div>
                            <div class="tip">{{ rowInfo.goods_desc }}</div>
                            <div class="attribute-wrap border" v-if="rowInfo.belong_type > 0">
                                <div class="attr-title top">
                                    <img src="../../assets/images/bookmark.png" />
                                    {{ $t("detail.attribute") }}
                                </div>
                                <div class="attr-name">
                                    <div class="item">
                                        <label class="label"> {{ $t("detail.color") }}:</label>
                                        <span class="con" :style="{color: rowInfo.rarity}">
                                            {{ rowInfo.rarity ? $t(`account.${rowInfo.rarity}`) : '-'}}</span>
                                    </div>
                                    <div class="item">

                                        <label class="label">{{ $t("account.level") }}:</label>
                                        <span class="con">Lv{{ rowInfo.goods_level }}</span>

                                    </div>

                                </div>
                                <div class="attr-name" v-if="rowInfo.goods_attr">
                                    <div class="item" v-for="(value, key, index) in rowInfo.goods_attr" :key="index">

                                        <label class="label">{{ $t(`marketplace.${key}`) }}:</label>
                                        <span class="con" v-if="key === 'physical'">{{ value }}</span>
                                        <template v-if="key === 'energy'">
                                            <span class="star" v-for="item in Number(value)" :key="item"></span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="quantity" v-else>
                                <span class="label">{{ $t("marketplace.quantity") }}:</span>
                                {{ rowInfo.num }}
                            </div>
                            <template v-if="rowInfo.status == 0 && isConnectAndSignin">
                                <div class="opts-wrap border">
                                    <div class="opts-title top">
                                        <img src="../../assets/images/price_tag.png" />
                                        {{ $t("account.sale") }}
                                    </div>
                                    <div class="card-opt">
                                        <div class="btns">
                                            <el-button type="primary" class="btn-sale" :disabled="!rowInfo.can_sale"
                                                @click="() => this.saleReviseDialog = true"> {{ $t("account.sale") }}
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-opt" v-if="rowInfo.belong_type == 1">
                                    <div class="btns">
                                        <el-button type="primary" class="btn-deliver" :disabled="!rowInfo.can_pawn"
                                            @click="() => this.isShowDeliverDialog = true">
                                            {{ $t("common.deliver") }}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="card-opt" v-if="rowInfo.belong_type == -1">
                                    <div class="btns">
                                        <el-button type="primary" class="btn-open" :disabled="!rowInfo.can_open"
                                            @click="() => this.isShowOpenGift = true">
                                            {{$t("account.open")}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="card-opt" v-if="rowInfo.type_id == 2">
                                    <div class="btns">
                                        <el-button type="primary" class="btn-synthetic" :disabled="!rowInfo.can_merge"
                                            @click="() => this.isShowCompound = true">
                                            {{$t("account.synthetic")}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="card-opt" v-if="rowInfo.type_id == 3">
                                    <div class="btns">
                                        <el-button type="primary" class="btn-synthetic" :disabled="!rowInfo.can_merge"
                                            @click="() => this.isShowCompound = true">
                                            {{$t("account.synthetic")}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="card-opt" v-if="rowInfo.belong_type == -2">
                                    <div class="btns">
                                        <el-button type="primary" class="btn-synthetic" :disabled="!rowInfo.can_merge"
                                            @click="() => this.isShowCompound = true">
                                            {{$t("exchange.exchange")}}
                                        </el-button>
                                    </div>
                                </div>

                            </template>
                            <template v-if="rowInfo.status == 8">
                                <div class="opts-wrap border">
                                    <div class="opts-title top">
                                        <img src="../../assets/images/price_tag.png" />
                                        {{ rowInfo.belong_type  &lt; 0 ? $t("marketplace.unit-price") : $t("account.price") }}
                                    </div>
                                    <div class="card-opt">
                                        <div class="price">
                                            {{ (rowInfo.unit_amount || rowInfo.amount) | formatPriceData }} Adoge
                                            <div class="price-bnb">≈ {{ rowInfo.unit_bnb }} BNB</div>
                                        </div>
                                        <div class="bnb">≈ {{ rowInfo.unit_bnb }} BNB</div>
                                        <!-- 状态区分 -->

                                        <div class="btns" v-if="isConnectAndSignin">
                                            <el-button class="btn-buy" v-if="from === 'marketplace' && !isOwnerProduct"
                                                @click="doBuy">
                                                {{ $t("detail.buy") }}</el-button>
                                            <template
                                                v-if="from === 'account' || (from === 'marketplace' && isOwnerProduct)">
                                                <el-button class="btn-revise"
                                                    @click="() => this.saleReviseDialog = true">
                                                    {{ $t("detail.revise") }}</el-button>
                                                <el-button class="btn-cancel-sale" @click="doCancelSale">
                                                    {{ $t("detail.cancelSale") }}
                                                </el-button>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="[1, 2, -2, 4, 9, -1].includes(rowInfo.status) && isConnectAndSignin">
                                <div class="card-opt">
                                    <div class="btns">
                                        <el-button class="btn-on-processing" disabled v-if="rowInfo.status == 2">
                                            {{ $t("account.processing")}}</el-button>
                                        <el-button class="btn-on-staking" disabled v-if="rowInfo.status == 1">
                                            {{ $t("account.staking")}}</el-button>
                                        <el-button class="btn-on-sending" disabled
                                            v-if="rowInfo.status == -2 || rowInfo.status == 4 || rowInfo.status == 9 || rowInfo.status == -1">
                                            {{ $t("account.sending")}}</el-button>
                                    </div>
                                </div>
                            </template>
                            <div class="owner">
                                <label class="label">{{ $t("detail.owner") }}:</label> {{ rowInfo.owner_addr }}
                            </div>
                        </div>
                    </div>
                    <div class="sale-history-pc border">
                        <div class="sale-title top">
                            <img src="../../assets/images/clock.png" />
                            {{ $t("detail.sale-history") }}
                        </div>
                        <div class="list-content">
                            <el-empty :image="emptyImage" :description="$t('common.no-data')"
                                v-if="!(rowInfo.order_history || []).length && !isLoading">
                            </el-empty>
                            <el-table :data="rowInfo.order_history" style="width: 100%" :highlight-current-row="false"
                                v-if="(rowInfo.order_history || []).length && !isLoading">
                                <el-table-column>
                                    <template slot="header">
                                        {{ $t("detail.buyer") }}
                                    </template>
                                    <template slot-scope="scope">
                                        <a href="javascript:;">{{ scope.row.payer_addr }}</a>
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot="header">
                                        {{ $t("detail.seller") }}
                                    </template>
                                    <template slot-scope="scope">
                                        <a href="javascript:;">{{ scope.row.seller_addr }}</a>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Price">
                                    <template slot="header">
                                        {{ $t("account.price") }}
                                    </template>
                                    <template slot-scope="scope">
                                        <div class="group">
                                            <img src="../../assets/images/info.png" alt="" />
                                            {{ scope.row.price }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="order_time">
                                    <template slot="header"> {{ $t("detail.date") }} UTC </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot="header">
                                        {{ $t("detail.txn-hash") }}
                                    </template>
                                    <template slot-scope="scope">
                                        <a href="javascript:;">{{ scope.row.transfer_txn }}</a>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                    </div>
                    <div class="sale-history-h5">
                        <div class="tit">
                            <img src="../../assets/images/clock.png" />
                            {{ $t("detail.sale-history") }}
                        </div>
                        <div class="list-content">
                            <el-empty :image="emptyImage" :description="$t('common.no-data')"
                                v-if="!(rowInfo.order_history || []).length && !isLoading">
                            </el-empty>
                            <table v-if="(rowInfo.order_history || []).length && !isLoading">
                                <thead>
                                    <tr>
                                        <th>{{ $t("detail.buyer") }}</th>
                                        <th>{{ $t("detail.seller") }}</th>
                                        <th>{{ $t("account.price") }}</th>
                                        <th>{{ $t("detail.date") }} UTC</th>
                                        <th>{{ $t("detail.txn-hash")}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) of rowInfo.order_history" :key="index">
                                        <td>{{item.payer_addr}}</td>
                                        <td>{{item.seller_addr}}</td>
                                        <td>
                                            <img src="../../assets/images/info.png">
                                            {{item.price}}</td>
                                        <td>{{item.order_time}}</td>
                                        <td>{{item.transfer_txn}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </el-drawer>
        <gift-bag v-if="isShowGiftBag" :rowList="giftBagList" @close="doGiftClose"></gift-bag>
        <sale :row="rowInfo" v-if="saleReviseDialog" @close="() => this.saleReviseDialog = false"
            @sendSaleOk="sendSaleOk"></sale>
        <deliver-dialog v-if="isShowDeliverDialog" :goods_id="rowInfo.goods_id" :goods_name="rowInfo.name"
            :addr="rowInfo.owner_addr" :belong_type="rowInfo.belong_type" @sendOk="deliverSuccess"
            @close="() => this.isShowDeliverDialog = false"></deliver-dialog>
        <open :row="rowInfo" v-if="isShowOpenGift" @close="() => this.isShowOpenGift = false" @openGiftOk="openGiftOk">
        </open>
        <compound v-if="isShowCompound" :row="rowInfo" @close="() => this.isShowCompound = false"
            @compoundSuc="compoundSuc"></compound>
        <buy :row="rowInfo" v-if="buyReviseDialog" @close="() => this.buyReviseDialog = false" @sendBuyOk="sendBuyOk">
        </buy>
    </div>
</template>

<script>
    import Cookie from "@/utils/cookie.js";
    import myAjax from '@/utils/ajax.js'
    import Sale from '../account/components/sale'
    import DeliverDialog from '@/components/deliver-dialog'
    import GiftBag from '../account/components/gift-bag'
    import Open from '../account/components/open'
    import Compound from '../account/components/compound'
    import emptyImage from '@/assets/images/empty.png'
    import Buy from '../market-place/components/buy.vue'
    import {
        netImgBaseUrl
    } from '@/config/config.js'
    export default {
        components: {
            Sale,
            DeliverDialog,
            GiftBag,
            Open,
            Compound,
            Buy
        },
        props: {
            row: {
                type: Object,
                require: true
            },
            from: {
                type: String,
                default: 'account'
            }
        },
        computed: {
            isConnectAndSignin() {
                const addr = Cookie.getCookie('__account__'),
                    token = Cookie.getCookie('ad_token')
                if (addr && token) {
                    return true
                }
                return false
            },
            isOwnerProduct() {
                const addr = Cookie.getCookie('__account__')
                if (this.rowInfo.owner_addr === addr) {
                    return true
                }
                return false
            }
        },
        data() {
            return {
                rowInfo: {},
                prefixCls: 'details-wrap',
                isLoading: true,
                isShowDetailsDrawer: true,
                saleReviseDialog: false,
                isShowDeliverDialog: false,
                isShowOpenGift: false,
                isShowGiftBag: false,
                isShowCompound: false,
                buyReviseDialog: false,
                netImgBaseUrl,
                emptyImage,
                isUpdate: false,
                giftBagList: []
            };
        },
        mounted() {
            Promise.all([this.getDetailInfo()]).then(() => {

            })
        },
        methods: {
            doBuy() {
                this.buyReviseDialog = true
            },
            sendBuyOk() {
                this.isUpdate = true
                this.buyReviseDialog = false
                this.getDetailInfo()
            },
            compoundSuc() {
                this.isUpdate = true
                this.isShowCompound = false
                this.getDetailInfo()
            },
            doGiftClose() {
                this.isShowGiftBag = false
                this.isUpdate = true
                this.getDetailInfo()
            },
            openGiftOk(data) {
                this.isShowOpenGift = false
                this.isShowGiftBag = true
                this.giftBagList = data
            },
            deliverSuccess() {

            },
            doCancelSale() {
                this.$confirm(`${this.$t("common.cancel-sale-tip")}?`, this.$t("common.remind"), {
                    confirmButtonText: this.$t("common.yes"),
                    showCancelButton: false,
                    closeOnClickModal: false,
                    width: '6.4rem'
                }).then(async () => {
                    const idName = this.rowInfo.belong_type < 0 ? 'type_id' : 'goods_id'
                    myAjax({
                        url: this.rowInfo.belong_type < 0 ? 'goods/sale/others/cancel' :
                            'goods/sale/nft/cancel',
                        data: {
                            body: {
                                [idName]: this.rowInfo[idName],
                                record_id: this.rowInfo.record_id || ''
                            }
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.$showOk(this.$t("common.ope-suc"))
                            this.getDetailInfo()
                        }
                    })
                })
            },
            sendSaleOk() {
                this.getDetailInfo()
                this.saleReviseDialog = false
            },
            getDetailInfo() {
                this.isLoading = true
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'goods/detail',
                        data: {
                            body: {
                                goods_id: Number(this.row.goods_id),
                                type_id: Number(this.row.type_id),
                                status: Number(this.row.status),
                                owner_addr: this.row.owner_addr,
                                record_id: Number(this.row.record_id) || null
                            }
                        }
                    }).then(res => {
                        if (res.ok) {
                            if (res.data.goods_attr) {
                                res.data.goods_attr = JSON.parse(res.data.goods_attr)
                            }

                            this.rowInfo = res.data
                        }
                    }).finally(() => {
                        this.isLoading = false
                    })
                })
            },
            handlerClose(done) {
                this.$emit('on-close', this.isUpdate)
            },
        },
    };
</script>

<style lang='scss'>
    $prefixCls: "details-wrap";

    .#{$prefixCls} {
        padding: 45px 0;
        background-color: #131922;

        .detail-main {

            .min-back {
                padding-left: 0;
                display: none;
            }

            .border {
                border: 1px solid #152132;
            }

            .opts-wrap,
            .attribute-wrap,
            .sale-history-pc {
                .top {
                    display: flex;
                    align-items: center;
                    padding: .16rem;
                    font-size: 14px;
                    font-family: Poppins-Medium, Poppins;
                    font-weight: 500;
                    color: #fff;
                    line-height: 16px;
                    border-bottom: 1px solid #152132;

                    img {
                        width: 24px;
                        height: 24px;
                        margin-right: 12px;
                    }
                }
            }

            .blind-box {
                display: flex;
                margin-top: .666666666666667rem;
                justify-content: space-between;

                .left {
                    width: 7.333333333333333rem;
                    height: 7.333333333333333rem;
                    padding: .266666666666667rem;
                    border-radius: .4rem;
                    box-sizing: border-box;
                    border: 1px solid #004d8c;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    }
                }

                .right {
                    flex: 1;
                    margin-left: 1.2rem;
                    text-align: left;


                    .anchor {
                        font-size: .32rem;
                        color: #fff;
                    }

                    .title {
                        font-size: .48rem;
                        font-weight: bold;
                        color: $--color-success;
                        line-height: 48px;
                    }

                    .tip {
                        margin: .133333333333333rem 0;
                        font-size: .186666666666667rem;
                        color: #777e90;
                    }

                    .attribute-wrap {
                        margin-top: .4rem;
                        border-radius: .133333333333333rem;

                        .attr-name {
                            display: flex;
                            align-items: center;
                            padding: .266666666666667rem .16rem;

                            .item {
                                display: flex;
                                align-items: center;
                                padding: 0 .16rem;
                                flex: 1;

                                .star {
                                    width: .266666666666667rem;
                                    height: .266666666666667rem;
                                    margin-left: .16rem;
                                    display: inline-block;
                                    background: url('../../assets/images/star.png');
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                }

                            }

                            .label {
                                font-size: 14px;
                                font-family: Poppins-Medium, Poppins;
                                font-weight: 500;
                                color: #777e90;
                                line-height: 16px;
                            }

                            .con {
                                margin-left: 8px;
                                font-size: 18px;
                                font-family: Poppins-Bold, Poppins;
                                font-weight: bold;
                                color: $--color-success;
                                line-height: 16px;
                            }
                        }
                    }

                    .quantity {
                        margin-top: .466666666666667rem;
                        font-size: .24rem;
                        color: #fff;

                        .label {
                            color: #777E90;
                        }

                    }

                    .card-opt {
                        padding: .266666666666667rem;

                        .btns {
                            display: flex;

                            .el-button {
                                flex: 1;
                                height: .8rem;
                                font-size: .293333333333333rem;
                                border-radius: .133333333333333rem;
                                color: #fff;

                                &.btn-sale,
                                &.btn-buy {
                                    background: #00A73A;
                                }

                                &.btn-deliver,
                                &.btn-open {
                                    background: #F1AE00;
                                }

                                &.btn-cancel-sale {
                                    background: #FF5E1A;
                                }

                                &.btn-revise {
                                    background: #32A3FF;
                                }

                                &.btn-on-processing {
                                    background: #777E90;
                                }

                                &.btn-synthetic {
                                    background: #9E00FF;
                                }
                            }
                        }
                    }

                    .opts-wrap {
                        margin-top: .266666666666667rem;

                        .card-opt {

                            .price-bnb {
                                display: none;
                            }

                            .price {
                                font-size: .426666666666667rem;
                                font-family: Poppins-SemiBold, Poppins;
                                font-weight: 600;
                                color: #fff;
                                line-height: 32px;
                            }

                            .bnb {
                                font-size: .32rem;
                                font-family: Poppins-SemiBold, Poppins;
                                font-weight: 600;
                                color: #777e90;
                                line-height: .533333333333333rem;
                            }

                            .buy {
                                width: 100%;
                                height: 60px;
                                margin-top: 10px;
                                background: #00a73a;
                                border-radius: 10px;

                                font-size: 24px;
                                font-family: Poppins-Bold, Poppins;
                                font-weight: bold;
                                color: #fcfcfd;
                                line-height: 60px;
                                border: none;
                            }

                            .operate {
                                display: flex;

                                .revise,
                                .cancel-sale {
                                    padding-bottom: .533333333333333rem;
                                    height: 60px;
                                    font-size: 22px;
                                    font-weight: 600;
                                    color: #fcfcfd;
                                    border: none;
                                    border-radius: 10px;
                                }

                                .revise {
                                    width: 40%;
                                    background: #777e90;
                                }

                                .cancel-sale {
                                    width: 60%;
                                    margin-left: 10px;
                                    background: #ff5e19;
                                }
                            }
                        }
                    }

                    .owner {
                        margin-top: .4rem;
                        font-size: .213333333333333rem;
                        color: #5b82e3;
                        line-height: 16px;
                        border: none;

                        .label {
                            color: #777e90;
                        }
                    }
                }
            }

            .sale-history-h5 {
                display: none;
            }

            .sale-history-pc {
                margin-top: 45px;

                .el-table,
                .el-table__expanded-cel {
                    background-color: transparent;
                }

                .group {
                    display: flex;
                    align-items: center;

                    img {
                        width: 24px;
                        height: 24px;
                        margin-right: 10px;
                    }
                }
            }
        }

        .el-table td.el-table__cell,
        .el-table th.el-table__cell.is-leaf {
            border-bottom: 1px solid #29374B;
        }

        .el-table tr,
        .el-table th.el-table__cell,
        .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell,
        .el-table--border::after,
        .el-table--group::after,
        .el-table::before {
            background-color: transparent;
        }
    }

    /*详情弹窗*/
    .#{$prefixCls}-drawer {
        #el-drawer__title {
            display: none;
        }

        .el-drawer__body {
            padding: .666666666666667rem 0;
            overflow-y: auto;
            background: #131922;
        }
    }
</style>
<style lang='scss'>
    @media (max-width: 768px) {
        $prefixCls: "details-wrap";

        .#{$prefixCls} {
            .detail-main {
                padding: 0.4rem .6rem;

                .sale-history-h5 {
                    display: block;
                    margin-top: .266666666666667rem;
                    border: 1px solid #152132;
                    border-radius: .266666666666667rem;
                    text-align: left;

                    .tit {
                        display: flex;
                        align-items: center;
                        height: .853333333333333rem;
                        line-height: .853333333333333rem;
                        padding-left: .32rem;
                        color: #fff;
                        font-size: .32rem;
                        border-bottom: 1px solid #152132;

                        img {
                            margin-right: .293333333333333rem;
                            width: .346666666666667rem;
                            height: .346666666666667rem;

                        }
                    }

                    table {
                        display: inline-block;
                        font-size: .266666666666667rem;
                        width: auto;
                        max-width: 100%;
                        overflow: auto;
                        color: #777E90;
                        border-collapse: collapse;

                        thead {
                            th {
                                height: .533333333333333rem;
                                line-height: .533333333333333rem;
                                text-align: center;
                            }
                        }

                        tbody {
                            tr {
                                border-top: 1px solid #152132;

                                td {
                                    height: .853333333333333rem;
                                    line-height: .853333333333333rem;
                                    min-width: 1.866666666666667rem;
                                    padding: 0 .24rem;
                                    white-space: nowrap;

                                    img {
                                        width: .373333333333333rem;
                                        height: .373333333333333rem;
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }

                    }
                }

                .sale-history-pc,
                .back {
                    display: none;
                }

                .min-back {
                    display: flex;
                    align-items: center;

                    img {
                        width: 0.9067rem;
                        height: 0.9067rem;
                    }

                    .con {
                        margin-left: 0.1867rem;
                        font-size: 0.48rem;
                        font-weight: 500;
                        color: #fff;
                        line-height: 0.4267rem;
                    }
                }

                .blind-box {
                    width: 100%;
                    flex-direction: column;
                    margin-top: 0.2667rem;
                    text-align: center;

                    .left {
                        width: 100%;
                        height: auto;
                        padding: .133333333333333rem;
                        border-radius: 0.2667rem;
                        box-sizing: border-box;

                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                            border: 1px solid $--color-primary;
                        }
                    }

                    .right {
                        width: 100%;
                        margin-left: 0;
                        margin-top: 0.2667rem;

                        .anchor {
                            display: none;
                        }

                        .title {
                            color: #fff;
                            font-size: 0.64rem;
                            line-height: 0.64rem;
                        }

                        .tip {
                            margin-top: 0.1333rem;
                            font-size: 0.3733rem;
                        }

                        .top {
                            display: none;
                        }

                        .attribute-wrap {
                            width: 100%;
                            height: auto;
                            margin-top: 0.2667rem;
                            border-radius: 0.2667rem;

                            .attr-name {
                                padding: 0.2667rem;
                            }

                            .attr-name .item {

                                .label {
                                    font-size: 0.3733rem;
                                }

                                .con {
                                    font-size: 0.48rem;
                                }
                            }
                        }

                        .card-opt {
                            .btns {
                                .el-button {
                                    height: 1rem;
                                }
                            }
                        }

                        .opts-wrap .con {
                            display: flex;
                            align-items: center;
                            padding: 0.1333rem 0.2667rem;
                            box-sizing: border-box;

                            .opts-title {
                                display: block;
                                color: #777e90;
                                font-size: 0.3733rem;
                            }

                            .price {
                                margin-left: 0.3467rem;
                                font-size: 0.4267rem;
                                line-height: 1;

                                .price-bnb {
                                    display: block;
                                    font-size: 0.3733rem;
                                    line-height: 1;
                                }
                            }

                            .bnb {
                                display: none;
                            }

                            .operate,
                            .buy {
                                position: fixed;
                                left: 0;
                                bottom: 0;
                                width: 100%;
                                border-radius: 0;
                            }

                            .buy {
                                height: 2.1333rem;
                                font-size: 0.5867rem;
                                font-weight: 600;
                                color: #fcfcfd;
                                line-height: 0.4267rem;
                                box-sizing: border-box;
                            }

                            .operate {
                                display: flex;

                                .revise,
                                .cancel-sale {
                                    height: 2.1333rem;
                                    font-size: 0.5867rem;
                                    font-weight: 600;
                                    color: #fcfcfd;
                                    line-height: 0.4267rem;
                                    border: none;
                                    border-radius: 0;
                                    box-sizing: border-box;
                                }

                                .revise {
                                    width: 40%;
                                    background: #777e90;
                                }

                                .cancel-sale {
                                    width: 60%;
                                    margin-left: 0;
                                    background: #ff5e19;
                                }
                            }
                        }

                        .owner {
                            border-radius: 0.2667rem;

                            .label {
                                color: #fff;
                            }

                            padding: 0.32rem 0.1333rem;
                            color: #fff;
                            font-size: .32rem;
                            border: 1px solid #152132;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
    }
</style>