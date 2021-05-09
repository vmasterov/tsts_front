<template>
  <div class="wrapper">
    <Sidebar />
    <div
      class="main-panel"
      :class="{'open': isSidebarOpen, 'active': isSidebarOpen}"
    >
      <MainPanelNavbar />
      <div class="main-panel-content">
        <Nuxt />
      </div>
      <MainPanelFooter />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import { ADD_USER } from '~/store/mutation-types'

  import Sidebar from '~/components/Sidebar'
  import MainPanelNavbar from '~/components/MainPanelNavbar'
  import MainPanelFooter from '~/components/MainPanelFooter'

  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    components: {
      Sidebar,
      MainPanelNavbar,
      MainPanelFooter
    },

    provide () {
      return {
        logout: this.logout
      }
    },

    middleware: 'authenticated',

    computed: {
      ...mapState('main', ['isSidebarOpen']),
      ...mapState('authenticated', ['token'])
    },

    mounted () {
      this.getUser({
        url: '/users/user',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      })
    },

    methods: {
      ...mapActions('authenticated', ['setToken']),
      ...mapActions('user', ['getUser']),
      ...mapMutations('user', { addUserCommit: ADD_USER }),

      logout () {
        Cookie.remove('token')
        this.setToken(null)
        this.addUserCommit({})
        this.$router.push('/singin')
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/variables";

  /***** MAIN PANEL *****/
  .main-panel {
    position: relative;
    padding-left: 0;
    z-index: 2;
    transform: translateX(0);
    width: 100%;
    background-color: $gray5;
    transition: transform .3s;
  }

  .main-panel:before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    transition: opacity .3s;
  }

  .main-panel.open:before{
    z-index: 0;
    opacity: 0.8;
  }

  .main-panel.active:before{
    z-index: 10;
  }

  .main-panel.open .main-panel-content {
    height: calc(100vh - 150px);
    overflow: hidden;
  }

  .main-panel.open {
    float: left;
    transform: translateX(-260px);
  }

  .main-panel-content {
    padding: 0 15px;
  }

  .main-panel-content {
    padding: 15px;
    min-height: calc(100vh - 150px);
  }

  @include w_993 {
    .main-panel {
      padding-left: 260px;
      float: right;
    }

    .main-panel:before,
    .main-panel.active:before{
      display: none;
    }

    .main-panel.open {
      float: right;
      transform: translate(0);
    }
    .main-panel-content {
      padding: 0 30px;
    }

    .main-panel-content {
      padding: 30px;
    }

    .main-panel.open .main-panel-content {
      overflow: auto;
      height: auto;
    }
  }
  /***** MAIN PANEL *****/
</style>
