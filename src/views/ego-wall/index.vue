<template>
    <div :class="prefixCls" v-loading="isLoading">
        <div class="w" v-if="!isLoading">
            <div class="back" @click="goBack">
                {{ $t("common.back") }}
            </div>
            <div class="page-title">
                EGO WALL
            </div>
            <div class="wall-list">
                <div class="list-item">
                    <div class="wall-key">
                        <span class="txt">VIP level</span>
                        <span class="line"></span>
                    </div>
                    <div class="wall-content clearfix">
                        <div class="content-item" v-for="item of levelData" :key="item.id"
                            @click="openLevelDetailInfo(item)">
                            <div class="img-wrapper">
                                <img :src="item.activeImgUrl" alt="" v-if="item.Illuminated">
                                <img :src="item.inActiveImgUrl" alt="" v-if="!item.Illuminated"> </div>
                            <div class="vip">
                                {{item.label }}
                            </div>
                            <div class="desc">
                                {{ item.desc }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="wall-key">
                        <span class="txt">Flatbread badge</span>
                        <span class="line"></span>
                    </div>
                    <div class="wall-content clearfix">
                        <div class="content-item" v-for="item of badgeData" :key="item.id"
                            @click="openLevelDetailInfo(item)">
                            <div class="img-wrapper">
                                <img :src="item.activeImgUrl" alt="" v-if="item.Illuminated">
                                <img :src="item.inActiveImgUrl" alt="" v-if="!item.Illuminated"> </div>
                            <div class="vip">
                                {{item.label }} x{{ item.count}}
                            </div>
                            <div class="desc">
                                {{ item.desc }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog  :visible.sync="dialogVisible" :width="dialogWidth" :close-on-click-modal="false"
            custom-class="level-detail-dialog">
            <div class="content">
                <div class="img-wrapper">
                    <img :src="currentItem.activeImgUrl" alt="" v-if="currentItem.Illuminated">
                    <img :src="currentItem.inActiveImgUrl" alt="" v-if="!currentItem.Illuminated"> </div>
                <div class="vip">
                    {{currentItem.label }}
                    <span v-if="currentItem.count !== undefined">x{{ currentItem.count }}</span>

                </div>
                <ul class="vip-conditions-rights">
                    <li>
                        <p class="tit">{{ $t("ego-wall.get-conditions")}}</p>
                        <p class="txt">
                            {{ currentItem.getConditionsTxt}}
                        </p>
                    </li>
                    <li>
                        <p class="tit">{{ $t("ego-wall.rights-and-interests")}}</p>
                        <div class="txt" v-html="currentItem.rightInterests">
                        </div>
                    </li>
                </ul>
                 <el-button type="primary" v-if="currentItem.id === 'copper' || currentItem.id === 'silver'" :disabled="currentItem.count <= 0">{{ $t("ego-wall.upgrade") }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import myAjax from '@/utils/ajax.js'
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'views-ego-wall',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'views-ego-wall',
                isLoading: true,
                dialogVisible: false,
                dialogWidth: "480px",
                levelData: [{
                        id: 1,
                        Illuminated: false,
                        activeImgUrl: require('./images/level/vip1-active.png'),
                        inActiveImgUrl: require('./images/level/vip1-inactive.png'),
                        label: 'VIP1',
                        desc: 'badge',
                        getConditionsTxt: `${this.$t("ego-wall.number-of-open")} x10`,
                        rightInterests: this.$t("ego-wall.VIP1-badge-lights-up")
                    },
                    {
                        id: 2,
                        Illuminated: false,
                        activeImgUrl: require('./images/level/vip2-active.png'),
                        inActiveImgUrl: require('./images/level/vip2-inactive.png'),
                        label: 'VIP2',
                        desc: 'badge',
                        getConditionsTxt: `${this.$t("ego-wall.number-of-open")} x20`,
                        rightInterests: this.$t("ego-wall.VIP2-badge-lights-up")
                    },
                    {
                        id: 3,
                        Illuminated: false,
                        activeImgUrl: require('./images/level/vip3-active.png'),
                        inActiveImgUrl: require('./images/level/vip3-inactive.png'),
                        label: 'VIP3',
                        desc: 'badge',
                        getConditionsTxt: `${this.$t("ego-wall.number-of-open")} x30`,
                        rightInterests: this.$t("ego-wall.VIP3-badge-lights-up")
                    },
                    {
                        id: 4,
                        Illuminated: false,
                        activeImgUrl: require('./images/level/vip4-active.png'),
                        inActiveImgUrl: require('./images/level/vip4-inactive.png'),
                        label: 'VIP4',
                        desc: 'Double the probability of rare items in gold gift packs',
                        getConditionsTxt: `${this.$t("ego-wall.number-of-open")} x60`,
                        rightInterests: `<p>${this.$t("ego-wall.VIP4-badge-lights-up")}</p>
                                         <p>${this.$t("ego-wall.double-the-probability")}</p>`
                    },
                    {
                        id: 5,
                        Illuminated: false,
                        activeImgUrl: require('./images/level/vip5-active.png'),
                        inActiveImgUrl: require('./images/level/vip5-inactive.png'),
                        label: 'VIP5',
                        desc: 'VIP4 + each time you open a gold gift bag to get an additional silver gift bag',
                        getConditionsTxt: `${this.$t("ego-wall.number-of-open")} x100`,
                        rightInterests: `<p>${this.$t("ego-wall.VIP5-badge-lights-up")}</p>
                                         <p>VIP4 + ${this.$t("ego-wall.each-time-you-open")}</p>`
                    },
                    {
                        id: 6,
                        Illuminated: false,
                        activeImgUrl: require('./images/level/vip6-active.png'),
                        inActiveImgUrl: require('./images/level/vip6-inactive.png'),
                        label: 'VIP6',
                        desc: 'VIP5 + online full service announcement + VIP6 limited NFT skin',
                        getConditionsTxt: `${this.$t("ego-wall.number-of-open")} x150`,
                        rightInterests: `<p>${this.$t("ego-wall.VIP6-badge-lights-up")}</p>
                                         <p>VIP5 + ${this.$t("ego-wall.online-full-service")}</p>`
                    },
                    {
                        id: 7,
                        Illuminated: false,
                        activeImgUrl: require('./images/level/vip7-active.png'),
                        inActiveImgUrl: require('./images/level/vip7-inactive.png'),
                        label: 'VIP7',
                        desc: 'VIP6 + a purple NFT',
                        getConditionsTxt: `${this.$t("ego-wall.number-of-open")} x60`,
                        rightInterests: `<p>${this.$t("ego-wall.VIP7-badge-lights-up")}</p>
                                         <p>VIP6 + ${this.$t("ego-wall.a-purple-NFT")}</p>`
                    }
                ],
                badgeData: [{
                    id: 'copper',
                    label: 'Bronze badge',
                    inActiveImgUrl: require('./images/badge/inactive.png'),
                    activeImgUrl: require('./images/badge/bronze.png'),
                    desc: 'Dividend trading blind box gain of 2%',
                    Illuminated: false,
                    count: 0,
                    getConditionsTxt: `${this.$t("ego-wall.open-the-golden")}`,
                    rightInterests: `<p>${this.$t("ego-wall.bronze-badge-Medal-Lights-Up")}</p>
                                     <p>${this.$t("ego-wall.dividend-trading-2%")}</p>`
                }, {
                    id: 'silver',
                    label: 'Silver badge',
                    inActiveImgUrl: require('./images/badge/inactive.png'),
                    activeImgUrl: require('./images/badge/silver.png'),
                    desc: 'Dividend trading blind box gain of 3%',
                    Illuminated: false,
                    count: 0,
                    getConditionsTxt: `${this.$t("ego-wall.burn-1-Bronze-Badge")}`,
                    rightInterests: `<p>${this.$t("ego-wall.silver-badge-Medal-Lights-Up")}</p>
                                     <p>${this.$t("ego-wall.dividend-trading-3%")}</p>`
                }, {
                    id: 'gold',
                    label: 'Gold badge',
                    inActiveImgUrl: require('./images/badge/inactive.png'),
                    activeImgUrl: require('./images/badge/gold.png'),
                    desc: 'Dividend trading blind box gain of 4%',
                    Illuminated: false,
                    count: 0,
                    getConditionsTxt: `${this.$t("ego-wall.burn-1-Silver-Badge")}`,
                    rightInterests: `<p>${this.$t("ego-wall.gold-badge-Medal-Lights-Up")}</p>
                                     <p>${this.$t("ego-wall.dividend-trading-4%")}</p>`
                }],
                currentItem: {},
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.userInfo
            }),
        },
        watch: {},
        created() {
            this.levelData.forEach(x => {
                if (x.id <= this.userInfo.vip_level) {
                    x.Illuminated = true
                }
            })
            Promise.all([this.getLimitNftCount()]).then(() => {
                this.isLoading = false
            })
        },
        mounted() {
            let width = window.innerWidth;
            if (width < 768) {
                this.dialogWidth = "8.9rem";
            }
        },
        beforeDestroy() {},
        methods: {
            openLevelDetailInfo(item) {
                this.currentItem = item
                this.dialogVisible = true
            },
            goBack() {
                this.$router.push({
                    name: 'account'
                })
            },
            getLimitNftCount() {
                return new Promise((resolve, reject) => {
                    myAjax({
                        url: 'user/limit_nft/count'
                    }).then(res => {
                        if (res.ok) {
                            const data = res.data
                            for (let key in data) {
                                const item = this.badgeData.find(x => x.id == key)
                                item.count = data[key]
                                if (item.count > 0) {
                                    item.Illuminated = true
                                }
                            }
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            }
        }
    }
</script>

<style lang="scss">
    $prefixCls: "views-ego-wall";

    .#{$prefixCls} {
        min-height: 7rem;
        padding: .666666666666667rem 0 1.413333333333333rem 0;
        background: #131922;

        .level-detail-dialog {
            .el-dialog__body {
                padding-top: 0;
            }

            .content {
                display: flex;
                flex-direction: column;
                align-items: center;

            }

            .img-wrapper {
                img {
                    width: 3.2rem;
                    height: 3.2rem;
                }
            }

            .vip {
                padding: 0 .16rem;
                height: .666666666666667rem;
                line-height: .666666666666667rem;
                text-align: center;
                background: #151D27;
                color: #fff;
                font-size: .266666666666667rem;
                border-radius: .133333333333333rem;

            }

            .vip-conditions-rights {
                width: 100%;

                li {
                    margin-top: .2rem;
                    padding: .266666666666667rem .2rem;
                    border-radius: .133333333333333rem;
                    background: #151D27;
                    font-size: .24rem;

                    .tit {
                        color: #777E90;
                    }

                    .txt {
                        margin-top: .066666666666667rem;
                        color: #fff;

                        p {
                            word-break: break-word;
                        }
                    }
                }
            }
            .el-button {
                width: 100%;
                height: .8rem;
                margin-top: .4rem;
                background: #9E00FF;
                border: 0;
                font-size: .293333333333333rem;
                &.is-disabled {
                    background: #777E90;
                }
            }
        }

        .page-title {
            margin: .133333333333333rem 0 .48rem;
            font-size: .8rem;
            color: #777E90;
            font-weight: bold;
            text-align: center;

        }

        .wall-list {
            .list-item {
                margin-bottom: .666666666666667rem;

                .wall-key {
                    display: flex;
                    align-items: center;
                    font-size: .32rem;
                    color: #fff;
                    font-weight: bold;

                    .line {
                        flex: 1;
                        margin-left: .066666666666667rem;
                        height: .026666666666667rem;
                        background: #29374B;
                    }

                    .txt {
                        margin-right: .186666666666667rem;
                    }
                }

                .wall-content {
                    padding-top: .266666666666667rem;
                    margin: 0 -0.133333333333333rem;

                    .content-item {
                        float: left;
                        padding: .266666666666667rem .16rem .693333333333333rem .16rem;
                        margin: 0 .133333333333333rem .266666666666667rem;
                        width: 3.533333333333333rem;
                        background: #151D27;
                        border-radius: .266666666666667rem;
                        text-align: center;
                        overflow: hidden;
                        cursor: pointer;

                        img {
                            width: 2.4rem;
                            height: 2.4rem;
                        }

                        .vip {
                            font-size: .24rem;
                            color: #fff;
                        }

                        .desc {
                            height: .84rem;
                            margin-top: .133333333333333rem;
                            color: #777E90;
                            font-size: .186666666666667rem;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .wall-list {
                padding: 0 .533333333333333rem;

                .list-item {
                    .wall-content {
                        .content-item {
                            width: 2.76rem;
                            padding-bottom: .266666666666667rem;
                        }
                    }

                    .line,
                    .desc {
                        display: none;
                    }
                }

            }
        }
    }
</style>