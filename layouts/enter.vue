<template>
  <div class="container">
    <div class="row">
      <div class="col xl6 offset-xl3 l8 offset-l2 s12">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'non-authenticated'
  }
</script>

<style lang="scss"></style>
