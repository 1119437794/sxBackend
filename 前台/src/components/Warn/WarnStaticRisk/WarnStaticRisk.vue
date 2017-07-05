<script>
     /*
   * @component 预警/静态风险指数 组件
   * @author yxc
   * @date 2016/11/12
   * */
     import { mapState } from "vuex"
     import { ajax } from "../../../assets/js/utils"
     import { DYNAMICPIC_DETAILS_SET } from "../../../store/types"

     import WarnRiskHeader from "../WarnRiskHeader/WarnRiskHeader.vue"
     import DetailsTitile from "../../FullInfo/Details/DetailsTitile/DetailsTitile.vue"
     import WarnStaticRiskIndex from "./WarnStaticRiskIndex/WarnStaticRiskIndex.vue"
     import Radar from "../../../Echarts/Radar.vue"
     import WarnStaticRiskControl from "./WarnStaticRiskControl/WarnStaticRiskControl.vue"
     import WarnStaticRiskTpContainer from "./WarnStaticRiskTpContainer/WarnStaticRiskTpContainer.vue"
     import SelectBox from "../../SelectBox/SelectBox.vue"
     import WarnStaticRiskTrend from "./WarnStaticRiskTrend/WarnStaticRiskTrend.vue"
     import DetailsOthers from '../../FullInfo/Details/DetailsOthers/DetailsOthers.vue'
     import mixin from '../../../assets/js/mixins'


    export default {
        mixins: [mixin],
       data(){
         return {

           selectedDate: "", // 日期版本号
           selectShowDataList: [] ,//日期选择数据列表
           selectShowDataList2: [] ,//日期选择数据列表

           searchBoxVal: "", // 搜索框输入内容
           searchResList: [], // 搜索框模糊匹配结果列表
           isHasSearchRes: true, // 是否有搜索结果

           dimension: 2, // 图谱维度
           picSearchResList: [], //图谱搜索匹配结果
           isHasPicSearchRes: [], //是否有图谱搜索匹配结果
           dynamicPicCompanys: [], // 图谱数据 暂存用于图谱搜索

           staticRiskData: {}, // 静态指数
           staticRiskListConfig: [
           {
             text: "实际控制人风险",
             key: "realConRisk"
           },
           {
             text: "公司扩张路径风险",
             key: "comExpRisk"
           },
           {
             text: "关联方中心积聚化风险",
             key: "relInRisk"
           },
           {
             text: "非法融资衍生风险",
             key: "illFinRisk"
           },
           {
             text: "短期逐利风险",
             key: "shortRisk"
           },
           {
             text: "非法融资违规风险",
             key: "illMoneyFinRisk"
           },
           {
             text: "人才结构风险",
             key: "perStructRisk"
           },
           {
             text: "资本背景风险",
             key: "capitalBgRisk"
           },
           {
             text: "举报风险",
             key: "reportRisk"
           },
         ], // 静态风险各指数项的标题以及key值配置
           staticRiskListData: [], // 静态风险各指数项数值
           staticRiskListTrendData: [], // 静态风险各指数项风险趋势

           WarnTotalNum: {
               jq: {},
               yj: {}
           } // 举报风险数据
         }
       },

      computed: {

         // 获取公司名称
         companyName(){
           return this.$route.query.company
         },

        // 静态风险指数构成 雷达图配置
        RadarOptions(){

          let text = [];
          let value = [];
          this.staticRiskListData = []; // 清空下
          let staticRisk = this.staticRiskData.staticRisk;

          if(staticRisk) {
            this.staticRiskListConfig.map( item => {

              let itemText = item.text;
              let itemVal = (+staticRisk[item.key]).toFixed(1);

              text.push(itemText);
              value.push((+staticRisk[item.key]));

              /*
              * 在此处 处理雷达图需要的数据
              * 顺便把静态风险指数列表以及列表项具体指标处理出来
              * */
              let unfold = [];
              switch (itemText) {

                case "实际控制人风险":
                  unfold = [
                    {
                      text: "单个一度关联自然人最大控制企业数量",
                      value: staticRisk.maxComNum || "0.00"
                    },
                    {
                      text: "平均每位一度关联自然人控制企业数量",
                      value: staticRisk.avgPerNum || "0.00"
                    },
                    {
                      text: "核心一度关联自然人",
                      value: staticRisk.oneLvlPer || "0.00"
                    },
                  ]; break;

                case "公司扩张路径风险":
                  unfold = [
                    {
                      text: "控股子公司自然人股东数量",
                      value: staticRisk.cldComConPerNum || "0.00"
                    },
                    {
                      text: "控股子公司企业法人数量",
                      value: staticRisk.cldCtlNum || "0.00"
                    },
                    {
                      text: "核心子公司",
                      value: staticRisk.coreCldCom || "0.00"
                    },
                  ]; break;

                case "关联方中心积聚化风险":
                  unfold = [
                    {
                      text: "控股子公司数量",
                      value: staticRisk.ctlCldComNum || "0.00"
                    },
                    {
                      text: "一度关联企业数量",
                      value: staticRisk.oneComNum || "0.00"
                    },
                    {
                      text: "控股子公司",
                      value: staticRisk.conCom || "0.00"
                    },
                  ]; break;

                case "非法融资衍生风险":
                  unfold = [
                    {
                      text: "三度关联自然人节点数",
                      value: staticRisk.thrPerNum || "0.00"
                    },
                    {
                      text: "二度关联企业法人节点数",
                      value: staticRisk.twoComNum || "0.00"
                    },
                    {
                      text: "核心二度关联公司",
                      value: staticRisk.coreTwoCom || "0.00"
                    },
                  ]; break;

                case "短期逐利风险":
                  unfold = [
                    {
                      text: "6个月以内新成立公司数量",
                      value: staticRisk.sixMonNewComNum || "0.00"
                    },
                    {
                      text: "6个月~1年以内新成立公司数量",
                      value: staticRisk.toYearNewComNum || "0.00"
                    },
                    {
                      text: "6个月以内新成立的公司",
                      value: staticRisk.sixMonNewCom || "0.00"
                    },
                  ]; break;

                case "非法融资违规风险":
                  unfold = [
                    {
                      text: "投资类",
                      value: staticRisk.investment || "0.00"
                    },
                    {
                      text: "咨询类",
                      value: staticRisk.advisory || "0.00"
                    },
                    {
                      text: "贸易类",
                      value: staticRisk.trade || "0.00"
                    },
                    {
                      text: "租赁类",
                      value: staticRisk.lease || "0.00"
                    },
                    {
                      text: "保理类",
                      value: staticRisk.factoring || "0.00"
                    },
                    {
                      text: "公司名单",
                      value: staticRisk.companyList || "0.00"
                    },
                  ]; break;

                case "人才结构风险":
                  unfold = [
                    {
                      text: "本科人次",
                      value: staticRisk.underNum || "0.00"
                    },
                    {
                      text: "硕士以上人次（包括硕士）",
                      value: staticRisk.upperUnderNum || "0.00"
                    },
                    {
                      text: "本科以下人次",
                      value: staticRisk.flwUnderNum || "0.00"
                    },
                    {
                      text: "Top5岗位",
                      value: staticRisk.top5RecSum || "0.00"
                    },
                  ]; break;

                case "资本背景风险":
                  unfold = [
                    {
                      text: "上市企业",
                      value: staticRisk.listedCompanyNum || "0.00"
                    },
                    {
                      text: "国企",
                      value: staticRisk.stateCompanyNum || "0.00"
                    },
                    {
                      text: "持有金融牌照企业",
                      value: staticRisk.financialLicenseNum || "0.00"
                    }
                  ]; break;
                  case "举报风险":
                      unfold = [
                          {
                              text: "警情次数",
                              value: this.WarnTotalNum.jq.count || "0.00"
                          },
                          {
                              text: "预警次数",
                              value: this.WarnTotalNum.yj.count || "0.00"
                          }
                      ]; break;
              }

              this.staticRiskListData.push({
                text: itemText,
                value: itemVal,

                // 指数项 展开详情数据
                unfold: unfold
              });
            })
          };

          // 返回雷达图配置
          return {
            color:["#a40000"],//线条的颜色
            title:"基础雷达图",
            splitAreaColor:[
               '#fff',
               '#a1ebf4',
               '#58c3ff',
               '#3485ee',
               '#fff'
             ],
            data:[
              text,//对应每一个角的标题字段
              value//每个标题对应的数据
             ]
           }
        },

        // 风险趋势图数据处理
        LineData(){

          let xAxis = [];
          let companyVal = [];
          let industryVal = [];

          let staticRiskTrend = this.staticRiskData.staticRiskTrend;

          if(staticRiskTrend) {
            staticRiskTrend.map( item => {
              xAxis.push(item.date);
              companyVal.push(item.companyIndex);
              industryVal.push((+item.industryIndex).toFixed(1));
            })
          }

          return {
            xAxis,
            companyVal,
            industryVal,
          }
        },

        // 获取store中 图谱某一个节点详情
        ...mapState({
          dynamicPicDetails: state => state.dynamicPicDetails.renderData
        })
      },

      methods: {

        /*
        * @method getDateList 获取日期列表
        * */
        getDateList(){

          ajax({
            method: "get",
            url: "/staticRisk/dateList.do",
            params: {
              companyName: this.companyName
            },

            success: (res) => {
                const content = res.content
                this.selectShowDataList2 = content
                this.selectShowDataList = content.map(item => item.substr(0, 7));
            }
          })
        },

        /*
        * @method getStaticRiskData 获取静态指数
        * */
        getStaticRiskData(){

          ajax({
            method: "get",
            url: "/staticRisk/queryRiskData.do",
            params: {
              companyName: this.companyName,
              riskDate: this.selectedDate,
            },

            success: (res) => {
              this.staticRiskData = res.content;
            }
          })
        },

        /*
        * @method getStaticRiskItemTrend 获取指数项静态风险趋势
        * */
        getStaticRiskItemTrend(){

          ajax({
            method: "get",
            url: "/staticRisk/trendDetails.do",
            loading: false,
            params: {
              companyName: this.companyName
            },

            success: (res) => {

              let trendDetails = res.content;
              this.staticRiskListTrendData = [];
              this.staticRiskListConfig.map((item) => {
                this.staticRiskListTrendData.push(trendDetails[item.key]);
              });
            }
          })
        },

        /*
        *  @method getDynamicPicData 获取静态指数图谱数据
        * */
        getDynamicPicData(){

          ajax({
            method: 'GET',
            url: '/queryDynamicPicData.do',
            params: {
              companyName: this.companyName,
              dataVersion: this.selectedDate,
              degree: this.dimension,
            },
            success: (res) => {

              let data = res.content;

              // 用于图谱搜索
              this.dynamicPicCompanys = data.pointList;



              // 关联图渲染
              seajs.use("/static/libs/relativeGraph/assets/script/main/dynamic.js",  (main) => {

                var pointList = data.pointList;
                if (pointList == null || pointList == "" || pointList == "undefined") {
                  nodes = [];
                } else {
                  nodes = [];
                  for (var i = 0; i < pointList.length; i++) {
                    var point = pointList[i];

                    var symbol = "rect";
                    if (point.isPerson == "1") {
                      symbol = "circle";
                    }

                    var color = "#FF0000";
                    if (point.level == "1") {
                      color = "#0030AF";
                      if (point.isSonCom == "1") {
                        color = "#FFCA00";
                      }
                    } else if (point.level == "2") {
                      color = "#36B3EB";
                    } else if (point.level == "3") {
                      color = "#C1C1C1";
                    } else {
                    }

                    nodes[i] = {
                      "addflag": "false",
                      "category": point.level,
                      "color": color,
                      "name": point.name,
                      "symbol": symbol,
                      "isGetCompany":true
                    };
                  }
                }
                var lineList = data.lineList;
                if (lineList == null || lineList == "" || lineList == "undefined") {
                  links = [];
                } else {
                  links = [];
                  for (var i = 0; i < lineList.length; i++) {
                    var line = lineList[i];
                    var lineType = "line";
                    if (line.isFullLine == "0") {
                      lineType = "dotted";
                    }
                    links[i] = {
                      "addflag": "false",
                      "guanlian": line.type,
                      "line": lineType,
                      "relatedParyName": line.relationship,
                      "source": line.orig,
                      "target": line.target
                    };
                  }
                }

                level = this.dimension;
                main.reDrawCanvas();
              });
            }
          })
        },


        // 下拉框选择变化
        selectChange(val){
          const tmpIndex = this.selectShowDataList2.findIndex(item => item.includes(val))
          this.selectedDate = this.selectShowDataList2[tmpIndex]

            // 日期选择变化  获取关联方图谱 静态风险指数 都会重新请求
          this.getDynamicPicData();
          this.getStaticRiskData();
          this.getStaticRiskItemTrend();
        },

        // 图谱维度切换
        tabChange(dimension){
          this.dimension = dimension;
          this.getDynamicPicData();
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
            path: "/warn/staticrisk",
            query: {
              company: searchVal
            }
          });
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

        // 图谱输入框内容变化时
        picSearchChange(searchVal){

          this.picSearchResList = [];
          let dynamicPicCompanys = this.dynamicPicCompanys;

          if(!searchVal) return ;

          for(let i=0, len=dynamicPicCompanys.length; i<len; i++) {

            let dynamicPicCompany = dynamicPicCompanys[i];
            let dynamicPicCompanyName = dynamicPicCompany.name;

            if( dynamicPicCompanyName.includes(searchVal)) {

              this.picSearchResList.push({
                companyName: dynamicPicCompanyName,
                nodeType: dynamicPicCompany.isPerson === "1" ? "people" : "rect",
                showCompanyName: dynamicPicCompanyName.replace(searchVal, `<font color="f5a800">${searchVal}</font>`)
              });
            }

            if( this.picSearchResList.length > 4 ) break;
          }

          this.isHasPicSearchRes = this.picSearchResList.length ? true : false;
        },
        // 图谱搜索结果列表点击提交时
        picSearchSubmit(){
          /*
          * 当你看到这段代码时 你会很诧异 没关系
          * 这是因为图谱事件委托造成的
          * 必须等待请求节点详情时  才能设置picSearchResList
          * */
          setTimeout(() => {
            this.picSearchResList = [];
          }, 0);
        },
        // 图谱全屏 或 小屏
        picScreenAction(){
          this.getDynamicPicData();
        },

        // 判断是否有母公司
        getStaticRiskIndex() {
              ajax({
                  method: 'get',
                  url: '/staticRisk/getLatestRiskValue.do',
                  params: {
                      companyName: this.companyName
                  },
                  success: res => {
                      const content = res.content || {}
                      const tmpVal = +content.value
                      const parentName = content.parentName
                      if (parentName && tmpVal) {
                          this.$router.replace({ path: '/warn/staticrisk', query: { company: parentName }})
                      } else {
                          this.getDateList();
                          this.getStaticRiskData();
                          this.getDynamicPicData();
                          this.getStaticRiskItemTrend();
                      }
                  }
              })
        }
      },

      created(){
        this.getStaticRiskIndex()
      },
      mounted() {
          setLog(this.companyName, '金融风险监测预警平台-静态风险指数')
          this.getWarnTotalNum(this.companyName, res => this.WarnTotalNum = res)
      },

      watch: {
        // 在当前页面选择了具体的公司
        companyName(){
            this.getStaticRiskIndex()
        }
      },
      components: {
        WarnRiskHeader,
        DetailsTitile,
        WarnStaticRiskIndex,
        Radar,
        WarnStaticRiskControl,
        WarnStaticRiskTpContainer,
        SelectBox,
        WarnStaticRiskTrend,
        DetailsOthers
      },
    }
</script>

<template>
  <div class="warnStaticRisk__root">

    <!-- 静态风险头部 -->
    <WarnRiskHeader
      :searchBoxVal="searchBoxVal"
      :title="companyName"
      :searchResList="searchResList"
      :isHasSearchRes="isHasSearchRes"
      @searchChange="searchChange"
      @searchResListSubmit="searchResListSubmit"
      @searchSubmit="searchSubmit"
    >
      <!-- 日期下拉框 -->
      <SelectBox
        slot="select"
        :dataList="selectShowDataList"
        @selectChange="selectChange"
      ></SelectBox>
    </WarnRiskHeader>

    <div class="warnStaticRisk__wrap">

      <div class="warnStaticRisk__left">
        <WarnStaticRiskTpContainer
          :dimension="dimension"
          :picSearchResList="picSearchResList"
          :dynamicPicDetails="dynamicPicDetails"
          :isHasPicSearchRes="isHasPicSearchRes"
          @tabChange="tabChange"
          @picSearchChange="picSearchChange"
          @picSearchSubmit="picSearchSubmit"
          @picScreenAction="picScreenAction"
        ></WarnStaticRiskTpContainer>
        <DetailsTitile title="核心数据"></DetailsTitile>
        <DetailsOthers :companyName="companyName"></DetailsOthers>
      </div>

      <div class="warnStaticRisk__right">
        <WarnStaticRiskIndex
                :indexVal="staticRiskData"
        ></WarnStaticRiskIndex>

        <!-- 风险指数构成 -->
        <div class="warnStaticRisk__zsgc">
          <DetailsTitile title="静态风险指数构成"></DetailsTitile>
          <div class="warnStaticRisk__radar">
            <Radar :options="RadarOptions"></Radar>
          </div>
        </div>

        <!-- 风险趋势图 -->
        <WarnStaticRiskTrend
          title="静态风险趋势图"
          :trendData="LineData"
        ></WarnStaticRiskTrend>

        <!-- 实际控制人风险 -->
        <div class="warnStaticRisk__sjkz">
          <WarnStaticRiskControl
            :staticRiskListData="staticRiskListData"
            :staticRiskListTrendData="staticRiskListTrendData"
          ></WarnStaticRiskControl>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "WarnStaticRisk.scss";
</style>
