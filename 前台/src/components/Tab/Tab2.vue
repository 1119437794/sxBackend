<script>

  /*
  * @component 选项卡组件
  * @author yxc
  * done
  *
  * eg:
  * <Tab
    :tabs="tabs"
    @tabChange="tabChange"
   ></Tab>

   @props { Array } tabs 选项卡列表值
   @props { Function } tabChange 选项值改变时回调 参数为选中的选项卡下标
  * */
  import WarnRiskDetails from '../Warn/WarnRiskDetails/WarnRiskDetails.vue'
  import riskInfo from '../../assets/js/riskInfo'
  import mixin from '../../assets/js/mixins'

  export default {
      mixins: [mixin],
    props: [
      "tabs",
      "tabIndex"
    ],

      data () {
        return {
            riskInfo: riskInfo.dynamic,
            riskDetailsIndex: -1
        }
      },

    methods: {
      handleClick(index){
        this.$emit("tabChange", index);
      }
    },
    components: {
        WarnRiskDetails
    }
}
</script>

<template>
  <ul ref="tab__root" class="tab__root">
      <li
      :key="key"
      @click="handleClick(key)"
      v-for="(item, key) of tabs"
      :class="{'tab__item': true, 'tab__item--active': key == tabIndex}"
    >
        <div class="tab2_flex">
            <p class="tabsMenuLeft" v-html="item.name1"></p>
            <span class="tabsMenuRight" v-text="item.value"></span>
            <span
                    class="warnDynamicRisk__info"
                    @click="e => showWarnRiskDetails(e, 'tab__root', item.name2, riskInfo[item.name2])"
            ></span>

        </div>
    </li>
      <WarnRiskDetails
              v-show="WarnRiskDetails.show"
              :title="WarnRiskDetails.title"
              :text="WarnRiskDetails.details"
              :top="WarnRiskDetails.top"
              :left="WarnRiskDetails.left"
              @callback="closeWarnRiskDetails"
      ></WarnRiskDetails>
  </ul>
</template>

<style lang="scss">
    @import "../../assets/css/px2rem.scss";
    @import "Tab.scss";
    .tab__root {
        position: relative;
    }
    .tab2_flex {
        display: flex;
        padding: 0 px2rem(10);
    }
</style>
