<script>

  /*
  * @component 预警平台/搜索结果/列表项 组件
  * @author yxc
  * */
  export default {
    props: ["data"],
      methods: {
        filterNum (val) {
            const tmpVal = val || ''
            return tmpVal.replace(/^(\d+)\.?\d+(.*?)$/, '$1$2')
        }
      }
  }
</script>

<template>
  <li class="warnSearchOutputItem__root">
    <h2 class="warnSearchOutputItem__title">
      <span v-html="data.showCompanyName"></span>
    </h2>
    <div class="warnSearchOutputItem__main">
      <p
              class="warnSearchOutputItem__notice"
              v-if="data.parentCompanyName"
      >分支机构无风险打分，请参考以下母公司的风险信息：</p>
      <table class="warnSearchOutputItem__table">
        <tr class="warnSearchOutputItem__tr" v-if="data.parentCompanyName">
           <td class="warnSearchOutputItem__tableTitle">公司名称：</td>
           <td class="warnSearchOutputItem__tableText" v-html="data.parentCompanyName"></td>
        </tr>
        <tr class="warnSearchOutputItem__tr">
          <td class="warnSearchOutputItem__tableTitle">法人代表：</td>
          <td class="warnSearchOutputItem__tableText" v-html="data.frName"></td>
        </tr>
        <tr class="warnSearchOutputItem__tr">
          <td class="warnSearchOutputItem__tableTitle">注册资本：</td>
          <td class="warnSearchOutputItem__tableText" v-html="filterNum(data.regcap)"></td>
        </tr>
        <tr class="warnSearchOutputItem__tr">
          <td class="warnSearchOutputItem__tableTitle">成立时间：</td>
          <td class="warnSearchOutputItem__tableText" v-html="data.esDate"></td>
        </tr>
        <tr class="warnSearchOutputItem__tr">
          <td class="warnSearchOutputItem__tableTitle">企业地址：</td>
          <td class="warnSearchOutputItem__tableText" v-html="data.address"></td>
        </tr>
        <tr class="warnSearchOutputItem__tr" v-if="data.showGdxx">
          <td class="warnSearchOutputItem__tableTitle">股东：</td>
          <td class="warnSearchOutputItem__tableText" v-html="data.showGdxx">
            <!--<div class="warnSearchOutputItem__textMulti" v-html="filter(data.gdxx.join('、'))"></div>-->
          </td>
        </tr>
      </table>

      <ul class="warnSearchOutputItem__riskVal">
        <li class="warnSearchOutputItem__riskTitle">风险值</li>
        <li class="warnSearchOutputItem__riskNum" v-html="Math.round(data.riskValue) || '--'"></li>
      </ul>
    </div>

    <div class="warnSearchOutputItem__detail">
      <router-link
        tag="button"
        :to="{path: '/warn/staticrisk/', query: {company: data.parentCompanyName || data.companyName} }"
        class="warnSearchOutputItem__detailBtn"
      >查看详情</router-link>

    </div>

  </li>
</template>

<style lang="scss">
  @import "WarnSearchOutputItem.scss";
</style>
