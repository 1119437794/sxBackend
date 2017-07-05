<script>
     /*
   * @component 组件
   * @author csy
   * @date 2016/11/12 0012
   * */
   import DynamicTitle from "../../../FullInfo/Details/DetailsTitile/DetailsTitile.vue"
   import WarnDynamicRiskPic from "./Component/WarnDynamicRiskPic.vue"

    export default {
       data(){
         return {
         }
       },

       props:[
        "dateList",
        "doubleList",
        "companyName"
       ],

       methods:{
         changeDate:function(data){
           this.$emit("callback",data);
         }
      },

      computed:{
        companyName(){
           return this.$route.query.company
        }
       },

       components: {
        DynamicTitle,
        WarnDynamicRiskPic
       }
    }
</script>

<template>
  <div class="warnDynamicRisk__picBox">
    <DynamicTitle title="时间轴对比图"></DynamicTitle>
    <WarnDynamicRiskPic
      @callback="changeDate"
      :AjaxDate="dateList"
      :company="companyName"
      :doubleList="doubleList"
      :SelectDefaultVal="0"
       id="leftSelect"
    ></WarnDynamicRiskPic>

    <WarnDynamicRiskPic
      @callback="changeDate"
      :AjaxDate="dateList"
      :company="companyName"
      :doubleList="doubleList"
      :SelectDefaultVal="1"
       id="rightSelect"
    ></WarnDynamicRiskPic>
  </div>
</template>

<style lang="scss">
  @import "WarnDynamicRiskPicBox.scss";
</style>
