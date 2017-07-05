/*
* @module 项目路由表
* @author yxc
* */

import Vue from "vue"
import VueRouter from "vue-router"
import store from "./store/index"

// 页面框架
import FrameWork from "./components/FrameWork/FrameWork.vue"

// 登录
import Login from "./components/Login/Login.vue"

// 平台入口
import Main from "./components/Main/Main.vue"

// 预警监测
import WarnIndex from "./components/Warn/WarnIndex/WarnIndex.vue"
import WarnSearchOutput from "./components/Warn/WarnSearchOutput/WarnSearchOutput.vue"
import WarnStaticRisk from "./components/Warn/WarnStaticRisk/WarnStaticRisk.vue"
import WarnDynamicRisk from "./components/Warn/WarnDynamicRisk/WarnDynamicRisk.vue"

// 全息查询
import FullInfo from "./components/FullInfo/FullInfo.vue"
import Details from "./components/FullInfo/Details/Details.vue"

// 举报分析
import Analysis from "./components/Analysis/Analysis.vue"

// 修改密码
import UpdatePwd from './components/UpdatePwd/UpdatePwd.vue'

// 用户信息
import UserInfo from './components/UserInfo/UserInfo.vue'


Vue.use(VueRouter);

const routes = [

  // 登录
  {
    path: "/login",
    component: Login
  },

  // 含公共头部和导航视图
  {
    path: "/",
    component: FrameWork,

    children: [
      // 全息/首页 即是查询平台
      {
        path: "fullinfo/",
        component: FullInfo
      },
      // 全息/详情
      {
        path: "fullinfo/details",
        component: Details
      },

      // 预警/首页
      {
        path: "warn",
        component: WarnIndex
      },
      // 预警/搜索结果页
      {
        path: "warn/searchoutput",
        component: WarnSearchOutput
      },
      // 预警/静态风险
      {
        path: "warn/staticrisk",
        component: WarnStaticRisk
      },
      // 预警/动态风险
      {
        path: "warn/dynamicrisk",
        component: WarnDynamicRisk
      },

      // 举报分析
      {
        path: "analysis",
        component: Analysis
      },

        // 修改密码
        {
            path: "updatePwd",
            component: UpdatePwd
        },
        {
            path: "userInfo",
            component: UserInfo
        }

    ]
  },

  // 工作主页面
  {
    path: "",
    component: Main,
  },
];

const router = new VueRouter({
  routes
});

// 注册全局导航钩子
router.beforeEach((to, from, next) => {

  let toUrl = to.path;

  store.commit("setLastRouterPath", from.fullPath);

  // 除开进入登录以外的页面 均需token验证
  if(toUrl !== "/login") {

    if(sessionStorage.token){
      next();

    }else {
      next("/login")
    }

  }else {
    next();
  }
})

export default router;

