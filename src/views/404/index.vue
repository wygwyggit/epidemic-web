<template>
  <div :class="prefixCls">
    <img src="../../assets/images/404.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: "404",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-404",
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
$prefixCls: "views-404";

.#{$prefixCls} {
  min-height: 100vh;
  img {
    width: 100%;
  }
}
</style>