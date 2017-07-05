<script>
     /*
   * @component 组件
   * @author yxc
   * @date 2016/11/15 0015
   * */

     import PageHeader from "../PageHeader/PageHeader.vue"
     import { setRootFontSize, ajax } from "../../assets/js/utils"
     import { hex_md5 } from "../../assets/js/md5"
     import mixin from '../../assets/js/mixins'

    export default {
        mixins: [mixin],
      data(){
         return {
           username: "",
           password: "",
           flag: false, // 登录错误提醒
             msg: ''
         }
       },

      methods: {

        /*
        * @method login 登录
        * */
        login(){
          let pwdMd5 = hex_md5(`${location.hostname}${this.username}${this.password}`);

          ajax({
            method: "POST",
            url: "/login.do",
            body: {
              username: this.username,
              password: this.password,
              pwdMd5: pwdMd5
            },

            success: (res) => {

              if( res.code ) {
                  const content = res.content || {}
                  const permissionIds = content.permissionIds || [] // 该用户的权限
                  sessionStorage.pwd = this.password;
                  sessionStorage.account = content.username;
                  sessionStorage.token = content.accessToken;
                  sessionStorage.id = content.id || 0;
                  sessionStorage.permissionIds = JSON.stringify(permissionIds)
                  sessionStorage.adminUserMessage = JSON.stringify(content.adminUserMessage || {})

                  if (this.isHasPermission([1, 2, 3])) {
                      this.$router.push("/");
                  } else {
                    this.flag = true;
                    this.msg = '请申请前台权限'
                 }
              }else {
                  this.msg = '账号或密码错误，请重新输入'
                this.flag = true;
              }
            }
          })
        }
      },

      created(){
        // 避免用户前进后退
        sessionStorage.clear();
      },

      mounted(){
        setRootFontSize();
      },

      components: {
        PageHeader
      },
    }

</script>

<template>
  <div class="login__root">
    <PageHeader></PageHeader>

    <div class="login__wrap">

      <div class="login__box">

        <p class="login__username">
          <input type="text" placeholder="用户名" v-model.trim="username">
        </p>

        <p class="login__pwd">
          <input
            type="password"
            placeholder="密码"
            v-model.trim="password"
            @keydown.enter="login"
          >
        </p>

        <p class="login__err" v-show="flag" v-text="msg"></p>

        <button
          class="login__btn"
          @click="login"
        >立即登录</button>

        <img class="login__line2" src="../../assets/imgs/loginLine2.png" alt="">
      </div>

      <img class="login__line1" src="../../assets/imgs/loginLine1.png" alt="">
    </div>
  </div>
</template>

<style lang="scss">
  @import "Login.scss";
</style>
