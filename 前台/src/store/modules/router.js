/*
 * @module router 路由状态控制
 * @author yxc
 * */

const router = {
  state: {
    lastRouterPath: ""
  },

  mutations: {
    setLastRouterPath(state, path) {
      state.lastRouterPath = path;
    }
  }
}

export default router;
