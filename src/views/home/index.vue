<template>
  <div :class="prefixCls">
    <div class="w">
      <div class="amazing-doge">
        <div class="tit">
          {{ $t("home.amazing-doge") }}
        </div>
        <div class="sub-tit">
          {{ $t("home.amazing-tip") }}
        </div>
        <div class="btn-group">
          <div class="btn-item">
            <router-link tag="a" to="/blindBox">
              <img src="../../assets/images/home-blind-box.png" alt="" />
              {{ $t("common.blind-box") }}
            </router-link>
          </div>
          <div class="btn-item">
            <a
              href="https://pancakeswap.finance/swap?outputCurrency=0x0EBc30459551858e81306d583025d12C7d795FA2"
              target="_blank"
            >
              <img src="../../assets/images/info.png" />
              {{ $t("home.buy-adoge") }}
            </a>
          </div>
        </div>
        <div class="contract" @click="copyContractTxt">
          <span class="con-key">{{ $t("home.contract") }}: </span>
          <span class="con-txt">{{ contractTxt }}</span>
        </div>
      </div>
      <ul class="img-ul clearfix">
        <li class="item-img">
          <img src="../../assets/images/home-img-1.png" alt="" />
        </li>
        <li class="item-img">
          <img src="../../assets/images/home-img-2.png" alt="" />
        </li>
        <li class="item-img">
          <img src="../../assets/images/home-img-3.png" alt="" />
        </li>
        <li class="item-img">
          <img src="../../assets/images/home-img-4.png" alt="" />
        </li>
        <li class="item-img">
          <img src="../../assets/images/home-img-5.png" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-home",
      contractTxt: "0x0EBc30459551858e81306d583025d12C7d795FA2",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    Vue.use(VueClipboard);
  },
  beforeDestroy() {},
  methods: {
    copyContractTxt() {
      this.$copyText(this.contractTxt).then(() => {
        this.$showOk(`${this.$t("blind-box.copy-success")}`);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$prefixCls: "views-home";

.#{$prefixCls} {
  padding: 0.773333333333333rem 0 0.693333333333333rem 0;
  background: linear-gradient(180deg, #31bcff 0%, #00acff 100%);

  .amazing-doge {
    padding-top: 53px;
    padding-bottom: 30px;
    background: url("../../assets/images/home-content-bg.png");
    background-size: 364px 528px;
    background-position: right top;
    background-repeat: no-repeat;

    .tit {
      font-size: 110px;
      color: #fff;
      font-family: home-amazing;
    }

    .sub-tit {
      font-family: home-amazing;
      font-size: 42px;
      color: #fff;
    }
  }

  .btn-group {
    display: flex;
    margin: 40px 0 96px;

    .btn-item a {
      display: flex;
      align-items: center;
    }

    .btn-item {
      display: flex;
      align-items: center;
      margin-right: 0.266666666666667rem;
      padding: 0 20px 0 15px;
      height: 0.8rem;
      line-height: 0.8rem;
      border-radius: 2.4rem;
      background: rgba(255, 255, 255, 0.8);
      font-size: 0.426666666666667rem;
      font-family: home-amazing;
      cursor: pointer;

      img {
        width: 0.586666666666667rem;
        height: 0.586666666666667rem;
        margin-right: 0.133333333333333rem;
      }

      &:first-child {
        color: #ff6b00;
        font-weight: 400;
      }

      &:last-child {
        color: #00acff;
      }
    }
  }

  .contract {
    max-width: 803px;
    padding: 0.2rem 0.36rem 0.2rem 0.3rem;
    border-radius: 40px;
    font-size: 0.32rem;
    color: #271e05;
    background: rgba(255, 255, 255, 0.5) url("../../assets/images/contract.png");
    background-position: right center;
    background-repeat: no-repeat;
    background-size: 0.426666666666667rem 0.426666666666667rem;
    background-origin: content-box;
    text-align: left;
    font-family: home-amazing;
    cursor: pointer;
  }

  .img-ul {
    display: flex;
    justify-content: space-between;

    .item-img {
      img {
        width: 220px;
        height: 220px;
      }
    }
  }
}

@media (max-width: 768px) {
  .#{$prefixCls} {
    padding-bottom: 0;
    .amazing-doge {
      padding: 0;
      padding-bottom: 1.28rem;
      background: url("../../assets/images/home-h5-bg.png");
      background-size: 100% 9.6rem;
      background-position: center bottom;
      background-repeat: no-repeat;
      text-align: center;

      .tit {
        font-size: 1.28rem;
      }

      .sub-tit {
        height: 1.146666666666667rem;
        line-height: 1.146666666666667rem;
        font-size: 0.533333333333333rem;
      }

      .btn-group {
        padding-bottom: 0.16rem;
        margin: 0;
        justify-content: center;
      }

      .contract {
        display: flex;
        margin: 7.7rem 0.533333333333333rem 0;

        .con-key {
          display: none;
        }
        .con-txt {
          display: inline-block;
          width: 7.6rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .img-ul {
      position: relative;
      top: -1rem;
      display: block;
      padding: 0 0.533333333333333rem;

      .item-img {
        margin-bottom: 0.133333333333333rem;
        float: left;
        width: 50%;

        img {
          height: 4.266666666666667rem;
          width: 4.266666666666667rem;
        }

        &:last-child {
          display: none;
        }
      }
    }
  }
}
</style>
