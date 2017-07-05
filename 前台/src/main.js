/*
* @module 项目入口
* @yxc
* */

import Vue from 'vue'
import router from "./Router"
import store from "./store/index"

/* eslint-disable no-new */
new Vue({
  store, // 注入store
  router // 引入路由表
}).$mount("#app");


