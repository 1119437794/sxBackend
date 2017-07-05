<script>

  /*
  * @component 页面头部 组件
  * @author yxc
  * eg:
  * <PageHeader />
  * */

  export default {}
</script>

<template>
  <div class="pageHeader__root">

    <router-link
      exact
      to="/"
      tag="div"
      class="pageHeader__title">
    </router-link>

    <!-- 针对需要添加账户名和退出功能 -->
    <slot name="account"></slot>
  </div>
</template>

<style lang="scss">
  @import "PageHeader.scss";
</style>
