<template>
    <div :class="prefixCls">
        <li :class="{'select': itemInfo.select}" @click="selectCard(itemInfo)">
            <div class="mark" v-if="itemInfo.select">

            </div>
            <template v-if="itemInfo.belong_type < 0">
                <div class="debris-header-info">
                    {{itemInfo.name}}
                </div>
            </template>
            <template v-else>
                <div class="index clearfix">
                    <div class="l">
                        # {{itemInfo.goods_id}}
                    </div>
                    <div class="r" v-if="itemInfo.rarity">{{ $$t("common", itemInfo.rarity)}}</div>
                </div>
            </template>
            <div class="img-mid-content" :class="{'can-detail': ![3, 16, 17, 18].includes(itemInfo.type_id) && itemInfo.belong_type !== -10}"
                @click="goCardDetail">
                <div class="img-content">
                    <img :src="netImgBaseUrl + itemInfo.image">
                </div>
                <template v-if="isShowNum">
                    <div class="card-num"><i>x</i>{{ itemInfo.num || 1 }}</div>
                </template>
                <template v-if="isShowName">
                    <div class="mid-content"
                        :style="{'justify-content': itemInfo.goods_level ? 'space-between' : 'center'}">
                        <span class="name">{{itemInfo.name}}</span>
                        <span class="level" v-if="itemInfo.goods_level">Lv{{itemInfo.goods_level}}</span>
                    </div>
                </template>
            </div>
            <div class="opt-buttom">
                <slot></slot>
            </div>
        </li>
    </div>
</template>

<script>
    import {
        netImgBaseUrl
    } from '@/config/config.js'
    export default {
        name: 'item-card',
        components: {},
        props: {
            itemInfo: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isShowNum: {
                type: Boolean,
                default: false
            },
            isShowName: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'components-item-card',
                netImgBaseUrl,
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            goCardDetail() {
                if ([3, 16, 17, 18].includes(this.itemInfo.type_id) || this.itemInfo.belong_type === -10) return false
                this.$emit('goDetail', this.itemInfo)
            },
            selectCard(row) {
                this.$emit('select', row)
            },
            doDeliver(row) {
                this.$emit('deliver', row)
            },
            doRevise(row) {
                this.$emit('revise', row)
            },
            cancel(id) {
                this.$emit('cancel', id)
            },
            sale(id) {
                this.$emit('sale', id)
            },
            onClickHandle(id) {
                this.$emit('select', id)
            },
            cancelStaking(id) {
                this.$emit('cancel-staking', id)
            },
            staking(id) {
                this.$emit('staking', id)
            }
        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'components-item-card';

    .#{$prefixCls} {
        margin-bottom: .266666666666667rem;

        >li {
            position: relative;
            padding: .133333333333333rem .133333333333333rem .266666666666667rem .133333333333333rem;
            width: 100%;
            border: 1px solid #29374B;
            border-radius: .133333333333333rem;
            text-align: center;
            background: #1D2633;

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

            .debris-header-info {
                color: #C4C4C4;
                font-size: .213333333333333rem;
                text-align: left;
            }

            .index {
                color: #D7D7D7;
                font-size: .213333333333333rem;
            }

            .img-mid-content {
                &.can-detail {
                    cursor: pointer;
                }

                .img-content {
                    margin: .133333333333333rem 0;
                    width: 100%;
                    border-radius: 10px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }


            .card-num {
                text-align: center;
                font-size: .16rem;
                color: #fff;
                padding-bottom: 10px;
                color: #fff;
            }

            .mid-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                color: #fff;


                .name {
                    font-size: .24rem;
                    font-weight: bold;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .level {
                    font-size: .186666666666667rem;
                }
            }

            .opt-buttom {
                >div {
                    padding-top: .133333333333333rem;
                    border-top: 1px solid #29374B;
                }

            }



            &:hover {
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
            }

            .article-other-info {
                .title {
                    color: $--color-primary;
                    font-weight: 700;
                    cursor: pointer;
                }

                .description {
                    padding: 10px 0 16px 0;
                    color: #4e5969;

                }

                .action-list {
                    display: flex;
                    justify-content: space-between;

                    .left-num {
                        li {
                            float: left;
                            margin-right: 26px;
                            color: #86909c;
                        }
                    }

                    .time {
                        color: #86909c;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .btn {
                font-size: .266666666666667rem !important;
            }

            .opt-buttom {
                >div {
                    padding-top: .18rem;
                    border-top: 1px solid #29374B;
                }
            }
        }
    }
</style>