<script>
     /*
   * @component 预警/静态风险/风险指数标题 组件
   * @author yxc
   * @date 2016/11/12 0012
   * */

    export default {
      props: [
        "indexVal",
      ],

      data(){
        return {
            riskLevel: '',
            setDirClassName: ""
        }
      },

      computed: {
        safeIndexVal(){
            const staticRisk = this.indexVal.staticRisk || {}
            this.riskLevel = staticRisk.riskLevel

          if(staticRisk) {
            switch (staticRisk.rise) {

              case "-1":
                this.setDirClassName = "warnStaticRiskIndex__dir warnStaticRiskIndex__dir--down";
                break;

              case "0":
                this.setDirClassName = "warnStaticRiskIndex__dir";
                break;

              case "1":
                this.setDirClassName = "warnStaticRiskIndex__dir warnStaticRiskIndex__dir--up";
                break;
            }

            const stcRiskIndex = staticRisk.stcRiskIndex || 0
            return stcRiskIndex.toFixed(1);

          }else {
            return 0;
          }

        }
      }
    }
</script>

<template>
  <div class="warnStaticRiskIndex__root">
    <i class="iconfont icon-zhuzhuangtu warnStaticRiskIndex__icon"></i>
    <span class="warnStaticRiskIndex__title">静态风险指数</span>
    <span class="warnStaticRiskIndex__space"></span>
    <span class="warnStaticRiskIndex__num" v-text="safeIndexVal"></span>
    <span :class="setDirClassName"></span>
      <span class="warnStaticRiskIndex_status" v-text="riskLevel">高位预警</span>
  </div>
</template>

<style lang="scss">
  @import "WarnStaticRiskIndex.scss";
</style>
