<template>
    <div :class="prefixCls">
        <li>
            <div class="index clearfix">
                <div class="l">
                    # {{itemInfo.id}}
                </div>
                <div class="r">{{$t(`account.${itemInfo.color}`)}}</div>
            </div>
            <div class="img-content" @click="onClickHandle(itemInfo.id)">
                <img :src="netImgBaseUrl + itemInfo.image_url">
            </div>
            <div class="name">
                {{itemInfo.name}}
            </div>
            <template v-if="type === 'sale'">
                <div class="card-info" v-if="!itemInfo.on_sale">
                    <div class="sale">
                        <div class="lv">LV-{{itemInfo.class}}</div>
                    </div>
                    <div class="btn-groups">
                        <div class="sale-btn btn" @click="sale(itemInfo.id)">{{$t("account.sale")}}</div>
                    </div>
                </div>
                <div class="card-info" v-else>
                    <div class="on-sale">
                        <p class="price-txt">{{$t("account.price")}}</p>
                        <p class="price">{{itemInfo.price}} Adoge</p>
                    </div>
                    <div class="btn-groups">
                        <div class="revise-btn btn" @click="doRevise(itemInfo)">{{$t("account.revise")}}</div>
                        <div class="cancel-btn btn" @click="cancel(itemInfo.id)">{{$t("account.cancel-sale")}}</div>
                    </div>
                </div>
            </template>
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
            }
        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'components-item-card';

    .#{$prefixCls} {
        >li {
            padding: .266666666666667rem .266666666666667rem .453333333333333rem .266666666666667rem;
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid #004D8C;
            border-radius: 10px;
            text-align: center;

            .index {
                color: #D7D7D7;
                font-size: .213333333333333rem;
            }

            .img-content {
                margin: .133333333333333rem 0;
                width: 100%;
                border-radius: 10px;
                overflow: hidden;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .name {
                padding-bottom: 10px;
                font-size: .266666666666667rem;
                color: #fff;
                border-bottom: 1px solid #29374B;
            }

            .card-info {
                margin-top: .1rem;

                .sale,
                .on-sale {
                    height: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .on-sale {
                    .price {
                        margin-top: 5px;
                        color: $--color-success;
                        font-size: .266666666666667rem;
                    }
                }

                .lv,
                .price-txt {
                    color: #777E90;
                    font-size: 14px;
                }

                .btn-groups {
                    display: flex;

                    .btn {
                        display: inline-block;
                        margin-top: 12px;
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 5px;
                        cursor: pointer;
                        flex: 1;

                        &.sale-btn {
                            text-align: center;
                            background: #45B26B;
                        }

                        &.revise-btn {
                            background: #777E90;
                        }

                        &.cancel-btn {
                            margin-left: 3px;
                            background: #FF5E19;
                        }
                    }

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
        }
    }
</style>