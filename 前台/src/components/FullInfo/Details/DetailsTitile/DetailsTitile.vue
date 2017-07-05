<script>
  /*
  * @component 详情/基本资料/标题组件
  * @author yxc
  * */
  export default {
    props: ["title"]
  }
</script>

<template>
  <h2 class="detailsBasicTitile__root" >
    {{title}}
    <slot></slot>
  </h2>
</template>

<style lang="scss">
  @import "DetailsTitile.scss";
</style>
