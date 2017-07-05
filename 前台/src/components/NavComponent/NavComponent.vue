<script>
  /*
  * @component 页面导航组件
  * @author yxc
  * 不能定义为Nav 与html5自有标签冲突
  * eg:
  * <NavComponent />
  * */
  import mixin from '../../assets/js/mixins'

  export default {
      mixins: [mixin]
  }
</script>

<template>
  <ul class="nav__root">
    <router-link
      tag="li"
      :to="item.url"
      v-text="item.name"
      class="nav__item"
      v-for="item in getNavByPermission()"
      active-class="nav__item--active"
    ></router-link>
  </ul>
</template>

<style lang="scss">
  @import "NavComponent.scss";
</style>
