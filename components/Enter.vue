<template>
  <div class="enter z-depth-1">
    <div class="enter-caption">Платформа для прохождения тестов</div>

    <form @submit.prevent="loginUser">
      <div class="input-field">
        <md-field class="enter-field">
          <label>Логин</label>
          <md-input
            id="username"
            v-model="user.username"
            type="text"
            name="username"
            autocomplete="username"
            @keyup="handleChange"
          />
        </md-field>
        <div class="helper-text" :class="getValidationClass('username')">{{ errors.username }}</div>
      </div>
      <div v-if="isSingup" class="input-field">
        <md-field class="enter-field">
          <label>Почта</label>
          <md-input
            id="email"
            v-model="user.email"
            type="text"
            name="email"
            autocomplete="email"
            @keyup="handleChange"
          />
        </md-field>
        <div class="helper-text" :class="getValidationClass('email')">{{ errors.email }}</div>
      </div>
      <div class="input-field">
        <md-field class="enter-field">
          <label>Пароль</label>
          <md-input
            id="password"
            v-model="user.password"
            type="password"
            name="password"
            autocomplete="password"
            @keyup="handleChange"
          />
        </md-field>
        <div class="helper-text" :class="getValidationClass('password')">{{ errors.password }}</div>
      </div>
      <div class="input-field">
        <div class="helper-text" :class="getValidationClass('incorrectData')">{{ errors.incorrectData }}</div>
      </div>

      <md-button
        class="md-raised md-primary enter-button"
        type="submit"
        :disabled="isDisableSubmit"
      >
        {{ buttonText }}
      </md-button>
      <div class="enter-extra" v-html="extraText" />
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import axios from '~/plugins/axios'

  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    data: () => {
      return {
        user: {
          username: '',
          email: '',
          password: ''
        },
        errors: {
          username: '',
          email: '',
          password: '',
          incorrectData: ''
        },
        isDisableSubmit: true,
        passCharCount: 1,
        isSingup: null
      }
    },

    computed: {
      extraText () {
        if (this.isSingup) {
          return 'Уже есть аккунт? <a href="/singin">Войти</a>'
        }
        else {
          return 'Нет аккаунта? <a href="/singup">Зарегистрироваться</a>'
        }
      },
      buttonText () {
        return this.isSingup ? 'Зарегистрироавться' : 'Войти'
      }
    },

    watch: {
      'errors.username': function () {
        this.checkDisableSubmit()
      },
      'errors.email': function () {
        this.checkDisableSubmit()
      },
      'errors.password': function () {
        this.checkDisableSubmit()
      }
    },

    created () {
      this.isSingup = this.$route.path.slice(1) === 'singup'
    },

    methods: {
      ...mapActions('authenticated', ['setToken']),

      checkDisableSubmit () {
        this.isDisableSubmit = (Boolean(this.errors.username) || this.user.username.length < 3) ||
          (Boolean(this.errors.password) || this.user.password.length < this.passCharCount) ||
          Boolean(this.errors.email)
      },

      loginUser () {
        axios({
          url: '/users/singin',
          method: 'POST',
          data: this.user
        })
          .then(({ data }) => {
            this.setToken(data.token)
            Cookie.set('token', data.token)
            this.$router.push('/my-tests')
          })
          .catch((error) => {
            if (!error.response) {
              console.log('Error: Network Error')
            }
            else {
              console.log(error.response.data.message)
              this.errors.incorrectData = error.response.data.message
            }
          })
        this.clearForm()
        event.target.reset()
      },

      getValidationClass (fieldName) {
        switch (fieldName) {
          case 'username':
            return { invalid: this.errors.username }
          case 'email':
            return { invalid: this.errors.email }
          case 'password':
            return { invalid: this.errors.password }
          case 'incorrectData':
            return { invalid: this.errors.incorrectData }
          default:
            return null
        }
      },

      handleChange (event) {
        if (event.key === 'Enter') return
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.validate(name, value)
      },

      clearForm () {
        this.user.username = ''
        this.user.email = ''
        this.user.password = ''
        this.errors.username = ''
        this.errors.eamil = ''
        this.errors.password = ''
        this.errors.incorrectData = ''
      },

      validate (name, value) {
        const isUserName = /^[a-z0-9_-]{3,16}$/igm
        const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm

        switch (name) {
          case 'username':
            if (!isUserName.test(value.toLowerCase())) this.errors.username = 'Логин может содержать латиннские буквы, тире и подчеркивания. Длина от 3 до 16 символов'
            else this.errors.username = ''
            return

          case 'email':
            if (!isEmail.test(value.toLowerCase())) this.errors.email = 'Некорректный адрес почты. Пример: test@gmail.com'
            else this.errors.email = ''
            return

          case 'password':
            if (value.length < this.passCharCount) this.errors.password = `Пароль должен содержать не менее ${this.passCharCount} символов`
            else this.errors.password = ''
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/variables";

  .md-has-password {
    .md-button {
      background-color: transparent;

      svg {
        fill: $gray2
      }
    }
  }
</style>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .enter {
    margin-top: 15px;
    padding: 30px 40px;
    background-color: $white;
  }

  .enter-caption {
    font-size: 18px;
    font-weight: bold;
  }

  .enter-button {
    margin: 25px 0 0 0;
  }

  .enter-extra {
    margin-top: 15px;
  }

  .enter-field {
    margin-bottom: 0;
  }

  @include w_601 {
    .enter {
      margin-top: 70px;
    }
  }
</style>
