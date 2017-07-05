<script>
     /*
   * @component 查询平台/详情/关联方表格 组件
   * @author yxc
   * @date 2016/11/14 0014
   * */

     import Tab from "../../../../Tab/Tab.vue"
     import NoResNotice from "../../../../NoResNotice/NoResNotice.vue"

    export default {
      props: [
        "oneAndDimension" // 一度二度渲染数据
      ],

      data(){
        return {
          tabIndex: 0, // 选项卡下标
          dimensionName: "", // 一度 或是 二度
          isHasRes: true // 是否有数据
        }
      },

      computed: {
        dimensionData(){

          let dimension = "";

          if(this.tabIndex == 0) {
            dimension = "one";
            this.dimensionName = "一";

          }else {
            dimension = "two";
            this.dimensionName = "二";
          }

          let tmpDimensionData = this.oneAndDimension[dimension];

          if(!tmpDimensionData) {
            this.isHasRes = true;
            tmpDimensionData = [];

          }else {
            this.isHasRes = tmpDimensionData.length ? true : false;
          }

          return tmpDimensionData;
        }
      },

      methods: {
         tabChange(tabIndex){
           this.tabIndex = tabIndex;
         }
      },

       components: {
        Tab,
        NoResNotice
      }
    }
</script>

<template>
  <div class="detailsRelatesTable__root">

    <Tab
      :tabIndex="tabIndex"
      :tabs="['一度关联企业情况', '二度关联企业情况']"
      @tabChange="tabChange"
    ></Tab>

    <div
      v-show="isHasRes"
      class="detailsRelatesTable__table"
    >

      <div class="detailsRelatesTable__wrap">

        <!-- 表头 -->
        <h2 class="detailsRelatesTable__th">
          <span class="detailsRelatesTable__name">企业名称</span>
          <span class="detailsRelatesTable__date">注册时间</span>
          <span class="detailsRelatesTable__money">注册资本</span>
          <span class="detailsRelatesTable__addr">注册地址</span>
          <span class="detailsRelatesTable__represent">法定代表人</span>
          <span class="detailsRelatesTable__industry">所属行业</span>
        </h2>

        <ul class="detailsRelatesTable__list">
          <li
            v-for="item of dimensionData"
            class="detailsRelatesTable__item"
          >
            <span class="detailsRelatesTable__name" v-text="item.companyName">企业名称</span>
            <span class="detailsRelatesTable__date" v-text="item.esDate">注册时间</span>
            <span class="detailsRelatesTable__money" v-text="item.regCap">注册资本</span>
            <span class="detailsRelatesTable__addr" v-text="item.address">注册地址</span>
            <span class="detailsRelatesTable__represent" v-text="item.frName">法定代表人</span>
            <span class="detailsRelatesTable__industry" v-text="item.companyIndustry">所属行业</span>
          </li>
        </ul>
      </div>

      <p class="detailsRelatesTable__count">
        目标公司{{dimensionName}}度关联企业共有 <span v-text="dimensionData.length"></span> 家
      </p>

    </div>

    <NoResNotice
      v-show="!isHasRes"
      msg="暂无相关数据"
    ></NoResNotice>
  </div>
</template>

<style lang="scss">
  @import "DetailsRelatesTable.scss";
</style>
