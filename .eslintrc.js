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
    curly: [2, 'multi-line'],
    'no-console': 'off',
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    indent: 'off',
    'vue/html-indent': ['error', 2, { baseIndent: 1 }],
    'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off'
  }
}
