import {
  MAIN_TOGGLE_SIDEBAR_OPEN,
  SET_CURRENT_PAGE_NAME
} from './mutation-types'

export default {
  state: () => {
    return {
      isSidebarOpen: false,
      currentPageName: ''
    }
  },
  mutations: {
    [MAIN_TOGGLE_SIDEBAR_OPEN] (state) {
      state.isSidebarOpen = !state.isSidebarOpen
    },

    [SET_CURRENT_PAGE_NAME] (state, payload) {
      state.currentPageName = payload
    }
  },

  actions: {
    toggleSidebarOpen ({ commit }) {
      commit(MAIN_TOGGLE_SIDEBAR_OPEN)
    },

    setCurrentPageName ({ commit }, payload) {
      commit(SET_CURRENT_PAGE_NAME, payload)
    }
  }
}
