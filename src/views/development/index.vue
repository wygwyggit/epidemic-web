<template>
  <div :class="prefixCls">
    <img src="@/assets/images/development-banner.jpg" class="banner">
    <div class="w">
      <div class="title">时实播报</div>
        <div class="wrap">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in developments" :key="index" :timestamp="item.time" placement="top" :class="{ 'one-time':  index === 0}">
                    <el-card>
                        <h4>{{ item.title }}</h4>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
  </div>
</template>

<script>
import myAjax from "@/utils/ajax.js";

export default {
  name: "development",
  components: {
  },
  props: {},
  data() {
    return {
      prefixCls: "views-development",
      developments: []
    };
  },
  watch: {},
  created() {
    this.getDevelopments();
  },
  mounted() {
    window.callback = this.callback;
  },
  beforeDestroy() {},
  methods: {
    callback({ list }) {
      this.developments = list;
    },
    getDevelopments() {
      return new Promise((res, rej) => {
        myAjax({
          url: "/special/00035080/virus_report_data.js?_=1620398781405",
          method: "get",
          isN: true
        })
          .then((json) => {
            eval(json)
            res();
          })
          .catch((err) => {
            rej(err);
          });
      });
    }
  },
};
</script>
<style lang="scss" scoped>
$prefixCls: "views-development";

.#{$prefixCls} {

  .banner {
        width: 100%;
      }

  .title {
    position: relative;
    padding-left: 9px;
    font-size: 18px;
    font-weight: 700;
    color: #000;
  }

  .title::before {
      content: "";
      display: inline-block;
      height: 16px;
      width: 5px;
      background-color: $--color-primary;
      position: absolute;
      top: 50%;
      left: 0;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      border-radius: 2.5px;
  }

  .wrap {

      margin-top: 20px;

      .el-card.is-always-shadow {
            box-shadow: none;
      }

      .el-card.is-always-shadow:hover {
        box-shadow: 0 1px 6px RGB(0 0 0 / 20%);
        border-color: #eee;
      }

     /deep/ .el-timeline-item__node {
        background-color: $--color-primary;
      }

     /deep/ .el-timeline-item__tail {
        border-left: 2px dashed $--color-primary;
      }

      /deep/ .el-timeline-item__timestamp {
        position: relative;
        font-size: 16px;
      }

      /deep/ .el-timeline-item__timestamp.is-top {
        margin-bottom: 15px;
      }

     /deep/ .one-time .el-timeline-item__timestamp::before {
        content: "最新";
        width: 60px;
        height: 30px;
        background-color: $--color-primary;
        font: 16px/30px -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        position: absolute;
        left: 160px;
        top: -4px;
      }
  }
}
</style>
