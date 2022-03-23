<template>
    <div :class="prefixCls">
        <li>
            <div class="index clearfix">
                <div class="l">
                    # {{itemInfo.id}}
                </div>
                <div class="r">{{itemInfo.type}}</div>
            </div>
            <div class="img-content">
                <img src="../../assets/images/product.png">
            </div>
            <div class="name">
                {{itemInfo.name}}
            </div>
            <template v-if="!itemInfo.price">
                <div class="sale">
                    <div class="lv">{{itemInfo.lv}}</div>
                </div>
                <div class="sale-btn btn">Sale</div>
            </template>
            <template v-else>
                <div class="on-sale">
                    <p class="price-txt">Price</p>
                    <p class="price">{{itemInfo.price}}</p>
                </div>
                <div class="revise-btn btn">Revise</div>
                <div class="cancel-btn btn">Cancel Sale</div>
            </template>
        </li>
    </div>
</template>

<script>
    export default {
        name: 'item-card',
        components: {},
        props: {
            itemInfo: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                prefixCls: 'components-item-card'
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {

        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'components-item-card';

    .#{$prefixCls} {
        >li {
            padding: 10px 10px 26px 10px;
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid #004D8C;
            border-radius: 10px;
            text-align: center;

            .index {
                color: #D7D7D7;
            }

            .img-content {
                margin: 20px 0;
                width: 245px;
                height: 245px;
                border-radius: 10px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .name {
                padding-bottom: 10px;
                font-size: 18px;
                color: #fff;
                border-bottom: 1px solid #29374B;
            }

            .on-sale {
                .price {
                    margin-top: 5px;
                    color: #32A3FF;
                    font-size: 18px;
                }
            }

            .btn {
                display: inline-block;
                margin-top: 12px;
                height: 40px;
                line-height: 40px;
                color: #fff;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
            }

            .sale-btn {
                text-align: center;
                background: #45B26B;
            }

            .revise-btn {
                width: 90px;
                background: #777E90;
            }

            .cancel-btn {
                margin-left: 3px;
                width: 150px;
                background: #FF5E19;
            }

            .sale,
            .on-sale {
                height: 50px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .lv,
            .price-txt {
                color: #777E90;
                font-size: 14px;
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
</style>
