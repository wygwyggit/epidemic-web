<template>
  <div :class="prefixCls">
    <div class="select-panel w">
      城市政策查询:
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content w">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
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
    display: flex;
    .el-card {
      flex: 1;
      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>