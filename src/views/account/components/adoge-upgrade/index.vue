<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('ego-wall.upgrade')" :custom-class="prefixCls + '-dialog'" :close-on-click-modal="false"
            :visible.sync="isShowDialog" width="9.06rem" v-if="isShowDialog" @close="doClose">
            <div class="content">
                <p class="tip-info">
                    {{ $t("upgrade.please-select-props")}}
                </p>
                <div class="props-main">
                    <div class="nft-select">
                        <div class="current-nft">
                            <div class="id-type clearfix">
                                <span class="id l"># {{ row.goods_id }}</span>
                                <div class="type r"> {{ row.rarity ? $t(`account.${row.rarity}`) : '-'}}</div>
                            </div>
                            <div class="nft-image">
                                <img :src="netImgBaseUrl + row.image" v-if="row.image" />
                            </div>
                            <div class="nft-name-lv clearfix">
                                <span class="name f">
                                    {{ row.name }}
                                </span>
                                <span class="lv r">
                                    lv{{ row.goods_level }}
                                </span>
                            </div>
                        </div>
                        <img src="../../../account/components/upgrade/images/add.png" alt="" class="add-icon">
                        <div class="select-wrap">
                            <template v-if="row.rarity === 'red' && row.goods_level == 1">
                                <ul>
                                    <li class="select-item">
                                        <div v-if="!selectHatList.length" class="no-select">
                                            <img src="./images/what.png" alt="">
                                            <el-button type="primary" @click="selectProps('hot')">
                                                {{ $t("upgrade.hat")}}
                                            </el-button>
                                        </div>
                                        <div v-else class="item-info">
                                        </div>
                                    </li>
                                    <li class="select-item">
                                        <div v-if="!selectClothingList.length" class="no-select">
                                            <img src="./images/what.png" alt="">
                                            <el-button type="primary" @click="selectProps('clothing')">
                                                {{ $t("upgrade.clothing")}}
                                            </el-button>
                                        </div>
                                        <div v-else class="item-info">
                                        </div>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <ul>
                                    <li>
                                        <div v-if="!selectPropList.length" class="no-select">
                                            <img src="./images/what.png" alt="">
                                            <el-button type="primary" @click="selectProps">
                                                {{ $t("upgrade.select")}}
                                            </el-button>
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </div>
                    <div class="fee">
                        <div class="label">
                            {{ $t("upgrade.upgrade-fee")}}
                        </div>
                        <div class="price">
                            <img src="../../../../assets/images/adoge-token.png" alt="">
                            <span>33</span>
                            ADOGE
                        </div>
                    </div>
                </div>
                <div class="submit-btn">
                    <el-button type="primary">

                    </el-button>
                </div>
            </div>
        </el-dialog>
        <select-props v-if="isShowSelectProps" @close="selectPropsClose"/>
    </div>
</template>

<script>
    import {
        netImgBaseUrl
    } from '@/config/config.js'
    import SelectProps from './components/select-props'
    export default {
        name: '',
        components: {
            SelectProps
        },

        props: {
            row: {
                type: Object,
                require: true
            },
        },
        data() {
            return {
                prefixCls: 'views-account-adoge-upgrade',
                isShowDialog: true,
                isShowSelectProps: false,
                netImgBaseUrl,
                selectHatList: [],
                selectClothingList: [],
                selectPropList: []
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            doClose() {
                this.$emit('close')
            },
            selectProps() {
                this.isShowSelectProps = true
            },
            selectPropsClose() {
                this.isShowSelectProps = false
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account-adoge-upgrade";

    .#{$prefixCls} {
        .tip-info {
            color: #777E90;
            font-size: .32rem;
        }

        .props-main {
            margin-top: .36rem;

            .nft-select {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;

                .current-nft {
                    height: 4.706666666666667rem;
                    padding: .133333333333333rem .133333333333333rem .266666666666667rem .133333333333333rem;
                    overflow: hidden;

                    .id-type {
                        padding-bottom: .133333333333333rem;
                        font-size: .186666666666667rem;


                        .id {
                            color: #C4C4C4;
                        }
                    }

                    .nft-image {
                        text-align: center;

                        img {
                            width: 100%;
                            height: 3.266666666666667rem;
                            border-radius: .133333333333333rem;
                        }
                    }

                    .nft-name-lv {
                        margin-top: .266666666666667rem;
                        font-size: .24rem;

                    }
                }

                >img {
                    width: .266666666666667rem;
                    height: .266666666666667rem;
                }

                >div {
                    width: 3.533333333333333rem;
                    background: #1D2633;
                    border: 1px solid #29374B;
                    border-radius: .133333333333333rem;
                }

            }

            .select-wrap {

                height: 4.706666666666667rem;

                >ul {
                    display: flex;
                    flex-direction: column;
                    height: 100%;

                    li {
                        display: grid;
                        text-align: center;
                        width: 100%;
                        flex: 1;
                    }
                }



                .no-select {
                    margin: auto;
                    text-align: center;

                    img {
                        display: block;
                        margin: auto;
                        width: 1.6rem;
                    }

                    .el-button {
                        margin-top: .533333333333333rem;
                        padding: 0;
                        height: .693333333333333rem;
                        line-height: .693333333333333rem;
                        width: 2.733333333333333rem;
                        background: #45B26B;
                        font-size: .293333333333333rem;
                    }
                }

                .select-item {
                    .no-select {
                        padding: .16rem .213333333333333rem;
                        background: #131922;
                        border: 1px solid #29374B;
                        border-radius: .133333333333333rem;

                        img {
                            width: .853333333333333rem;
                        }

                        .el-button {
                            margin-top: .133333333333333rem;
                            width: 1.44rem;
                            height: .426666666666667rem;
                            line-height: .426666666666667rem;
                            font-size: .213333333333333rem;
                        }
                    }
                }
            }

            .fee {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: .266666666666667rem;
                padding: 0 .4rem;
                height: .666666666666667rem;
                line-height: .666666666666667rem;
                background: #1D2633;
                border: 1px solid #29374B;
                border-radius: .133333333333333rem;
                font-size: .266666666666667rem;

                .price {
                    display: flex;
                    align-items: center;

                    span {
                        margin-right: .133333333333333rem;
                    }
                }

                img {
                    margin-right: .133333333333333rem;
                    width: .453333333333333rem;
                    height: .453333333333333rem;
                }

                .label {
                    color: #777E90;
                }

                .price {
                    color: #fff;
                }
            }
        }

        .submit-btn {
            margin-top: .533333333333333rem;

            .el-button {
                width: 100%;
                height: .8rem;
                font-size: .293333333333333rem;
            }
        }
    }

    .#{$prefixCls}-dialog {
        .el-dialog__body {
            padding: .6rem;
        }
    }
</style>