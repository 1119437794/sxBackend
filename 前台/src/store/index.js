/*
* @module 全局store
* @author yxc
* */

import Vue from "vue"
import Vuex from "vuex"

// 引入 加载组件状态控制模块
import loader from "./modules/loader"
import getDate from "./modules/getDate"
import dynamicPicDetails from "./modules/dynamicPicDetails"
import router from "./modules/router"

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {},

  modules: {

    loader,

    getDate,

    dynamicPicDetails,

    router,
  },

  strict: process.env.NODE_ENV !== 'production' // 启用严格模式
});

export default store;
