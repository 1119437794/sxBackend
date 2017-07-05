 <script>
     /*
   * @component 组件
   * @author csy
   * @date 2016/11/12 0012
   * */
    import DetailsTitile from "../../../FullInfo/Details/DetailsTitile/DetailsTitile.vue"
    import Tabs from "../../../Tab/Tab2.vue"
    import { ajax } from "../../../../assets/js/utils"
    import WarnDynamicRiskStable from "./WarnDynamicRiskchildrenTable/WarnDynamicRiskStable.vue"
    import WarnDynamicRiskCore from "./WarnDynamicRiskchildrenTable/WarnDynamicRiskCore.vue"
    import WarnDynamicRiskContinued from "./WarnDynamicRiskchildrenTable/WarnDynamicRiskContinued.vue"
    import WarnDynamicRiskFoam from "./WarnDynamicRiskchildrenTable/WarnDynamicRiskFoam.vue"
    import WarnDynamicRiskTransmit from "./WarnDynamicRiskchildrenTable/WarnDynamicRiskTransmit.vue"
    import WarnDynamicRiskCrime from "./WarnDynamicRiskchildrenTable/WarnDynamicRiskCrime.vue"
    import WarnDynamicRiskArea from "./WarnDynamicRiskchildrenTable/WarnDynamicRiskArea.vue"
    import riskInfo from '../../../../assets/js/riskInfo'

    export default {
       props:[
            "dynamicRisk",
            "doubleList"
        ],
       data(){
         return {
           tabIndex:0,
           allShowA:false,
           allShowB:false,
           tabIndex:0,

           doubleListBack: [],
           riskInfo: riskInfo.dynamic
         }
       },

       computed:{
           // tab选项卡数据
           tabsArr () {
               return [
                   {
                       name1: '稳态运营<br>风险指数',
                       name2: '稳态运营风险',
                       value: this.dynamicRisk.steadyOperationRisk
                   },
                   {
                       name1: '核心资本运作<br>风险指数',
                       name2: '核心资本运作风险',
                       value: this.dynamicRisk.coreCapitalOperationRisk
                   },
                   {
                       name1: '可持续性<br>风险指数',
                       name2: '可持续性风险',
                       value: this.dynamicRisk.sustainableRisk
                   },
                   {
                       name1: '泡沫化<br>风险指数',
                       name2: '泡沫化风险',
                       value: this.dynamicRisk.foamRisk
                   },
                   {
                       name1: '传销<br>风险指数',
                       name2: '传销风险',
                       value: this.dynamicRisk.pyramidSellingRisk
                   },
                   {
                       name1: '非法集资<br>风险指数',
                       name2: '非法集资风险',
                       value: this.dynamicRisk.illegalFundRaisingRisk
                   },
                   {
                       name1: '跨区域舞弊<br>风险指数',
                       name2: '跨区域舞弊风险',
                       value: this.dynamicRisk.steadyStateOperationRisk
                   }
               ]
           }
       },
       components: {
        DetailsTitile,
        Tabs,
        WarnDynamicRiskStable,
        WarnDynamicRiskCore,
        WarnDynamicRiskContinued,
        WarnDynamicRiskFoam,
        WarnDynamicRiskTransmit,
        WarnDynamicRiskCrime,
        WarnDynamicRiskArea,
       },
       watch: {
          dynamicRisk(){
            this.allShowA = true;
          },
          doubleList(){
            if(!this.doubleList[1]) {
              this.doubleListBack = [this.doubleList[0],this.doubleList[0]];
            } else {
              let time0 = new Date(this.doubleList[0]);
              let time1 = new Date(this.doubleList[1]);

              this.doubleListBack = Math.min(time0, time1) === +time0 ?
                [this.doubleList[0], this.doubleList[1]] :
                [this.doubleList[1], this.doubleList[0]] ;

              //this.doubleListBack = [this.doubleList[0],this.doubleList[1]];
            }
          }
       },
       mounted(){
       },

       methods:{
        tabClick(index){
          this.tabIndex = index;
        }
       }

    }
</script>

<template>
  <div class="warnDynamicRisk__tableBox" v-if="allShowA">
    <DetailsTitile title="动态风险指数">
      <span class="warnDynamicRisk__titleNum">{{dynamicRisk.bbdTimeRiskIndex}}</span>
    </DetailsTitile>
    <div class="warnDynamicRisk__content">
      <Tabs
              :tabs="tabsArr"
              :tabIndex="tabIndex"
              @tabChange='tabClick'
              ></Tabs>
      <div class="warnDynamicRisk__staticTable">
          <!--ps:暂定用v-show来控制tabContent的显示 ||  slot-->
          <WarnDynamicRiskStable v-if="tabIndex==0" :dynamicRisk="dynamicRisk" :doubleList="doubleListBack"></WarnDynamicRiskStable>
          <WarnDynamicRiskCore v-if="tabIndex==1" :dynamicRisk="dynamicRisk" :doubleList="doubleListBack"></WarnDynamicRiskCore>
          <WarnDynamicRiskContinued v-if="tabIndex==2" :dynamicRisk="dynamicRisk" :doubleList="doubleListBack"></WarnDynamicRiskContinued>
          <WarnDynamicRiskFoam v-if="tabIndex==3" :dynamicRisk="dynamicRisk" :doubleList="doubleListBack"></WarnDynamicRiskFoam>
          <WarnDynamicRiskTransmit v-if="tabIndex==4" :dynamicRisk="dynamicRisk" :doubleList="doubleListBack"></WarnDynamicRiskTransmit>
          <WarnDynamicRiskCrime v-if="tabIndex==5" :dynamicRisk="dynamicRisk" :doubleList="doubleListBack"></WarnDynamicRiskCrime>
          <WarnDynamicRiskArea v-if="tabIndex==6" :dynamicRisk="dynamicRisk" :doubleList="doubleListBack"></WarnDynamicRiskArea>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "WarnDynamicRiskTableBox.scss";
</style>
