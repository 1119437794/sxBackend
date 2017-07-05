<script>
    /*
    * 入口组件
    * */
    import store from './store'
	export default {
        data () {
            return {
                store
            }
        }
    }
</script>

<template>
    <router-view :store="store"></router-view>
</template>

<style>
    @import './assets/css/public.css';
    @import './assets/css/common.css';
    @import './assets/css/font/iconfont.css';
</style>
