<template>
    <div :class="[prefixCls , 'clearfix']">
        <ul class="page-tabs clearfix">
            <li v-for="(item, index) in tabs" v-show="!item.isHide" :key="index"
                :class="{'active': currentTab === item.title, 'special': item.isSpecial,}"
                 @click="handlerSelect(item, index)">
                <span class="tab-text"  :title="item.title">
                    {{item.title}}</span>
                <span class="tab-num" v-if="isShowNum && !item.show">
                    ({{item.num || '0'}})
                </span>
                <!-- <el-tooltip effect=" dark" content="从邮箱同步但未与系统招聘职位匹配的简历数据" placement="bottom"
                    v-show="item.title=='未分配职位'">
                    <i class="iconfont-ats icon-tishi" :class="{'pagetabs': currentTab == '未分配职位'}"
                        style="margin-left:10px;">
                    </i>
                </el-tooltip> -->
            </li>
        </ul>
    </div>
</template>

<script>
    /**
     * 页面tabs切换组件
     * @param on-select Function 选择回调
     * */
    export default {
        name: "pageTabs",
        props: {
            /**
             * tabs数据
             * 数据结构为：[{title:'标题1', num:'2'},{title:'标题2', num:'3'}]
             * */
            tabs: {
                type: Array,
                default () {
                    return [];
                }
            },
            isDisabled: {
                type: Boolean,
                default () {
                    return false
                }
            },

            // 当前选中的tab
            currentTab: {
                type: String,
                default: ""
            },

            // 是否显示数量
            isShowNum: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                prefixCls: "components-pageTabs"
            };
        },
        methods: {
            handlerSelect(item, index) {
                if (this.isDisabled) return
                this.$emit("on-select", JSON.parse(JSON.stringify(item)), index);
            }
        }
    };
</script>

<style lang="scss" scoped>
    $prefixCls: "components-pageTabs";

    .#{$prefixCls} {
        width: 100%;
        min-height: 40px;

        .page-tabs {
            display: inline-block;
            padding-right: 20px;
            display: flex;

            li {
                flex: 1;
                height: .72rem;
                color: #fff;
                padding: 0 19px;
                cursor: pointer;
                border-bottom: 1px solid #29374B;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                float: left;
                margin-top: 15px;
                font-size: 24px;

                .tab-text {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                    display: block;
                }

                .tab-num {
                    margin-left: .066666666666667rem;
                    display: block;
                }

                &.active {
                    background: #29374B;
                    border-radius: .16rem .16rem 0 0;
                    color: $--color-white;
                    cursor: default;
                }

                .icon-tishi {
                    color: $--color-primary;
                    vertical-align: middle;
                }

                .pagetabs {
                    color: $--color-white;
                }

                &.special {
                    margin-left: 30px;
                }
            }
        }
    }
        @media (max-width: 768px) {
             .#{$prefixCls} {
                 .page-tabs {
                     li {
                         height: .96rem;
                         font-size: .373333333333333rem;
                     }
                 }
             }
        }
</style>
