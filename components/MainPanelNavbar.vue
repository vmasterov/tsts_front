<template>
  <div class="main-panel-navbar">
    <div class="section-name">
      Мои тесты
    </div>
    <button class="hamburger hamburger--squeeze" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>
    <div class="dropdown">
      <a class="dropdown-trigger user-dropdown" href="#" data-target="dropdown1">
        <span class="avatar">
          <img src="images/avatar.jpg" alt="">
        </span>
        <span class="user-dropdown-text">Владимир <i class="material-icons right">keyboard_arrow_down</i></span>
      </a>
      <ul id="dropdown1" class="dropdown-content">
        <li><a href="profile.html">Профиль</a></li>
        <li><a href="#">Выход</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .main-panel-navbar {
    padding: 0 15px;
  }

  .main-panel-navbar {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    min-height: 75px;
    border-bottom: 1px solid rgba(102, 97, 91, 0.3);
    background-color: #f4f3ef;
  }

  .main-panel.active .main-panel-navbar {
    position: relative;
    z-index: auto;
  }

  @include w_993 {
    .main-panel-navbar {
      padding: 0 30px;
    }

    .main-panel.active .main-panel-navbar {
      position: sticky;
      z-index: 1;
    }

    .hamburger {
      display: none;
    }

    .dropdown {
      display: block;
    }

    .user-dropdown {
      display: flex;
      align-items: center;
    }
  }
</style>
