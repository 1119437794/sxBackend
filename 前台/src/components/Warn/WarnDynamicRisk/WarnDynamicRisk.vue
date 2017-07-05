<script>
     /*
   * @component 动态风险页面的顶级组件，负责分发数据
   * @author csy
   * @date 2016/11/12 0012
   * */
    import WarnRiskHeader from "../WarnRiskHeader/WarnRiskHeader.vue"
    import PicBox from "./WarnDynamicRiskPicBox/WarnDynamicRiskPicBox.vue"
    import CompareBox from "./WarnDynamicRiskCompareBox/WarnDynamicRiskCompareBox.vue"
    import TableBox from "./WarnDynamicRiskTableBox/WarnDynamicRiskTableBox.vue"

    import { ajax } from "../../../assets/js/utils"
    import { mapState, mapMutations } from "vuex"
    import { GET_DYNAMIC_DATE } from "../../../store/types"

    export default {

       data(){
         return {
           currentMonth:null,
           compareMonth:null,
           relationVo:null,
           dynamicRisk:null,
           dateList:[],
           doubleList:[],

           searchResList: [], // 搜索框模糊匹配结果列表
           isHasSearchRes: true, // 是否有搜索结果
         }
       },

       computed:{
        companyName(){
           return this.$route.query.company
        }
       },

       methods:{
          changeDate(data){
            this.doubleList = data;
            this.getBigData(data);
          },
          getBigData(doubleList){

            var _this = this;

            let date0 = new Date(doubleList[0]);
            let date1 = new Date(doubleList[1]);

            let currentMonth = Math.min(date0, date1) === +date0 ? doubleList[0] : doubleList[1];
            let compareMonth = Math.max(date0, date1) === +date0 ? doubleList[0] : doubleList[1];

              ajax({
              method: "GET",
              url: "/dynamicRisk/getData.do",
              params: {
                companyName: _this.companyName,
                currentMonth: currentMonth,
                compareMonth: compareMonth
              },
              success: (res) => {
                _this.relationVo = res.content.relationVo;
                _this.dynamicRisk = res.content.dynamicRiskVo;
              },

            })
          },


         // 搜索框相关操作
         searchChange(searchVal){

           if(!searchVal) {
             this.searchResList = [];
             return ;
           }

           ajax({
             method: "get",
             url: "/basedata/queryResult.do",
             params: {
               input: searchVal,
               pageNumber: 0,
               pageSize: 5,
               riskFlag: 1,
               type: 0,
               inputQuery: 1
             },

             success: (res) => {
             this.searchResList = res.content.list;
             this.isHasSearchRes = this.searchResList.length ? true : false;
           }
         })
         },
         searchResListSubmit(searchVal){
           this.searchResList = [];
           this.$router.push({
             path: "/warn/dynamicrisk",
             query: {
               company: searchVal
             }
           });
           this.initAjax()
         },
         searchSubmit(searchVal){
           this.$router.push({
             path: "/warn/searchoutput/",
             query: {
               searchVal: searchVal,
               type: 0
             }
           })
         },
         initAjax(){
            ajax({
              method: "GET",
              url: "/dynamicRisk/dateList.do",
              params: {
                companyName: this.companyName
              },
              success: (res) => {

                //针对只有一个日期的bug修复
                if (!res.content[1]) {
                  this.doubleList = [res.content[0],res.content[0]]
                } else {
                  this.doubleList = [res.content[0],res.content[1]];
                }

                this.dateList = res.content;
                this.getBigData(this.doubleList);
              },

            })
         }
       },

       created(){
          this.initAjax()
           setLog(this.companyName, '金融风险监测预警平台-动态态风险指数')
       },

      components: {
        WarnRiskHeader,
        PicBox,
        CompareBox,
        TableBox
      }
    }
</script>

<template>
  <div class="warnDynamicRisk__root">
    <!--
      TODO
      这里存在复用问题 暂时先不考虑
    -->
    <!-- 静态风险头部 -->
    <WarnRiskHeader
      searchBoxVal=""
      :title="companyName"
      :searchResList="searchResList"
      :isHasSearchRes="isHasSearchRes"
      @searchChange="searchChange"
      @searchResListSubmit="searchResListSubmit"
      @searchSubmit="searchSubmit"
      ></WarnRiskHeader>
     <div class="warnDynamicRisk__wrap">
        <PicBox
            @callback="changeDate"
            :dateList="dateList"
            :doubleList="doubleList"
            :companyName="companyName"
        ></PicBox>
        <CompareBox :relationVo="relationVo" :doubleList="doubleList"></CompareBox>
        <TableBox :dynamicRisk="dynamicRisk" :doubleList="doubleList"></TableBox>
     </div>
  </div>
</template>

<style lang="scss">
  @import "WarnDynamicRisk.scss";
</style>
