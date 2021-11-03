const cookieParser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit ({ commit, rootState }, { req }) {
    let token = null
    let refreshToken = null

    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        token = parsed.token || null
        refreshToken = parsed.refreshToken || null
      }
      catch (error) {}
    }

    commit('authenticated/AUTH_SET_TOKEN', token, { root: true })
    commit('authenticated/AUTH_SET_REFRESH_TOKEN', refreshToken, { root: true })
  }
}
