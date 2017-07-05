<script>
     /*
   * @component 预警/静态风险/图谱/公司详情 组件
   * @author yxc
   * @date 2016/11/12 0012
   * */

     import { clickOtherClose } from "../../../../assets/js/utils"
     import mixin from '../../../../assets/js/mixins'
     import NoResNotice from "../../../NoResNotice/NoResNotice.vue"

    export default {
        mixins: [mixin],
      props: [
        "companyName", // 公司名
        "dynamicPicDetails" // 公司详情
      ],

      data(){
        return {
          show: false, //显隐控制
          notice: null, // 标题溢出时的title属性值
          isHasDetails: true, // 是否有该公司详情
        }
      },

      computed: {

        safeDynamicPicData(){
          let results = this.dynamicPicDetails.results;

          if(!results) {
            this.show = false;
            results = {};

          }else {

            this.show = true;
            if(results[0]) {
              this.isHasDetails = true;
              results = results[0].jbxx;

            }else {
              this.isHasDetails = false;
              results = {};
            }
          }

          return results;
        },

        safeCompanyName(){
          let tmpCompanyName = this.companyName;

          if(!tmpCompanyName) return "";

          if(tmpCompanyName.length > 15) {
            this.notice = tmpCompanyName;
            return tmpCompanyName.substr(0, 15) + "...";
          }else {

            this.notice = null;
            return tmpCompanyName;
          }
        }
      },

      methods: {
        // 关闭弹窗
        close(){
          this.show = false;
        },

        // 点击查看详情
        lookUpDetails(){
          this.show = false;
          this.$router.push({
            path: "/fullinfo/details/",
            query: {
              company: this.safeDynamicPicData.companyName
            }
          });
          this.$emit("lookUpDetails");
        }
      },

      mounted(){
        clickOtherClose(this.$refs["warnStaticRiskDetails__root"], () => {
          this.show = false;
        })
      },

      components: {
        NoResNotice
      }
    }
</script>

<template>
  <div
    v-show="show"
    ref="warnStaticRiskDetails__root"
    class="warnStaticRiskDetails__root"
  >

    <h2
      class="warnStaticRiskDetails__title"
      :title="notice"
    >
      {{safeCompanyName}}
      <span
        v-show="safeDynamicPicData.companyEnterpriseStatus"
        class="warnStaticRiskDetails__cx"
        v-text="safeDynamicPicData.companyEnterpriseStatus"
      ></span>
      <i
        class="iconfont icon-guanbi warnStaticRiskDetails__close"
        @click="close"
      ></i>
    </h2>

    <div class="warnStaticRiskDetails__wrap">
      <template v-if="isHasDetails">
        <table class="warnStaticRiskDetails__table">
          <tr class="warnStaticRiskDetails__tr">
            <td class="warnStaticRiskDetails__trTitle">法人代表：</td>
            <td class="warnStaticRiskDetails__trText" v-text="safeDynamicPicData.frName">罗成</td>
          </tr>
          <tr class="warnStaticRiskDetails__tr">
            <td class="warnStaticRiskDetails__trTitle">公司类型：</td>
            <td class="warnStaticRiskDetails__trText" v-text="safeDynamicPicData.companyType">罗成</td>
          </tr>
          <tr class="warnStaticRiskDetails__tr">
            <td class="warnStaticRiskDetails__trTitle">注册资本：</td>
            <td class="warnStaticRiskDetails__trText" v-text="safeDynamicPicData.regCap">罗成</td>
          </tr>
          <tr class="warnStaticRiskDetails__tr">
            <td class="warnStaticRiskDetails__trTitle">注册时间：</td>
            <td class="warnStaticRiskDetails__trText" v-text="safeDynamicPicData.esDate">罗成</td>
          </tr>
          <tr class="warnStaticRiskDetails__tr">
            <td class="warnStaticRiskDetails__trTitle" >所属行业：</td>
            <td class="warnStaticRiskDetails__trText" v-text="safeDynamicPicData.companyIndustry">罗成</td>
          </tr>
        </table>
        <div class="warnStaticRiskDetails__btnWrap" v-if="isHasPermission([2])">

          <button
            @click="lookUpDetails"
            class="warnStaticRiskDetails__btn"
          >查看详情</button>
        </div>
      </template>
      <NoResNotice
        v-else
        msg="暂无相关企业数据"
      ></NoResNotice>
    </div>
  </div>
</template>

<style lang="scss">
  @import "WarnStaticRiskDetails.scss";
</style>
