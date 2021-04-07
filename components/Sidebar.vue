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
    overflow-y: auto;
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
    z-index: 4;
    width: 260px;
    height: 100vh;
    box-shadow: inset -1px 0 0 0 $gray6;
  }

  .sidebar .logo {
    margin: 0 20px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(102, 97, 91, 0.3);
  }

  .sidebar .logo .simple-text {
    padding: 4px 0;
    display: block;
    color: $gray1;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    text-align: center;
    text-transform: uppercase;
  }

  .sidebar .nav {
    margin-top: 20px;
  }

  .sidebar .nav li:hover > a {
    opacity: 1;
  }

  .sidebar .nav li > a {
    margin: 10px 0;
    padding-left: 25px;
    padding-right: 25px;
    opacity: .7;
  }

  .sidebar .nav li.active > a {
    color: $orange;
    opacity: 1;
  }

  .sidebar .nav li.active > a:before {
    content: "";
    position: absolute;
    top: 8px;
    right: 0;
    display: none;
    border-right: 17px solid $gray6;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
  }

  .sidebar .nav li.active > a:after {
    content: "";
    position: absolute;
    top: 8px;
    right: -1px;
    display: none;
    border-right: 17px solid $gray5;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
  }

  .sidebar .nav i {
    margin-right: 15px;
    float: left;
    width: 30px;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
  }

  .sidebar .nav span {
    margin: 0;
    display: block;
    font-size: 12px;
    font-weight: 600;
    line-height: 30px;
    text-transform: uppercase;
  }

  @include w_993 {
    .sidebar {
      right: auto;
      left: 0;
      transform: translateX(0);
    }

    .sidebar .nav li.active > a:before,
    .sidebar .nav li.active > a:after {
      display: inline-block;
    }
  }
</style>
