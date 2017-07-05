<script>
     /*
   * @component 预警/首页 组件
   * @author yxc
   * @date 2016/11/11 0011
   * */

     import { ajax, setRootFontSize } from "../../../assets/js/utils"

     import WarnIndexSearchBox from "./WarnIndexSearchBox/WarnIndexSearchBox.vue"
     import WarnIndexTab from "./WarnIndexTab/WarnIndexTab.vue"
     import Scatter from "../../../Echarts/Scatter.vue"
     import WarnIndexTable from "./WarnIndexTable/WarnIndexTable.vue"
     import MapSZ from "../../../Echarts/MapSZ.vue"
     import NoResNotice from "../../NoResNotice/NoResNotice.vue"


    export default {

      data(){
         return {

           // 散点图上的公司
           scatterCompanys: [],
           // 散点图配置
           scatterOptions: {},

           // 地图配置
           mapOptions: null,

           // 散点图查询限制条件
           limits: {area: "", money: 0, time: 0},
	         scatterMatchHasRes: true, // 默认散点图有匹配结果

           // 地区列表
           areaList: [],

           // 前100名企业数据
           curArea: "", // 当前地图地区
           giss: [], // 经纬度
           queryType: 8,
           topData: [] // 前100企业数据
         }
       },

        computed: {
          exportUrl () {
              return `/excel/exportRiskCompany.do?area=${this.curArea}`
              // return `/excel/exportRiskCompany.do?area=${this.curArea}&token=${sessionStorage.token}`
          }
        },

      methods: {

         /*
         * @method searchSubmit 搜索框内容提交
         * */
        searchSubmit(searchObj){
          this.$router.push({
            path: '/warn/searchoutput',
            query: searchObj
          });
        },

        /*
         *  getAreaList 请求地区列表
         * */
        getAreaList(){

          ajax({
            method: "get",
            url: "/indexData/getAreaList.do",
            success: (res) => {
              if(res.success){
                this.areaList = res.content;
                this.areaList.unshift("全部");
              }
            }
          })
        },

         /*
         * @method warnIndexTabChange 页面地区 注册资本 存续时间 tab切换回调
         * */
        warnIndexTabChange(val){
          this.limits = val;
          this.getScanner()
        },

        /*
        * @method getScanner 首页散点图
        * */
        getScanner() {

          let area = this.limits.area;
          let money = this.limits.money;
          let time = this.limits.time;

          ajax({
            method: "get",
            url: "/indexData/getScanner.do",
            params: {
              area: area,
              regCapital: money,
              regDate: time
            },
            success: (res) => {

              let companyInfo = []; // 公司信息
              let visualMapMaxArr = []; // 保存动态风险指的数组
              let companyIndex = []; // 公司指数
              let data = res.content;

	            let len = data.length;

	            if(len > 0) {
	            	this.scatterMatchHasRes = true;
		            for(let i=0; i<len; i++){

			            let tmpData = data[i];
			            companyInfo.push({
				            name: tmpData.companyName,
				            regCapital: tmpData.regCapital,
				            corporate: tmpData.legalRpt,
				            companyType: tmpData.companyType,
				            foundDate: tmpData.regDateStr,
			            });
			            visualMapMaxArr.push(tmpData.dynamicRiskIndex)
			            companyIndex.push([tmpData.staticRiskIndex, tmpData.dynamicRiskIndex])
		            }
	            }else {
		            this.scatterMatchHasRes = false;
		            visualMapMaxArr.push(0.2);
	            }

	            this.scatterOptions = {
		            title:"散点图",
		            visualMapMax:Math.max.apply( Math, visualMapMaxArr),//这里传一个动态风险指数的最大值
		            companyInfo: companyInfo,
		            yAxisName:"动态风险指数",
		            xAxisName:"静态风险指数",
		            series:[
			            {
				            name:'风险指数',
				            type:'scatter',
				            symbolSize:15,
				            data: companyIndex,
				            itemStyle:{
					            normal: {
						            // opacity: 0.8,
						            // borderWidth:1,
						            // borderColor:"#000"
					            },
					            emphasis:{
						            color:"#f0a808"
					            }
				            }
			            }
		            ]
	            };
	            this.scatterCompanys = companyInfo;
            }
          })
        },

        /*
         * @method scatterClick 点击散点图的回调
         * */
        scatterClick(companyIndex){
          this.$router.push({
            path: "/warn/staticrisk",
            query: {
              company: this.scatterCompanys[companyIndex].name
            }
          });
        },

        /*
         * @method getTop 前100名企业数据
         * */
        getTop(){

          ajax({
              method: "get",
              url: "/indexData/getTop.do",
              params: {
                  area: this.curArea,
                  queryType: this.queryType
              },
              success: (res) => {
                let scatterData = [];
                let _content = res.content;

                let _companys = _content.companys || {};
                let topData = _companys.list || [];

                let _giss = _content.giss || {};
                let gissArr = _giss.results || [];

                if(!this.mapOptions) {
                  gissArr.map((item, index) => {
                    topData.map((topItem, topIndex) => {
                      if(item.companyName === topItem.companyName) {
                          scatterData.push({
                              name: item.companyName,
                              value: [item.gisLon, item.gisLat, topItem.staticRiskIndex]
                          });
                      }
                    });
                  });


                  this.mapOptions = {
                    scatterData,
                    formatter:function(v){
                      return v.name+"："+v.value[2]
                    }
                  };
                }

                this.topData = topData;
              }
          })
        },

        /*
        * @method mapClick 监听地图点击
        * */
        mapClick(area, type) {

          //let tmpArea = area.replace(/市|区/, "");
          let tmpArea = area;

          switch (true) {

            case type === "geo":
              this.curArea = tmpArea === this.curArea ? "" : tmpArea;
              this.getTop();
              break;

//            case type === "series":
//              this.$router.push({
//                path: "/warn/staticrisk",
//                query: { company: tmpArea }
//              });
//              break;

            default:
              break;
          }

        },

        // Top 100 企业 根据选择的条件
        warnIndexTableCallBack (type) {
              this.queryType = type
              this.getTop()
        }
      },

      created(){
        this.getTop();
        this.getScanner();
        this.getAreaList();
          setLog('', '金融风险监测预警平台-首页')
      },

      updated(){
        setRootFontSize();
      },

      components: {
        WarnIndexSearchBox,
        WarnIndexTab,
        Scatter,
        WarnIndexTable,
        MapSZ,
	      NoResNotice
      },
    }
</script>

<template>
  <div class="warnIndex__root">

    <WarnIndexSearchBox
      @searchSubmit="searchSubmit"
    ></WarnIndexSearchBox>

    <div class="warnIndex__wrap">

      <!-- 散点图 -->
      <div class="warnIndex__scatter">
        <WarnIndexTab
          :areaList="areaList"
          @warnIndexTabChange="warnIndexTabChange"
        ></WarnIndexTab>

        <div class="warnIndex__scatterEchart">
	        <Scatter
            :options="scatterOptions"
            @callback="scatterClick"
            ></Scatter>
	        <NoResNotice
			        v-show="!scatterMatchHasRes"
			        msg="当前筛选条件下，无结果"
	        ></NoResNotice>
        </div>
      </div>

      <!-- 江苏地图 -->
      <div class="warnIndex__map">
        <h2 class="warnIndex__mapTitle">高风险企业地域分布</h2>
        <div class="warnIndex__mapWrap">
          <div class="warnIndex__mapEchart">
              <MapSZ :options="mapOptions" @callback="mapClick"></MapSZ>
          </div>
          <div class="warnIndex__table">
              <WarnIndexTable
                    :topData="topData"
                    @warnIndexTableCallBack="warnIndexTableCallBack"
            ></WarnIndexTable>
              <a class="warnIndex_export" :href="exportUrl">导出更多</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
  @import "WarnIndex.scss";
</style>
