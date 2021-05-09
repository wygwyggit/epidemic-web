<template>
  <div :class="prefixCls" v-loading="isLoading">
    <div class="banner-wrap">
      <div class="top cover-time">
        <h2>中国疫情地图</h2>
        <span>截止{{ listData.lastUpdateTime }}</span>
      </div>
      <div class="cover-data">
        <div class="cover-confirm">
          <h4>累计确诊</h4>
          <div class="number" style="color: #a31d13">
            {{ (listData.chinaTotal.total || {}).confirm }}
          </div>
          <p class="added">
            较昨日
            <span>+{{ listData.chinaTotal.today.confirm }}</span>
          </p>
        </div>
        <div class="cover-dead">
          <h4>累计死亡</h4>
          <div class="number" style="color: #333">
            {{ (listData.chinaTotal.total || {}).dead }}
          </div>
          <p class="added">
            较昨日
            <span>+{{ listData.chinaTotal.today.dead }} </span>
          </p>
        </div>
        <div class="cover-heal">
          <h4>累计治愈</h4>
          <div class="number" style="color: #fff">
            {{ (listData.chinaTotal.total || {}).heal }}
          </div>
          <p class="added">
            较昨日
            <span>+{{ listData.chinaTotal.today.heal }} </span>
          </p>
        </div>
      </div>
    </div>
    <div class="content">
      <li>
        <div class="item-warp hunan-number" v-if="!isToday">
          <div class="td">
            <span class="dot"></span>
            <span class="txt">中国/海外新增确诊对比</span>
          </div>
          <div class="bd">
            <div
              id="myHuNanData"
              :style="{ width: '100%', height: '480px' }"
            ></div>
          </div>
          <div class="switch-wrap">
            <el-button @click="handleSwitch(false)">中国/海外&nbsp;新增确诊</el-button>
            <el-button @click="handleSwitch(true)">中国/海外&nbsp;新增确诊</el-button>
          </div>
        </div>
        <div class="item-warp hunan-number" v-if="isToday">
          <div class="td">
            <span class="dot"></span>
            <span class="txt">中国/海外新增确诊对比</span>
          </div>
          <div class="bd">
            <div
              id="myHuNanData2"
              :style="{ width: '100%', height: '480px' }"
            ></div>
          </div>
          <div class="switch-wrap">
            <el-button @click="handleSwitch(false)">中国/海外&nbsp;新增确诊</el-button>
            <el-button @click="handleSwitch(true)">中国/海外&nbsp;累计确诊</el-button>
          </div>
        </div>
        <div class="item-warp hunan-number">
          <div class="td">
            <span class="dot"></span>
            <span class="txt">世界病例</span>
          </div>
          <div class="bd">
            <el-table
            class="page-table"
            :data="listData.areaTree"
            border
            style="width: 100%;">
            <el-table-column
            prop="name"
            label="地区">
            </el-table-column>
            <el-table-column
            label="新增确诊">
              <template slot-scope="scope">
                {{ scope.row.today.confirm }}
              </template>
            </el-table-column>
            <el-table-column
            label="累计确诊">
                <template slot-scope="scope">
                {{ scope.row.total.confirm }}
              </template>
            </el-table-column>
            <el-table-column
            label="死亡">
                <template slot-scope="scope">
                {{ scope.row.total.dead }}
                </template>
            </el-table-column>
            <el-table-column
            label="治愈">
                <template slot-scope="scope">
                {{ scope.row.total.heal }}
                </template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="疫情"
            width="60">
            </el-table-column>
            </el-table>
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
  name: "world-statistical",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-world-statistical",
      isLoading: true,
      isToday: false,
      listData: {},
      tableData: [],
      chinaTodayAddNumberList: [],
      worldTodayAddNumberList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {
    Promise.all([this.getTotalList(), this.getChinaTodayAddNumberList(), this.getWorldTodayAddNumberList()]).then(() => {
      this.$nextTick(() => {
        this.drawLine();
      });

      this.isLoading = false;
    });
  },
  beforeDestroy() {},
  methods: {
    handleSwitch(type) {
        this.isToday = type;
        this.$nextTick(() => {
            if(type) {
                this.drawLine2();
            } else {
                this.drawLine();
            }
        })
    },
    getHuNanTimeNumber() {
      return new Promise((res, rej) => {
        myAjax({
          url:
            "ug/api/wuhan/app/data/list-by-area-code?areaCode=66&t=1620538792031",
          method: "get",
        })
          .then((json) => {
            if (json.code == 10000) {
              this.chinaTodayAddNumberList = json.data.list || [];
            }
            res();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    getChinaTodayAddNumberList() {
      return new Promise((res, rej) => {
        myAjax({
          url:
            "ug/api/wuhan/app/data/list-by-area-code?areaCode=66&t=1620538792031",
          method: "get",
        })
          .then((json) => {
            if (json.code == 10000) {
              this.chinaTodayAddNumberList = json.data.list || [];
            }
            res();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    getWorldTodayAddNumberList() {
      return new Promise((res, rej) => {
        myAjax({
          url:
            "ug/api/wuhan/app/data/list-by-area-code?areaCode=420000&t=1620538794038",
          method: "get",
        })
          .then((json) => {
            if (json.code == 10000) {
              this.worldTodayAddNumberList = json.data.list || [];
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
                trigger: 'axis'
            },
            legend: {
                data: ['中国新增', '海外新增']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.chinaTodayAddNumberList.map((x) => x.date)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '中国新增',
                    type: 'line',
                    stack: '总量',
                    data: this.chinaTodayAddNumberList.map((x) => x.today.confirm)
                },
                {
                    name: '海外新增',
                    type: 'line',
                    stack: '总量',
                    data: this.worldTodayAddNumberList.map((x) => x.today.confirm),
                }
            ]
        };
      option && myChart.setOption(option);
    },
    drawLine2() {
      let myChart = echarts.init(document.getElementById("myHuNanData2"));
      var option;

      option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['中国新增', '海外新增']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.chinaTodayAddNumberList.map((x) => x.date)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '中国新增',
                    type: 'line',
                    stack: '总量',
                    data: this.chinaTodayAddNumberList.map((x) => x.total.confirm)
                },
                {
                    name: '海外新增',
                    type: 'line',
                    stack: '总量',
                    data: this.worldTodayAddNumberList.map((x) => x.total.confirm),
                }
            ]
        };
      option && myChart.setOption(option);
    }
  },
};
</script>

<style lang="scss" scoped>
$prefixCls: "views-world-statistical";
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
    margin-top: 15px;
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
      .switch-wrap {
          text-align: center;

          .el-button {
              width: 200px;
          }
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

        /deep/ .page-table {
            max-height: 70vh;
            overflow-y: auto;
        }

       /deep/ .page-table tr th,
       /deep/ .page-table tr td  {
            text-align: center;
        }
      }
    }
  }
}
</style>