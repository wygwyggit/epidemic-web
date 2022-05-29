<template>
    <div :class="prefixCls">
        <div class="content">
            <div class="img-warp">
                <div class="gift-title">
                    {{ giftInfo.title }}
                </div>
                <img :src="giftInfo.image">
                <div class="left" @click="handleRow('-')" v-if="rowList.length > 1">&lt;</div>
                <div class="right" @click="handleRow('+')" v-if="rowList.length > 1">&gt;</div>
            </div>
            <div class="tip">
                <span>{{ $t("account.congratulation")}}</span>
                <span class="tip-name">{{ giftInfo.name }}</span>
            </div>
            <div class="close">
                <img src="../../../../assets/images/g-close.png" alt="" @click="doClose">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gift-bag',
        components: {},
        props: {
            rowList: {
                type: Array,
                require: true
            }
        },
        data() {
            return {
                prefixCls: 'views-account-gift-bag',
                curIdx: 0,
                giftInfo: {}
            }
        },
        computed: {},
        watch: {},
        created() {
            this.giftInfo = this.rowList[0]
            this.giftInfo.title = this.giftInfo.name.split('-')[3]
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            handleRow(type) {
                if(type === '-' && this.curIdx > 0) {
                    this.curIdx--
                } else if(type === '+' && this.curIdx < this.rowList.length - 1 ) {
                    this.curIdx++
                }
                this.giftInfo = this.rowList[this.curIdx]
                this.giftInfo.title = this.giftInfo.name.split('-')[3]
            },
            doClose() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: "views-account-gift-bag";
    .#{$prefixCls} {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;

        .content {
            position: relative;
            text-align: center;
            top: .6rem;

            &::before {
                content: "";
                position: absolute;
                top: -3.02rem;
                left: -.5rem;
                width: 7.52rem;
                height: 3.026666666666667rem;
                background: url('../../../../assets/images/gift-bg.png');
                background-size: cover;
                z-index: 9999;

            }

            .close {
                margin-top: .533333333333333rem;


                img {
                    width: .666666666666667rem;
                    height: .666666666666667rem;
                    cursor: pointer;
                }

            }

            .tip {
                font-size: .266666666666667rem;
                color: #fff;

                span {
                    display: block;
                    margin: .16rem 0;

                    &.tip-name {
                        color: #31CA70;
                    }
                }
            }

            .img-warp {
                position: relative;
                width: 6.4rem;
                height: 5.066666666666666rem;
                border: 2px solid #31CA70;
                border-radius: .266666666666667rem;
                overflow: hidden;

                .left,
                .right {
                    position: absolute;
                    top: 50%;
                    z-index: 9999;
                    color: #fff;
                    cursor: pointer;
                }

                .left {
                    left: 20px;
                }

                .right {
                    right: 20px;
                }
                

                img {
                    width: 100%;
                    height: 100%;

                }

                .gift-title {
                    position: absolute;
                    left: 50%;
                    top: -.533333333333333rem;
                    width: 4.626666666666667rem;
                    height: 1rem;
                    line-height: 1rem;
                    background: #181E34;
                    color: #fff;
                    font-weight: bold;
                    font-size: .426666666666667rem;
                    transform: translateX(-50%);
                    border-radius: .266666666666667rem;
                    border: .053333333333333rem solid #31CA70;
                    z-index: 9999;
                }
            }
        }
    }
</style>