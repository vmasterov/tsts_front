<template>
  <div class="row">
    <div
      v-for="test in tests"
      :key="test._id"
      class="col xl4 l6 s12"
    >
      <TestCard :test="test" />
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
      return {}
    },

    computed: {
      ...mapState('user', [
        'user',
        'tests'
      ]),
      ...mapState('authenticated', ['token'])
    },

    watch: {
      user (value) {
        if (value) this.getTestsLocal()
      }
    },

    mounted () {
      if (this.user._id && !this.tests.length) this.getTestsLocal()
    },

    methods: {
      ...mapActions('user', ['getTests']),

      getTestsLocal () {
        this.getTests({
          url: '/users/user/tests',
          method: 'GET',
          params: {
            owner: this.user._id
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
