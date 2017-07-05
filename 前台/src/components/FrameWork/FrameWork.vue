<script>
     /*
   * @component 页面框架/布局 组件
   * @author yxc
   * @date 2016/11/10
   * */
     import Loader from "../Loader/Loader.vue"
     import PageHeader from "../PageHeader/PageHeader.vue"
     import NavComponent from "../NavComponent/NavComponent.vue"
     import AccountLogout from "../AccountLogout/AccountLogout.vue"
     require('../../assets/js/setLog')

     import { setRootFontSize, setDynamicPicData, getNewToken } from "../../assets/js/utils"

    export default {
       components: {
         PageHeader,
         AccountLogout,
         NavComponent,
         Loader
       },

       mounted(){
         // dom加载完毕 才去获取屏幕宽度 这个才是有效的
          setRootFontSize();

         // 监听动态图谱数据变化
         setDynamicPicData();

         // 监听用户 获取最新token
         getNewToken();
       }
    }
</script>

<template>
  <div class="frameWork__root">
    <PageHeader>
      <AccountLogout slot="account"/>
    </PageHeader>
    <NavComponent></NavComponent>
    <router-view></router-view>
    <Loader></Loader>
  </div>
</template>

<style lang="scss">
  @import "../../assets/css/public.css";
  @import "../../assets/css/font/iconfont.css";
</style>
