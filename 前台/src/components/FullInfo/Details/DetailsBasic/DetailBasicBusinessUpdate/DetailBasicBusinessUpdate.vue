<script>
  /*
   * @component 详情/基本资料/工商变更 组件
   * @author yxc
   * */

  import NoResNotice from "../../../../NoResNotice/NoResNotice.vue"

  export default {
    props: ["list"],

    data(){
      return {
        isHasRes: true // 是否有数据
      }
    },

    watch: {
      list(){
        this.isHasRes = this.list.length ? true : false;
      }
    },

    components: {
      NoResNotice
    }
  }
</script>

<template>
  <div class="detailBasicBusinessUpdate__root">
    <div class="detailBasicBusinessUpdate__wrap">

      <template v-if="isHasRes">
        <h2 class="detailBasicBusinessUpdate__title">
          <span>变更事项</span>
          <span>变更前内容</span>
          <span>变更后内容</span>
          <span>变更时间</span>
        </h2>
        <ul class="detailBasicBusinessUpdate__list">
          <li
            v-for="item of list"
            class="detailBasicBusinessUpdate__item">
            <span v-text="item.changeItems">变更事项</span>
            <span v-text="item.contentBeforeChange">变更前内容</span>
            <span v-text="item.contentAfterChange">变更后内容</span>
            <span v-text="item.changeDate">变更时间</span>
          </li>

        </ul>
      </template>

      <NoResNotice
        v-show="!isHasRes"
        msg="截至目前为止，暂无相关数据！"
      ></NoResNotice>
    </div>
  </div>
</template>

<style lang="scss">
  @import "DetailBasicBusinessUpdate.scss";
</style>
