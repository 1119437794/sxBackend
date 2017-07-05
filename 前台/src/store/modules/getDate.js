/*
* @module getDate 获取动态风险页面的默认日期
* @author csy
* */

import { GET_DYNAMIC_DATE } from "../types"

const getDate = {

  state: {
    dateList:[],
    doubleList:[]
  },

  mutations: { 
    [GET_DYNAMIC_DATE](state, ajaxData){
      state.dateList = ajaxData;
      state.doubleList = [ajaxData[0],ajaxData[1]]
    }
  }
}

export default getDate;
