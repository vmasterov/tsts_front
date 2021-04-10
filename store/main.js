export default {
  state: () => {
    return {
      isSidebarOpen: false
    }
  },
  mutations: {
    toggleSidebarOpen (state) {
      state.isSidebarOpen = !state.isSidebarOpen
    }
  },

  actions: {
    toggleSidebarOpen ({ commit }) {
      commit('toggleSidebarOpen')
    }
  }
}
