<template>
  <div class="main-panel-footer">
    <div class="copyright">
      © <span class="footer-year">{{ currentYear }}</span> <a href="http://vmasterov.ru" target="_blank">vmasterov.ru</a>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentYear () {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .main-panel-footer {
    padding: 0 15px;
  }

  .main-panel-footer {
    display: flex;
    align-items: center;
    min-height: 75px;
    border-top: 1px solid rgba($gray1, 0.3);
  }

  .copyright {
    margin: 0 auto;
  }

  .copyright a {
    transition: color 0.3s;
  }

  .copyright a:hover {
    color: $orange;
  }

  @include w_993 {
    .main-panel-footer {
      padding: 0 30px;
    }

    .copyright {
      margin: 0 0 0 auto;
    }
  }
</style>
