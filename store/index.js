const cookieParser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit ({ commit, rootState }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        auth = parsed.token
      }
      catch (error) {
        // No valid cookie found
      }
    }
    commit('authenticated/AUTH_SET_TOKEN', auth, { root: true })
  }
}
