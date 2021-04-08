<template>
  <div class="search">
    <form action="">
      <input class="search-input" type="text" placeholder="Найти тест">
    </form>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .search {
    margin: 0 20px;
    border-bottom: 1px solid rgba($gray1, 0.3);
  }

  .search input.search-input {
    margin: 0;
    padding: 0 15px;
    width: calc(100% - 30px);
    border: 0;
    font-size: 14px;
  }

  .search input[type=text]:not(.browser-default).search-input:focus {
    border: 0;
    box-shadow: none;
  }
</style>
