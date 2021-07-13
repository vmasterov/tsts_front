import https from 'https'
import axios from 'axios'

export default ({ app, store }) => {
  // axios.defaults.baseURL = 'https://localhost:3444'
  axios.defaults.baseURL = 'https://test-node-1.vmasterov.ru/node1'
  axios.defaults.withCredentials = false
  axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  axios.interceptors.request.use(
    config => {
      const token = store.state.authenticated.token
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    error => Promise.reject(error)
  )

  axios.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      const originalRequest = error.config

      if (error.response.status !== 401) {
        return new Promise((resolve, reject) => reject(error))
      }

      if (error.response.status === 401 && originalRequest.url.includes('/users/refresh-token')) {
        await store.dispatch('user/logoutUser')
        return Promise.reject(error)
      }

      if (
        error.response.status === 401 &&
        !originalRequest.url.includes('/users/singin') &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true
        await store.dispatch('authenticated/getRefreshToken')
        return axios(originalRequest)
      }

      return Promise.reject(error)
    }
  )
}
