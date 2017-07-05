/*
 * @module dynamicPicDetails 关联图谱详情状态控制
 * @author yxc
 * */

import { DYNAMICPIC_DETAILS_SET } from "../types"

const dynamicPicDetails = {
  state: {
    renderData: {} //详情渲染数据
  },

  mutations: {
    [DYNAMICPIC_DETAILS_SET](state, data) {
      state.renderData = data;
    }
  }
}

export default dynamicPicDetails;
