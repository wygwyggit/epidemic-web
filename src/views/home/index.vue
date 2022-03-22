<template>
  <div :class="prefixCls" >
  333
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-home",
    };
  },
  computed: {
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
$prefixCls: "views-home";

.#{$prefixCls} {

}
</style>
