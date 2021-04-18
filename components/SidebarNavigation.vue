<template>
  <ul class="nav">
    <li
      v-for="item in navigation"
      :key="item.id"
      class="nav-item"
    >
      <MdRipple>
        <NuxtLink
          :to="item.link"
          class="waves-effect waves-dark nav-link"
          @click.native="menuClick(item.type)"
        >
          <i class="material-icons nav-icon">{{ item.icon }}</i>
          <span class="nav-text">{{ item.text }}</span>
        </NuxtLink>
      </MdRipple>
    </li>
  </ul>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    inject: ['logout'],

    data: () => {
      return {
        navigation: [
          {
            id: 1,
            link: '/my-tests',
            text: 'Мои тесты',
            icon: 'playlist_add_check'
          },
          {
            id: 2,
            link: '/create-test',
            text: 'Создать тест',
            icon: 'playlist_add'
          },
          {
            id: 3,
            link: 'load-test',
            text: 'Загрузить тест',
            icon: 'playlist_play'
          },
          {
            id: 4,
            link: '/statistics',
            text: 'Статистика',
            icon: 'timeline'
          },
          {
            id: 5,
            link: '/profile',
            text: 'Профиль',
            icon: 'person_outline'
          },
          {
            id: 6,
            link: '/Help',
            text: 'Помощь',
            icon: 'help_outline'
          },
          {
            id: 7,
            link: '/singin',
            text: 'Выход',
            icon: 'exit_to_app',
            type: 'logout'
          }
        ]
      }
    },

    methods: {
      ...mapActions('main', ['toggleSidebarOpen']),

      menuClick (type) {
        if (type === 'logout') this.logout()
        this.toggleSidebarOpen()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .nav {
    margin: 20px 0 0 0;
    padding-left: 0;
    list-style: none;
  }

  .nav-item {
    position: relative;
    margin: 10px 0;
    display: block;
  }

  .nav-link {
    position: relative;
    padding: 10px 25px;
    display: block;
    color: $gray1;
    opacity: .7;

    &:hover {
      opacity: 1;
      text-decoration: none;
    }
  }

  .nuxt-link-active {
    color: $orange;
    opacity: 1;
  }

  .nuxt-link-active:before,
  .nuxt-link-active:after {
    content: "";
    position: absolute;
    top: 8px;
    display: none;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
  }

  .nuxt-link-active:before {
    right: 0;
    border-right: 17px solid $gray6;
  }

  .nuxt-link-active:after {
    right: -1px;
    border-right: 17px solid $gray5;
  }

  .nav-icon {
    margin-right: 15px;
    float: left;
    width: 30px;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
  }

  .nav-text {
    margin: 0;
    display: block;
    font-size: 12px;
    font-weight: 600;
    line-height: 30px;
    text-transform: uppercase;
  }

  @include w_993 {
    .nuxt-link-active:before,
    .nuxt-link-active:after {
      display: inline-block;
    }
  }
</style>
