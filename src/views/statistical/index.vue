<template>
  <div :class="prefixCls" v-loading="isLoading">
    <div class="banner-wrap">
      <div class="top cover-time">
        <h2>湖南疫情地图</h2>
        <span>截止{{ listData.lastUpdateTime }}</span>
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
      <li>
        <div class="item-warp hunan-number">
          <div class="td">
            <span class="dot"></span>
            <span class="txt">湖南累计疫情图</span>
          </div>
          <div class="bd">
            <div
              id="myHuNanData"
              :style="{ width: '100%', height: '480px' }"
            ></div>
          </div>
        </div>
        <div class="item-warp hunan-number">
          <div class="td">
            <span class="dot"></span>
            <span class="txt">湖南疫情新增趋势</span>
          </div>
          <div class="bd">
            <div
              id="myHuNanzenData"
              :style="{ width: '100%', height: '480px' }"
            ></div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-warp hunan-number">
          <div class="td">
            <span class="dot"></span>
            <span class="txt">湖南疫情累计趋势</span>
          </div>
          <div class="bd">
            <div
              id="myHuNanleiData"
              :style="{ width: '100%', height: '480px' }"
            ></div>
          </div>
        </div>
        <div class="item-warp hunan-number">
          <div class="td">
            <span class="dot"></span>
            <span class="txt">湖南病例</span>
          </div>
          <div class="bd">
            <div
              id="myHuNanbinliData"
              :style="{ width: '100%', height: '480px' }"
            ></div>
          </div>
        </div>
      </li>
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
      huNanNumberList: [],
      huNanTodayAddNumberList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    Promise.all([this.getTotalList(), this.getHuNanTimeNumber()]).then(() => {
      this.$nextTick(() => {
        this.drawLine();
        this.drawLineZen();
        this.drawLineLei();
        this.drawLineBin();
      });

      this.isLoading = false;
    });
  },
  beforeDestroy() {},
  methods: {
    getHuNanTimeNumber() {
      return new Promise((res, rej) => {
        myAjax({
          url:
            "ug/api/wuhan/app/data/list-by-area-code?areaCode=430000&t=1620392519105",
          method: "get",
        })
          .then((json) => {
            if (json.code == 10000) {
              this.huNanTodayAddNumberList = json.data.list || [];
            }
            res();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
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
              this.huNanNumberList = (this.provinceData.children || []).map(
                (x) => ({
                  value: x.total.confirm,
                  dead: x.total.dead,
                  heal: x.total.heal,
                  name:
                    x.name == "湘西自治州市"
                      ? "湘西土家族苗族自治州"
                      : x.name + "市",
                })
              );
              console.log(this.huNanNumberList);
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
        backgroundColor: "#fff",
        title: {
          text: "湖南",
          top: 25,
          left: "center",
          textStyle: {
            fontSize: 25,
            fontWeight: 650,
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (val) {
            return val.data.name + "<br>人数: " + val.data.value + "人";
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            type: "map",
            map: "湖南", //这里需要注意呀,
            //mapType: "浙江",
            // 是否开启鼠标缩放和平移漫游 默认不开启
            itemStyle: {
              normal: {
                areaColor: "#fff",
                borderColor: "#111",
              },
              emphasis: {
                areaColor: "#508bff",
                label: {
                  show: true,
                  color: "white",
                },
              },
            },
            roam: true,
            top: 70,
            label: {
              show: true, // 是否显示对应地名
            },
            data: this.huNanNumberList,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    drawLineBin() {
      var chartDom = document.getElementById("myHuNanbinliData");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          data: this.huNanNumberList.map((x) => x.name),
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: ["确诊", "治愈", "死亡"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "确诊",
            type: "line",
            stack: "人数",
            data: this.huNanNumberList.map((x) => x.value),
          },
          {
            name: "治愈",
            type: "line",
            stack: "人数",
            data: this.huNanNumberList.map((x) => x.heal),
          },
          {
            name: "死亡",
            type: "line",
            stack: "人数",
            data: this.huNanNumberList.map((x) => x.dead),
          },
        ],
      };

      option && myChart.setOption(option);
    },
    drawLineLei() {
      var chartDom = document.getElementById("myHuNanleiData");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          data: this.huNanTodayAddNumberList.map((x) => x.date),
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: ["确诊", "治愈", "死亡"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "确诊",
            type: "line",
            stack: "人数",
            data: this.huNanTodayAddNumberList.map((x) => x.total.confirm),
          },
          {
            name: "治愈",
            type: "line",
            stack: "人数",
            data: this.huNanTodayAddNumberList.map((x) => x.total.heal),
          },
          {
            name: "死亡",
            type: "line",
            stack: "人数",
            data: this.huNanTodayAddNumberList.map((x) => x.total.dead),
          },
        ],
      };

      option && myChart.setOption(option);
    },
    drawLineZen() {
      var chartDom = document.getElementById("myHuNanzenData");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          data: this.huNanTodayAddNumberList.map((x) => x.date),
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: ["确诊", "治愈", "死亡"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "确诊",
            type: "line",
            stack: "人数",
            data: this.huNanTodayAddNumberList.map((x) => x.today.confirm),
          },
          {
            name: "治愈",
            type: "line",
            stack: "人数",
            data: this.huNanTodayAddNumberList.map((x) => x.today.heal),
          },
          {
            name: "死亡",
            type: "line",
            stack: "人数",
            data: this.huNanTodayAddNumberList.map((x) => x.today.dead),
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
        display: inline-block;
        font-size: 38px;
        color: #fff;
      }
      span {
        margin-left: 15px;
        color: #fff;
      }
    }
    .cover-data {
      margin-top: 18px;
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
    margin-bottom: 100px;
    li {
      display: flex;
    }

    .item-warp {
      margin-top: 25px;
      flex: 1;
      &:last-of-type {
        margin-left: 20px;
      }
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