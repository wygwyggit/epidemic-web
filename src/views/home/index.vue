<template>
  <div :class="prefixCls">
    <div class="banner-warp">
      <el-carousel :height="imgHeight + 'px'">
        <el-carousel-item v-for="(item, index) in bannerImg" :key="index">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content w">
      <div class="about-yq">
        <div class="left">
          <div class="title-line">
            <span>关于疫情&新冠介绍</span>
          </div>
          <div class="txt-content">
            新型冠状病毒的英文名称为COVID-19，和世界卫生组织命名保持一致，中文名称不变。新型冠状病毒在临床上具有很强的传染性，早期起病隐匿，很多症状和感冒类似，容易被忽视，属于高传染性的疾病，临床上要早期隔离、早期诊断、早期治疗，通过核酸检测以及胸部CT检测可以确诊。新型冠状病毒在疾病的后期，对于肺脏的破坏非常严重，导致肺脏出现了大量的实变，大量黏液充斥在肺脏中，使肺脏无法正常呼吸，需要呼吸机进行辅助呼吸，同时需要生命支持系统进行对症治疗，治疗难度很大，死亡率也很高。
          </div>
        </div>
        <div class="right">
          <img src="@/assets/images/about.png" alt="" />
        </div>
      </div>
      <div class="main">
        <div class="category china-s">
          <div class="title">
            <div class="point"></div>
            <div class="text">全国疫情数据</div>
            <div class="point"></div>
          </div>
          <div class="sub-title">数据更新至 {{ listData.lastUpdateTime }}</div>
          <div class="content-list clearfix">
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>境外输入</div>
                <div class="count" style="color: #ffa352">
                  {{ (listData.chinaTotal.total || {}).input }}
                </div>
                <div class="added">
                  较昨日
                  <span> +{{ listData.chinaTotal.today.input }} </span>
                </div>
              </div>
            </div>
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>无症状感染者</div>
                <div class="count" style="color: #791618">
                  {{ (listData.chinaTotal.extData || {}).noSymptom }}
                </div>
                <div class="added">
                  较昨日
                  <span>
                    +{{ (listData.chinaTotal.extData || {}).incrNoSymptom }}
                  </span>
                </div>
              </div>
            </div>
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>累计确诊</div>
                <div class="count" style="color: #e44a3d">
                  {{ (listData.chinaTotal.total || {}).confirm }}
                </div>
                <div class="added">
                  较昨日
                  <span> +{{ listData.chinaTotal.today.confirm }} </span>
                </div>
              </div>
            </div>
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>累计死亡</div>
                <div class="count" style="color: #333">
                  {{ (listData.chinaTotal.total || {}).dead }}
                </div>
                <div class="added">
                  较昨日
                  <span> +{{ listData.chinaTotal.today.dead }} </span>
                </div>
              </div>
            </div>
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>累计治愈</div>
                <div class="count" style="color: #34aa70">
                  {{ (listData.chinaTotal.total || {}).heal }}
                </div>
                <div class="added">
                  较昨日
                  <span> +{{ listData.chinaTotal.today.heal }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="category china-s">
          <div class="title">
            <div class="point"></div>
            <div class="text">湖南疫情数据</div>
            <div class="point"></div>
          </div>
          <div class="sub-title">数据更新至 {{ listData.lastUpdateTime }}</div>
          <div class="content-list clearfix">
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>累计死亡</div>
                <div class="count" style="color: #333">
                  {{ (listData.chinaTotal.extData || {}).noSymptom }}
                </div>
                <div class="added">
                  较昨日
                  <span>
                    +{{ (listData.chinaTotal.extData || {}).incrNoSymptom }}
                  </span>
                </div>
              </div>
            </div>
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>累计确诊</div>
                <div class="count" style="color: #e44a3d">
                  {{ (listData.chinaTotal.total || {}).confirm }}
                </div>
                <div class="added">
                  较昨日
                  <span> +{{ listData.chinaTotal.today.confirm }} </span>
                </div>
              </div>
            </div>
            <div class="list-card hvr-sweep-to-top">
              <div>
                <div class="name"><span>|</span>累计治愈</div>
                <div class="count" style="color: #34aa70">
                  {{ (listData.chinaTotal.total || {}).dead }}
                </div>
                <div class="added">
                  较昨日
                  <span> +{{ listData.chinaTotal.today.dead }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myAjax from "@/utils/ajax.js";
import moment from "moment";
export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-home",
      bannerImg: [
        require("@/assets/images/banner1.jpg"),
        require("@/assets/images/banner2.png"),
      ],
      listData: {},
      articleList: [],
      labelList: [],
    };
  },
  computed: {
    imgHeight() {
      return (document.body.clientWidth / 1920) * 550;
    },
  },
  watch: {},
  created() {
    Promise.all([this.getList()]).then(() => {});
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getList() {
      return new Promise((res, rej) => {
        myAjax({
          url: "ug/api/wuhan/app/data/list-total",
          method: "get",
        })
          .then((json) => {
            if (json.code == 10000) {
              this.listData = json.data || {};
              const arr = this.listData.areaTree.filter((x) => {
                return x.name == "湖南";
              });
              console.log(arr);
            }
            res();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    getArticleList() {
      return new Promise((res, rej) => {
        myAjax({
          url: "blog/list",
          data: {
            status: 1,
          },
        }).then((json) => {
          const list = json.data.list || [];
          list.forEach((x) => {
            x.createdAt = moment(x.created_at).format("YYYY-MM-DD HH:mm");
          });
          this.articleList = list;
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$prefixCls: "views-home";

.#{$prefixCls} {
  .hvr-sweep-to-top {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }
  .hvr-sweep-to-top:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(140deg, #76b5ff 0%, #508bff 100%);
    transform: scaleY(0);
    transform-origin: 50% 100%;
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    border-radius: 8px;
  }
  .hvr-sweep-to-top:active,
  .hvr-sweep-to-top:focus,
  .hvr-sweep-to-top:hover {
    color: #fff;
  }
  .hvr-sweep-to-top:active:before,
  .hvr-sweep-to-top:focus:before,
  .hvr-sweep-to-top:hover:before {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  .banner-warp {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // 统一的标题样式
  .title-line {
    padding-left: 10px;
    position: relative;
    border-left: 4px solid $--color-primary;
    span {
      display: inline-block;
      font-size: 30px;
    }
  }

  .about-yq {
    display: flex;
    justify-content: space-between;
    margin-top: 65px;
    .left {
      .txt-content {
        line-height: 23px;
        padding: 40px 0 46px 0;
      }
    }

    .right {
      margin-left: 140px;

      img {
        width: 250px;
      }
    }
  }

  .main {
    padding: 10px 0 30px 0;
    .category {
      padding-bottom: 75px;
      .title {
        display: flex;
        align-items: center;
        width: 280px;
        margin: 0 auto;
        .point {
          width: 13px;
          height: 13px;
          background: $--color-primary;
        }
        .text {
          font-size: 30px;
          color: #000;
          margin: 0 30px;
        }
      }
      .sub-title {
        margin: 10px 0;
        margin-left: -20px;
        text-align: center;
        color: #999;
      }
      .content-list {
        width: 1180px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .list-card {
        display: flex;
        justify-content: center;
        width: 220px;
        background: #fff;
        box-shadow: 0 3px 35px 0 rgba(225, 225, 225, 0.5);
        border-radius: 6px;
        margin-right: 16px;
        margin-top: 20px;
        padding: 23px;
        cursor: pointer;
        .name {
          color: #000;
          font-size: 25px;
          span {
            margin-right: 5px;
            color: #508bff;
          }
        }
        .count {
          margin: 10px 0;
          font-size: 38px;
        }
        .added {
          color: #999;
        }
        &:hover {
          .name,
          span,
          .added {
            color: #fff;
          }
        }
      }
    }

    .aside-wrapper {
      width: 296px;
      margin-left: 42px;

      > div {
        margin-bottom: 55px;
      }

      .el-tag {
        height: 26px;
        line-height: 26px;
        color: #fff;
        border-radius: 4px;
        margin-right: 10px;
        margin-bottom: 14px;
        background-color: #5d5d5d;
        text-align: center;
        border: 0;

        &:nth-child(3n) {
          margin-right: 0;
        }
      }

      .news {
        ul li {
          margin-top: 21px;
          border-bottom: 1px dashed $--border-color-base;

          .top {
            display: flex;
            justify-content: space-between;
            color: #333;
          }

          .bottom {
            padding: 8px 0 20px 0;
          }
        }
      }

      .tags {
        .tags-list {
          padding-top: 28px;

          .el-tag {
            width: 92px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .friends {
        .url-content {
          .tp {
            padding: 29px 0 20px 0;
          }
        }
      }
    }
  }
}
</style>
