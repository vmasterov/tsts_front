<template>
  <div class="row">
    <div class="col xl4 l6 s12">
      <TestCard />
    </div>
  </div>
</template>

<script>
  import https from 'https'

  import TestCard from '~/components/TestCard'

  const agent = new https.Agent({ rejectUnauthorized: false })

  export default {
    components: {
      TestCard
    },

    data: () => {
      return {
        users: []
      }
    },

    async fetch () {
      this.users = await fetch('https://localhost:3444/users/', { agent }).then(res => res.json())
    },

    mounted () {
      console.log('users:', this.users)
    }
  }
</script>

<style lang="scss">
</style>
