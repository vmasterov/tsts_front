<template>
  <div class="logo">
    <NuxtLink to="/" class="simple-text">
      tsts.ru
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .logo {
    margin: 0 20px;
    padding: 18px 0;
    border-bottom: 1px solid rgba($gray1, 0.3);
  }

  .simple-text {
    padding: 4px 0;
    display: block;
    color: $gray1;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    text-align: center;
    text-transform: uppercase;

    &:hover {
      text-decoration: none;
    }
  }

  @include w_993 {
  }
</style>
