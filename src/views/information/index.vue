<template>
  <div :class="prefixCls">
    <img src="../../assets/images/fanghu.jpg" alt="" />
    <div class="content w">
      <div class="tit-common">患者特征与防护</div>
      <div class="bd-common">
        <span>患者特征汇总</span>
        <img
          src="https://www.17sucai.com/preview/1613514/2020-02-13/nyy/images/fhhz.png"
          alt=""
        />
        <span>性别比例</span>
        <img
          src="https://www.17sucai.com/preview/1613514/2020-02-13/nyy/images/fhbl.png"
          alt=""
        />
        <span>年龄分布</span>
        <p>中位数48岁，范围9个月~96岁，15岁以下年龄组病例不到0.6%。</p>
      </div>
      <div class="tit-common">节后返岗如是说</div>
      <img
        src="https://www.17sucai.com/preview/1613514/2020-02-13/nyy/images/fhfg.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "information",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-information",
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
$prefixCls: "views-information";

.#{$prefixCls} {
  > img {
    width: 100%;
    height: 500px;
  }
  .content {
    text-align: center;
    .tit-common {
      margin: 20px 0;
      padding: 0 20px;
      display: inline-block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      /* vertical-align: middle; */
      font-family: MicrosoftYaHei-Bold;
      font-size: 30px;
      color: #233e6a;
      letter-spacing: 1px;
      font-weight: 900;
      background: #f3f0f0;
      text-align: center;
    }
    .bd-common {
      span {
        height: 50px;
        display: block;
        font-size: 30px;
      }
    }
  }
}
</style>