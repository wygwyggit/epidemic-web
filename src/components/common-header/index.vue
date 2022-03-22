<template>
    <div :class="prefixCls">
        <div class="page-logo">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <div class="page-tabs">
            <div class="tab-item" :data-hover="tab.text" v-for="tab in tabs" :key="tab.name"
                :class="{ 'tab-active': tab.name == currentTab }" @click="redirectTo(tab)">
                {{ tab.text }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "common-header",
        components: {},
        props: {},
        data() {
            return {
                prefixCls: "components-common-header",
                tabs: [{
                        text: "Home",
                        name: "home",
                        path: "/home",
                    },
                    {
                        text: "Blind box",
                        name: "Blind",
                        path: "/blind",
                    },
                    {
                        text: "Marketplace",
                        name: "Marketplace",
                        path: "/marketplace",
                    },
                    {
                        text: "My account",
                        name: "account",
                        path: "/account",
                    }
                ],
                currentTab: "home",
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            redirectTo(tab) {
                this.currentTab = tab.name;
                this.$router.push({
                    path: tab.path,
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    $prefixCls: "components-common-header";

    .#{$prefixCls} {
        display: flex;
        align-items: center;
        padding: 0 60px;
        width: 100%;
        height: 100px;
        background: #32A3FF;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
        z-index: 999;

        .page-logo {
            margin-right: 41px;
            color: #000;
            font-size: 28px;
            font-weight: 700;
        }

        .page-tabs {
            display: flex;
            align-items: center;

            .tab-item {
                position: relative;
                margin-right: 23px;
                padding: 0 10px;
                line-height: 100px;
                cursor: pointer;
                opacity: 1;
                color: #CBE8FF;
                font-size: 18px;
                transition: color 0.7s;

                &.tab-active {
                    color: #fff;
                    border-bottom: 4px solid #fff;
                }
            }
        }
    }
</style>
