import {
  ADD_USER,
  ADD_TESTS,
  ADD_CURRENT_TESTS
} from './mutation-types'
import axios from '~/plugins/axios'

export default {
  state: () => {
    return {
      user: {},
      tests: [],
      currentTest: {}
    }
  },
  mutations: {
    [ADD_USER] (state, payload) {
      state.user = payload
    },

    [ADD_TESTS] (state, payload) {
      state.tests = payload
    },

    [ADD_CURRENT_TESTS] (state, payload) {
      state.currentTest = payload
    }
  },

  actions: {
    async getUser ({ state, commit }, payload) {
      if (state.user._id) return
      try {
        const resp = await axios(payload)
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
      if (state.tests.length) return
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
      try {
        const resp = await axios(payload)
        const data = resp.data ? resp.data[0] : {}
        commit(ADD_CURRENT_TESTS, data)
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
    tests (state) {
      return state.user.tests
    }
  }
}
