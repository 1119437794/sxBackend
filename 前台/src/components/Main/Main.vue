<script>
     /*
   * @component 组件
   * @author yxc
   * @date 2016/11/15 0015
   * */

     import PageHeader from "../PageHeader/PageHeader.vue"
     import AccountLogout from "../AccountLogout/AccountLogout.vue"
     import { setRootFontSize } from "../../assets/js/utils"
     import mixin from '../../assets/js/mixins'

    export default {
        mixins: [mixin],
        mounted(){
            setRootFontSize();
        },
       components: {
         PageHeader,
         AccountLogout
       }
    }
</script>

<template>
  <div class="main__root">
    <PageHeader>
      <AccountLogout slot="account"/>
    </PageHeader>
    <img class="main__logo" src="../../assets/imgs/mainLogo.png" alt="">
    <ul class="main__list">
      <router-link
        tag="li"
        :to="item.url"
        class="main__item"
        v-for="item of getNavByPermission()"
        active-class="main__item--active"
      >
        <div class="main__icon">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" >
            <polygon points="128,10 158,27 158,63 128,80 97,63 97,27" />
          </svg>
          <i :class="`iconfont ${item.icon} main__iconI`"></i>
        </div>
        <h2 class="main__title" v-text="item.name"></h2>
      </router-link>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "Main.scss";
</style>
