<template>
  <div class="enter z-depth-1">
    <div class="enter-caption">Платформа для прохождения тестов</div>

    <form @submit.prevent="loginUser">
      <div class="input-field">
        <md-field class="enter-field">
          <label>Email</label>
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

      <md-button
        class="md-raised md-primary enter-button"
        type="submit"
        :disabled="isDisableSubmit"
      >
        Войти
      </md-button>
      <div class="enter-extra">Нет аккаунта? <a href="registration.html">Зарегистрироваться</a></div>
    </form>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        user: {
          email: '',
          password: ''
        },
        errors: {
          email: '',
          password: ''
        },
        isDisableSubmit: true,
        passCharCount: 3
      }
    },

    watch: {
      'user.email': function () {
        this.checkDisableSubmit()
      },
      'user.password': function () {
        this.checkDisableSubmit()
      }
    },

    methods: {
      checkDisableSubmit () {
        setTimeout(() => {
          this.isDisableSubmit = (Boolean(this.errors.email) || !this.user.email.length) ||
            (Boolean(this.errors.password) || !this.user.password.length)
        }, 500)
      },

      loginUser () {
        alert(JSON.stringify(this.user))
        this.clearForm()
        event.target.reset()
      },

      getValidationClass (fieldName) {
        switch (fieldName) {
          case 'email':
            return { invalid: this.errors.email }
          case 'password':
            return { invalid: this.errors.password }
          default:
            return null
        }
      },

      handleChange () {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.validate(name, value)
      },

      clearForm () {
        this.user.email = ''
        this.user.password = ''
        this.errors.email = ''
        this.errors.password = ''
      },

      validate (name, value) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        switch (name) {
          case 'email':
            if (!re.test(value.toLowerCase())) this.errors.email = 'Некорректный email'
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
