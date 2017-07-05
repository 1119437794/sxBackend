<script>
     /*
   * @component 预警/静态风险/风险趋势 组件
   * @author yxc
   * @date 2016/11/23 0023
   * */
     import Eline from "../../../../Echarts/Line.vue"
     import DetailsTitile from "../../../FullInfo/Details/DetailsTitile/DetailsTitile.vue"

     export default {

       props: [
         "title",
         "trendData" //趋势渲染数据
       ],

       computed: {

         // 图表配置
         lineOptions(){

           // 针对公司 空字符串处理
           let tmpCompanyValArr = [];
           this.trendData.companyVal.map((item) => {

             if(item === ""){
               tmpCompanyValArr.push(null);

             }else {
               tmpCompanyValArr.push((+item).toFixed(1));
             }
           })

           return {
             color:["#edaa04","#108bd8"],
             titleX:"left",
             symbolSize:10,
             legendIsShow:true,
             unit:['',""],
             yAxisName:"",
             legendRight:"center",
             yFlag:"",//y轴的单位
             legendTop:'4%',
             legendPadding:[0,0,0,0],
             grid:{top:'10%',left: '5%',right: '5%',bottom: '10%',containLabel: true},
             legend:["公司","行业"],

             xAxis: this.trendData.xAxis,
             series: [
               {
                 name:'公司',
                 type:'line',
                 data: tmpCompanyValArr
               },
               {
                 name:'行业',
                 type:'line',
                 data: this.trendData.industryVal
               }
             ]
           }
         }
       },

       components: {
         Eline,
         DetailsTitile
       }
     }
</script>

<template>

  <div class="WarnStaticRiskTrend__root">
    <!-- 趋势图头部 -->
    <DetailsTitile :title="title"></DetailsTitile>

    <!-- 趋势图表 -->
    <div class="warnStaticRisk__line">
      <Eline :options="lineOptions"></Eline>
    </div>
  </div>
</template>

<style lang="scss"></style>
