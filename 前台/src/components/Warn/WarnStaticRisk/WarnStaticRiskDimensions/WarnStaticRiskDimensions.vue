<script>
     /*
   * @component 预警/静态风险指数/维度切换 组件
   * @author yxc
   * @date 2016/11/12 0012
   * */

     import Tab from "../../../Tab/Tab.vue"

    export default {
       props: [
         "tabIndex" // 维度tab切换下标
       ],

       data(){
         return {
           tabs: ["一度", "二度", "三度"]
         }
       },

      methods: {
        tabChange(tabIndex){
          this.$emit("tabChange", tabIndex + 1);
        }
      },

      components: { Tab }
    }

</script>

<template>
  <div class="warnStaticDimensions__root">
    <h2 class="warnStaticDimensions__title">选择以下筛选条件</h2>
    <Tab :tabs="tabs"
         :tabIndex="tabIndex"
         @tabChange="tabChange"
    ></Tab>
  </div>
</template>

<style lang="scss">
  @import "WarnStaticRiskDimensions.scss";
</style>
