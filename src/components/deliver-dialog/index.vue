<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('common.deliver')" custom-class="deliver-dialog" :visible.sync="isShowDialog" width="6.4rem"
            v-if="isShowDialog">
            <div class="content">
                <div class="addr">
                    <div class="tit">{{$t('common.enter-address')}}</div>
                    <el-input v-model="addressTxt" :placeholder="$t('common.enter-ad-tip')"></el-input>
                </div>
                <div class="remaining-times"> 
                    {{$t('common.remain-times')}}: <span>3</span> 
                </div>
                <div class="tip">
                     {{$t('common.transferred-tip')}}
                </div>
                 <el-button type="primary" :disabled="!addressTxt" @click="doDeliver">{{$t('common.deliver')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Cookie from "@/utils/cookie.js";
    import myAjax from '@/utils/ajax.js'
    export default {
        name: '',
        components: {
            
        },
        props: {
            goods_id: {
                type: Number,
                require: true
            },
            goods_name: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'deliver-dialog',
                isShowDialog: true,
                addressTxt: ''
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            doDeliver() {
                myAjax({
                    url: 'user/give/create',
                    data: {
                        body: {
                            owner_addr: Cookie.getCookie("__account__") || null,
                            belong_type: 1,
                            goods_id: this.goods_id,
                            give_num: 1,
                            to_addr: this.addressTxt,
                            goods_name: this.goods_name
                        }
                    }
                }).then(res => {

                })
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: "deliver-dialog";

    .#{$prefixCls} {
        .deliver-dialog {
            .content {
                color: #777E90;

                .addr {
                    .tit {
                        font-size: .3rem;
                    }

                    .el-input {
                        input {
                            margin: .08rem 0;
                            height: 1.066666666666667rem;
                            line-height: 1.066666666666667rem;
                            background: #1D2633;
                            font-size: .24rem;
                            color: #777E90;
                            border-radius: .133333333333333rem;
                            border: 0;

                            &::-webkit-input-placeholder {
                                color: #777E90;

                            }
                        }
                    }
                }
                .remaining-times {
                    font-size: .24rem;
                }
                .tip {
                    margin: .426666666666667rem auto .15rem;
                    color: #FD671D;
                    text-align: center;
                }
                .el-button {
                    background-color: #F1AE00;
                    width: 100%;
                    border: 0;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    padding: 0;
                    font-size: .32rem;
                    border-radius: .133333333333333rem;
                    &.is-disabled {
                        background: #777E90;
                    }
                }

            }
        }
    }
</style>