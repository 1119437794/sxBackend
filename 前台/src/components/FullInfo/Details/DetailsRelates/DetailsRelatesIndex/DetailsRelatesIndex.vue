<script>
     /*
   * @component 全息/详情/关联方/指标 组件
   * @author yxc
   * @date 2016/11/14 0014
   * */

     import WarnStaticRiskControlTable from "../../../../Warn/WarnStaticRisk/WarnStaticRiskControl/WarnStaticRiskControlTable/WarnStaticRiskControlTable.vue"

    export default {

      props: ["relatesIndex"],

      data(){
        return {
          relatesIndexConfig: [
            {
              text: "目标公司自然人股东",
              key: "zrrgd"
            },
            {
              text: "目标公司非自然人股东",
              key: "fzrrgd"
            },
            {
              text: "目标公司子公司数（一度被投资公司）",
              key: "zgss"
            },
            {
              text: "核心关联自然人",
              key: "glzrr"
            },
            {
              text: "核心关联公司",
              key: "glgs"
            },
            {
              text: "关联公司集聚行业",
              key: "gsjjd"
            },
          ]
        }
      },

      computed: {
        safeTargetValue(){

          let relatesIndexData = [];
          this.relatesIndexConfig.map((item) => {
            relatesIndexData.push({
              text: item.text,
              value: this.relatesIndex[item.key]
            })
          })

          return relatesIndexData;
        }
      },

      components: {
         WarnStaticRiskControlTable
       }
    }
</script>

<template>
  <div class="detailsRelatesIndex__root">

    <div class="detailsRelatesIndex__wrap">
      <h2 class="detailsRelatesIndex__head">
        <span class="detailsRelatesIndex__name">指标名称</span>
        <span class="detailsRelatesIndex__value">指标值</span>
      </h2>

      <WarnStaticRiskControlTable
        :listData="safeTargetValue"
      ></WarnStaticRiskControlTable>
    </div>

  </div>
</template>

<style lang="scss">
  @import "DetailsRelatesIndex.scss";
</style>
