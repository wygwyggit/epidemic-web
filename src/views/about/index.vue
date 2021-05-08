<template>
  <div :class="prefixCls">
    <div class="header">让我们告诉你新冠疫情是什么！</div>
    <div class="w">
      <div class="video">
        <video
          class=""
          tabindex="2"
          mediatype="video"
          controls
          crossorigin="anonymous"
          src="../../assets/video/about.mp4"
          style="width: 1300px"
        ></video>
      </div>
      <div class="text-introduce">
        <div class="caption">新冠介绍</div>
        <div class="desc">
          2019年12月以来，湖北省武汉市持续开展流感及相关疾病监测，发现多起病毒性肺炎病例，均诊断为病毒性肺炎/肺部感染<br />
          [1] 。
          2020年1月20日，习近平对新型冠状病毒感染的肺炎疫情作出重要指示，强调要把人民群众生命安全和身体健康放在第一位，坚决遏制疫情蔓延势头<br />
          [2]
          。1月27日，受习近平总书记委托，中共中央政治局常委、国务院总理、中央应对新型冠状病毒感染肺炎疫情工作领导小组组长李克强来到武汉，考察指导疫情防控工作，看望慰问患者和奋战在一线的医护人员。<br />
          [3]
          当地时间2020年1月30日晚，世界卫生组织（WHO）宣布，将新型冠状病毒疫情列为国际关注的突发公共卫生事件（PHEIC）。<br />
          [4]
          世界卫生组织3月11日表示，新冠肺炎疫情的爆发已经构成一次全球性“大流行”。2020年6月7日，国务院新闻办公室发布《抗击新冠肺炎疫情的中国行动》白皮书。<br />
          [5]
          10月8日，中国同全球疫苗免疫联盟签署协议，正式加入“新冠肺炎疫苗实施计划”。<br />
          [6]
          截至2020年12月31日24时，据31个省（自治区、直辖市）和新疆生产建设兵团报告，现有确诊病例370例（其中重症病例9例），累计治愈出院病例82067例，累计死亡病例4634例，累计报告确诊病例87071例，现有疑似病例1例。累计追踪到密切接触者905493人，尚在医学观察的密切接触者13584人。
          [7] 2021年相关信息查看词条2021年新型冠状病毒疫情。
          2021年3月30日，中国—世卫组织新冠病毒溯源联合研究报告在日内瓦发布。报告显示，武汉华南海鲜市场不是新冠病毒最初来源地。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-about",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-about",
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
$prefixCls: "views-about";
.#{$prefixCls} {
  padding-bottom: 40px;
  .header {
    width: 700px;
    margin: 50px auto 50px;
    padding: 20px;
    font-size: 38px;
    text-align: center;
    border-bottom: 1px solid #333;
  }
  .video {
    height: 600px;
    display: flex;
    justify-content: center;
    background: #333;
  }
  .text-introduce {
    margin: 0px auto;
    display: flex;
    box-shadow: 0 10px 30px 0 rgba(54, 54, 54, 0.15);
    .caption {
      padding: 20px 50px;
      width: 230px;
      min-height: 300px;
      background-image: linear-gradient(
        140deg,
        rgb(118, 181, 255),
        rgb(80, 139, 255)
      );
      color: rgb(255, 255, 255);
      font-size: 32px;
      font-weight: 700;
    }
    .desc {
      flex: 1 1 0%;
      padding: 35px 66px 30px 42px;
      background: rgb(255, 255, 255);
      color: rgb(0, 0, 0);
      font-size: 16px;
      line-height: 28px;
    }
  }
}
</style>
