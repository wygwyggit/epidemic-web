<template>
  <div :class="prefixCls">
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

  .wrap {
      
  }
}
</style>
