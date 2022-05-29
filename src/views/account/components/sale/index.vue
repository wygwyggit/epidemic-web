<template>
    <div :class="prefixCls">
        <el-dialog :title="$t('account.sale')" :visible.sync="isShowDialog" width="6.4rem"
            @closed="saleReviseDialogClosed" custom-class="sale-revise-dialog">
            <p class="tit">{{$t("account.price") }}</p>
            <div class="input-box">
                <div class="label">
                    <span>Adoge</span>
                </div>
                <el-input v-model="salePrice" :placeholder="$t('common.please-enter-price')"
                    onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
            </div>
            <p class="tip">{{$t("common.net-price-modified-tip")}}</p>
            <div class="opt-btn">
                <button class="btn" :class="{'confirmed': salePrice.length}" @click="sendSale">{{$t("common.confirmed") }} </button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import myAjax from '@/utils/ajax.js'
    export default {
        name: '',
        components: {},
        props: {
            goods_id: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'views-account-sale',
                isLoading: false,
                isShowDialog: true,
                salePrice: ''
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            sendSale() {
                this.isLoading = true
                myAjax({
                    url: 'goods/sale/nft',
                    data: {
                        body: {
                            goods_id: this.goods_id,
                            amount: parseInt(this.salePrice),
                        }
                    }
                }).then(res => {
                    if (res.ok) {
                        this.$emit('sendSaleOk')
                    }
                })
            },
            saleReviseDialogClosed() {
               this.$emit('close')
            }
        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: "views-account";

    .#{$prefixCls} {}
</style>