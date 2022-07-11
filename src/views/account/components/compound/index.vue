<template>
    <div :class="prefixCls">
        <el-dialog custom-class="compound-dialog" :close-on-click-modal="false" top="11vh" :visible.sync="isShowDialog"
            :width="dialogWidth" v-if="isShowDialog" @close="doClose">
            <div slot="title" v-if="!isShowFormWrapper">
                <div class="compound-thing">
                    <img :src="netImgBaseUrl + row.image" v-if="row.belong_type === -10" alt="" class="material-nft">
                    <img :src="require(`./images/${row.name.toLowerCase().replace(/\s+/g, '-')}.png`)" v-else alt="">
                </div>
            </div>
            <div slot="title" v-else>
                <div class="compound-back" @click="() => this.isShowFormWrapper = false">
                    <img src="../../../../assets/images/back2.png" />
                </div>
            </div>
            <div class="compound-content">
                <div class="main-cot" v-if="!isShowFormWrapper">
                    <template v-if="row.belong_type != -10">
                        <div class="arrow-icon">
                            <img src="./images/arrow.png" alt="">
                        </div>
                        <div class="debris-thing">
                            <img :src="netImgBaseUrl + row.image" />
                            <div class="count-info">
                                <span class="has-count">{{ row.num || 0}} </span>
                                /
                                <span class="consume-count">{{ needNum }}</span>
                            </div>
                        </div>
                    </template>

                    <div class="tip-count">
                        <div v-if="row.type_id == 2 || row.type_id == 3">
                            {{ $$t("exchange", "compound-tip-a")}}{{ needNum || 0 }}
                            {{ row.type_id == 3 ? $$t("account.bronze-medal") : $$t("exchange" ,"sliver-pack") }}
                            {{ $$t("exchange", "compound-tip-b")}}
                            <span v-if="row.type_id == 3" class="type-name">{{ $$t("exchange", "sliver-pack") }}</span>
                            <span v-if="row.type_id == 2" class="type-name">{{ $$t("exchange", "gold-pack") }}</span>
                        </div>
                        <div v-else-if="row.belong_type === -10">
                            {{ $$t("exchange", "you-will-trade") }}{{ row.name }}{{ $$t("exchange", "card") }}{{ $$t("exchange", "for-real") }}{{ row.name }}
                        </div>
                        <div v-else>
                            {{ $$t("exchange", "you-will-burn") }}{{ needNum || 0 }}{{ $$t("exchange", "shards") }}{{ $$t("exchange", "to-get") }}{{ translateName }}
                        </div>
                        <div v-if="row.can_merge">
                            <span>{{ $$t("exchange", "compound-tip-c")}}
                                <!-- {{row.type_id == 2 ? $$t("exchange", "gold-pack") : $$t("exchange", "sliver-pack")}}{{ $$t("exchange", "compound-tip-d")}} -->
                            </span>
                            <el-input-number v-model="num" size="mini" @change="handleChange"
                                @keydown.native="e => e.returnValue = ''" :min="0" :max="maxContent">
                            </el-input-number>
                        </div>
                    </div>
                    <!-- <el-button type="primary" class="syn" v-debounce="doCompound" :disabled="maxContent <= 0"
                        v-if="[2, 3].includes(row.type_id)">
                        {{ $$t("account.synthetic") }}</el-button> -->
                    <!-- <el-button type="primary" class="syn" @click="doNext"
                        :disabled="maxContent <= 0 && row.belong_type !== -10" v-else>
                        {{ $$t("exchange", "next") }}
                    </el-button> -->
                     <el-button type="primary" class="syn" v-debounce="doCompound"
                        v-if="[2, 3].includes(row.type_id)">
                        {{ $$t("account.synthetic") }}</el-button>
                    <el-button type="primary" class="syn" @click="doNext"
                         v-else>
                        {{ $$t("exchange", "next") }}
                    </el-button>

                </div>
                <div class="form-cot" v-else>
                    <div class="tip">
                        {{ $$t("exchange" ,"please-fill-in-the-complete-information") }}
                    </div>
                    <el-form ref="ruleForm" :rules="rules" :model="form" label-position="top" label-width="80px">
                        <el-form-item :label="$$t('exchange', 'name')" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="$$t('exchange', 'phone-number')" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item :label="$$t('exchange', 'telegram')" prop="telegram">
                            <el-input v-model="form.telegram"></el-input>
                        </el-form-item>
                        <el-form-item :label="$$t('exchange', 'e-mail')" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item :label="$$t('exchange', 'delivery-address')" prop="delivery_addr">
                            <el-input type="textarea" v-model="form.delivery_addr"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="btn-wrapper">
                                <el-button type="primary" class="syn" v-debounce="submitForm">
                                    {{ $$t("exchange", "confirm-exchange") }}</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>

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
    import {
        netImgBaseUrl
    } from '@/config/config.js'
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
                netImgBaseUrl,
                isShowDialog: true,
                isShowFormWrapper: false,
                submitLoading: false,
                dialogWidth: '480px',
                needNum: 0,
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
                if (!this.needNum) return 0
                return parseInt(this.row.num / this.needNum)
            },
            translateName() {
                return this.row.name.replace(/Shards/ig, '').replace('-', '')
            }
        },
        watch: {},
        created() {
            this.getNeedNum()
            let width = window.innerWidth;
            if (width < 768) {
                this.dialogWidth = "8.9rem";
            }
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            getNeedNum() {
                if (this.row.can_merge) {
                    this.needNum = this.row.merge_num || 0
                } else if (this.row.can_exchange) {
                    this.needNum = this.row.exchange_num || 0
                }
                console.log(this.row)
            },
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
                                this.$showOk(this.$$t("common.ope-suc"))
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
                            num: this.num * this.needNum
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        const data = (res.data || {}).items || []
                        data.forEach(x => {
                            if (x.name.includes('-')) {
                                x.title = x.name.split('-')[3]
                            } else {
                                x.title = x.name
                            }
                        });
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
                background: #131922;
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

        .compound-thing {
            img {
                display: block;
                width: 100%;
                height: 4rem;
            }

            .material-nft {
                height: auto;
            }

        }

        .compound-back {
            padding-top: .2rem;
            padding-left: .26rem;
            cursor: pointer;

            img {
                width: 38px;
            }
        }

        .compound-content {
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