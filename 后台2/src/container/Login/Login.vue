<script>
     /*
    * @component 登录组件
    * @author yxc
    * */
     import Btn from '../../components/Btn/Btn.vue'
     import { mySessionStorage } from '../../assets/js/webStorage'

     export default {
         data () {
             return {
                 username: '',
                 pwd: '',
                 msg: false,
                 msgShow: false
             }
         },
         methods: {
             login () {
                 if (this.username && this.pwd) {
                     this.store.login(this.username, this.pwd)
                             .then(res => {
                                 const data = res.data
                                 const content = data.content || {}

                                 if (data.code) {
                                     mySessionStorage.accessToken = content.accessToken
                                     mySessionStorage.adminUserMessage = content.adminUserMessage || {}
                                     mySessionStorage.permissionIds = content.permissionIds || {}
                                     mySessionStorage.accountId = content.id
                                     mySessionStorage.username = content.username
                                     mySessionStorage.password = this.pwd

                                     const permissionIds = mySessionStorage.permissionIds
                                     // 根据权限跳转的默认页面
                                     if (permissionIds.includes(4)) {
                                         this.$router.push('/userList')
                                     } else if (permissionIds.includes(5)) {
                                         this.$router.push('/logList')
                                     } else {
                                         this.msgShow = true
                                         // this.store.showModal(0, '请申请后台权限！')
                                         this.msg = '请申请后台权限！'
                                     }
                                 } else {
                                     this.msgShow = true
                                     this.msg = '账号或密码错误，请重新输入！'
                                 }
                             })
                 } else {
                     this.msgShow = true
                     this.msg = '账号或密码错误，请重新输入！'
                 }
             }
         },
         created () {
             // 销毁token
             mySessionStorage.accessToken = null
         },
         components: {
             Btn
         }
     }
</script>

<template>
    <div class="login_root">
        <div class="login_wrap">
            <h3 class="login_title1">苏州市非法集资大数据预警监测平台</h3>
            <h2 class="login_title2">后台管理系统</h2>
            <label for="login_username">
                <input class="login_username" id="login_username" type="text"
                       v-model.trim="username"
                       placeholder="用户名"
                >
            </label>
            <label for="login_pwd">
                <input class="login_pwd" id="login_pwd" type="password"
                       placeholder="密码"
                       v-model.trim="pwd"
                       @keydown.enter="login">
            </label>
            <p :class="msgShow ? 'login_msg-none' : 'login_msg'" v-text="msg"></p>
            <Btn class="login_btn" status="active" @handleClick="login">登录</Btn>
        </div>
    </div>
</template>

<style lang="scss">
    @import "Login.scss";
</style>