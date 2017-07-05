<script>
     /*
   * @component 预警/首页/企业条件筛选tab 组件
   * 此处逻辑不同于普通tab组件
   * @author yxc
   * @date 2016/11/11
   * */

     import Tab from "../../../../Tab/Tab.vue"

    export default {

      props: [
        "title",
        "tabs"
      ],

      data(){
         return {
           tabIndex: [0], // 可以支持多选
           changeFlag: 0 // 可以emit的标记
         }
      },

      computed: {
        safeTabIndex(){

          let safeTabIndexArr = [];
          let tabIndexLen = this.tabIndex.length;
          let newTabIndex = this.tabIndex[tabIndexLen - 1];

          switch (true) {

            // 默认选中第一个
            case tabIndexLen === 0:
              this.tabIndex = [0]; break;

            case tabIndexLen > 1:

              // 点击全部选项后 只能有全部选项
              if( newTabIndex === 0 )  {
                this.tabIndex = [0];
              } else {

                // 最新元素不为全部 那就是全部不能被选中
                this.tabIndex.map((item) => {
                  item && safeTabIndexArr.push(item);
                });
                this.tabIndex = safeTabIndexArr;
              }
              break;

            default:
              break;
          }

          this.changeFlag ++;
          return this.tabIndex;
        }
      },

      methods: {
        /*
        * @method setClassName
        * */
        setClassName(index){

          let flag = -1;

          for(let i=0, len=this.safeTabIndex.length; i<len; i++) {
            if(index === this.safeTabIndex[i]) {
              flag = i;
              break;
            }
          }

          return `warnIndexTabItem__item ${flag === -1 ? "" : "warnIndexTabItem__item--active"}`;
        },
      },

      watch: {
        changeFlag(){

          // 点击变化过才发起请求
          if( this.changeFlag > 1) {
            this.$emit("tabChange", this.tabIndex);
          }
        }
      },

      components: { Tab },
    }
</script>

<template>
  <div class="warnIndexTabItem__root">
    <h2 class="warnIndexTabItem__title">{{title}}：</h2>

    <ul class="warnIndexTabItem__list">
      <li
        :class="setClassName(index)"
        v-for="(item, index) of tabs"
        >{{item}}
        <input
          type="checkbox"
          :value="index"
          v-model="tabIndex"
          class="warnIndexTabItem__checkbox"
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "WarnIndexTabItem.scss";
</style>
