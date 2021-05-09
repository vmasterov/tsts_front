<template>
  <div class="construct-warning">
    <div class="message">Извините! Страница находится в разработке.</div>
    <div class="go-home">Вернуться на <NuxtLink to="/my-tests">главную</NuxtLink></div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">
  .message {
    font-size: 30px;
    font-weight: bold;
  }

  .go-home {
    margin-top: 20px;
  }
</style>
