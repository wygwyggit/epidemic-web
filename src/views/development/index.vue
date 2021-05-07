<template>
  <div :class="prefixCls">
    <img src="@/assets/images/development-banner.jpg" class="banner">
    <div class="wrap">
        <el-timeline>
            <el-timeline-item v-for="(item, index) in developments" :key="index" :timestamp="item.date" placement="top">
                <el-card>
                    <h4>{{ item.msg }}</h4>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
  </div>
</template>

<script>
import developments from './data.js'

export default {
  name: "development",
  components: {
  },
  props: {},
  data() {
    return {
      prefixCls: "views-development",
      developments
    };
  },
  watch: {},
  created() {
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    
  },
};
</script>
<style lang="scss" scoped>
$prefixCls: "views-development";

.#{$prefixCls} {
  padding: 20px;

  .banner {
        width: 100%;
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
  }
}
</style>
