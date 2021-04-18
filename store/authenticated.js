import { AUTH_SET_TOKEN } from './mutation-types'

export default {
  state: () => {
    return {
      token: null
    }
  },
  mutations: {
    [AUTH_SET_TOKEN] (state, payload) {
      state.token = payload
    }
  },

  actions: {
    setToken ({ commit }, payload) {
      commit(AUTH_SET_TOKEN, payload)
    }
  }
}
