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
                            <div class="filter-val">
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
                <div class="right"></div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'views-account',
                checkListFilter: [],
                checkListLvel: [],
                checkListSale: []
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
    $prefixCls: "views-account";

    .#{$prefixCls} {
        .top {
            height: 88px;
            line-height: 88px;
            background: #0B0F15;
            color: #fff;
            font-size: 27px;
            font-weight: 600;
        }

        .main {
            padding: 21px 0;
            background: #14181f;

            .left {
                width: 149px;
                background: #0B0F15;

                li {
                    border-bottom: 1px solid #29374B;

                    .title {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 10px;
                        height: 46px;
                        line-height: 46px;
                        border-bottom: 1px solid #29374B;
                        font-size: 12px;
                        color: #fff;
                    }

                    .filter-val {
                        padding: 17px 10px;
                    }
                }
            }

        }
    }
</style>