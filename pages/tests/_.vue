<template>
  <h1>Hello from test</h1>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    async fetch ({ route, store }) {
      await store.dispatch('user/getTest', {
        url: `/users/user/tests/${route.params.pathMatch}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + store.state.authenticated.token
        }
      })
    },

    computed: {
      ...mapState('authenticated', ['token']),
      ...mapState('user', ['userTests'])
    },

    beforeMount () {
      this.setCurrentPageName('this.test.name')
    },

    mounted () {
      console.log('userTests', this.userTests)
    },

    methods: {
      ...mapActions('user', ['getTest']),
      ...mapActions('main', ['setCurrentPageName'])
    }
  }
</script>

<style scoped>

</style>
