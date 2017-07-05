<script>
     /*
   * @component 详情/企业招聘组件
   * @author yxc
   * @date 2016/11/10 0010
   * */
     import DetailsTable from "../DetailsTable/DetailsTable.vue"
     import Pagination from "../../../Pagination/Pagination.vue"
     import DetailsTitile from "../DetailsTitile/DetailsTitile.vue"
     import { ajax } from "../../../../assets/js/utils"

    export default {
       props: [
         "listData", // 渲染数据
         "pageNum", // 页码
         "rowsTotal", // 总记录条数
         "isHasRes" // 是否有请求结果
       ],

       data(){
         return {
           dataTitle: [
             {
               key: "ID",
               text: "序号",
               width: 30/1345
             },
             {
               key: "jobTitle",
               text: "职位",
               width: 90/1345
             },
             {
               key: "salary",
               text: "薪资",
               width: 60/1345
             },
             {
               key: "serviceYear",
               text: "经验",
               width: 60/1345
             },
             {
               key: "location",
               text: "地区",
               width: 60/1345
             },
             {
               key: "educationRequired",
               text: "学历要求",
               width: 60/1345
             },
             {
               key: "source",
               text: "信息来源",
               width: 60/1345
             },
             {
               key: "pubdate",
               text: "发布日期",
               width: 60/1345
             }
           ], //数据渲染头部
         }
       },

      methods: {
        pageChange(pageNum){
          this.$emit("pageChange", {
            type: "recruit",
            value: pageNum - 1
          });
        },
      },

      components: {
        DetailsTitile,
        DetailsTable,
        Pagination
      },
    }
</script>

<template>
  <div class="detailsRecruit__root">

    <DetailsTitile title="招聘信息"></DetailsTitile>

    <div class="detailsRecruit__wrap">
      <DetailsTable
        :dataTitle="dataTitle"
        :dataList="listData"
        :pageNum="pageNum"
        :isHasRes="isHasRes"
        :pageSize="8"
      ></DetailsTable>

      <div
        v-show="rowsTotal"
        class="detailsRecruit__page"
      >
        <Pagination
          :showPages="5"
          :pageSize="8"
          :curPageNum="pageNum + 1"
          :rowsTotal="rowsTotal"
          @pageChange="pageChange"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "DetailsRecruit.scss";
</style>
