module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'brace-style': ['error', 'stroustrup'],
    'no-console': 'off',
    indent: 'off',
    'vue/html-indent': ['error', 2, { baseIndent: 1 }],
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off'
  }
}
