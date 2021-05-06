<template>
    <div :class="prefixCls">
        <div class="w">
            <div class="page-logo">
                <img src="../../assets/images/logo.png">
            </div>
            <div class="page-tabs">
                <div class="tab-item" :data-hover="tab.text" v-for="tab in tabs" :key="tab.name"
                    :class="{'tab-active':tab.name==currentTab}" @click="redirectTo(tab)">
                    {{tab.text}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'common-header',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'components-common-header',
                tabs: [{
                        text: '首页',
                        name: 'home',
                        path: 'home'
                    },
                    {
                        text: '分类',
                        name: 'classification',
                        path: 'classification'
                    },
                    {
                        text: '标签',
                        name: 'label',
                        path: 'label'
                    },
                    {
                        text: '归档',
                        name: 'archive',
                        path: 'archive'
                    },
                    {
                        text: '关于',
                        name: 'about',
                        path: 'about',
                    },

                ],
                currentTab: 'home',
            }
        },
        computed: {

        },
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            redirectTo(tab) {
                this.$router.push({
                    path: tab.path
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'components-common-header';

    .#{$prefixCls} {
        position: fixed;
        top: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
        z-index: 999;

        .w {
            display: flex;
            align-items: center;
            height: 56px;
        }

        .page-logo {
            margin-right: 41px;

            img {
                width: 100px;
            }
        }

        .page-tabs {
            display: flex;
            align-items: center;

            .tab-item {
                position: relative;
                margin-right: 48px;
                cursor: pointer;
                opacity: 1;
                color: #fff;
                transition: color .7s;

                &.tab-active {
                    color: $--color-primary;
                }

                &::before {
                    content: attr(data-hover);
                    position: absolute;
                    padding-bottom: 4px;
                    max-width: 0;
                    border-bottom: 3px solid $--color-primary;
                    color: $--color-primary;
                    overflow: hidden;
                    word-break: keep-all;
                    transition: max-width .7s;
                }

                &:hover {
                    color: $--color-primary;
                }

                &:hover::before {
                    max-width: 100%;
                }
            }
        }
    }
</style>
