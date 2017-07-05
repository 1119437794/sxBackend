<script>
     /*
   * @component 详情/诉讼信息 组件
   * @author yxc
   * */
     import DetailsTitile from "../DetailsTitile/DetailsTitile.vue"
     import DetailsLitigationsTab from "./DetailsLitigationsTab/DetailsLitigationsTab.vue"
     import DetailsTable from "../DetailsTable/DetailsTable.vue"
     import Pagination from "../../../Pagination/Pagination.vue"
     import DetailsModal from "../DetailsModal/DetailsModal.vue"

     export default {
       props: [
         "rowsTotal", // 总记录条数
         "pageNum", // 当前页码
         "listData", // 渲染数据
         "isHasRes", // 是否有请求结果
         "litigationTabNum", // 选项卡下总记录条数
         "litigationTabIndex", // 当前诉讼信息选中的选项卡下标
       ],

       data(){
         return {
           dataTitles: [
             [
               {
                 width: 30 / 1345,
                 text: "序号",
                 key: "ID"
               },
               {
                 width: 66 / 1345,
                 text: "案号",
                 key: "caseCode"
               },
               {
                 width: 138 / 1345,
                 text: "当事人",
                 key: "litigant"
               },
               {
                 width: 66 / 1345,
                 text: "开庭日期",
                 key: "trialDate"
               },
               {
                 width: 30 / 1345,
                 text: "省份",
                 key: "city"
               }
             ],
             [
               {
                 width: 30 / 1345,
                 text: "序号",
                 key: "ID"
               },
               {
                 width: 98 / 1345,
                 text: "案号",
                 key: "caseCode"
               },
               {
                 width: 164 / 1345,
                 text: "案件标题",
                 key: "title"
               },
               {
                 width: 66 / 1345,
                 text: "案由",
                 key: "actionCause"
               },
               {
                 width: 40 / 1345,
                 text: "案件类型",
                 key: "caseType"
               },
               {
                 width: 40 / 1345,
                 text: "审判时间",
                 key: "sentenceDate"
               },
               {
                 width: 40 / 1345,
                 text: "当事人类型",
                 key: "litigantType"
               },
               {
                 width: 50 / 1345,
                 text: "案件结果",
                 key: "caseoutCome"
               },
             ],
             [
               {
                 width: 30 / 1345,
                 text: "序号",
                 key: "ID"
               },
               {
                 width: 102 / 1345,
                 text: "案号",
                 key: "caseCode"
               },
               {
                 width: 66 / 1345,
                 text: "被执行人",
                 key: "pName"
               },
               {
                 width: 102 / 1345,
                 text: "执行法院",
                 key: "execCourtName"
               },
               {
                 width: 66 / 1345,
                 text: "执行标的",
                 key: "execSubject"
               },
               {
                 width: 30 / 1345,
                 text: "立案时间",
                 key: "caseCreateTime"
               }
             ],
             [
               {
                 width: 30 / 1345,
                 text: "序号",
                 key: "ID"
               },
               {
                 width: 102 / 1345,
                 text: "案号",
                 key: "caseCode"
               },
               {
                 width: 66 / 1345,
                 text: "执行法院",
                 key: "execCourtName"
               },
               {
                 width: 102 / 1345,
                 text: "执行依据文号",
                 key: "exeCode"
               },
               {
                 width: 30 / 1345,
                 text: "发布时间",
                 key: "pubDate"
               }
             ],
             [
               {
                 width: 30 / 1345,
                 text: "序号",
                 key: "ID"
               },
               {
                 width: 50 / 1345,
                 text: "公告人",
                 key: "noticePeople"
               },
               {
                 width: 164 / 1345,
                 text: "公告内容",
                 key: "noticeContent"
               },
               {
                 width: 20 / 1345,
                 text: "公告时间",
                 key: "noticeTime"
               }
             ]
           ], // 诉讼信息个选项卡下头部信息

           cpwsMain: {}, // 裁判文书详情
           isShowCpws: false, // 是否显示裁判文书
         }
       },

       methods: {
         pageChange(pageNum){
           this.$emit("pageChange", {
             type: "litigation",
             value: pageNum - 1
           });
         },
         tabChange(tabIndex){
           this.$emit("litigationTabChange", tabIndex);
         },

         /*
         * @method titleClick 裁判文书点击标题
         * */
         titleClick(index){
           this.isShowCpws = true;
           this.cpwsMain = this.listData[index];
         },

         // 点击关闭裁判文书弹窗
         closeModal(){
           this.isShowCpws = false;
         },
       },

       components: {
         DetailsTitile,
         DetailsLitigationsTab,
         DetailsTable,
         Pagination,
         DetailsModal
       }
    }
</script>

<template>
  <div class="detailsLitigations__root">

    <DetailsTitile title="诉讼信息"></DetailsTitile>

    <div class="detailsLitigations__wrap">

      <DetailsLitigationsTab
        :tabIndex="litigationTabIndex"
        :litigationTabNum="litigationTabNum"
        @tabChange="tabChange"
      ></DetailsLitigationsTab>

      <DetailsTable
        :pageSize="8"
        :pageNum="pageNum"
        :dataList="listData"
        :isHasRes="isHasRes"
        :litigationTabIndex="litigationTabIndex"
        :dataTitle="dataTitles[litigationTabIndex]"
        @titleClick="titleClick"
      ></DetailsTable>

      <div class="detailsLitigations__page" v-show="rowsTotal">
        <Pagination
          :showPages="5"
          :pageSize="8"
          :curPageNum="pageNum + 1"
          :rowsTotal="rowsTotal"
          @pageChange="pageChange"
        ></Pagination>
      </div>

    </div>

    <DetailsModal
      v-show="isShowCpws"
      :data="cpwsMain"
      @closeModal="closeModal"
    ></DetailsModal>
  </div>

</template>

<style lang="scss">
  @import "DetailsLitigations.scss";
</style>
