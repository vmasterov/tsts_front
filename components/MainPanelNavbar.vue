<template>
  <div class="main-panel-navbar">
    <div class="section-name">Мои тесты</div>
    <MainPanelBurger />
    <MainPanelUser />
  </div>
</template>

<script>
  import MainPanelBurger from '~/components/MainPanelBurger'
  import MainPanelUser from '~/components/MainPanelUser'

  export default {
    components: {
      MainPanelBurger,
      MainPanelUser
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .main-panel-navbar {
    padding: 0 15px;
    --dropdown-max-width: 280px
  }

  .main-panel-navbar {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    min-height: 75px;
    border-bottom: 1px solid rgba($gray1, 0.3);
    background-color: $gray5;
  }

  .main-panel.active .main-panel-navbar {
    position: relative;
    z-index: auto;
  }

  .section-name {
    color: $gray1;
    font-size: 20px;
  }

  @include w_993 {
    .main-panel-navbar {
      padding: 0 30px;
    }

    .main-panel.active .main-panel-navbar {
      position: sticky;
      z-index: 1;
    }
  }
</style>
