<template>
    <div :class="prefixCls">
        <div class="top">
            <div class="w">
                My account
            </div>
        </div>
        <div class="main">
            <div class="w">
                <div class="left">
                    <ul>
                        <li>
                            <div class="title">
                                <span>Filter ({{checkListFilter.length}})</span>
                                <a href="javascript:;">clear</a>
                            </div>
                            <div class="filter-val filter">
                                <el-checkbox-group v-model="checkListFilter">
                                    <el-checkbox label="Yellow" class="yellow">Yellow</el-checkbox>
                                    <el-checkbox label="Orange" class="orange">Orange</el-checkbox>
                                    <el-checkbox label="Red" class="red">Red</el-checkbox>
                                    <el-checkbox label="Blue" class="blue">Blue</el-checkbox>
                                    <el-checkbox label="Purple" class="purple">Purple</el-checkbox>
                                    <el-checkbox label="Diamond">Diamond</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                        <li>
                            <div class="title" style="border-bottom: 0;">
                                <span>Sale</span>
                            </div>
                            <div class="filter-val" style="padding-top: 0">
                                <el-checkbox-group v-model="checkListSale">
                                    <el-checkbox label="For sale">For sale</el-checkbox>
                                    <el-checkbox label="Not sold">Not sale</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                        <li>
                            <div class="title">
                                <span>Lvel ({{checkListLvel.length}})</span>
                                <a href="javascript:;">clear</a>
                            </div>
                            <div class="filter-val">
                                <el-checkbox-group v-model="checkListLvel">
                                    <el-checkbox label="Yellow">Lv-1</el-checkbox>
                                    <el-checkbox label="Orange">Lv-2</el-checkbox>
                                    <el-checkbox label="Red">Lv-3</el-checkbox>
                                    <el-checkbox label="Blue">Lv-4</el-checkbox>
                                    <el-checkbox label="Purple">Lv-5</el-checkbox>
                                    <el-checkbox label="Diamond">Lv-6</el-checkbox>
                                    <el-checkbox label="Purple">Lv-7</el-checkbox>
                                    <el-checkbox label="Diamond">Lv-8</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <div class="top-search">
                        <div class="total">20 NFTs</div>
                        <div class="search">
                            <el-input placeholder="Search ID or Name" v-model="query.keywords" class="input-keywords">
                                <a href="javascript:;" slot="append" class="search-icon"></a>
                            </el-input>
                            <el-select v-model="query.latest" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="list clearfix" v-if="netList.length">
                        <item-card v-for="(item, index) of netList" :key="index" :itemInfo="item"></item-card>
                    </div>
                    <div class="page r">
                        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="netList.length" v-if="netList.length">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import itemCard from '@/components/item-card'
    export default {
        name: '',
        components: {
            itemCard
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-account',
                checkListFilter: [],
                checkListLvel: [],
                checkListSale: [],
                query: {
                    keywords: '',
                    latest: ''
                },
                options: [],
                netList: [{
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }, {
                    id: '010001',
                    type: 'Diamond',
                    name: 'CZ Hoodie Limited NFT',
                    lv: 'lv-2',
                    price: '1,000,000,000 Adoge'
                }]
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

<style lang="scss">
    $prefixCls: "views-account";

    .#{$prefixCls} {

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
            height: 157px;
            line-height: 157px;
            background: #0B0F15;
            color: #fff;
            font-size: 48px;
            font-weight: 600;
        }

        .main {
            padding: 38px 0;
            background: #14181f;

            .w {
                display: flex;
                justify-content: space-between;
            }

            .left {
                width: 265px;
                max-height: 830px;
                background: #0B0F15;
                border-radius: 10px;

                li {
                    border-bottom: 1px solid #29374B;

                    .title {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 10px;
                        height: 80px;
                        line-height: 80px;
                        border-bottom: 1px solid #29374B;
                        font-size: 20px;
                        color: #fff;
                    }

                    .filter-val {
                        padding: 30px 20px;

                        &.filter .el-checkbox {
                            display: block;
                        }
                        .el-checkbox {
                            margin-bottom: 10px;
                        }
                    }
                }
            }

            .right {
                flex: 1;
                margin-left: 20px;
                .top-search {
                    display: flex;
                    justify-content: space-between;
                }

                .search {
                    display: flex;
                }

                .total {
                    color: #32A3FF;
                    font-size: 32px;
                }

                .input-keywords {
                    width: 265px;
                    margin-right: 20px;
                    background: #14181f;
                }
            }

            .components-item-card {
                float: left;
                margin-top: 17px;
                margin-right: 20px;
                width: 265px;

                &:nth-child(3n) {
                    margin-right: 0;
                }
            }
        }
    }
</style>
