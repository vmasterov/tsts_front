import { ADD_USER } from './mutation-types'
import axios from '~/plugins/axios'

export default {
  state: () => {
    return {
      user: {}
    }
  },
  mutations: {
    [ADD_USER] (state, payload) {
      state.user = payload
    }
  },

  actions: {
    async getUser ({ state, commit }, payload) {
      if (state.user._id) return
      try {
        const resp = await axios(payload)
        console.log(resp)
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
    }
  }
}
