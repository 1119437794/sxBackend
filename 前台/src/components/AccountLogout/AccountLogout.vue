<script>

  /*
  * @component 页面顶部/用户名|退出 组件
  * @author yxc
  * <AccountLogout />
  * */

  import { ajax, clickOtherClose } from "../../assets/js/utils"

  export default {

    data(){
      return {
          fold: true,
          account: sessionStorage.account
      }
    },

    methods: {

      /*
      * @method logout 退出登录
      * */
      logout(){

        ajax({
          method: "get",
          url: "/logout.do",
          params: {
              token: sessionStorage.token,
              username: sessionStorage.account
          },

          success: () => {
            sessionStorage.clear();
            this.$router.push("/login");
          }
        })

      }
    },
      mounted () {
        clickOtherClose(this.$refs['accountLogout__user'], () => this.fold = true )
      }
  }

</script>

<template>
  <div class="accountLogout__root">

    <span class="accountLogout__user"
          ref="accountLogout__user"
          @click="fold = !fold"
    >
      <i class="iconfont icon-weibiaoti41"></i>
      {{account}}
        <ul class="accountLogout_drop" v-show="!fold">
                    <router-link
                            tag="li"
                            to="/updatePwd"
                            class="accountLogout_dropItem"
                    >修改密码</router-link>
                    <router-link
                            tag="li"
                            to="/userInfo"
                            class="accountLogout_dropItem"
                    >用户信息</router-link>
                </ul>
    </span>

    <span class="accountLogout__logout">
      <i
        @click="logout"
        class="iconfont icon-tuichu"
      ></i>
    </span>
  </div>
</template>

<style lang="scss">
  @import "AccountLogout.scss";
</style>
