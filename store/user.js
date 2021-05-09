import {
  ADD_USER,
  ADD_TESTS
} from './mutation-types'
import axios from '~/plugins/axios'

export default {
  state: () => {
    return {
      user: {},
      userTests: []
    }
  },
  mutations: {
    [ADD_USER] (state, payload) {
      state.user = payload
    },

    [ADD_TESTS] (state, payload) {
      state.userTests = payload
    }
  },

  actions: {
    async getUser ({ state, commit }, payload) {
      if (state.user._id) return
      try {
        const resp = await axios(payload)
        // console.log(resp)
        commit(ADD_USER, resp.data)
      }
      catch (error) {
        if (!error.response) {
          console.log('Error: Network Error')
        }
        else {
          console.log(error.response.data.message)
        }
      }
    },

    async getTests ({ state, commit }, payload) {
      if (state.userTests.length) return
      try {
        const resp = await axios(payload)
        commit(ADD_TESTS, resp.data)
      }
      catch (error) {
        if (!error.response) {
          console.log('Error: Network Error')
        }
        else {
          console.log(error.response.data.message)
        }
      }
    },

    async getTest ({ state, commit }, payload) {
      // if (state.userTests.length) return
      try {
        const resp = await axios(payload)
        commit(ADD_TESTS, resp.data)
      }
      catch (error) {
        if (!error.response) {
          console.log('Error: Network Error')
        }
        else {
          console.log(error.response.data.message)
        }
      }
    }
  },

  getters: {
    userTests (state) {
      return state.user.tests
    }
  }
}
