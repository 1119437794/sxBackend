<script>
     /*
   * @component 全息/查询平台/首页/查询结果列表项 组件
   * @author yxc
   * @date 2016/11/10 0010
   * */

    export default {
      props: [
        "outputItem" // 搜索结果某一项
      ],

      methods: {
        // 代号处理
        codeHandled(creditCode, regNo, type){

          switch (true){
            case Boolean(creditCode):
              return type === "code" ? creditCode : "统一社会信用代码：";

            case Boolean(regNo):
              return type === "code" ? regNo : "注册号：";

            default:
              return type === "code" ? "—" : "注册号/统一社会信用代码：";
          }
        }
      }
    }
</script>

<template>
  <table class="fullInfoSearchOuputItem__root">
    <tr class="fullInfoSearchOuputItem__th">
      <router-link
          tag="td"
          class="fullInfoSearchOuputItem__td2"
          v-html="outputItem.showCompanyName"
          :to="{path: '/fullinfo/details', query: {company: outputItem.companyName, type: 1}}"
        >
        </router-link>
      <td class="fullInfoSearchOuputItem__td3"></td>
      <td class="fullInfoSearchOuputItem__td4"></td>
    </tr>
    <tr class="fullInfoSearchOuputItem__tb">
      <td>
        <span class="fullInfoSearchOuputItem__tdTitle" v-text="codeHandled(outputItem.creditCode, outputItem.regNo, 'name')"></span>
        <span class="fullInfoSearchOuputItem__tdText" v-text="codeHandled(outputItem.creditCode, outputItem.regNo, 'code')"></span></td>
      <td>
        <span class="fullInfoSearchOuputItem__tdTitle">类型：</span>
        <span class="fullInfoSearchOuputItem__tdText" v-html="outputItem.companyType || '—'"></span></td>
      <td>
        <span class="fullInfoSearchOuputItem__tdTitle">法定代表人：</span>
        <span class="fullInfoSearchOuputItem__tdText" v-html="outputItem.frName || '—'"></span></td>
    </tr>
    <tr>
      <td>
        <span class="fullInfoSearchOuputItem__tdTitle">注册资本：</span>
        <span class="fullInfoSearchOuputItem__tdText" v-html="outputItem.regcap || '—'"></span></td>
      <td>
        <span class="fullInfoSearchOuputItem__tdTitle">成立日期：</span>
        <span class="fullInfoSearchOuputItem__tdText" v-html="outputItem.esDate || '—'"></span></td>
      <td>
        <span class="fullInfoSearchOuputItem__tdTitle">注册地址：</span>
        <span class="fullInfoSearchOuputItem__tdText" v-html="outputItem.address || '—'"></span></td>
    </tr>
  </table>
</template>

<style lang="scss">
  @import "FullInfoSearchOuputItem.scss";
</style>
