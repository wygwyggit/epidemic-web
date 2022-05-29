<template>
    <div :class="prefixCls">
        <el-dialog  custom-class="compound-dialog" :show-close="false" :visible.sync="isShowDialog"
            width="7rem" v-if="isShowDialog">
            <div class="content">
                <div class="main-cot">
                    <div class="compound-thing">
                        <img src="./images/silver-gift/main.png" alt="" v-if="row.type_id == 2">
                        <img src="./images/bronze/main.png" alt="" v-if="row.type_id == 3">
                        <img src="./images/phone-fragments/main.png" alt="" v-if="row.type_id == 22">
                        <img src="./images/car-fragments/main.png" alt="" v-if="row.type_id == 23">
                        <img src="./images/parramera-fragment/main.png" alt="" v-if="row.type_id == 24">
                    </div>
                    <div class="arrow-icon">
                        <img src="./images/arrow.png" alt="">
                    </div>
                    <div class="debris-thing">
                         <img src="./images/silver-gift/small.png" alt="" v-if="row.type_id == 2">
                        <img src="./images/bronze/small.png" alt="" v-if="row.type_id == 3">
                        <img src="./images/phone-fragments/small.png" alt="" v-if="row.type_id == 22">
                        <img src="./images/car-fragments/small.png" alt="" v-if="row.type_id == 23">
                        <img src="./images/parramera-fragment/small.png" alt="" v-if="row.type_id == 24">
                        <div class="count-info">
                            <span class="has-count">{{ row.cardNum || 0}} </span>
                            /
                            <span class="consume-count">{{ needNum }}</span>
                        </div>
                    </div>
                    <div class="tip-count">
                        <template>
                            <div>{{ $t("account.compound-tip1")}}</div>
                            <div>
                                <span>{{ $t("account.compound-tip2")}}</span>
                                <el-input-number v-model="num" size="mini" @change="handleChange" @keydown.native="e => e.returnValue = ''" :min="0" :max="maxContent"
                                    >
                                </el-input-number>
                            </div>
                        </template>
                    </div>
                    <div class="syn" @click="doCompound">
                        {{ $t("account.synthetic")}}
                    </div>
                </div>

            </div>
            <div class="close">
                <img src="../../../../assets/images/g-close.png" alt="" @click="doClose">
            </div>
        </el-dialog>

    </div>
</template>

<script>
    /*
type_id: 2   银礼包
type_id: 3   铜牌
type_id: 22  手机碎片
type_id: 23  汽车碎片
type_id: 24  帕拉梅拉碎片

*/
    import myAjax from '@/utils/ajax.js'


    export default {
        name: 'compound',
        components: {},
        props: {
            row: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'views-account-compound',
                isShowDialog: true,
                needNum: 100,
                num: '',
            }
        },
        computed: {
            maxContent() {
                return parseInt(this.row.cardNum / this.needNum)
            }
        },
        watch: {},
        created() {
            if (this.row.type_id == 2 || this.row.type_id == 3 ) {
                this.needNum = 10
            }
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            handleChange() {

            },
            doCompound() {
                if (!this.num) return
                myAjax({
                    url: 'user/prize/merge',
                    data: {
                        body: {
                            type_id: this.row.type_id,
                            num: this.num * 10
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        const data = (res.data || {}).items || []
                        this.$emit('compoundSuc', data)
                    }
                })
            },
            doClose() {
                this.isShowDialog = false
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "views-account-compound";

    .#{$prefixCls} {
        .compound-dialog {
            background: transparent;
            .el-dialog__header {
                padding: 0;
            }
            .el-dialog__body {
                padding: 0;
                text-align: center;
            }
        }
        .el-input-number {
            width: 1.6rem;
            line-height: .4rem;
            margin-left: .1rem;

            .el-input-number__decrease,
            .el-input-number__increase {
                width: .4rem;
                background: #32A3FF;
                color: #fff;
                border: 0;
            }

            .el-input__inner {
                width: .8rem;
                height: .4rem;
                padding: 0;
                background: #1D2633;
                border: 0;
                color: #fff;
            }
        }

        .content {
            width: 7rem;

            .main-cot {
                background: #131922;
                text-align: center;
                border-radius: .133333333333333rem;
                overflow: hidden;

                .compound-thing {
                    img {
                        display: block;
                        width: 100%;
                        height: 4rem;
                    }
                }

                .arrow-icon {
                    margin: .266666666666667rem 0;
                    text-align: center;

                    img {
                        width: .426666666666667rem;

                    }
                }

                .debris-thing {
                    position: relative;
                    width: 2.133333333333333rem;
                    height: 2.133333333333333rem;
                    padding-top: .2rem;
                    text-align: center;
                    margin: 0 auto;
                    border: 1px solid #777E90;
                    border-radius: .266666666666667rem;

                    img {
                        width: 1.6rem;
                        height: 1.6rem;
                    }

                    .count-info {
                        position: absolute;
                        bottom: -.24rem;
                        left: 50%;
                        width: max-content;
                        height: .48rem;
                        padding: 0 .16rem;
                        line-height: .48rem;
                        text-align: center;
                        border: 2px solid #777E90;
                        border-radius: .266666666666667rem;
                        font-size: .24rem;
                        color: #777E90;
                        background: #131922;
                        transform: translateX(-50%);

                        .has-count {
                            color: #00A73A;
                        }
                    }
                }

                .tip-count {
                    margin-top: .5rem;
                    color: #777E90;
                    font-size: .213333333333333rem;

                    >div {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: .173333333333333rem;
                    }
                }

                .syn {
                    width: 5.866666666666666rem;
                    height: .8rem;
                    margin: .3rem auto;
                    line-height: .8rem;
                    background: #9E00FF;
                    color: #fff;
                    font-size: .293333333333333rem;
                    text-align: center;
                    border-radius: .133333333333333rem;
                    cursor: pointer;
                }
            }



        }

        .close {
            margin-top: .533333333333333rem;


            img {
                width: .666666666666667rem;
                height: .666666666666667rem;
                cursor: pointer;
            }

        }
    }
</style>