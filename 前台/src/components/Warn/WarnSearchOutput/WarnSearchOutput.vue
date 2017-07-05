<script>

  /*
  * @component 预警平台/搜索结果展示 组件
  * @author yxc
  * */

  import { ajax, setRootFontSize } from "../../../assets/js/utils"

  import SearchBoxHasResList from "../../SearchBoxHasResList/SearchBoxHasResList.vue"
  import SearchOutputItem from "./WarnSearchOutputItem/WarnSearchOutputItem.vue"
  import Pagination from "../../Pagination/Pagination.vue"
  import NoResNotice from "../../NoResNotice/NoResNotice.vue"

  export default {

    data(){
      return {
        pageNum: 0, // 页码
        dataList: [], // 渲染数据
        type: this.$route.query.type, //请求类型
        searchVal: this.$route.query.searchVal, // 请求关键词
        rowsTotal: 0, //数据记录条数
        isHasRes: true,
        searchResList: [], // 搜索框模糊匹配结果

        isHasSearchOutput: true // 默认是有搜索结果的
      }
    },

    components: {
      SearchBoxHasResList,
      SearchOutputItem,
      Pagination,
      NoResNotice
    },

    methods: {

      /*
       * @method queryResult 请求数据
       * */
      queryResult(){

        ajax({
          method: "get",
          url: "/basedata/queryResult.do",
          params: {
            input: this.searchVal,
            pageNumber: this.pageNum,
            pageSize: 8,
            riskFlag: 1,
            type: this.type
          },
          success: (res) => {
            this.rowsTotal = res.content.count;
            this.dataList = res.content.list;
            this.isHasSearchOutput = this.rowsTotal > 0 ? true : false;
          }
        });
      },

      /*
       * @method pageChange 点击分页页码 加载新数据
       * @param pageNum 页码
       * */
      pageChange(pageNum){
        //this.type = 0;
        this.pageNum = pageNum - 1;
        this.queryResult();
      },

      /*
      * @method searchChange 搜索框输入内容变化
      * */
      searchChange(searchVal){
        this.type = 0;
        this.searchVal = searchVal;

        if(!this.searchVal) {
          this.searchResList = [];
          return;
        }

        ajax({
          method: "get",
          url: "/basedata/queryResult.do",
          params: {
            input: this.searchVal,
            pageNumber: 0,
            pageSize: 5,
            riskFlag: 1,
            type: this.type,
            inputQuery: 1
          },
          success: (res) => {
            this.searchResList = res.content.list;
            this.isHasRes = this.searchResList.length > 0 ? true : false;
          }
        });
      },

      /*
       * @method searchSubmit 搜索框提交搜索
       * @param searchVal 搜索关键词
       * */
      searchSubmit(searchVal){
        this.type = 0;
        this.pageNum = 0;
        this.searchVal = searchVal;
        this.searchResList = [];
        this.queryResult();
      },

      /*
       * @method searchResListSubmit 点击搜索框结果列表项 跳转到公司详情
       * @param companyName 列表项的值
       * */
      searchResListSubmit(companyName){
        this.$router.push({
          path: "/warn/staticrisk",
          query: {
            company: companyName
          }
        });
      },
    },

    created: function(){
      // 加载初始数据
      this.queryResult();
    },

    updated(){
      setRootFontSize();
    }
  }
</script>

<template>
  <div class="warnSearchOutput__root">

    <SearchBoxHasResList
      :isHasRes="isHasRes"
      :placeholder="searchVal"
      :searchResList="searchResList"
      :checkBranch="true"
      @searchChange="searchChange"
      @searchSubmit="searchSubmit"
      @searchResListSubmit="searchResListSubmit"
    ></SearchBoxHasResList>

    <ul class="warnSearchOutput__list">

      <SearchOutputItem
        :data="item"
        v-for="(item, index) of dataList"
      ></SearchOutputItem>

    </ul>

    <NoResNotice
      msg="抱歉，暂时没有找到相关数据！"
      v-show="!isHasSearchOutput"
    ></NoResNotice>

    <Pagination
      :showPages="5"
      :pageSize="8"
      :curPageNum="pageNum+1"
      :rowsTotal="rowsTotal"
      @pageChange="pageChange"
    ></Pagination>
  </div>
</template>

<style lang="scss">
  @import "WarnSearchOutput.scss";
</style>
