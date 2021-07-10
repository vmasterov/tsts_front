<template>
  <div class="container">
    <h1>Main page of TSTS</h1>
  </div>
</template>

<script>
  export default {
    fetch ({ redirect, route }) {
      if (!route.params.id) redirect('/nuxt/my-tests')
    }
  }
</script>

<style lang="scss"></style>
