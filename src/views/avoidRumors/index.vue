<template>
  <div :class="prefixCls" v-loading="isLoading">
    <img src="@/assets/images/avoid-rumors-img.png" class="banner" />
    <div class="w">
      <ul class="rumor-list">
        <li
          class="rumor-item"
          v-for="(item, index) in rumorData"
          :key="index"
          @click="goDetail(item)"
        >
          <a href="javascript:;" class="content">
            <div class="left">
              <img :src="item.imgsrc" />
            </div>
            <div class="right">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="time">{{ item.ptime }}</div>
            </div>
          </a>
          <div class="devide"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import myAjax from "@/utils/ajax.js";

export default {
  name: "avoidRumors",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-avoid-rumors",
      limit: 1000,
      offset: 0,
      isLoading: true,
      rumorData: [],
    };
  },
  watch: {},
  created() {
    this.getRumors();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    goDetail(item) {
      this.$router.push({
        name: "detail",
        query: {
          id: item.docid,
        },
        params: {
          img: item.imgsrc,
        },
      });
    },
    getRumors() {
      return new Promise((res, rej) => {
        myAjax({
          url: `ug/api/wuhan/app/article/list?limit=${this.limit}&offset=${this.offset}`,
          method: "get",
        })
          .then((json) => {
            if (json.code == 10000) {
              const data = json.data.items;
              this.rumorData = data;
              this.isLoading = false;
            }
            res();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$prefixCls: "views-avoid-rumors";

.#{$prefixCls} {
  min-height: 100vh;

  .banner {
    width: 100%;
  }

  .rumor-item {
    position: relative;
    margin: 20px 0;
    padding: 20px 0;

    .content {
      display: flex;
    }

    .left {
      width: 20%;

      img {
        width: 100%;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      box-pack: justify;
      justify-content: space-between;
      flex-pack: justify;
      justify-content: space-between;
      padding-left: 50px;

      .title {
        font-size: 20px;
        font-weight: 700px;
        color: #000;
      }

      .time {
        font-size: 16px;
        color: #858585;
      }
    }

    .devide {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      -webkit-transform: scaleY(0.25);
      transform: scaleY(0.25);
      background: #e5e5e5;
    }
  }
}
</style>
