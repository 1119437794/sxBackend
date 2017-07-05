<script>
  /*
  * @component 详情/基本资料/工商资料 组件
  * @author yxc
  * */
    export default {

      props: ["list"],

      computed: {

        // 安全的list
        safeList(){
          return this.list || {};
        }
      },

      methods: {
        // 代号处理
        codeHandled(creditCode, regNo, type){

          switch (true){
            case Boolean(creditCode):
              return type === "code" ? creditCode : "统一社会信用代码";

            case Boolean(regNo):
              return type === "code" ? regNo : "注册号";

            default:
              return type === "code" ? "—" : "注册号/统一社会信用代码";
          }
        }
      }
    }
</script>

<template>
  <div class="detailBasicBusinessInfo__root">

    <div class="detailBasicBusinessInfo__wrap">
      <table class="detailBasicBusinessInfo__table">

        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title" v-text="codeHandled(safeList.creditCode, safeList.regNo, 'name')"></td>
          <td class="detailBasicBusinessInfo__text" v-text="codeHandled(safeList.creditCode, safeList.regNo, 'code')"></td>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">名称</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.companyName">BBD</td>
        </tr>
        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">类型</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.companyType">122</td>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">法定代表人</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.frName">BBD</td>
        </tr>
        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">注册资本</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.regCap">122</td>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title" >实收资本</td>
          <td class="detailBasicBusinessInfo__text"v-text="safeList.realCap">BBD</td>
        </tr>
        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">成立日期</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.esDate">122</td>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">核准日期</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.approvalDate">BBD</td>
        </tr>
        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title" >营业期限自</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.openFrom">122</td>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">营业期限至</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.openTo">BBD</td>
        </tr>
        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">登记机关</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.regOrg">122</td>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">登记状态</td>
          <td class="detailBasicBusinessInfo__text" v-text="safeList.enterpriseStatus">BBD</td>
        </tr>

        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">住所</td>
          <td colspan="4" class="detailBasicBusinessInfo__text" v-text="safeList.address">122</td>
        </tr>

        <tr>
          <td class="detailBasicBusinessInfo__space"></td>
          <td class="detailBasicBusinessInfo__title">经营范围</td>
          <td colspan="3" class="detailBasicBusinessInfo__text" v-text="safeList.operateScope">
            目投资；房地产开发及房地产信息咨询服务；园林绿化；建筑机具租赁；销售；建辅材料、砂石；货物进出口
            （以上经营范围法律、行政法规禁止的不得经营；法律、法政法规限制的取消许可后方可经营）
          </td>
        </tr>
      </table>
    </div>
  </div>

</template>

<style lang="scss">
  @import "DetailBasicBusinessInfo.scss";
</style>
