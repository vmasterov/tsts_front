require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tsts-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'
      }
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-material.js',
    '~/plugins/axios'
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vue-material/dist/vue-material.min.css',
    '@/assets/scss/grid.scss',
    '@/assets/scss/main.scss'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      // Broke page styles when live changing it n Chrome DevTools with webpack template
      // @see https://github.com/vuejs-templates/webpack/issues/1331
      scss: {
        sourceMap: process.env.NODE_ENV === 'production'
      }
    },

    optimization: {
      splitChunks: {
        // @see https://webpack.js.org/guides/build-performance/
        maxSize: 250000
      }
    }
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push(
        {
          path: '/my-tests',
          component: resolve(__dirname, 'pages/tests/index.vue')
        },
        {
          path: '/my-tests/*',
          component: resolve(__dirname, 'pages/tests/_.vue')
        },
        {
          path: '/singin',
          component: resolve(__dirname, 'pages/enter.vue')
        },
        {
          path: '/singup',
          component: resolve(__dirname, 'pages/enter.vue')
        }
      )
    }
  },

  loading: false
}
