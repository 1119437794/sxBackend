<script>
     /*
   * @component 详情/诉讼信息/tab切换组件
   * @author yxc
   * */

     import Tab from "../../../../Tab/Tab.vue"

    export default {
       props: {
           // 选项卡每项宽度
           itemWidth: {
               default: 'calc((100% - 5px) / 5)'
           },
           tabIndex: {
               default: 0
           }, // 当前选中的选项卡下标
           litigationTabNum: {
               default: () => []
           }, // 诉讼信息选项卡记录条数
           tabs: {
               default: () => [
                   "开庭公告",
                   "裁判文书",
                   "被执行人",
                   "失信被执行人",
                   "法院公告"
               ]
           }
       },

      methods: {
        tabChange(tabIndex){
          this.$emit("tabChange", tabIndex);
        }
      },

      components: {Tab},
    }
</script>

<template>
  <ul class="detailsLitigationsTab__root">
    <li
      :style="{width: itemWidth}"
      @click="tabChange(index)"
      v-for="(item, index) of tabs"
      :class="{'detailsLitigationsTab__item': true, 'detailsLitigationsTab__item--active': tabIndex==index}">{{item}}
      <span
        v-text="litigationTabNum[index]"
        :class="{
          'detailsLitigationsTab__msg':  true,
          ' detailsLitigationsTab__msg--has': litigationTabNum[index] > 0,
          ' detailsLitigationsTab__msg--hasnot': litigationTabNum[index] == 0,
        }"
      ></span>
    </li>
  </ul>
</template>

<style lang="scss">
  @import "DetailsLitigationsTab.scss";
</style>
