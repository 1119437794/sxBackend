<script>
  /*
  * @component 详情 组件
  * @author yxc
  * */

  import { mapState } from "vuex"
  import { ajax } from "../../../assets/js/utils"
  import { DYNAMICPIC_DETAILS_SET } from "../../../store/types"

  // 组件引入
  import DetailsHeader from "./DetailsHeader/DetailsHeader.vue"
  import DetailsNav from "./DetailsNav/DetailsNav.vue"
  import DetailsBasic from "./DetailsBasic/DetailsBasic.vue"
  import DetailsLitigations from "./DetailsLitigations/DetailsLitigations.vue"
  import DetailsRecruit from "./DetailsRecruit/DetailsRecruit.vue"
  import DetailsRelates from "./DetailsRelates/DetailsRelates.vue"
  import DetailsOpinion from "./DetailsOpinion/DetailsOpinion.vue"
  import DetailsOthers from './DetailsOthers/DetailsOthers.vue'
  import mixin from '../../../assets/js/mixins'

  export default {
      mixins: [mixin],
    data(){
      return {
        currentIndex: 0, // 当前视图下标
        views: [
          DetailsBasic,
          DetailsRelates,
          DetailsLitigations,
          DetailsRecruit,
          DetailsOpinion,
          DetailsOthers
        ], // 详情页面所有视图

        disableGlfNav: -1, // 关联方信息导航是否可用

        staticRiskIndex: {}, // 静态风险指数信息

        searchBoxVal: "", //  输入框内容
        searchResList: [], // 搜索框模糊匹配结果列表
        isHasSearchRes: true, // 是否有搜索匹配结果

        bbdQyxxId: "", // 企业唯一key
        isHasRes:true, // 是否有请求数据 默认是有
        listData: {}, // 渲染数据

        showButton: false, // 是否显示查看风险按钮
        isHasParentName: false, // 是否有母公司
        isFzjgFlag: false, // 是否是分支机构

        pageNum: 0, // 页码
        rowsTotal: 0, // 数据总条数

        dimension: 2, // 关联方维度
        picSearchResList: [], // 图谱搜索匹配结果
        isHasPicSearchRes: [], // 是否有图谱搜索匹配结果
        dynamicPicCompanys: [], // 图谱数据 暂存用于图谱搜索
        relatesIndex: {}, // 关联方指标
        oneAndDimension: {}, // 一度二度关联方数据

        litigationUrls: [
          "/basedata/ktgg.do", // 开庭公告
          "/basedata/cpws.do", // 裁判文书
          "/basedata/getZsrCompanyName.do", // 被执行人
          "/basedata/getSxbzsrCompanyName.do", // 失信被执行人
          "/basedata/getFyggCompanyName.do", // 法院公告
        ],// 诉讼信息相关请求地址
        litigationTabIndex: 0, // 诉讼信息tab选项卡下标
        litigationTabNum: [0, 0, 0, 0, 0], // 诉讼信息tab选项卡记录条数值
      }
    },

    computed: {
      // 获取路由中的公司名
      companyName(){
        return this.$route.query.company;
      },

      detailsRiskBtnShow () {
          if (this.showButton) {
              return this.isFzjgFlag ? this.isHasParentName : true
          }
          return false
      },

      ...mapState({
        dynamicPicDetails: state => state.dynamicPicDetails.renderData
      })
    },

    methods: {

      /*
      * @method 获取详情导航切换的下标 进而切换视图
      * */
      detailsNavIndexChange(index){
        this.pageNum = 0;
        this.listData = {};
        this.dimension = 2;
        this.isHasRes = true;
        this.litigationTabIndex = 0;
        this.currentIndex = index;
          const pagesName = [
                  '基本资料',
                  '关联方信息',
                  '诉讼信息',
                  '招聘信息',
                  '舆情看板',
                  '其他对接数据'
          ]
          setLog(`${this.companyName};浏览页面:“${pagesName[index]}”`, '全息信息查询平台-企业详情页')
        this.currentIndexChange();
      },

      /*
      * @method searchChange 搜索框输入内容变化，请求模糊搜索结果并展示在匹配结果列表
      * @searchVal 输入框内容
      * */
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
            riskFlag: 0,
            type: 0,
            inputQuery: 1
          },

          success: res => {
            this.searchResList = res.content.list;
            this.isHasSearchRes = this.searchResList.length ? true : false;
          }
        })
      },
      /*
      * @method searchSubmit 提交搜索，跳转到搜索结果页
      * */
      searchSubmit(searchVal){
        this.$router.push({
          path: "/fullinfo/",
          query: { company: searchVal }
        });
      },
      /*
       * @method searchResListSubmit 指定某公司，跳转到详情页
       * */
      searchResListSubmit(itemVal){
        this.pageNum = 0;
        this.searchResList = [];
        this.$router.push({
          path: "/fullinfo/details",
          query: {
            company: itemVal
          }
        });
      },

      /*
      * @method pageChange 页码变化
      * 根据变化类型请求数据
      * */
      pageChange(pageChange){

        let type = pageChange.type;
        this.pageNum = pageChange.value;

        switch (type){

          case "litigation":
            this.getBasedataLitigation();
            break;

          case "recruit":
            this.getRecruit();
            break;

          default:
            break;
        }

      },

      /*
       * @method getBasedata 获取基本资料
       * */
      getBasedata(){

        ajax({
          method: "get",
          url: "/basedata/get.do",
          params: {
            companyName: this.companyName
          },

          success: (res) => {
            let results = res.content.results[0];
            this.listData = results || {};
            let jbxx = this.listData.jbxx;
            this.showButton = this.listData.showButton;
            this.bbdQyxxId = jbxx && jbxx.bbdQyxxId;
          }
        })
      },


      /*
       * @method getDynamicPicData 获取关联方图谱
       * */
      getDynamicPicData(){

        ajax({
          method: 'GET',
          url: '/queryDynamicPicDataTwo.do',
          params: {
            unikey: this.bbdQyxxId,
            degree: this.dimension,
          },
          success: (res) => {

            let data = res.content;
            let allPoints = data.pointList;

            this.dynamicPicCompanys = data.pointList;

            // 关联图渲染
            seajs.use("/static/libs/relativeGraph/assets/script/main/dynamic.js",  main => {

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
      dimensionTabChange(tabIndex){
        this.dimension = tabIndex;
        this.getDynamicPicData();
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
      //点击关联方弹框查看详情按钮
      lookUpDetails(){
        this.currentIndex = 0;
      },

      /*
      * * @method getTargetValue 获取关联方指标
      * * */
      getTargetValue(){

        ajax({
          method: "get",
          url: "/basedata/getTargetValue.do",
          params: {
            companyName: this.companyName,
            unikey: this.bbdQyxxId,
          },

          success: (res) => {
            this.relatesIndex = res.content;
          }
        })
      },

      /*
      * @method getOneAndDimension 获取一度和二度
      * */
      getOneAndDimension(){

        ajax({
          method: "get",
          url: "/queryDynamicPicDataList.do",
          loading: false,
          params: {
            unikey: this.bbdQyxxId,
            companyName: this.companyName
          },

          success: res => {
            this.oneAndDimension = res.content;
          }
        })
      },

      /*
       * @method litigationTabChange 诉讼信息选项卡切换
       * */
      litigationTabChange(tabIndex){
        this.pageNum = 0;
        // 切换诉讼信息tab时 重置isHasRes
        this.isHasRes = true;
        this.litigationTabIndex = tabIndex;
      },
      /*
      * @method getBasedataLitigation 获取诉讼信息
      * */
      getBasedataLitigation(){

        ajax({
          method: "get",
          url: this.litigationUrls[this.litigationTabIndex],
          params: {
            companyName: this.companyName,
            pageNumber: this.pageNum,
            pageSize: 8
          },

          success: (res) => {
            this.listData = res.content.list;
            this.rowsTotal = res.content.count;
            this.isHasRes = this.rowsTotal ? true : false;
          }
        })
      },

      /*
       * @method getRecruit 获取招聘信息
       * */
      getRecruit(){
        ajax({
          method: "get",
          url: "/basedata/zhaopin.do",
          params: {
            companyName: this.companyName,
            pageNumber: this.pageNum,
            pageSize: 8,
          },
          success: res => {
            this.listData = res.content.list;
            this.rowsTotal = res.content.count;
            this.isHasRes = this.rowsTotal ? true : false;
          }
        })

      },

      /*
      * @method getOptions 获取舆情信息
      * */
      getOptions(){

        ajax({
          method: "get",
          url: "/basedata/getNews.do",
          params: {
            companyName: this.companyName
          },

          success: res => {
            this.listData = res.content.results;
            this.isHasRes = this.listData.length ? true : false;
          }
        })
      },

      /*
      * @method currentIndexChange 视图切换时调用
      * */
      currentIndexChange(){

        switch (this.currentIndex){

          // 获取基本资料
          case 0:
            this.getBasedata();break;

          // 获取关联方信息
          case 1:
            this.getTargetValue();
            this.getDynamicPicData();
            this.getOneAndDimension();
            break;

          // 获取诉讼信息
          case 2:
            // 公司名称变化 或是 点击 到诉讼信息选项卡
            // 需要请求所有诉讼信息的下数据条数
            this.litigationUrls.map((item, index) => {

              ajax({
                method: "get",
                url: item,
                params: {
                  companyName: this.companyName,
                  pageNumber: 0,
                  pageSize: 8
                },

                success: res => {
                  this.litigationTabNum.splice(index, 1, res.content.count);
                }
              });
            });

            this.getBasedataLitigation();break;

          // 获取招聘信息
          case 3:
            this.getRecruit();break;

          // 获取舆情
          case 4:
            this.getOptions(); break;

          default:
            break;
        }
      },

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
                  content.value = tmpVal ? tmpVal.toFixed(1) : '-'
                  this.staticRiskIndex = content
                  this.isHasParentName = content.parentName
              }
          })
      },

      // 是不是分支机构
      isFzjg () {
          ajax({
              method: 'get',
              url: '/basedata/checkFzjg.do',
              params: {
                  companyName: this.companyName
              },
              success: res => {
                  const flag = res.content
                  this.isFzjgFlag = flag
                  this.disableGlfNav = flag ? 1 : -1
              }
          })
      }
    },

    watch: {
      companyName(){
        this.getBasedata();
        this.isFzjg();
        this.getStaticRiskIndex()
        this.currentIndex = 0;
      },

      litigationTabIndex(){
        this.getBasedataLitigation();
      }
    },

    created(){
      this.isFzjg();

      // 获取基本资料
      this.getBasedata();

      // 获取静态指数
      this.getStaticRiskIndex()
    },

      mounted () {
          setLog(`${this.companyName};浏览页面:“基本资料”`, '全息信息查询平台-企业详情页')
      },

    components: {
      DetailsHeader,
      DetailsNav,
    }
  }
</script>

<template>
  <div class="details__root">

    <DetailsHeader
      :title="companyName"
      :searchBoxVal="searchBoxVal"
      :searchResList="searchResList"
      :isHasSearchRes="isHasSearchRes"
      placeholder="请输入想要查询的企业名称"
      @searchChange="searchChange"
      @searchSubmit="searchSubmit"
      @searchResListSubmit="searchResListSubmit"
    >
      <router-link
              v-if="isHasPermission([1])"
        tag="button"
        :class="{
            'details__riskBtn': true,
            'details__riskBtn--up': staticRiskIndex.flag === '1',
            'details__riskBtn--down': staticRiskIndex.flag === '-1'
        }"
        v-show="detailsRiskBtnShow"
        :to="{path: '/warn/staticrisk', query: {company: companyName}}"
      >静态风险指数：{{staticRiskIndex.value}}</router-link>
    </DetailsHeader>

    <DetailsNav
      :disableGlfNav="disableGlfNav"
      :defaultIndex="currentIndex"
      @detailsNavIndexChange="detailsNavIndexChange"
    ></DetailsNav>

    <div
        :is="views[currentIndex]"
        :listData="listData"

        :companyName="companyName"

        :pageNum="pageNum"
        :rowsTotal="rowsTotal"

        :isHasRes="isHasRes"

        :litigationTabIndex="litigationTabIndex"
        :litigationTabNum="litigationTabNum"
        @litigationTabChange="litigationTabChange"

        :dimension="dimension"
        :dynamicPicDetails="dynamicPicDetails"
        :picSearchResList="picSearchResList"
        :isHasPicSearchRes="isHasPicSearchRes"
        :relatesIndex="relatesIndex"
        :oneAndDimension="oneAndDimension"
        @picSearchChange="picSearchChange"
        @picSearchSubmit="picSearchSubmit"
        @picScreenAction="picScreenAction"
        @dimensionTabChange="dimensionTabChange"
        @lookUpDetails="lookUpDetails"

        @pageChange="pageChange"
      ></div>
  </div>
</template>

<style lang="scss">
  @import "Details.scss";
</style>
