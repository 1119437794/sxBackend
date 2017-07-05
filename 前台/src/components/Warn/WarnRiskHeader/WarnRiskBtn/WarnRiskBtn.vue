<script>
     /*
   * @component 预警/风险指数/按钮 组件
   * @author yxc
   * @date 2016/11/12 0012
   * done
   * */

    export default {
      props: ["text", "className", "url"],

      computed: {
        getClassName(){
          return `iconfont ${this.className} warnRiskBtn__rootIcon`;
        }
      }
    }
</script>

<template>
  </button>

  <router-link
    :to="url"
    tag="button"
    class="warnRiskBtn__root"
    active-class="warnRiskBtn__root--active"
    >
    <i :class="getClassName"></i>
    <span v-text="text"></span>
  </router-link>
</template>

<style lang="scss">
  @import "WarnRiskBtn.scss";
</style>
