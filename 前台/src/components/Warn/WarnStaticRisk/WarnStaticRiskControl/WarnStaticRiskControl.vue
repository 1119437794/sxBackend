<script>
     /*
   * @component 预警/静态风险指数/实际控制人风险/列表 组件
   * @author yxc
   * @date 2016/11/12 0012
   * */

     import WarnStaticRiskControlTable from "./WarnStaticRiskControlTable/WarnStaticRiskControlTable.vue"
     import WarnStaticRiskTrend from "../WarnStaticRiskTrend/WarnStaticRiskTrend.vue"
     import WarnRiskDetails from '../../WarnRiskDetails/WarnRiskDetails.vue'
     import riskInfo from '../../../../assets/js/riskInfo'
     import mixin from '../../../../assets/js/mixins'

     export default {
         mixins:[mixin],
       props: [
         "staticRiskListData", // 静态风险指数数据
         "staticRiskListTrendData" // 静态风险指数风险趋势
       ],

       data(){
        return {
            riskInfo: riskInfo.static, // 风险解释信息
            itemIndex: -1, // 当前列表项下标
            handleRiskDetailsIndex: false, // 显隐风险详情弹框
            riskDetailsTitle: '',
            riskDetails: '',
            riskDetailsTop: 0,
            isClickOthers: true
        }
      },

       computed: {

        // 针对传入staticRiskListTrendData 格式化处理
        lineOptions(){

          let xAxis = [];
          let companyVal = [];
          let industryVal = [];
          let staticRiskItemTrendData = this.staticRiskListTrendData[this.itemIndex]

          if(staticRiskItemTrendData) {
            staticRiskItemTrendData.map( function(item) {
              xAxis.push(item.date);
              companyVal.push(item.companyIndex);
              industryVal.push((+item.industryIndex).toFixed(1));
            });
          }

          return {
            xAxis,
            companyVal,
            industryVal
          }
        }
      },

       methods: {
           // 针对点击展开收起操作
           handleClick(index){

          if(index == this.itemIndex){
            this.itemIndex = -1;

          }else {
            this.itemIndex = index;
          }
        }
      },

       components: {
        WarnStaticRiskTrend,
        WarnStaticRiskControlTable,
        WarnRiskDetails
      }
    }
</script>

<template>
  <ul ref="warnStaticRiskControl__root" class="warnStaticRiskControl__root">
      <template v-for="(item, index) of staticRiskListData">
          <!-- 风险指数-->
          <li
        :class="{ 'warnStaticRiskControl__item': true, 'warnStaticRiskControl__item--active': itemIndex == index }"
      >
        <span class="warnStaticRiskControl__title" v-text="item.text"></span>
        <span class="warnStaticRiskControl__info" @click="e => showWarnRiskDetails(e, 'warnStaticRiskControl__root', item.text, riskInfo[item.text])"></span>
        <span class="warnStaticRiskControl__text">
          {{item.value}}
          <i class="iconfont icon-xialajiantou warnStaticRiskControl__arrow" @click="handleClick(index)"></i>
        </span>
      </li>
          <!-- 风险指数趋势 -->
          <WarnStaticRiskTrend
        v-if="item.text !== '举报风险'"
        title="风险趋势图"
        :trendData="lineOptions"
        v-show="itemIndex == index"
      ></WarnStaticRiskTrend>
          <!-- 风险指数具体指数 -->
          <WarnStaticRiskControlTable
        :listData="item.unfold"
        v-show="itemIndex == index"
      ></WarnStaticRiskControlTable>
      </template>

      <WarnRiskDetails
              v-show="WarnRiskDetails.show"
              :title="WarnRiskDetails.title"
              :text="WarnRiskDetails.details"
              :top="WarnRiskDetails.top"
              @callback="closeWarnRiskDetails"
      ></WarnRiskDetails>
  </ul>
</template>

<style lang="scss">
  @import "WarnStaticRiskControl.scss";
</style>
