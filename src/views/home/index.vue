<template>
    <div :class="prefixCls">
        <div class="banner-warp">
            <el-carousel :height="imgHeight+'px'">
                <el-carousel-item>
                    <img src="../../assets/images/banner.jpg"
                       >
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="page-info">
            <h1 class="info-title">
                我是诗词标签
            </h1>
        </div>
        <div class="content w">
            <div class="about-blog">
                <div class="left">
                    <div class="title-line">
                        <span>博客简介</span>
                        <span>Blog introduction</span>
                    </div>
                    <div class="txt-content">
                        早上好!很荣幸有机会参加此次面试。我希望今天我能有好的表现。我希望此次面试能够成功。现在，请允许我自我介绍一下。我今年xx岁，出生于xx省。我毕业于xx大学计算机专业。我在xx年毕业获得学士学位。大学期间，我努力学习，通过了大学英语六级考试，掌握了基本的专业知识。成为软件工程师是我长期渴望的梦想。我渴望有机会施展我的才能。我今年xx岁，出生于xx省。我毕业于xx大学计算机专业。
                    </div>
                </div>
                <div class="right">
                    <img src="../../assets/images/blog-info.png" alt="">
                </div>
            </div>
            <div class="main">
                <div class="article-wrapper">
                    <!-- 文章列表 -->
                    <div class="list">
                        <article-item-card v-for="item in articleList" :key="item.id" :articleInfo="item">
                        </article-item-card>
                    </div>
                    <div class="empty">
                        <empty-data></empty-data>
                    </div>

                </div>
                <div class="aside-wrapper">
                    <div class="news" v-if="articleList.length">
                        <div class="title-line">
                            <span>最近更新</span>
                            <span>News</span>
                        </div>
                        <ul>
                            <li>
                                <p class="top">
                                    <span>2020-12-07</span>
                                    <span>236472</span>
                                </p>
                                <p class="bottom">
                                    JTalk 是掘金主办的面向开发者的技术系列活动。理念是分享 & 交流最新、最热的
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="tags">
                        <div class="title-line">
                            <span>热门标签</span>
                            <span>Hot Tags</span>
                        </div>
                        <div class="tags-list">
                            <el-tag v-for="item in labelList" :key="item.id">{{item.name}}</el-tag>
                        </div>
                    </div>
                    <div class="friends">
                        <div class="title-line">
                            <span>友情链接</span>
                            <span>Friendly Link</span>
                        </div>
                        <div class="url-content">
                            <div class="tp">
                                他们同样是一群网虫，却不是每天泡在网上游走在淘宝和网游之间、刷着本来就快要透支的信用卡。他们或许没有踏出国门一步，但同学却不局限在一国一校，而是遍及全球！
                                <a href="">申请交换友链</a>
                            </div>
                            <div class="tl">
                                <el-tag>标签标签标签一</el-tag>
                                <el-tag>标签一</el-tag>
                                <el-tag>标签一</el-tag>
                                <el-tag>标签一</el-tag>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import ArticleItemCard from '@/components/article-item-card'
    import EmptyData from '@/components/empty-data'
    import myAjax from "@/utils/ajax.js"
    import moment from "moment"
    export default {
        name: 'home',
        components: {
            ArticleItemCard,
            EmptyData
        },
        props: {},
        data() {
            return {
                prefixCls: 'views-home',
                articleList: [],
                labelList:[]
            }
        },
        computed: {
            imgHeight() {
                return document.body.clientWidth / 1920 * 480
            }
        },
        watch: {},
        created() {
            Promise.all([this.getArticleList(), this.getLabelList()]).then(() => {

            })
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            getLabelList() {
                return new Promise((res, rej) => {
                    myAjax({
                            url: "label/all",
                        })
                        .then((json) => {
                            if (json.result) {
                                this.labelList = json.data || [];
                            }
                            res();
                        })
                        .catch((err) => {
                            rej(err);
                        });
                });
            },
            getArticleList() {
                return new Promise((res, rej) => {
                    myAjax({
                        url: "blog/list",
                        data: {
                            status: 1
                        }
                    }).then(json => {
                        const list = json.data.list || []
                        list.forEach((x) => {
                            x.createdAt = moment(x.created_at).format("YYYY-MM-DD HH:mm");
                        });
                        this.articleList = list
                    })
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    $prefixCls: 'views-home';

    .#{$prefixCls} {
        .banner-warp {
            img {
                width: 100%;
                height: 100%;
                object-fit:cover;
            }
        }

        // 统一的标题样式
        .title-line {
            position: relative;

            span {
                display: inline-block;

                &:first-child {
                    line-height: 53px;
                    font-size: 30px;
                    border-bottom: 2px solid $--color-primary;
                }

                &:last-child {
                    height: 45px;
                    line-height: 45px;
                    margin-left: 10px;
                    font-size: 18px;
                    color: #666;
                    vertical-align: middle;
                }
            }

            &::after {
                content: '';
                height: 1px;
                width: 175px;
                position: absolute;
                left: 120px;
                bottom: 1px;
                background-color: $--border-color-base;
            }
        }

        .about-blog {
            display: flex;
            justify-content: space-between;
            margin-top: 65px;

            .left {
                .txt-content {
                    line-height: 23px;
                    padding: 40px 0 46px 0;
                }
            }

            .right {
                margin-left: 140px;

                img {
                    width: 200px;
                }
            }


        }

        .main {
            padding: 10px 0 30px 0;
            display: flex;

            .article-wrapper {
                position: relative;
                flex: 1;

                .empty {
                    position: absolute;
                    top: 120px;
                    left: 50%;
                }
            }

            .aside-wrapper {
                width: 296px;
                margin-left: 42px;

                >div {
                    margin-bottom: 55px;
                }

                .el-tag {
                    height: 26px;
                    line-height: 26px;
                    color: #fff;
                    border-radius: 4px;
                    margin-right: 10px;
                    margin-bottom: 14px;
                    background-color: #5D5D5D;
                    text-align: center;
                    border: 0;

                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                }

                .news {

                    ul li {
                        margin-top: 21px;
                        border-bottom: 1px dashed $--border-color-base;

                        .top {
                            display: flex;
                            justify-content: space-between;
                            color: #333;
                        }

                        .bottom {
                            padding: 8px 0 20px 0;
                        }
                    }


                }

                .tags {
                    .tags-list {
                        padding-top: 28px;

                        .el-tag {
                            width: 92px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }

                .friends {
                    .url-content {
                        .tp {
                            padding: 29px 0 20px 0;
                        }
                    }
                }
            }
        }
    }
</style>
