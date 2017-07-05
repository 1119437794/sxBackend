<script>
     /*
   * @component 全息/详情/关联方 组件
   * @author yxc
   * */
     import WarnStaticRiskTpContainer from "../../../Warn/WarnStaticRisk/WarnStaticRiskTpContainer/WarnStaticRiskTpContainer.vue"
     import DetailsTitile from "../DetailsTitile/DetailsTitile.vue"
     import DetailsRelatesIndex from "./DetailsRelatesIndex/DetailsRelatesIndex.vue"
     import DetailsRelatesTable from "./DetailsRelatesTable/DetailsRelatesTable.vue"

     export default {

       props: [
         "dimension", // 图谱维度
         "dynamicPicDetails", // 关联图谱节点详情
         "relatesIndex", // 关联方指标
         "oneAndDimension", // 一度二度数据
         "picSearchResList",
         "isHasPicSearchRes"
       ],

       methods: {
         tabChange(dimension){
           this.$emit("dimensionTabChange", dimension);
         },
         picToolClick(){
           this.$emit("picToolClick")
         },
         picSearchChange(searchVal){
           this.$emit("picSearchChange", searchVal);
         },
         picSearchSubmit(){
           this.$emit("picSearchSubmit");
         },
         picScreenAction(){
           this.$emit("picScreenAction");
         },

         lookUpDetails(){
           this.$emit("lookUpDetails")
         }
       },

       components: {
         WarnStaticRiskTpContainer,
         DetailsTitile,
         DetailsRelatesIndex,
         DetailsRelatesTable
       }
    }
</script>

<template>
  <div class="detailsRelates__root">
    <div class="detailsRelates__left">
      <WarnStaticRiskTpContainer
        :dimension="dimension"
        :dynamicPicDetails="dynamicPicDetails"
        :picSearchResList="picSearchResList"
        :isHasPicSearchRes="isHasPicSearchRes"
        @tabChange="tabChange"
        @picSearchChange="picSearchChange"
        @picSearchSubmit="picSearchSubmit"
        @picScreenAction="picScreenAction"
        @picToolClick="picToolClick"
        @lookUpDetails="lookUpDetails"
      ></WarnStaticRiskTpContainer>
    </div>

    <div class="detailsRelates__right">
      <DetailsTitile title="关联方核心指标"></DetailsTitile>
      <DetailsRelatesIndex
        :relatesIndex="relatesIndex"
      ></DetailsRelatesIndex>
    </div>

    <DetailsRelatesTable
      :oneAndDimension="oneAndDimension"
    ></DetailsRelatesTable>
  </div>
</template>

<style lang="scss">
  @import "DetailsRelates.scss";
</style>
