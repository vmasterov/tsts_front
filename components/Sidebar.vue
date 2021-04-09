<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <Logo />
      <SidebarSearch />
      <SidebarNavigation />
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo'
  import SidebarSearch from '~/components/SidebarSearch'
  import SidebarNavigation from '~/components/SidebarNavigation'

  export default {
    components: {
      Logo,
      SidebarSearch,
      SidebarNavigation
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: auto;
    display: block;
    z-index: 10;
    width: 260px;
    background-color: $white;
    font-weight: 200;
    transition: transform .3s;
    transform: translateX(100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar .sidebar-wrapper {
    position: relative;
    overflow: hidden;
    overflow-y: auto;
    z-index: 4;
    width: 260px;
    height: 100vh;
    box-shadow: inset -1px 0 0 0 $gray6;
  }

  @include w_993 {
    .sidebar {
      right: auto;
      left: 0;
      transform: translateX(0);
    }
  }
</style>
