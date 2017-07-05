<script>
     /*
   * @component 无结果提示组件 组件
   * @author yxc
   * @date 2016/11/21 0021
   * */

    export default {
      props: ["msg"]
    }
</script>

<template>
  <h2
    v-text="msg"
    class="noResNotice__root"
  ></h2>
</template>

<style lang="scss">
  @import "../../assets/css/px2rem.scss";
  .noResNotice__root {
    color: #999;
    text-align: center;
    font-size: px2rem(14);
    font-weight: normal;
  }
</style>
