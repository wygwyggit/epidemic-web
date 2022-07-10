<template>
    <div :class="prefixCls">
        <el-dialog title="Expand" :visible.sync="isShowDialog" width="6.4rem" @close="expandDialogClosed"
            custom-class="memory-expand-dialog" :close-on-click-modal="false">
            <div class="content">
                <img src="./memory-expand.png" alt="">
                <template v-if="!isSucceeded">
                    <el-input v-model="quantity" placeholder="Please enter quantity"></el-input>
                    <div class="adoge-balance">
                        <img src="../../../../assets/images/adoge-token.png" alt="">
                        <span>100,000,000</span> ADOGE
                    </div>
                </template>
                <template v-else>
                    <p class="expand-success">
                        Expansion succeeded Please wait for confirmation
                    </p>
                </template>

                <el-button type="primary">主要按钮</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'net-mining-expand',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'views-net-mining-expand',
                isShowDialog: true,
                quantity: "",
                isSucceeded: false
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            expandDialogClosed() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss">
    $prefixCls: 'views-net-mining-expand';

    .#{$prefixCls} {
        .content {
            text-align: center;

            >img {
                width: 2.133333333333333rem;
            }
            .expand-success {
                margin: .4rem auto 0;
                width: 3.76rem;
                color: #777E90;
                font-size: .266666666666667rem;
            }

            .el-input {
                margin: .4rem 0 .266666666666667rem;

                .el-input__inner {
                    height: .8rem;
                    line-height: .8rem;
                    border: 0;
                    background: #1D2633;
                    color: #fff;
                    font-size: .373333333333333rem;
                    text-align: center;
                    border-radius: .133333333333333rem;

                    &::placeholder {
                        font-size: .24rem;
                        color: #777E90;
                    }
                }
            }

            .adoge-balance {
                font-size: .426666666666667rem;
                color: #fff;

                img {
                    margin-right: .2rem;
                    width: .4rem;
                    vertical-align: middle;
                }
            }

            .el-button {
                margin-top: .4rem;
                width: 100%;
                height: .8rem;
                font-size: .32rem;
            }
        }

    }
</style>