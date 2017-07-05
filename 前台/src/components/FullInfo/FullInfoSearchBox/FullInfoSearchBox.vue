<script>
     /*
   * @component 全息/查询平台/全息搜索框 组件
   * @author yxc
   * @date 2016/11/11 0011
   * */

     import SearchBox from "../../SearchBox/SearchBox.vue"

    export default {

      props: [
        "rowsTotal", // 记录条数
        "placeholder" // 搜索框默认内容
       ],

      computed: {
        safePlaceholder(){
          return this.placeholder || "请输入企业名称或关键字进行搜索查询";
        }
      },

      methods: {
        searchSubmit(searchObj){
          this.$emit("searchSubmit", searchObj.searchVal);
        }
      },

      created(){
        this.placeholder && this.$emit("searchSubmit", this.placeholder);
      },

      components: { SearchBox },
    }
</script>

<template>
  <div class="fullInfoSearchBox__root">
    <h2 class="fullInfoSearchBox__title">
      <i class="iconfont icon-BBD-quanxichaxun fullInfoSearchBox__titleIcon"></i>
      企业全息信息查询
    </h2>
    <SearchBox
      :placeholder="safePlaceholder"
      @searchSubmit="searchSubmit"
    ></SearchBox>
    <h3
      v-show="rowsTotal"
      class="fullInfoSearchBox__subTitle"
    >共搜索到<span v-text="rowsTotal"></span>家相关企业</h3>
  </div>
</template>

<style lang="scss">
  @import "FullInfoSearchBox.scss";
</style>
