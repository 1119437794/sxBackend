<script>
     /*
   * @component 全息/查询平台 组件
   * @author yxc
   * @date 2016/11/10 0010
   * */

     import { ajax } from "../../assets/js/utils"

     import FullInfoSearchOutput from "./FullInfoSearchOutput/FullInfoSearchOutput.vue"
     import FullInfoSearchBox from "./FullInfoSearchBox/FullInfoSearchBox.vue"
     import Pagination from "../Pagination/Pagination.vue"

    export default {

      data(){
         return {
           listData: [], // 渲染数据
           rowsTotal: 0, // 记录条数
           searchVal: "", // 搜索内容
           pageNum: 0,
           isHasRes: true // 是否有搜索匹配结果
         }
       },

      computed: {
         company(){
           return this.searchVal || this.$route.query.company;
         }
      },

      methods: {

         // 提交搜索
        searchSubmit(searchVal){
          this.pageNum = 0;
          this.searchVal = searchVal;
          this.getQueryResult();
        },

        // 选择页码
        pageChange(pageNum){
          this.pageNum = pageNum - 1;
          this.getQueryResult();
        },

        /*
        * @method getQueryResult 点击搜索
        * */
        getQueryResult(){

          ajax({
            method: "get",
            url: "/basedata/queryResult.do",
            params: {
              input: this.searchVal,
              pageNumber: this.pageNum,
              pageSize: 4,
              type: 0,
            },

            success: res => {
              this.listData = res.content.list;
              this.rowsTotal = res.content.count;
              this.isHasRes = this.rowsTotal > 0 ? true : false;
            }
          })
        }
      },
        mounted () {
            setLog('', '全息信息查询平台-首页')
        },

      components: {
        FullInfoSearchBox,
        FullInfoSearchOutput,
        Pagination
      },
    }
</script>

<template>
  <div class="fullInfo__root">

    <FullInfoSearchBox
      :placeholder="company"
      :rowsTotal="rowsTotal"
      @searchSubmit="searchSubmit"
    ></FullInfoSearchBox>

    <FullInfoSearchOutput
      :listData="listData"
      :isHasRes="isHasRes"
    ></FullInfoSearchOutput>

    <div class="fullInfo__page">
      <Pagination
        :pageSize="4"
        :showPages="5"
        :rowsTotal="rowsTotal"
        :curPageNum="pageNum + 1"
        @pageChange="pageChange"
      ></Pagination>
    </div>
  </div>

</template>

<style lang="scss">
  @import "FullInfo.scss";
</style>
