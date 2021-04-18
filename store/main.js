import { MAIN_TOGGLE_SIDEBAR_OPEN } from './mutation-types'

export default {
  state: () => {
    return {
      isSidebarOpen: false
    }
  },
  mutations: {
    [MAIN_TOGGLE_SIDEBAR_OPEN] (state) {
      state.isSidebarOpen = !state.isSidebarOpen
    }
  },

  actions: {
    toggleSidebarOpen ({ commit }) {
      commit(MAIN_TOGGLE_SIDEBAR_OPEN)
    }
  }
}
