import axios from 'axios'
import {
  AUTH_SET_TOKEN,
  AUTH_SET_REFRESH_TOKEN
} from './mutation-types'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  state: () => {
    return {
      token: null,
      refreshToken: null
    }
  },
  mutations: {
    [AUTH_SET_TOKEN] (state, payload) {
      state.token = payload
    },

    [AUTH_SET_REFRESH_TOKEN] (state, payload) {
      state.refreshToken = payload
    }
  },

  actions: {
    setToken ({ commit }, payload) {
      commit(AUTH_SET_TOKEN, payload)
    },

    setRefreshToken ({ commit }, payload) {
      commit(AUTH_SET_REFRESH_TOKEN, payload)
    },

    async getRefreshToken ({ state, commit }) {
      const options = {
        url: '/users/refresh-token',
        method: 'POST',
        data: { refreshToken: state.refreshToken }
      }

      try {
        const { data: { token } } = await axios(options)
        commit(AUTH_SET_TOKEN, token)
        Cookie.set('token', token)
      }
      catch (error) {
        if (!error.response) console.log('getRefreshTokenError', error, 'Error: Network Error')
        else console.log('getRefreshTokenError', error)
      }
    }
  }
}
