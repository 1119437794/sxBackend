<script>
  /*
  * @component loading组件
  * @author yxc
  * */

  import { mapState, mapMutations } from "vuex"
  import { LOADER_ERROR_SHOWHide } from "../../store/types"

  export default {

    // 映射 state.count 到 store.this.count  //computed这个API会监测属性的变化的时候，自动执行
    computed: mapState({
      show: state => state.loader.show,
      showError: state => state.loader.showError,
    }),

    // 映射 this.increment() 到 this.$store.commit('increment')
    methods: {
      ...mapMutations({
        loaderErrorShowHide: LOADER_ERROR_SHOWHide
      })
    },
  }
</script>

<template>

  <div class="loader__root" v-show="show">

    <!-- 错误消息提示 -->
    <div v-show="showError" class="loader__error">
      <img class="loader__smileIcon" src="../../assets/imgs/loaderErrorSmile.png" alt="">
      <p class="loader__msg">抱歉，当前页面还在加载中，请耐心等待，或检查您的网络连接。</p>
      <span
        class="loader__close"
        @click="loaderErrorShowHide(false)"
      ></span>
    </div>

  </div>
</template>

<style lang="scss">
  @import "Loader.scss";
</style>
