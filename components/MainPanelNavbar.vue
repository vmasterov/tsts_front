<template>
  <div class="main-panel-navbar">
    <div class="section-name">Мои тесты</div>
    <button
      class="hamburger hamburger--squeeze"
      type="button"
      :class="{'is-active': isSidebarOpen}"
      @click="toggleBurger"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>

    <md-menu
      md-direction="bottom-end"
      class="dropdown"
      :md-offset-x="-2"
      :md-offset-y="-50"
    >
      <div
        ref="userDropdown"
        class="user-dropdown"
        md-menu-trigger
      >
        <span class="avatar">
          <img src="@/assets/images/avatar.jpg" alt="">
        </span>
        <span class="user-dropdown-text">
          <span class="user-dropdown-name">Владимир</span>
          <i class="material-icons right">keyboard_arrow_down</i>
        </span>
      </div>

      <md-menu-content :style="dropdownStyle">
        <md-menu-item
          class="dropwdown-item"
          @click="data='click 1'"
        >
          Профиль</md-menu-item>
        <md-menu-item
          class="dropwdown-item"
          @click="data='click 2'"
        >
          Выход</md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        data: '',
        dropdownStyle: {
          marginTop: '-4px',
          width: ''
        },
        isBurgerActive: false
      }
    },

    computed: {
      ...mapState('main', ['isSidebarOpen'])
    },

    mounted () {
      this.dropdownStyle.width = `${this.$refs.userDropdown.offsetWidth}px`
    },

    methods: {
      ...mapActions('main', ['toggleSidebarOpen']),
      toggleBurger () {
        this.toggleSidebarOpen()
      }
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

  .dropdown {
    display: none;
  }

  .hamburger {
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-block;
    z-index: 11;
    overflow: visible;
    height: 16px;
    border: 0;
    background-color: transparent;
    color: inherit;
    font: inherit;
    text-transform: none;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
  }

  .hamburger:focus {
    background-color: transparent;
  }

  .hamburger:hover {
    opacity: 1;
  }

  .hamburger.is-active:hover {
    opacity: 1;
  }

  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: $gray8;
  }

  .hamburger-box {
    width: 24px;
    height: 16px;
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }

  .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
    width: 24px;
    height: 2px;
    background-color: $gray8;
    border-radius: 3px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  .hamburger-inner::before, .hamburger-inner::after {
    content: "";
    display: block;
  }

  .hamburger-inner::before {
    top: -6px;
  }

  .hamburger-inner::after {
    bottom: -6px;
  }

  .hamburger--squeeze .hamburger-inner {
    transition-duration: 0.075s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--squeeze .hamburger-inner::before {
    transition: top 0.075s 0.12s ease, opacity 0.075s ease;
  }

  .hamburger--squeeze .hamburger-inner::after {
    transition: bottom 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--squeeze.is-active .hamburger-inner {
    transform: rotate(45deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .hamburger--squeeze.is-active .hamburger-inner::before {
    top: 0;
    opacity: 0;
    transition: top 0.075s ease, opacity 0.075s 0.12s ease;
  }

  .hamburger--squeeze.is-active .hamburger-inner::after {
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
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
      max-width: var(--dropdown-max-width);
      cursor: pointer;
    }

    .user-dropdown {
      display: flex;
      align-items: center;
    }

    .dropdown-button {
      height: 50px;
    }

    .avatar {
      margin-right: 15px;
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      background-color: $white;
    }

    .avatar img {
      max-width: 100%;
    }

    .user-dropdown-text {
      display: flex;
      color: $gray1;
      font-size: 16px;
      font-weight: normal;
      opacity: 0.7;
      text-transform: none;
      transition: .3s ease-out;
    }

    .user-dropdown:hover .user-dropdown-text {
      opacity: 1;
    }

    .user-dropdown-text i.right {
      position: relative;
      top: -3px;
      left: 5px;
    }

    span.user-dropdown-name {
      max-width: calc(var(--dropdown-max-width) - 89px);
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
