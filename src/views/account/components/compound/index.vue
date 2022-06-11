<template>
    <div :class="prefixCls">
        <el-dialog custom-class="compound-dialog" :close-on-click-modal="false" :show-close="false" top="11vh"
            :visible.sync="isShowDialog" :width="dialogWidth" v-if="isShowDialog">
            <div class="content">
                <div class="main-cot" v-if="!isShowFormWrapper">
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
                            <span class="has-count">{{ row.num || 0}} </span>
                            /
                            <span class="consume-count">{{ needNum }}</span>
                        </div>
                    </div>
                    <div class="tip-count">
                        <template>
                            <div v-if="row.type_id == 22">{{ $t("exchange.you-will-burn-100-Phone")}}</div>
                            <div v-if="row.type_id == 23">{{ $t("exchange.you-will-burn-100-Car")}}</div>
                            <div v-if="row.type_id == 24">{{ $t("exchange.you-will-burn-100-Panamera")}}</div>
                            <template v-if="row.type_id == 2 || row.type_id == 3">
                                <div>
                                    {{ $t("exchange.compound-tip1")}}
                                    <span v-if="row.type_id == 3" class="type-name">{{ $t("exchange.sliver-pack") }}</span>
                                    <span v-if="row.type_id == 2" class="type-name">{{ $t("exchange.gold-pack") }}</span>
                                </div>
                                <div>
                                    <span>{{ $t("exchange.compound-tip2")}}</span>
                                    <el-input-number v-model="num" size="mini" @change="handleChange"
                                        @keydown.native="e => e.returnValue = ''" :min="0" :max="maxContent">
                                    </el-input-number>
                                </div>

                            </template>
                        </template>
                    </div>
                    <el-button type="primary" class="syn" @click="doCompound" :disabled="maxContent <= 0"
                        v-if="row.belong_type !== -2">
                        {{ $t("account.synthetic") }}</el-button>
                    <el-button type="primary" class="syn" @click="doNext" :disabled="maxContent <= 0" v-else>{{ $t("exchange.next") }}
                    </el-button>

                </div>
                <div class="form-cot" v-else>
                    <div class="tip">
                        {{ $t("exchange.please-fill-in-the-complete-information") }}
                    </div>
                    <el-form ref="ruleForm" :rules="rules" :model="form" label-position="top" label-width="80px">
                        <el-form-item :label="$t('exchange.name')" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('exchange.phone-number')" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('exchange.telegram')" prop="telegram">
                            <el-input v-model="form.telegram"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('exchange.e-mail')" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('exchange.delivery-address')" prop="delivery_addr">
                            <el-input type="textarea" v-model="form.delivery_addr"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="btn-wrapper">
                                <el-button type="primary" class="syn" @click="submitForm"> {{ $t("exchange.confirm-exchange") }}</el-button>
                            </div>

                        </el-form-item>
                    </el-form>
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
            },
        },
        data() {
            return {
                prefixCls: 'views-account-compound',
                isShowDialog: true,
                isShowFormWrapper: false,
                submitLoading: false,
                needNum: 100,
                dialogWidth: '480px',
                num: '',
                form: {
                    name: '',
                    phone: '',
                    telegram: '',
                    email: '',
                    delivery_addr: ''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    }, ],
                    phone: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    }, ],
                    telegram: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    }, ],
                    email: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    }, ],
                    delivery_addr: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    }, ]
                }
            }
        },
        computed: {
            maxContent() {
                return parseInt(this.row.num / this.needNum)
            }
        },
        watch: {},
        created() {
            if (this.row.type_id == 2 || this.row.type_id == 3) {
                this.needNum = 10
            }
            let width = window.innerWidth;
            if (width < 768) {
                this.dialogWidth = "8.9rem";
            }
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            doNext() {
                this.isShowFormWrapper = true
            },
            handleChange() {

            },
            submitForm() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.submitLoading = true
                        myAjax({
                            url: 'exchange/submit',
                            data: {
                                body: {
                                    type_id: this.row.type_id,
                                    ...this.form,
                                }
                            }
                        }).then(res => {
                            if (res.ok) {
                                this.$showOk(this.$t("common.ope-suc"))
                                this.isShowDialog = this.submitLoading = false
                                const data = [res.data]
                                this.$emit('compoundSuc', data)
                            }
                        })
                    }
                });
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
                display: none;
                padding: 0;
            }

            .el-dialog__body {
                padding: 0;
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
            width: 100%;

            .syn {
                width: 5.866666666666666rem;
                height: .8rem;
                line-height: .8rem;
                padding: 0;
                margin: .3rem auto;
                background: #9E00FF;
                color: #fff;
                font-size: .293333333333333rem;
                text-align: center;
                border-radius: .133333333333333rem;
                cursor: pointer;
                border: 0;

                &.is-disabled {
                    background: #777E90;
                    cursor: not-allowed;
                }
            }

            .main-cot {
                padding-bottom: .2rem;
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
                    padding: 0 .5rem;
                    margin-top: .5rem;
                    color: #777E90;
                    word-break: break-word;
                    font-size: .213333333333333rem;

                    >div {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: .173333333333333rem;
                        .type-name {
                            margin-left: .08rem;
                        }
                    }
                }
            }

            .form-cot {
                padding: .16rem .266666666666667rem .453333333333333rem .266666666666667rem;
                background: #131922;

                .tip {
                    background: #151D27;
                    padding: .266666666666667rem .2rem;
                    font-size: .24rem;
                    color: #fff;
                    word-break: break-word;
                    border-radius: .133333333333333rem;
                }

                .btn-wrapper {
                    text-align: center;

                    .syn {
                        margin-bottom: 0;
                        width: 100%;
                    }
                }
            }

            .el-form {
                .el-form-item__label {
                    padding-bottom: 0;
                    color: #777E90;
                    font-size: .2rem;
                }

                .el-input__inner,
                .el-textarea__inner {
                    background: transparent;
                    border-color: #29374B;
                }

            }

        }

        .close {
            margin-top: .533333333333333rem;
            text-align: center;

            img {
                width: .666666666666667rem;
                height: .666666666666667rem;
                cursor: pointer;
            }

        }
    }

    @media (max-width: 768px) {
        .#{$prefixCls} {
            .syn {
                font-size: .586666666666667rem !important;
                height: 1.333333333333333rem !important;
            }
        }
    }
</style>