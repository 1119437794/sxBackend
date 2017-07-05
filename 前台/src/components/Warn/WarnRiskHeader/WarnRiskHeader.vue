<script>
     /*
   * @component 预警/静态和动态风险公共头部 组件
   * @author yxc
   * @date 2016/11/12 0012
   * done
   * */

     import DetailsHeader from "../../FullInfo/Details/DetailsHeader/DetailsHeader.vue"
     import WarnRiskBtn from "./WarnRiskBtn/WarnRiskBtn.vue"
     import mixin from '../../../assets/js/mixins'

    export default {
        mixins: [mixin],
       props: [
         "title",
         "searchBoxVal",
         "searchResList",
         "isHasSearchRes"
       ],

      computed: {
         // 导出报告参数配置
        exportUrl(){
          return `/pdf/export.do?company=${this.title}&token=${sessionStorage.token}`;
        }
      },

      methods: {
        searchChange(searchVal){
          this.$emit("searchChange", searchVal)
        },
        searchResListSubmit(searchVal){
          this.$emit("searchResListSubmit", searchVal)
        },
        searchSubmit(searchVal){
          this.$emit("searchSubmit", searchVal)
        },
      },

       components: {
         DetailsHeader,
         WarnRiskBtn
       },
    }
</script>

<template>
  <div class="warnRiskHeader__root">
    <DetailsHeader
      :title="title"
      :searchBoxVal="searchBoxVal"
      :searchResList="searchResList"
      :isHasSearchRes="isHasSearchRes"
      :checkBranch="true"
      placeholder="请输入想要查询的企业名称"
      @searchChange="searchChange"
      @searchResListSubmit="searchResListSubmit"
      @searchSubmit="searchSubmit"
    >
      <a
        :href="exportUrl"
        class="warnRiskHeader__export"
      >导出报告</a>

      <router-link
              v-if="isHasPermission([2])"
        tag="button"
        class="warnRiskHeader__fullinfoBtn"
        :to="{path:　'/fullinfo/details', query: {company: title, type: 1}}"
      >查看全息信息</router-link>

      <!-- 静态风险需要展示下拉框 -->
      <slot name="select"></slot>

      <div class="warnRiskHeader__wrap">
        <WarnRiskBtn
          text="静态风险指数"
          className="icon-zhuzhuangtu"
          :url="'/warn/staticrisk?company=' + title"
        ></WarnRiskBtn>
        <span class="warnRiskHeader__space"></span>
        <WarnRiskBtn
          text="动态风险指数"
          className="icon-shijian"
          :url="'/warn/dynamicrisk?company=' + title"
        ></WarnRiskBtn>
      </div>
    </DetailsHeader>
  </div>
</template>

<style lang="scss">
  @import "WarnRiskHeader.scss";
</style>
