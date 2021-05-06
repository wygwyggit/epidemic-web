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
        <div class="article-wrapper">
          <!-- 文章列表 -->
          <div class="list">
            <article-item-card
              v-for="item in articleList"
              :key="item.id"
              :articleInfo="item"
            >
            </article-item-card>
          </div>
          <div class="empty">
            <empty-data></empty-data>
          </div>
        </div>
        <div class="aside-wrapper">
          <div class="news" v-if="articleList.length">
            <div class="title-line">
              <span>最近更新</span>
              <span>News</span>
            </div>
            <ul>
              <li>
                <p class="top">
                  <span>2020-12-07</span>
                  <span>236472</span>
                </p>
                <p class="bottom">
                  JTalk 是掘金主办的面向开发者的技术系列活动。理念是分享 &
                  交流最新、最热的
                </p>
              </li>
            </ul>
          </div>
          <div class="tags">
            <div class="title-line">
              <span>热门标签</span>
              <span>Hot Tags</span>
            </div>
            <div class="tags-list">
              <el-tag v-for="item in labelList" :key="item.id">{{
                item.name
              }}</el-tag>
            </div>
          </div>
          <div class="friends">
            <div class="title-line">
              <span>友情链接</span>
              <span>Friendly Link</span>
            </div>
            <div class="url-content">
              <div class="tp">
                他们同样是一群网虫，却不是每天泡在网上游走在淘宝和网游之间、刷着本来就快要透支的信用卡。他们或许没有踏出国门一步，但同学却不局限在一国一校，而是遍及全球！
                <a href="">申请交换友链</a>
              </div>
              <div class="tl">
                <el-tag>标签标签标签一</el-tag>
                <el-tag>标签一</el-tag>
                <el-tag>标签一</el-tag>
                <el-tag>标签一</el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItemCard from "@/components/article-item-card";
import EmptyData from "@/components/empty-data";
import myAjax from "@/utils/ajax.js";
import moment from "moment";
export default {
  name: "home",
  components: {
    ArticleItemCard,
    EmptyData,
  },
  props: {},
  data() {
    return {
      prefixCls: "views-home",
      bannerImg: [
        require("@/assets/images/banner1.jpg"),
        require("@/assets/images/banner2.png"),
      ],
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
    Promise.all([this.getArticleList(), this.getLabelList()]).then(() => {});
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getLabelList() {
      return new Promise((res, rej) => {
        myAjax({
          url: "label/all",
        })
          .then((json) => {
            if (json.result) {
              this.labelList = json.data || [];
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
  .banner-warp {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // 统一的标题样式
  .title-line {
<<<<<<< HEAD
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
    display: flex;

    .article-wrapper {
      position: relative;
      flex: 1;

      .empty {
        position: absolute;
        top: 120px;
        left: 50%;
      }
    }

=======
    position: relative;

    span {
      display: inline-block;

      &:first-child {
        line-height: 53px;
        font-size: 30px;
        border-bottom: 2px solid $--color-primary;
      }

      &:last-child {
        height: 45px;
        line-height: 45px;
        margin-left: 10px;
        font-size: 18px;
        color: #666;
        vertical-align: middle;
      }
    }

    &::after {
      content: "";
      height: 1px;
      width: 175px;
      position: absolute;
      left: 120px;
      bottom: 1px;
      background-color: $--border-color-base;
    }
  }

  .about-blog {
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
        width: 200px;
      }
    }
  }

  .main {
    padding: 10px 0 30px 0;
    display: flex;

    .article-wrapper {
      position: relative;
      flex: 1;

      .empty {
        position: absolute;
        top: 120px;
        left: 50%;
      }
    }

>>>>>>> 1d71c4b73870c9d0c30be07b1a96c8434778136b
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
<<<<<<< HEAD

      .news {
        ul li {
          margin-top: 21px;
          border-bottom: 1px dashed $--border-color-base;

=======

      .news {
        ul li {
          margin-top: 21px;
          border-bottom: 1px dashed $--border-color-base;

>>>>>>> 1d71c4b73870c9d0c30be07b1a96c8434778136b
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
