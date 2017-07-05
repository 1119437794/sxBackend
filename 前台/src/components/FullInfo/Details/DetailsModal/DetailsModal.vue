<script>
     /*
   * @component 详情/诉讼信息/裁判文书 弹框组件
   * @author yxc
   * @date 2016/11/10 0010
   * */

    export default {
      props: [
        "data" // 渲染数据
      ],

      methods: {
        closeModal(){
          this.$emit("closeModal");
        }
      },
    }
</script>

<template>
  <div class="detailsModal__root">

    <div class="detailsModal__wrap">

      <h2 class="detailsModal__title" v-text="data.title"></h2>

      <h3 class="detailsModal__subTitle" v-text="data.docType"></h3>

      <h4 class="detailsModal__casecode">
        {{data.caseCode}}
        <span class="detailsModal__casecodeDashed"></span>
      </h4>

      <div class="detailsModal__main">
        <div class="detailsModal__mainLeft" v-text="data.main"></div>
        <ul class="detailsModal__mainRight">
          <li class="detailsModal__item">
            <span class="detailsModal__itemTitle">诉讼当事人：</span>
            <span class="detailsModal__itemText" v-text="data.litigant">徐政委</span>
          </li>
          <li class="detailsModal__item">
            <span class="detailsModal__itemTitle">法院当事人：</span>
            <span class="detailsModal__itemText" v-text="data.courtLitigant"></span>
          </li>
          <li class="detailsModal__item">
            <span class="detailsModal__itemTitle">起诉方当事人：</span>
            <span class="detailsModal__itemText" v-text="data.proLitigant"></span>
          </li>
          <li class="detailsModal__item">
            <span class="detailsModal__itemTitle">被诉方当事人：</span>
            <span class="detailsModal__itemText" v-text="data.defLitigant"></span>
          </li>
          <li class="detailsModal__item">
            <span class="detailsModal__itemTitle">起诉方其他相关人：</span>
            <span class="detailsModal__itemText" v-text="data.proOtherRelated"></span>
          </li>
          <li class="detailsModal__item">
            <span class="detailsModal__itemTitle">被诉方其他相关人：</span>
            <span class="detailsModal__itemText" v-text="data.defOtherRelated"></span>
          </li>
          <li class="detailsModal__item">
            <span class="detailsModal__itemTitle">适用法条：</span>
            <span class="detailsModal__itemText" v-text="data.applicableLlaw"></span>
          </li>
        </ul>
      </div>

      <span
        class="detailsModal__close iconfont icon-guanbi"
        @click="closeModal"
      ></span>
    </div>
  </div>
</template>

<style lang="scss">
  @import "DetailsModal.scss";
</style>
