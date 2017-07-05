<script>
     /*
   * @component 预警平台/首页/tab切换 组件
   * @author yxc
   * @date 2016/11/11 0011
   * */
     import { ajax } from "../../../../assets/js/utils"
     import WarnIndexTabItem from "./WarnIndexTabItem/WarnIndexTabItem.vue"

     export default {
       props: [
         "areaList" // 地区列表
       ],

       data(){
         return {
           moneyTabsShow: ["全部", "10万以下", "10-100万", "100-500万", "500-1000万", "1000-5000万", "5000万及以上"],
           moneyTabsReal: [["", ""], ["", "10"], ["10", "100"], ["100", "500"], ["500", "1000"], ["1000", "5000"], ["5000", ""]],

           timeTabsShow: ["全部", "1年以内", "1-3年", "3-5年", "5-10年", "10年及以上"],
           timeTabsReal: ["0", "1", "2", "3", "4", "5"],

           // 地区 资本 时间 选中的选项卡
           areaSelectedTabsIndex: [],
           moneySelectedTabsIndex: [],
           timeSelectedTabsIndex: []
         }
       },

       methods: {

         /*
         * @method someTabIndexChange 选项卡切换时回调
         * */
        someTabIndexChange(){

          // 针对地区列表格式化处理
          let tmpAreaSelectedTabs = [];
            if (this.areaSelectedTabsIndex.length == this.areaList.length - 1) {
                tmpAreaSelectedTabs.push("");
            }else {
                this.areaSelectedTabsIndex.map( (item) => {
                    let tmpVal = item === 0 ? "" : this.areaList[item];
                    tmpAreaSelectedTabs.push(tmpVal);
                });
            }

          let o = {
            area: tmpAreaSelectedTabs.join(","),
            money: this.moneySelectedTabsIndex.join(","),
            time: this.timeSelectedTabsIndex.join(",")
          };
          this.$emit("warnIndexTabChange", o);
        },

        areaTabsChange(selectedTab){
          this.areaSelectedTabsIndex = selectedTab;
          this.someTabIndexChange();
        },
        moneyTabsChange(selectedTab){
          this.moneySelectedTabsIndex = selectedTab;
          this.someTabIndexChange();
        },
        timeTabsChange(selectedTab){
          this.timeSelectedTabsIndex = selectedTab;
          this.someTabIndexChange();
        }
      },

       components: { WarnIndexTabItem },
    }
</script>

<template>
  <div class="warnIndexTab__root">
    <WarnIndexTabItem
      title="地区"
      :tabs="areaList"
      @tabChange="areaTabsChange"
    ></WarnIndexTabItem>

    <WarnIndexTabItem
      title="注册资本"
      :tabs="moneyTabsShow"
      @tabChange="moneyTabsChange"
    ></WarnIndexTabItem>

    <WarnIndexTabItem
      title="存续时间"
      :tabs="timeTabsShow"
      @tabChange="timeTabsChange"
    ></WarnIndexTabItem>
  </div>
</template>

<style lang="scss">
  @import "WarnIndexTab.scss";
</style>
