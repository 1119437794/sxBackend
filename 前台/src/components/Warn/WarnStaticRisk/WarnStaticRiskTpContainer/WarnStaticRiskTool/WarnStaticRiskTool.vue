<script>
     /*
   * @component 预警/风险指数/图谱/放大 缩小工具 组件
   * @author yxc
   * @date 2016/11/14
   * done
   * */

    export default {

      methods: {

        // 关联图点击放大与缩小
        picScaleUp(){
          seajs.use("/static/libs/relativeGraph/assets/script/main/dynamic.js", function (main){
            main.zoomAdd();
          });
        },
        picScaleDown(){
          seajs.use("/static/libs/relativeGraph/assets/script/main/dynamic.js", function (main){
            main.zoomSub();
          });
        },

        /*
        * @method handleClcik 这里会有问题的 有时候无法触发隐藏事件
        * 注：BTN__HIDE__WORD 全局变量
        * */
        handleClcik(){
          window.BTN__HIDE__WORD = true;
        }
      }
    }
</script>

<template>
  <ul class="warnStaticRiskTool__root">
    <li class="warnStaticRiskTool__item"
        id="btn_hidden_word"
        @click="handleClcik"
    >
      <i class="iconfont icon-wenzi"></i>
    </li>
    <li class="warnStaticRiskTool__item"
        @click="picScaleUp"
    >
      <i class="iconfont icon-jiahao"></i>
    </li>
    <li class="warnStaticRiskTool__item"
        @click="picScaleDown"
    >
      <i class="iconfont icon-minus"></i>
    </li>
  </ul>
</template>

<style lang="scss">
  @import "WarnStaticRiskTool.scss";
</style>
