<script>
     /*
   * @component 全息/详情/舆情 组件
   * @author yxc
   * @date 2016/11/23 0023
   * */

     import DetailsTitile from "../DetailsTitile/DetailsTitile.vue"
     import NoResNotice from "../../../NoResNotice/NoResNotice.vue"

     export default {

       props: [
         "listData", // 渲染数据
         "isHasRes" // 是否有匹配结果
       ],

       computed: {
         safeListData(){
           return this.listData ||  [];
         }
       },

       components: {
         NoResNotice,
         DetailsTitile
       }
     }
</script>

<template>
  <div class="detailsOpinion__root">
    <DetailsTitile title="舆情信息"></DetailsTitile>
    <ul class="detailsOpinion__list">
        <li
          class="detailsOpinion__item"
          v-for="item of safeListData" >
          <a
            target="_blank"
            :href="item.url"
            v-text="item.newsTitle"
            class="detailsOpinion__title"></a>
          <p
            class="detailsOpinion__content"
            v-if="item.main">
            {{item.main && item.main.substr(0, 146)}}...
          </p>
          <h3 class="detailsOpinion__src">{{item.newsSite}} {{item.dateStr}}</h3>
        </li>
        <NoResNotice
          v-show="!isHasRes"
          msg="截至目前为止，暂无相关数据！"
        ></NoResNotice>
      </ul>
  </div>
</template>

<style lang="scss">
  @import "DetailsOpinion.scss";
</style>
