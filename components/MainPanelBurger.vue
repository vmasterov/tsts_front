<template>
  <button
    class="hamburger hamburger--squeeze"
    type="button"
    :class="{'is-active': isBurgerActive}"
    @click="toggleBurger"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </button>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data: () => {
      return {
        isBurgerActive: false
      }
    },

    computed: {
      ...mapState('main', ['isSidebarOpen'])
    },

    watch: {
      isSidebarOpen (value) {
        setTimeout(() => {
          this.isBurgerActive = value
        }, 250)
      }
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
    .hamburger {
      display: none;
    }
  }
</style>
