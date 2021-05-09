<template>
  <div :class="prefixCls">
    <div class="w">
      <div class="panel-left">
        <div class="info-header">
          <div class="header-left">
            <div class="title">
              <div class="name">{{ detailInfo.title }}</div>
            </div>
            <p class="public-time">创建时间：{{ detailInfo.createTime }}</p>
          </div>
          <div class="header-right">
            <img :src="$route.params.img" alt="" class="head-img" />
          </div>
        </div>
        <div class="info-content">
          <div class="caption">
            <div class="underline">文章</div>
            <div>内容</div>
            <div class="date">更新于：{{ detailInfo.modifyTime }}</div>
          </div>
          <div class="txt">
            <iframe :src="detailInfo.url"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myAjax from "@/utils/ajax.js";
export default {
  name: "detail",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-detail",
      detailInfo: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    window.scrollTo(0, 0);
    this.getDetailInfo();
  },
  mounted() {
    console.log(this.$route.params);
  },
  beforeDestroy() {},
  methods: {
    getDetailInfo() {
      myAjax({
        url: `api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/${this.$route.query.id}&ibc=newswap`,
        isC: true,
        isPassFalse: true,
        method: "GET",
      }).then((res) => {
        this.detailInfo = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$prefixCls: "views-detail";

.#{$prefixCls} {
  padding: 20px 0;
  background: #fcfdfe;
  .w {
    display: flex;
    .panel-left {
      flex: 1;
      .info-header {
        height: 132px;
        background: #fff;
        padding: 38px 80px 38px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header-left {
          .title {
            font-size: 24px;
            font-weight: 700;
            display: flex;
            align-items: center;
            .name {
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .public-time {
            margin-top: 13px;
            color: #333;
            font-size: 16px;
          }
        }
        .header-right {
          .head-img {
            width: 120px;
          }
        }
      }
      .info-content {
        margin-top: 20px;
        background: #fff;
        min-height: 548px;
        padding: 15px 38px 48px 38px;
        .caption {
          display: flex;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0;
          .underline {
            padding-bottom: 10px;
            border-bottom: 4px solid $--color-primary;
          }
          .date {
            flex: 1;
            text-align: right;
            color: #999;
            font-size: 14px;
            font-weight: 400;
          }
        }
        .txt {
          padding-top: 20px;
          iframe {
            width: 1180px;
            height: 3000px;
          }
        }
      }
    }
    .panel-right {
      margin-left: 20px;
      width: 285px;
      min-height: 600px;
      background: #fff;
    }
  }
}
</style>