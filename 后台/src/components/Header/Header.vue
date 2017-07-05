<script>
     /*
    * @component 头部组件
    * @author yxc
    * */
     import clickOtherClose from '../../assets/js/clickOtherClose'
     import { mySessionStorage } from '../../assets/js/webStorage'

     export default {
         props: ['store'],
         data () {
             return {
                 fold: true,
                 username: mySessionStorage.username
             }
         },
         methods: {
             logout () {
                 this.store.logout(this.username)
                         .then(res => this.$router.push('/login'))
             }
         },
         mounted() {
             clickOtherClose(this.$refs['service_arrow'], () => this.fold = true )
         }
     }
</script>

<template>
    <div class="header_root">
        <router-link
                tag="h2"
                to="/"
                class="header_title"
        >
            <img class="header_img1" src="../../assets/imgs/login_logo.png" alt="">
            <img class="header_img2" src="../../assets/imgs/header_name.png" alt="">
        </router-link>
        <ul class="header_account">
            <li class="header_user">
                {{username}}<span
                        ref="service_arrow"
                        :class="{
                            'service_arrow iconfont icon-xiala': true,
                            'service_arrow-unfold': !fold
                        }"
                        @click="fold = !fold"></span>
                <ul class="header_drop" v-show="!fold">
                    <router-link
                            tag="li"
                            to="/updatePwd"
                            class="header_dropItem"
                    >修改密码</router-link>
                    <router-link
                            tag="li"
                            to="/userInfo"
                            class="header_dropItem"
                    >用户信息</router-link>
                </ul>
            </li>
            <li class="header_exit iconfont icon-tuichu" @click="logout"></li>
        </ul>
    </div>
</template>

<style lang="scss">
    @import "Header.scss";
</style>