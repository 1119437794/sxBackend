<script>
     /*
   * @component 预警/首页/搜索框 组件
   * @author yxc
   * @date 2016/11/11 0011
   * */
     import Tab from "../../../Tab/Tab.vue"
     import SearchBox from "../../../SearchBox/SearchBox.vue"

    export default {
      data(){
         return {
           tabsIndex: 0, // 选项卡下标
           tabs: ["全部", "企业名称", "法人股东"],
           placeholders: [
             "请输入企业名称或法人/股东名称或关键字",
             "请输入企业名称或关键字",
             "请输入法人/股东名称或关键字",
           ] //搜索框对应提示内容
         }
       },

      methods: {
        /*
         * @method searchSubmit 搜索框提交
         * */
        searchSubmit(searchObj){
          this.$emit("searchSubmit", {
            type: this.tabsIndex,
            searchVal: searchObj.searchVal
          });
        },

        tabChange(tabIndex){
          this.tabsIndex = tabIndex;
        },
      },

      components: {
         Tab,
         SearchBox
       }
    }
</script>

<template>
  <div class="warnIndexSearchBox__root">
    <h2 class="warnIndexSearchBox__title">
      <i class="iconfont icon-BBD-jinrongfengxianjiance warnIndexSearchBox__titleIcon"></i>
      金融风险监测预警平台
    </h2>

    <div class="warnIndexSearchBox__tab">
      <Tab
        :tabs="tabs"
        :tabIndex="tabsIndex"
        @tabChange="tabChange"
      ></Tab>
    </div>

    <SearchBox
      :placeholder="placeholders[tabsIndex]"
      @searchSubmit="searchSubmit"
    ></SearchBox>
  </div>
</template>

<style lang="scss">
  @import "WarnIndexSearchBox.scss";
</style>
