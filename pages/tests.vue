<template>
  <div class="row">
    <div class="col xl4 l6 s12">
      <TestCard />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import TestCard from '~/components/TestCard'

  export default {
    components: {
      TestCard
    },

    data: () => {
      return {
        users: []
      }
    },

    computed: {
      ...mapState('authenticated', ['token'])
    },

    mounted () {
      this.getUser({
        url: '/users/user',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      })
    },

    methods: {
      ...mapActions('user', ['getUser'])
    }
  }
</script>

<style lang="scss">
</style>
