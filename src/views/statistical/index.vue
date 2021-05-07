<template>
  <div :class="prefixCls" v-loading="isLoading">
    <div class="banner-wrap">
      <div class="top cover-time">
        <h2>湖南疫情地图</h2>
        <p>截止{{ listData.lastUpdateTime }}</p>
      </div>
      <div class="cover-data">
        <div class="cover-confirm">
          <h4>累计确诊</h4>
          <div class="number" style="color: #a31d13">
            {{ (provinceData.total || {}).confirm }}
          </div>
          <p class="added">
            较昨日
            <span>+{{ (provinceData.today || {}).confirm }}</span>
          </p>
        </div>
        <div class="cover-dead">
          <h4>累计死亡</h4>
          <div class="number" style="color: #333">
            {{ (provinceData.total || {}).dead }}
          </div>
          <p class="added">
            较昨日
            <span>+{{ (provinceData.today || {}).dead }} </span>
          </p>
        </div>
        <div class="cover-heal">
          <h4>累计治愈</h4>
          <div class="number" style="color: #fff">
            {{ (provinceData.total || {}).heal }}
          </div>
          <p class="added">
            较昨日
            <span>+{{ (provinceData.today || {}).heal }} </span>
          </p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="item-warp hunan-number">
        <div class="td">
          <span class="dot"></span>
          <span class="txt">疫情地图</span>
        </div>
        <div class="bd">
          <div
            id="myHuNanData"
            :style="{ width: '100%', height: '300px' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myAjax from "@/utils/ajax.js";
import echarts from "echarts";
export default {
  name: "statistical",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-statistical",
      isLoading: true,
      listData: {},
      provinceData: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    Promise.all([this.getTotalList()]).then(() => {
      this.$nextTick(() => {
        this.drawLine();
      });

      this.isLoading = false;
    });
  },
  beforeDestroy() {},
  methods: {
    getTotalList() {
      return new Promise((res, rej) => {
        myAjax({
          url: "ug/api/wuhan/app/data/list-total",
          method: "get",
        })
          .then((json) => {
            if (json.code == 10000) {
              this.listData = json.data || {};
              const arrObj = this.listData.areaTree.find((x) => {
                return x.name == "中国";
              });
              this.provinceData = (arrObj.children || []).find((x) => {
                return x.name == "湖南";
              });
              console.log(this.provinceData);
            }
            res();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    drawLine() {
      let myChart = echarts.init(document.getElementById("myHuNanData"));
      var option;

      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
$prefixCls: "views-statistical";
.#{$prefixCls} {
  min-height: 100vh;
  padding: 0 30px;
  .banner-wrap {
    position: relative;
    padding: 30px 20px 30px 70px;
    margin-top: 60px;
    height: 280px;
    background: #6d9adb;
    background-size: 400px;
    background-position: 100% -90%;
    background-repeat: no-repeat;
    border-radius: 10px;
    &::after {
      content: "";
      position: absolute;
      right: 90px;
      top: -122px;
      width: 400px;
      height: 400px;
      background: url("../../assets/images/statistical-banner.png");
      background-size: cover;
    }
    .top {
      h2 {
        font-size: 38px;
        color: #fff;
      }
      p {
        margin: 10px 0;
        color: #fff;
      }
    }
    .cover-data {
      > div {
        width: 220px;
        display: inline-block;
        h4 {
          text-align: center;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
        }
        .number {
          font: 700 50px/90px DIN Alternate, din_alternate_bold;
          text-align: center;
        }
        .added {
          color: #fff;
          opacity: 0.7;
          text-align: center;
        }
      }
    }
  }
  .content {
    display: flex;
    .item-warp {
      margin-top: 25px;
      .td {
        margin-bottom: 15px;
        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: $--color-primary;
        }
        .txt {
          margin-left: 10px;
          font-size: 16px;
        }
      }
      .bd {
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>