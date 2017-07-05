/*
* @module loader 加载组件状态控制
* @author yxc
* */

import {
  LOADER_SET_AJAX_NUM,
  LOADER_SHOWHide,
  LOADER_ERROR_SHOWHide
} from "../types"

const loader = {

  state: {
    ajaxNum: 0, // ajax请求数
    show: false, // 是否显示Loader组件
    showError: false, // 是否显示报错信息
  },

  mutations: {
    [LOADER_SET_AJAX_NUM](state, val){
      let ajaxNum = state.ajaxNum;
      switch (val){
        case -1:
          ajaxNum --;

          // 针对超时 时 在用户点击关闭弹窗之后 请求完毕 所以要避免ajaxNum 小于0
          ajaxNum < 0 && (ajaxNum = 0);
          break;

        case 0:
          ajaxNum = 0;
          break;

        case 1:
          ajaxNum ++;
          break;

        default:
          break;
      }

      // 针对超时 时 在用户点击关闭弹窗之前 请求完毕 所以要重置弹窗错误提醒
      if(!ajaxNum) {
        state.show = false;
        state.showError = false;
      }

      state.ajaxNum = ajaxNum;
    },

    [LOADER_SHOWHide](state, val){
      state.show = val;
    },

    [LOADER_ERROR_SHOWHide](state, val){

      state.show = val;
      state.showError = val;

      if(!val) {
        state.ajaxNum --;
        state.ajaxNum < 0 && (state.ajaxNum = 0);
      }
    }
  }
}

export default loader;
