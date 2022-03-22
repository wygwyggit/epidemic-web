<template>
    <div :class="prefixCls">
        <div class="banner">
        </div>
        <div class="content-box">
            <div class="blind-box">
            </div>
            <p>You can open <span class="num">10</span> more boxes today</p>
            <div class="open-btn-info">
                <div class="ipt">10,000,000Adoge/BOX</div>
                <el-button type="primary">OPEN</el-button>
            </div>
        </div>
        <div class="invitation-reward">
          <div class="w">
            <div class="left">
              <p class="label">Your invitation</p>
              <div class="val">
                https://amazingdogebsc.com/nft?ref=5q9h4j1gyad8v1sao5ljzctgwm810uj
                <el-button type="primary">OPEN</el-button>
              </div>
            </div>
            <div class="right">
              <p class="label">Your reward</p>
              <div class="val">
                1,000,000,000 Adoge
                <el-button type="primary">receive</el-button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "views-home",
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {},
    };
</script>
<style lang="scss" scoped>
    $prefixCls: "views-home";

    .#{$prefixCls} {
        .banner {
            height: 248px;
            background: url('../../assets/images/home-bg.png');
            background-size: cover;
        }

        .content-box {
            position: relative;
            padding-top: 86px;
            height: 180px;
            background: #16161C;
            text-align: center;

            .blind-box {
                position: absolute;
                top: -90%;
                left: 50%;
                width: 334px;
                height: 285px;
                background: url('../../assets/images/blindbox.png');
                transform: translate(-55%, 0);
                background-size: 100% 100%;
                cursor: pointer;
                text-align: center;

                &::before {
                    content: "Open Blindbox";
                    position: relative;
                    top: -40px;
                    left: 15px;
                    font-size: 24px;
                    color: #fff;
                    font-weight: 600;
                    text-align: center;
                }
            }

            >p {
                color: #fff;

                .num {
                    color: #32A3FF;
                    font-size: 20px;
                }
            }

            .open-btn-info {
                display: flex;
                justify-content: center;
                margin-top: 16px;

                .ipt {
                    height: 34px;
                    line-height: 34px;
                    margin-right: 10px;
                    padding: 0 11px;
                    border: 2px solid #004D8C;
                    border-radius: 5px;
                    color: #32A3FF;
                }
                .el-button--primary {
                  padding: 0;
                  line-height: 34px;
                  width: 68px;
                  height: 34px;
                  text-align: center;
                }
            }
        }
        .invitation-reward {
          padding: 30px 0;
          height: 107px;
          background: #00457D;
          .w {
            display: flex;
            >div {
              flex: 1;
              .label {
                margin-bottom: 5px;
                color: #fff;
              }
              .val {
                position: relative;
                display: flex;
                align-items: center;
                height: 30px;
                padding-left: 10px;
                border: 1px solid #fff;
                border-radius: 6px;
                color: #fff;
                font-size: 12px;
                .el-button--primary {
                  position: absolute;
                  right: 2px;
                  padding: 0;
                  width: 68px;
                  height: 24px;
                  line-height: 24px;
                  text-align: center;
                }
              }
              &:first-child {
                margin-right: 39px;
              }
            }
          }
        }
        
    }
</style>