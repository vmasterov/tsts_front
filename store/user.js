import axios from 'axios'
import {
  ADD_USER,
  ADD_TESTS,
  ADD_CURRENT_TESTS,
  USER_INCORRECT_DATA,
  TEST_RESULT,
  SET_LOGOUT
} from './mutation-types'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  state: () => {
    return {
      user: {},
      tests: [],
      currentTest: {},
      userIncorrectData: '',
      testResult: null,
      isLogout: false
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
    },

    [USER_INCORRECT_DATA] (state, payload) {
      state.userIncorrectData = payload
    },

    [TEST_RESULT] (state, payload) {
      state.testResult = payload
    },

    [SET_LOGOUT] (state, payload) {
      state.isLogout = payload
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
        if (!error.response) console.log('getUser Error: Network Error')
        else console.log('getUser Error', error.response.data.message)
      }
    },

    async getTests ({ state, commit }, payload) {
      if (state.tests.length) return
      try {
        const resp = await axios(payload)
        commit(ADD_TESTS, resp.data)
      }
      catch (error) {
        if (!error.response) console.log('getTestsError', 'Error: Network Error')
        else console.log('getTestsError', error.response.data.message)
      }
    },

    async getTest ({ state, commit, rootState }, payload) {
      try {
        const { data } = await axios(payload)
        commit(ADD_CURRENT_TESTS, data)
      }
      catch (error) {
        if (!error.response) console.log('getTest error: Network Error')
        else {
          console.log('getTest Error', error.response.data.message)
          this.$router.push('/')
        }
      }
    },

    async loginUser ({ state, commit }, user) {
      try {
        const slug = window.location.pathname.slice(1) === 'singup' ? 'singup' : 'singin'
        const options = {
          url: `/users/${slug}`,
          method: 'POST',
          data: user
        }
        const { data: { token, refreshToken } } = await axios(options)
        commit('authenticated/AUTH_SET_TOKEN', token, { root: true })
        commit('authenticated/AUTH_SET_REFRESH_TOKEN', refreshToken, { root: true })
        Cookie.set('token', token)
        Cookie.set('refreshToken', refreshToken)
        this.$router.push('/nuxt/my-tests')
      }
      catch (error) {
        if (!error.response) console.log('loginUser Error', error, 'Error: Network Error')
        else commit(USER_INCORRECT_DATA, error.response.data.message)
      }
    },

    async logoutUser ({ commit, dispatch, rootState }) {
      const options = {
        url: '/users/refresh-token/delete',
        method: 'POST',
        data: { refreshToken: rootState.authenticated.refreshToken }
      }

      try {
        await axios(options)
        commit(SET_LOGOUT, true)
        Cookie.remove('token')
        Cookie.remove('refreshToken')
        dispatch('authenticated/setToken', null, { root: true })
        dispatch('authenticated/setRefreshToken', null, { root: true })
        commit(ADD_USER, {})
        commit(ADD_TESTS, [])
        commit(ADD_CURRENT_TESTS, {})
        this.$router.push('/nuxt/singin')
      }
      catch (error) {
        if (!error.response) console.log('logoutUser Error', error, 'Error: Network Error')
        else {
          console.log('logoutUser Error')
          this.errors.incorrectData = error.response.data.message
        }
      }
    },

    async getTestResult ({ state, commit }, answers) {
      try {
        const options = {
          url: `/users/user/tests/${state.currentTest._id}/result`,
          method: 'POST',
          data: answers
        }
        const { data: { result } } = await axios(options)
        commit(TEST_RESULT, result)
      }
      catch (error) {
        if (!error.response) console.log('getTestResultError', error, 'Error: Network Error')
        else console.log('getTestResultError')
      }
    }
  },

  getters: {
    tests (state) {
      return state.user.tests
    },

    userName (state) {
      return state.user.username
    },

    userAvatar (state) {
      return state.user.avatar
    }
  }
}
