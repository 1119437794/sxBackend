<script>
     /*
   * @component 预警/首页/高风险企业地区分布/表格 组件
   * @author yxc
   * @date 2016/11/11 0011
   * */

     import SelectHasArrow from '../../../SelectBox/SelectHasArrow.vue'
     import NoResNotice from '../../../NoResNotice/NoResNotice.vue'

    export default {
         props: ["topData"],

        data () {
          return {
              sortKeyArr: [
                      '静态风险指数',
                      '实际控制人风险',
                      '公司扩张路径风险',
                      '关联方中心积聚化风险',
                      '非法融资衍生风险',
                      '短期逐利风险',
                      '非法融资违规风险',
                      '人才结构风险',
                      '资本背景风险',
                      '举报风险'
              ],
              sortIndexArr: [8, 1, 2, 3, 4, 5, 0, 6, 7, 9],
              selectCurVal: '静态风险指数',
              hasListData: true
          }
        },

        methods: {
            clickSelectVal (val) {
                this.selectCurVal = val
                this.$emit('warnIndexTableCallBack', this.sortIndexArr[this.sortKeyArr.findIndex(item => item === val)])
            }
        },

      updated(){
        let warnIndexTableListDom = this.$refs["warnIndexTable__list"];
        warnIndexTableListDom.scrollTop = 0;
          this.hasListData = this.topData.length
      },

        components: {
            SelectHasArrow,
            NoResNotice
        }
    }
</script>

<template>
  <div class="warnIndexTable__root">
    <h2 class="warnIndexTable__title">
      <span class="warnIndexTable__order">TOP</span>
      <span class="warnIndexTable__name">公司名称</span>
      <span class="warnIndexTable__index">
          <SelectHasArrow
                  name="sortKey"
                  :selectOptions="sortKeyArr"
                  :selectCurVal="selectCurVal"
                  @clickSelectVal="clickSelectVal"
          ></SelectHasArrow>
      </span>
    </h2>

    <ul
      ref="warnIndexTable__list"
      class="warnIndexTable__list"
    >
      <li
        v-for="(item, index) of topData"
        class="warnIndexTable__item"
      >
        <span class="warnIndexTable__order" v-text="index+1"></span>
        <router-link
          tag="span"
          class="warnIndexTable__name"
          v-text="item.companyName"
          :to="{path:　'/warn/staticrisk', query: {company: item.companyName}}"
        >
        </router-link>

        <span
          :class="{
            'warnIndexTable__index': true,
            'warnIndexTable__index--up': item.isRise == 1,
            'warnIndexTable__index--down': item.isRise == -1,
          }"
          v-text="item.staticRiskIndex.toFixed(1)"></span>
      </li>
        <!--<NoResNotice v-show="!hasListData" msg="暂无相关数据"></NoResNotice>-->
    </ul>
  </div>
</template>

<style lang="scss">
  @import "WarnIndexTable.scss";
</style>
