<script>
  /*
  * @component 根组件
  * @author yxc
  * 废弃
  * */

  import { setRootFontSize } from "./assets/js/utils"

  export default {

    mounted(){
      // dom加载完毕 才去获取屏幕宽度 这个才是有效的
      setRootFontSize();
    }
  }
</script>

<template>
    <router-view></router-view>
</template>

<style lang="scss">
  @import "./assets/css/public.css";
  @import "./assets/css/font/iconfont.css";
</style>




