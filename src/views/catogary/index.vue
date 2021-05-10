<template>
  <div :class="prefixCls" class="w">
    <div class="container">
      <ul class="left-menu">
        <li class="m-item active">全部</li>
        <li class="m-item">中国</li>
        <li class="m-item">美国</li>
        <li class="m-item">印度</li>
        <li class="m-item">巴西</li>
      </ul>
      <div class="right-article">
        <div class="article-lwrap">
          <div class="imgCon">
            <img
              src="https://www.imooc.com/static/img/article/cover/pic15.jpg"
              alt=""
            />
          </div>
          <div class="list-content">
            <a href="" class="title">
              <p>
                世界卫生组织16日宣布，中国以外新冠肺炎累计确诊病例数已超过中国数字。世卫组织呼吁，预防感染和拯救生命的最有效方法是打破病毒传播链，不要蒙住双眼救火，必须检测每一个疑似病例。
              </p>
            </a>
            <div class="list-bottom clearfix">
              <div class="labels-area">
                <label class="moco-label">
                  <a href="">资讯</a>
                </label>
                官方
              </div>
            </div>
          </div>
        </div>
        <div class="article-lwrap">
          <div class="imgCon">
            <img
              src="https://www.imooc.com/static/img/article/cover/pic15.jpg"
              alt=""
            />
          </div>
          <div class="list-content">
            <a href="" class="title">
              <p>
                世界卫生组织16日宣布，中国以外新冠肺炎累计确诊病例数已超过中国数字。世卫组织呼吁，预防感染和拯救生命的最有效方法是打破病毒传播链，不要蒙住双眼救火，必须检测每一个疑似病例。
              </p>
            </a>
            <div class="list-bottom clearfix">
              <div class="labels-area">
                <label class="moco-label">
                  <a href="">资讯</a>
                </label>
                官方
              </div>
            </div>
          </div>
        </div>
        <div class="article-lwrap">
          <div class="imgCon">
            <img
              src="https://www.imooc.com/static/img/article/cover/pic15.jpg"
              alt=""
            />
          </div>
          <div class="list-content">
            <a href="" class="title">
              <p>
                意大利民事保护部门负责人、新冠病毒应急委员会专员博雷利16日说，截至当地时间当天18时，意大利累计新冠肺炎确诊病例升至27980例，累计死亡病例升至2158例，另有2749人治愈。
              </p>
            </a>
            <div class="list-bottom clearfix">
              <div class="labels-area">
                <label class="moco-label">
                  <a href="">资讯</a>
                </label>
                官方
              </div>
            </div>
          </div>
        </div>
        <div class="article-lwrap">
          <div class="imgCon">
            <img
              src="https://www.imooc.com/static/img/article/cover/pic15.jpg"
              alt=""
            />
          </div>
          <div class="list-content">
            <a href="" class="title">
              <p>
                欧盟委员会主席冯德莱恩16日说，为减缓新冠肺炎疫情传播，提议对欧盟以外人员进入欧盟国家的非必要旅行实施限制。
              </p>
            </a>
            <div class="list-bottom clearfix">
              <div class="labels-area">
                <label class="moco-label">
                  <a href="">资讯</a>
                </label>
                官方
              </div>
            </div>
          </div>
        </div>
        <div class="article-lwrap">
          <div class="imgCon">
            <img
              src="https://www.imooc.com/static/img/article/cover/pic15.jpg"
              alt=""
            />
          </div>
          <div class="list-content">
            <a href="" class="title">
              <p>
                法国总统马克龙16日晚发表电视讲话说，面对新冠肺炎疫情的严峻形势，法国处于“战争状态”，需要全面动员抗击疫情。截至当地时间16日15时，法国累计新冠肺炎确诊病例6633例，其中死亡病例148例。
              </p>
            </a>
            <div class="list-bottom clearfix">
              <div class="labels-area">
                <label class="moco-label">
                  <a href="">资讯</a>
                </label>
                官方
              </div>
            </div>
          </div>
        </div>
        <div class="article-lwrap">
          <div class="imgCon">
            <img
              src="https://www.imooc.com/static/img/article/cover/pic15.jpg"
              alt=""
            />
          </div>
          <div class="list-content">
            <a href="" class="title">
              <p>
                德国疾控机构罗伯特·科赫研究所公布的最新数据显示，截至当地时间16日15时，德国累计新冠肺炎确诊病例升至6012例，较前一日增加1174例，死亡病例13例
              </p>
            </a>
            <div class="list-bottom clearfix">
              <div class="labels-area">
                <label class="moco-label">
                  <a href="">资讯</a>
                </label>
                官方
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
  name: "catogary",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-catogary",
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
$prefixCls: "views-catogary";
.#{$prefixCls} {
  padding-top: 24px;
  padding-bottom: 90px;
  .container {
    display: flex;
    .left-menu {
      width: 104px;
      margin-right: 24px;
      text-align: center;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 8px 0 rgba(28, 31, 33, 0.1);
      .m-item {
        width: 88px;
        line-height: 20px;
        border-radius: 6px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 8px 0;
        font-size: 14px;
        position: relative;
        margin-bottom: 8px;
        cursor: pointer;
        &:first-child {
          margin-top: 8px;
        }
        &.active {
          background: rgba(51, 119, 255, 0.1);
          font-weight: 700;
          color: #508bff;
        }
      }
    }
    .right-article {
      padding-right: 20px;
      background: #fff;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 4px 8px 0 rgba(28, 31, 33, 0.1);
      .article-lwrap {
        width: 100%;
        height: 80px;
        padding: 0 4px;
        box-sizing: border-box;
        margin-bottom: 0;
        background: #fff;
        box-shadow: unset;
        border-radius: 0;
        .imgCon {
          float: left;
          width: 66px;
          height: 66px;
          border-radius: 8px;
          margin: 8px 16px 6px 16px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }
        .list-content {
          float: left;
          width: 800px;
          height: 69px;
          padding-top: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(28, 31, 33, 0.1);
          position: relative;
          .title p {
            font-weight: 700;
            margin-bottom: 4px;
            font-size: 16px;
            color: #1c1f21;
            line-height: 30px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .list-bottom {
            width: 100%;
            height: 24px;
            .labels-area {
              max-width: 460px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .moco-label {
                margin-right: 16px;
                padding: 4px 12px;
                font-size: 12px;

                line-height: 16px;
                background: rgba(84, 92, 99, 0.1);
                border-radius: 12px;
                cursor: pointer;
                a {
                  color: #545c63;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>