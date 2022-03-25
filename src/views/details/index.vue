<template>
  <div class="details-wrap">
    <div class="detail-con">
      <div class="detail-main w">
        <div class="back" @click="goBack">
          {{ $t("common.back") }}
        </div>
        <div class="min-back" @click="goBack">
          <img src="../../assets/images/back2.png" />
          <span class="con"># 010001</span>
        </div>
        <div class="blind-box">
          <div class="left">
            <img src="../../assets/images/product.png" />
          </div>
          <div class="right">
            <div class="anchor"># 010001</div>
            <div class="title">CZ Hoodie Limited NFT</div>
            <div class="tip">Diamond Color, Amazing Everyday!</div>
            <div class="attribute-wrap border">
              <div class="attr-title top">
                <img src="../../assets/images/bookmark.png" />
                {{ $t("detail.attribute") }}
              </div>
              <div class="attr-name">
                <div class="item">
                  <label class="label"> {{ $t("detail.color") }}:</label>
                  <p class="con">{{ $t("account.diamond") }}</p>
                </div>
                <div class="item">
                  <label class="label">{{ $t("account.level") }}:</label>
                  <p class="con">Lv8</p>
                </div>
              </div>
            </div>
            <div class="price-wrap border">
              <div class="price-title top">
                <img src="../../assets/images/price_tag.png" />
                {{ $t("account.price") }}
              </div>
              <div class="con">
                <div class="price-title">{{ $t("account.price") }}:</div>
                <div class="price">
                  15,000,000,000 Adoge
                  <div class="price-bnb">≈ 5.55 BNB</div>
                </div>
                <div class="bnb">≈ 5.55 BNB</div>
                <!-- 状态区分 -->
                <button class="buy" v-if="false">{{ $t("detail.buy") }}</button>
                <div class="operate">
                  <button class="revise">{{ $t("detail.revise") }}</button>
                  <button class="cancel-sale">
                    {{ $t("detail.cancelSale") }}
                  </button>
                </div>
              </div>
            </div>
            <div class="owner">
              <label class="label">{{ $t("detail.owner") }}</label
              >: 0xf23570fd586cabfcfd5df8772be02609
            </div>
          </div>
        </div>
        <div class="sale-history border">
          <div class="sale-title top">
            <img src="../../assets/images/clock.png" />
            {{ $t("detail.sale-history") }}
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            :highlight-current-row="false"
          >
            <el-table-column prop="date">
              <template slot="header">
                {{ $t("detail.buyer") }}
              </template>
              <template slot-scope="scope">
                <a href="javascript:;">{{ scope.row.date }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="name">
              <template slot="header">
                {{ $t("detail.seller") }}
              </template>
              <template slot-scope="scope">
                <a href="javascript:;">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="Price">
              <template slot="header">
                {{ $t("account.price") }}
              </template>
              <template slot-scope="scope">
                <div class="group">
                  <img src="../../assets/images/group.png" alt="" />
                  {{ scope.row.Price }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Date">
              <template slot="header"> {{ $t("detail.date") }} UTC </template>
            </el-table-column>
            <el-table-column prop="Txn">
              <template slot="header">
                {{ $t("detail.txn-hash") }}
              </template>
              <template slot-scope="scope">
                <a href="javascript:;">{{ scope.row.Txn }}</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="recommend-wrap">
          <div class="rd-top">
            <div class="rd-title">{{ $t("detail.recommend") }}</div>
            <div class="rd-more">
              {{ $t("detail.more") }}
              <img src="../../assets/images/vector.png" alt="" />
            </div>
          </div>
          <div class="rd-list">
            <div class="rd-item">
              <div class="rd-diamond">
                <div class="left"># 010001</div>
                <div class="right">{{ $t("account.diamond") }}</div>
              </div>
              <div class="info">
                <img src="../../assets/images/product.png" />
                <div class="name">CZ Hoodie Limited NFT</div>
              </div>
              <div class="rd-price">
                <div class="rd-price-title">{{ $t("account.price") }}</div>
                <div class="rd-price-con">1,000,000,000 Adoge</div>
              </div>
            </div>
            <div class="rd-item">
              <div class="rd-diamond">
                <div class="left"># 010001</div>
                <div class="right">{{ $t("account.diamond") }}</div>
              </div>
              <div class="info">
                <img src="../../assets/images/product.png" />
                <div class="name">CZ Hoodie Limited NFT</div>
              </div>
              <div class="rd-price">
                <div class="rd-price-title">{{ $t("account.price") }}</div>
                <div class="rd-price-con">1,000,000,000 Adoge</div>
              </div>
            </div>
            <div class="rd-item">
              <div class="rd-diamond">
                <div class="left"># 010001</div>
                <div class="right">{{ $t("account.diamond") }}</div>
              </div>
              <div class="info">
                <img src="../../assets/images/product.png" />
                <div class="name">CZ Hoodie Limited NFT</div>
              </div>
              <div class="rd-price">
                <div class="rd-price-title">{{ $t("account.price") }}</div>
                <div class="rd-price-con">1,000,000,000 Adoge</div>
              </div>
            </div>
            <div class="rd-item">
              <div class="rd-diamond">
                <div class="left"># 010001</div>
                <div class="right">{{ $t("account.diamond") }}</div>
              </div>
              <div class="info">
                <img src="../../assets/images/product.png" />
                <div class="name">CZ Hoodie Limited NFT</div>
              </div>
              <div class="rd-price">
                <div class="rd-price-title">{{ $t("account.price") }}</div>
                <div class="rd-price-con">1,000,000,000 Adoge</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "0xa36954...86ce",
          name: "0xfcd548...87a8",
          Price: "5,500,000,000 Adoge",
          Date: "2022-03-13 14:26:50",
          Txn: "0xee5808...839f",
        },
        {
          date: "0xa36954...86ce",
          name: "0xfcd548...87a8",
          Price: "5,500,000,000 Adoge",
          Date: "2022-03-13 14:26:50",
          Txn: "0xee5808...839f",
        },
        {
          date: "0xa36954...86ce",
          name: "0xfcd548...87a8",
          Price: "5,500,000,000 Adoge",
          Date: "2022-03-13 14:26:50",
          Txn: "0xee5808...839f",
        },
        {
          date: "0xa36954...86ce",
          name: "0xfcd548...87a8",
          Price: "5,500,000,000 Adoge",
          Date: "2022-03-13 14:26:50",
          Txn: "0xee5808...839f",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
  },
};
</script>

<style lang='scss' scoped>
.details-wrap {
  padding: 45px 0;
  text-align: center;
  background-color: #131922;

  .detail-main {
    .back {
      width: 136px;
      height: 56px;
      padding-left: 10px;
      line-height: 50px;
      color: #32a3ff;
      margin: 50px 0;
      border-radius: 90px;
      border: 2px solid #004d8c;
      background: url("../../assets/images/back.png");
      background-repeat: no-repeat;
      background-position: 15px center;
      cursor: pointer;
      font-size: 18px;
    }

    .min-back {
      display: none;
    }

    .border {
      border: 1px solid #152132;
    }

    .price-wrap,
    .attribute-wrap,
    .sale-history {
      .top {
        display: flex;
        align-items: center;
        padding: 8px 10px;
        font-size: 14px;
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
        color: #fff;
        line-height: 16px;
        border-bottom: 1px solid #152132;

        img {
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
      }
    }

    .blind-box {
      display: flex;
      align-items: center;
      justify-content: center;

      .left {
        width: 560px;
        height: 560px;
        padding: 12px;
        border-radius: 10px;
        box-sizing: border-box;
        border: 1px solid #004d8c;

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }

      .right {
        margin-left: 42px;
        text-align: left;

        .anchor {
          font-size: 24px;
          font-family: Poppins-Medium, Poppins;
          font-weight: 500;
          color: #fff;
          line-height: 16px;
        }

        .title {
          font-size: 36px;
          font-family: Poppins-Bold, Poppins;
          font-weight: bold;
          color: #32a3ff;
          line-height: 48px;
        }

        .tip {
          font-size: 14px;
          font-family: Poppins-Medium, Poppins;
          font-weight: 500;
          color: #777e90;
          line-height: 16px;
        }

        .attribute-wrap {
          width: 480px;
          height: 96px;
          margin-top: 30px;
          border-radius: 5px;

          .attr-name {
            display: flex;
            align-items: center;
            padding: 20px;

            .item {
              display: flex;
              align-items: center;
              margin-right: 80px;
            }

            .label {
              font-size: 14px;
              font-family: Poppins-Medium, Poppins;
              font-weight: 500;
              color: #777e90;
              line-height: 16px;
            }

            .con {
              margin-left: 8px;
              font-size: 18px;
              font-family: Poppins-Bold, Poppins;
              font-weight: bold;
              color: #32a3ff;
              line-height: 16px;
            }
          }
        }

        .price-wrap {
          margin-top: 20px;

          .con {
            padding: 20px;

            .price-title {
              display: none;
            }

            .price-bnb {
              display: none;
            }

            .price {
              font-size: 32px;
              font-family: Poppins-SemiBold, Poppins;
              font-weight: 600;
              color: #fff;
              line-height: 32px;
            }

            .bnb {
              font-size: 24px;
              font-family: Poppins-SemiBold, Poppins;
              font-weight: 600;
              color: #777e90;
              line-height: 32px;
            }

            .buy {
              width: 100%;
              height: 60px;
              margin-top: 10px;
              background: #00a73a;
              border-radius: 10px;

              font-size: 24px;
              font-family: Poppins-Bold, Poppins;
              font-weight: bold;
              color: #fcfcfd;
              line-height: 60px;
              border: none;
            }

            .operate {
              display: flex;

              .revise,
              .cancel-sale {
                height: 60px;
                font-size: 22px;
                font-weight: 600;
                color: #fcfcfd;
                line-height: 60px;
                border: none;
                border-radius: 10px;
              }

              .revise {
                width: 40%;
                background: #777e90;
              }

              .cancel-sale {
                width: 60%;
                margin-left: 10px;
                background: #ff5e19;
              }
            }
          }
        }

        .owner {
          margin-top: 30px;
          font-size: 16px;
          font-family: Poppins-Medium, Poppins;
          font-weight: 500;
          color: #5b82e3;
          line-height: 16px;
          border: none;

          .label {
            color: #777e90;
          }
        }
      }
    }

    .sale-history {
      margin-top: 45px;

      /deep/ .el-table,
      /deep/ .el-table__expanded-cell,
      /deep/ .el-table tr,
      /deep/ .el-table th.el-table__cell,
      /deep/ .el-table--border::after,
      /deep/ .el-table--group::after,
      /deep/ .el-table::before {
        background-color: transparent !important;
      }

      /deep/ .el-table td.el-table__cell,
      /deep/ .el-table th.el-table__cell.is-leaf,
      /deep/ .el-table--border::after,
      /deep/ .el-table__row:hover {
        border-bottom: 1px solid #152132;
        background-color: transparent !important;
      }

      .group {
        display: flex;
        align-items: center;

        img {
          width: 48px;
          height: 48px;
          margin-right: 10px;
        }
      }
    }

    .recommend-wrap {
      margin-top: 110px;

      .rd-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 31px;
        border-bottom: 1px solid #152132;
      }

      .rd-title {
        font-size: 36px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #fff;
        line-height: 64px;
      }

      .rd-more {
        display: flex;
        align-items: center;
        font-size: 24px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #32a3ff;
        line-height: 32px;

        img {
          width: 18px;
          height: 18px;
          margin-left: 10px;
        }
      }

      .rd-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 45px;

        .rd-item {
          padding: 6px;
          background: #1d2633;
          border-radius: 10px;
          border: 1px solid #004d8c;

          .rd-diamond {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .right,
            .left {
              font-size: 14px;
              font-family: Poppins-Medium, Poppins;
              font-weight: 500;
              color: #c4c4c4;
              line-height: 24px;
            }

            .right {
              color: #ffffff;
            }
          }

          .info {
            margin-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #131922;

            img {
              width: 220px;
              border-radius: 10px;
            }

            .name {
              margin-top: 20px;
              font-size: 18px;
              font-family: Poppins-SemiBold, Poppins;
              font-weight: 600;
              color: #ffffff;
              line-height: 24px;
            }
          }

          .rd-price-title {
            margin-top: 13px;
            font-size: 14px;
            font-family: Poppins-Medium, Poppins;
            font-weight: 500;
            color: #777e90;
            line-height: 18px;
          }

          .rd-price-con {
            font-size: 18px;
            font-family: Poppins-Medium, Poppins;
            font-weight: 500;
            color: #32a3ff;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
@media (max-width: 768px) {
  .details-wrap {
    padding: 0.4rem 0.8rem;

    .detail-main {
      .sale-history,
      .recommend-wrap,
      .back {
        display: none;
      }

      .min-back {
        display: flex;
        align-items: center;

        img {
          width: 0.9067rem;
          height: 0.9067rem;
        }

        .con {
          margin-left: 0.1867rem;
          font-size: 0.48rem;
          font-weight: 500;
          color: #fff;
          line-height: 0.4267rem;
        }
      }

      .blind-box {
        width: 100%;
        flex-direction: column;
        margin-top: 0.2667rem;
        text-align: center;

        .left {
          width: 8.4rem;
          height: 8.4rem;
          padding: 0;
          border-radius: 0.2667rem;
          border: none;
          box-sizing: border-box;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .right {
          width: 100%;
          margin-left: 0;
          margin-top: 0.2667rem;

          .anchor {
            display: none;
          }

          .title {
            font-size: 0.64rem;
            line-height: 0.64rem;
          }

          .tip {
            margin-top: 0.1333rem;
            font-size: 0.3733rem;
          }

          .top {
            display: none;
          }

          .attribute-wrap {
            width: 100%;
            height: auto;
            margin-top: 0.2667rem;
            border-radius: 0.2667rem;

            .attr-name {
              padding: 0.2667rem;
            }

            .attr-name .item {
              margin-right: 1.3333rem;

              .label {
                font-size: 0.3733rem;
              }

              .con {
                font-size: 0.48rem;
              }
            }
          }

          .price-wrap {
            border-radius: 0.2667rem;
          }

          .price-wrap .con {
            display: flex;
            align-items: center;
            padding: 0.1333rem 0.2667rem;
            box-sizing: border-box;

            .price-title {
              display: block;
              color: #777e90;
              font-size: 0.3733rem;
            }

            .price {
              margin-left: 0.3467rem;
              font-size: 0.4267rem;
              line-height: 1;

              .price-bnb {
                display: block;
                font-size: 0.3733rem;
                line-height: 1;
              }
            }

            .bnb {
              display: none;
            }

            .operate,
            .buy {
              position: fixed;
              left: 0;
              bottom: 0;
              width: 100%;
              border-radius: 0;
            }

            .buy {
              height: 2.1333rem;
              padding-bottom: 0.5333rem;
              font-size: 0.5867rem;
              font-weight: 600;
              color: #fcfcfd;
              line-height: 0.4267rem;
              box-sizing: border-box;
            }

            .operate {
              display: flex;

              .revise,
              .cancel-sale {
                height: 2.1333rem;
                padding-bottom: 0.5333rem;
                font-size: 0.5867rem;
                font-weight: 600;
                color: #fcfcfd;
                line-height: 0.4267rem;
                border: none;
                border-radius: 0;
                box-sizing: border-box;
              }

              .revise {
                width: 40%;
                background: #777e90;
              }

              .cancel-sale {
                width: 60%;
                margin-left: 0;
                background: #ff5e19;
              }
            }
          }

          .owner {
            border-radius: 0.2667rem;
            .label {
              color: #fff;
            }

            padding: 0.32rem 0.1333rem;
            color: #fff;
            font-size: 0.2667rem;
            border: 1px solid #152132;
            box-sizing: border-box;
            font-family: Poppins-Medium, Poppins;
          }
        }
      }
    }
  }
}
</style>