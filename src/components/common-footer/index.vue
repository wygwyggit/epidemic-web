<template>
  <div :class="prefixCls">
    <div class="copyright">
      本系统仅供学习使用,不参与任何商业用途 Copyright © 2021
      本站所有数据不作为真实性的唯一来源
    </div>
  </div>
</template>

<script>
export default {
  name: "common-footer",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "components-common-footer",
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
$prefixCls: "components-common-footer";

.#{$prefixCls} {
  height: 88px;
  line-height: 88px;
  background: #5d5d5d;
  text-align: center;
  color: #aaaaaa;

  a {
    color: #aaaaaa;
  }
}
</style>
