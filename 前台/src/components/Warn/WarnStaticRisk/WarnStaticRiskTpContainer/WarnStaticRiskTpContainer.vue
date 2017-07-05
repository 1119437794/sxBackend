<script>
     /*
   * @component 预警/静态风险/关联方图谱容器 组件
   * @author yxc
   * @date 2016/11/14
   * btn_hidden_word
   * */
     import { ajax }from "../../../../assets/js/utils"

     import DetailsTitile from "../../../FullInfo/Details/DetailsTitile/DetailsTitile.vue"
     import SearchBoxHasResList from "../../../SearchBoxHasResList/SearchBoxHasResList.vue"
     import WarnStaticLegend from "../WarnStaticRiskLegend/WarnStaticRiskLegend.vue"
     import WarnStaticDimensions from "../WarnStaticRiskDimensions/WarnStaticRiskDimensions.vue"
     import WarnStaticRiskDetails from "../WarnStaticRiskDetails/WarnStaticRiskDetails.vue"
     import WarnStaticRiskTool from "./WarnStaticRiskTool/WarnStaticRiskTool.vue"

    export default {

      props: [
        "dimension", // 图谱维度
         "picSearchResList", // 搜索匹配结果
         "isHasPicSearchRes" // 是否有匹配结果
       ],

      data(){
         return {
           isFullscreen: false, //是否全屏
           dynamicPicDetails: {}, // 点击动态图谱 显示详情
           dynamicPicDetailsCompanyName: "", // 点击需要获取详情的公司名
         }
       },

      methods: {

        /*
         * @method clickScale 点击将图谱容器组件 全屏 和 正常切换
         * */
        handleoffScreen(){

          this.isFullscreen = !this.isFullscreen;

          if(this.isFullscreen) {
            document.body.style.overflow = "hidden";

          }else {
            document.body.removeAttribute("style");
          }

          // 通知父组件 重绘图谱
          this.$emit("picScreenAction");
        },

        tabChange(dimension){
          this.$emit("tabChange", dimension);
        },

        // 输入框内容变化时
        searchChange(searchVal){
          this.$emit("picSearchChange", searchVal);
        },

        // 图谱搜索点击 x 表示清除输入内容
        searchSubmit(){
          this.$emit("picSearchSubmit");
        },

        /*
        * 搜索结果列表点击提交
        * 只需清除搜索结果列表
        * */
        searchResListSubmit(){},

        picSearchSubmit(nodeInfo){
          SearchResListSubmitAct.info = nodeInfo;
          this.$emit("picSearchSubmit");
        },

        lookUpDetails(){
          this.$emit("lookUpDetails");
        }
      },

      mounted(){
        var _this = this;
        Object.defineProperty(DynamicPicCompanyNode, "companyName", {
          configurable: true, // 可删除的属性
          set: function(companyName){
            ajax({
              method: "GET",
              url: "/basedata/get.do",
              params: {
                companyName: companyName,
                token: sessionStorage.token
              },
              success: function(res){
                _this.dynamicPicDetails = res.content;
                _this.dynamicPicDetailsCompanyName = companyName;
              }
            })
          }
        })
      },

      destroyed(){
        document.body.removeAttribute("style");
        delete DynamicPicCompanyNode.companyName;
      },

      components: {
         DetailsTitile,
         SearchBoxHasResList,
         WarnStaticLegend,
         WarnStaticDimensions,
         WarnStaticRiskDetails,
         WarnStaticRiskTool
       },
    }

</script>

<template>
  <div
    :class="{
              'warnStaticRiskTpContainer__root': true,
              'warnStaticRiskTpContainer__root--active': isFullscreen
          }">

    <!-- 关联方图谱头部 -->
    <DetailsTitile title="关联方图谱">

      <!-- 点击放大 或 缩小 -->
      <i
        @click="handleoffScreen"
        :class="{
                  'icon-fangda': !isFullscreen,
                  'icon-suoxiao': isFullscreen,
                  'iconfont warnStaticRiskTpContainer__fullscreen': true,
                }"
      ></i>

      <SearchBoxHasResList
        placeholder="请输入您想要查询的关联方"
        :specialHandle="{type: '图谱搜索框'}"

        :searchResList="picSearchResList"
        :isHasRes="isHasPicSearchRes"

        @searchChange="searchChange"
        @searchSubmit="searchSubmit"
        @picSearchSubmit="picSearchSubmit"
        @searchResListSubmit="searchResListSubmit"
      ></SearchBoxHasResList>

    </DetailsTitile>

    <!-- 关联方图谱区 -->
    <div class="warnStaticRiskTpContainer__tp">

      <!-- 关联方图例和维度区 -->
      <div class="warnStaticRiskTpContainer__tlwd">
        <WarnStaticLegend></WarnStaticLegend>
        <WarnStaticDimensions
          :tabIndex="dimension-1"
          @tabChange="tabChange"
        ></WarnStaticDimensions>
      </div>

      <!-- 关联方图谱绘制区域 -->
      <div class="warnStaticRiskTpContainer__tpWrap">
        <WarnStaticRiskDetails
          :dynamicPicDetails="dynamicPicDetails"
          :companyName = "dynamicPicDetailsCompanyName"
          @lookUpDetails="lookUpDetails"
        ></WarnStaticRiskDetails>
        <WarnStaticRiskTool></WarnStaticRiskTool>

        <!-- 绘制图谱 -->
        <div id="dyMapMain">
          <div id="dyMap"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "WarnStaticRiskTpContainer.scss";
</style>
