<template>
    <div :class="prefixCls">
        <li>
            <img src="" alt="" v-if="articleInfo.img">
            <img src="http://heiyg.com/img/default-chapter.30342f7a.png" alt="" v-else>
            <div class="article-other-info">
                <p class="title">
                    {{articleInfo.title}}
                </p>
                <p class="description">
                    {{articleInfo.content}}
                </p>
                <div class="action-list">
                    <ul class="left-num">
                        <!-- <li>
                            <i></i>
                            236472
                        </li>
                        <li>
                            <i></i>
                            236472
                        </li>
                        <li>
                            <i></i>
                            236472
                        </li> -->
                    </ul>
                    <span class="time">{{articleInfo.createdAt}}</span>
                </div>
            </div>
        </li>
    </div>
</template>

<script>
    export default {
        name: 'article-item-card',
        components: {},
        props: {
            articleInfo: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                prefixCls: 'components-article-item-card'
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {

        },
    }
</script>

<style lang="scss" scoped>
    $prefixCls: 'components-article-item-card';

    .#{$prefixCls} {
        >li {
            position: relative;
            width: 100%;
            height: 166px;
            margin-bottom: 20px;
            padding: 23px 29px 30px 208px;

            &:hover {
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
            }

            img {
                position: absolute;
                top: 23px;
                left: 20px;
                width: 170px;
                border-radius: 5px;
                overflow: hidden;
                cursor: pointer;
            }

            .article-other-info {
                .title {
                    color: $--color-primary;
                    font-weight: 700;
                    cursor: pointer;
                }

                .description {
                    padding: 10px 0 16px 0;
                    color: #4e5969;

                }

                .action-list {
                    display: flex;
                    justify-content: space-between;

                    .left-num {
                        li {
                            float: left;
                            margin-right: 26px;
                            color: #86909c;
                        }
                    }

                    .time {
                        color: #86909c;
                    }
                }
            }
        }
    }
</style>
