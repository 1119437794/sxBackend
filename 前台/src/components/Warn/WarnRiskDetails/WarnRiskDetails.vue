<script>
     /*
    * @component 组件
    * @author yxc
    * */
     import { clickOtherClose } from '../../../assets/js/utils'

    export default {
        props: {
            top: {
                default: 0
            },
            left: {
                default: 0
            },
            title: {
                default: ''
            },
            text: {
                default: '说明'
            },
            subTitle: {
                default: '说明'
            }
        },
        data () {
            return {
                innerLeft: 0,
                innerTop: 0
            }
        },
        methods: {
            fixPos () {
                let warnRiskControlInfoRootDom = this.$refs["warnRiskDetails__root"];

                // 这里使用异步 保证 获取的是最新渲染过得弹框高度
                setTimeout(() => {
                    let warnRiskControlInfoRootDomHeight = warnRiskControlInfoRootDom.clientHeight;
                    let warnRiskControlInfoRootDomWidth = warnRiskControlInfoRootDom.clientWidth;
                    const innerTop = this.top - warnRiskControlInfoRootDomHeight
                    const innerLeft = this.left - warnRiskControlInfoRootDomWidth;
                    // this.innerTop = (innerTop < 0 ? 0 : innerTop)  + "px"
                    this.innerTop = (innerTop)  + "px"
                    this.innerLeft = (innerLeft < 0 ? 0 : innerLeft) + "px"
                }, 0);
            }
        },
        mounted () {
            clickOtherClose(this.$refs['warnRiskDetails__root'], () => this.$emit('callback') )
        },
        watch: {
            top () {
                this.fixPos()
            },
            left () {
                this.fixPos()
            }
        }
    }
</script>

<template>
    <div
            ref="warnRiskDetails__root"
            class="warnRiskDetails__root"
            :style="{'top': innerTop, 'left': innerLeft}"
    >
        <div class="warnRiskDetails__head">
            <h2 class="warnRiskDetails__title" v-text="title"></h2>
            <span class="warnRiskDetails__close" @click.stop="$emit('callback')"></span>
        </div>
        <div class="warnRiskDetails__body">
            <h2 class="warnRiskDetails__tip" v-if="subTitle" v-text="subTitle"></h2>
            <p class="warnRiskDetails__text" v-html="text"></p>
        </div>
    </div>
</template>

<style lang="scss">
    @import "WarnRiskDetails.scss";
</style>
