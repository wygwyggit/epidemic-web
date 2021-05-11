<template>
  <div :class="prefixCls">
    <img src="../../assets/images/set_out.jpg" alt="" />
    <div class="select-panel w">
      <router-link to="catogary">查看各地疫情情况</router-link>
    </div>
    <div class="content w">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="city-name">长沙</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >低风险地区</el-button
            >
          </div>
          <div class="text item">
            出城政策
            <p>
              请密切关注近期国内本土疫情动态，合理安排出行。尽量减少不必要的出行，如确需出行，请提前关注旅游目的地疫情防控规定，关注交通、天气信息，错峰出行。遵守景区疫情防护要求、安全警示和文明旅游规定，自觉配合体温检测、查验健康码等防疫措施，保持戴口罩、勤洗手、用公筷等良好卫生习惯。保持安全社交距离，健康文明出行。如非必要，请不要前往云南瑞丽旅行及出差。确需前往的，请务必提前向所在社区(村)和工作单位报备，并做好个人防护，配合疫情防控部门做好核酸检测、健康监测等疫情防控措施。
            </p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="city-name">株洲</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >低风险地区</el-button
            >
          </div>
          <div class="text item">
            出城政策
            <p>
              在恢复日常生活、增加出行的同时，勤洗手、戴口罩等日常防护依旧不能少。
            </p>
          </div>
        </el-card>
      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="city-name">湘潭</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >低风险地区</el-button
            >
          </div>
          <div class="text item">
            出城政策
            <p>当地暂无最新官方政策发布，若有，会第一时间更新。</p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="city-name">湖北</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >低风险地区</el-button
            >
          </div>
          <div class="text item">
            出城政策
            <p>
              在恢复日常生活、增加出行的同时，勤洗手、戴口罩等日常防护依旧不能少。
            </p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-measures",
      value: "",
      options: [
        {
          value: "430100",
          label: "长沙",
        },
        {
          value: "430200",
          label: "株洲",
        },
        {
          value: "430300",
          label: "湘潭",
        },
      ],
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
$prefixCls: "views-measures";
.#{$prefixCls} {
  padding-bottom: 40px;
  img {
    width: 100%;
  }
  .select-panel {
    position: relative;
    height: 90px;
    padding: 20px 25px 0 0;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 16px;
    .el-select {
      margin-left: 15px;
    }
  }
  .content {
    > div {
      display: flex;
    }

    .el-card {
      margin-bottom: 20px;
      flex: 1;
      &:last-child {
        margin-left: 20px;
      }
      .city-name {
        padding-left: 15px;
        font-size: 18px;
        font-weight: 700;
        border-left: 4px solid $--color-primary;
      }
    }
  }
}
</style>