<script>
     /*
   * @component 全息/查询平台/查询结果 组件
   * @author yxc
   * @date 2016/11/10 0010
   * */

     import FullInfoSearchOuputItem from "./FullInfoSearchOuputItem/FullInfoSearchOuputItem.vue"
     import NoResNotice from "../../NoResNotice/NoResNotice.vue"

     export default {

       props: [
         "listData", // 所有搜索结果
         "isHasRes"
       ],

       components: {
         NoResNotice,
         FullInfoSearchOuputItem
       }
     }
</script>

<template>
  <div class="fullInfoSearchOutput__root">

    <FullInfoSearchOuputItem
      :outputItem="item"
      v-for="item of listData"
    ></FullInfoSearchOuputItem>

    <NoResNotice
      v-show="!isHasRes"
      msg="抱歉，暂时没有找到相关数据"
    ></NoResNotice>
  </div>
</template>

<style lang="scss">
  @import "FullInfoSearchOutput.scss";
</style>
