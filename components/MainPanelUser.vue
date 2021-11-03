<template>
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
        <img :src="getAvatarUrl()" alt="">
      </span>
      <span class="user-dropdown-text">
        <span class="user-dropdown-name">{{ userName }}</span>
        <i class="material-icons right">keyboard_arrow_down</i>
      </span>
    </div>

    <md-menu-content :style="dropdownStyle">
      <md-menu-item
        class="dropwdown-item"
        @click="goToProfile()"
      >
        Профиль
      </md-menu-item>
      <md-menu-item
        class="dropwdown-item"
        @click="logoutUser()"
      >
        Выход
      </md-menu-item>
    </md-menu-content>
  </md-menu>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import navigation from '~/components/navigation-items'

  export default {
    data () {
      return {
        data: '',
        dropdownStyle: {
          marginTop: '-4px',
          width: ''
        }
      }
    },

    computed: {
      ...mapGetters('user', [
        'userName',
        'userAvatar'
      ])
    },

    mounted () {
      this.dropdownStyle.width = `${this.$refs.userDropdown.offsetWidth}px`
    },

    methods: {
      ...mapActions('main', ['setCurrentPageName']),
      ...mapActions('user', ['logoutUser']),

      goToProfile () {
        const url = '/nuxt/profile'
        this.setCurrentPageName(navigation.find(item => item.link === url).text)
        this.$router.push(url)
      },

      getAvatarUrl () {
        if (this.userAvatar) return require(`@/assets/images/${this.userAvatar}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .dropdown {
    display: none;
  }

  @include w_993 {
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
