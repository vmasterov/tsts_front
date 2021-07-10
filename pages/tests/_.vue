<template>
  <div v-if="currentTest">
    <template v-if="!showResult">
      <div class="row">
        <div class="col xl6 offset-xl3 s12">
          <Timer
            :test="currentTest"
            :is-start-timer="isStartTimer"
            @timeIsUp="timeIsUpHandler"
          />
        </div>
      </div>
      <div class="row">
        <div class="col xl6 offset-xl3 s12">
          <div class="start-wrapper">
            <Question
              :test="currentTest"
              :is-blured="isBlured"
              :go-to="goTo"
              @addAnswer="getAnswer($event)"
              @stop="stopHandler()"
            />
            <Controls
              :is-blured="isBlured"
              :go-to="goTo"
              :last-question="lastQuestion"
              @back="backHandler()"
              @forward="forwardHandler()"
              @stop="stopHandler()"
            />
            <div v-if="isBlured" class="start-overlay">
              <md-button
                class="md-raised md-primary"
                @click="startTest()"
              >
                <i class="material-icons nav-icon">play_arrow</i>
                <span class="start-text">Начать тест</span>
              </md-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="result">{{ result }}</div>
      <div class="result-nav">
        <div class="goHome">Вернуться на <NuxtLink to="/nuxt/my-tests">главную</NuxtLink></div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  import { IS_BLURED } from '~/store/mutation-types'
  import Timer from '~/components/test/Timer'
  import Question from '~/components/test/Question'
  import Controls from '~/components/test/Controls'

  export default {
    components: {
      Timer,
      Question,
      Controls
    },

    data: () => {
      return {
        isStartTimer: false,
        showResult: false,
        goTo: 0,
        answers: [],
        result: ''
      }
    },

    computed: {
      ...mapState('authenticated', [
        'token',
        'refreshToken'
      ]),
      ...mapState('user', [
        'currentTest',
        'testResult',
        'user'
      ]),
      ...mapState('main', ['isBlured']),

      lastQuestion () {
        return this.currentTest.questions ? this.currentTest.questions.length : 0
      }
    },

    watch: {
      testResult (value) {
        this.result = value < this.currentTest.score ? 'Тест не сдан' : 'Тест сдан'
        this.showResult = true
      },

      async user (value) {
        if (value._id) {
          if (!this.currentTest._id) {
            const options = {
              url: `/users/user/tests/${this.$route.params.pathMatch}`,
              method: 'POST',
              data: {
                testId: this.$route.params.pathMatch,
                ownerId: this.user._id
              }
            }

            await this.getTest(options)
          }
          this.setCurrentPageName(this.currentTest.name)
        }
      }
    },

    beforeDestroy () {
      this.isBluredCommit(true)
    },

    methods: {
      ...mapActions('user', [
        'getTest',
        'getTestResult'
      ]),
      ...mapActions('main', ['setCurrentPageName']),
      ...mapMutations('main', { isBluredCommit: IS_BLURED }),

      startTest () {
        this.isBluredCommit(false)
        this.isStartTimer = true
      },

      showResults () {
        this.goTo = -1
        this.$nextTick(() => this.getTestResult(this.answers))
      },

      timeIsUpHandler () {
        this.showResults()
      },

      backHandler () {
        --this.goTo
      },

      forwardHandler () {
        ++this.goTo
      },

      stopHandler () {
        this.showResults()
      },

      getAnswer ($event) {
        this.answers = [...$event.answers]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .start-wrapper {
    position: relative;
  }

  .start-overlay {
    position: absolute;
    top: -10px;
    left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 6;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    border-radius: 10px;
    background-color: rgba($white, 0.65);

    &::v-deep {
      .md-button-content {
        display: flex;
        align-items: center;

        .material-icons {
          margin-right: 5px;
        }

        .start-text {
          margin-right: 10px;
        }
      }
    }
  }

  .result {
    font-size: 30px;
    font-weight: bold;
  }

  .result-nav {
    margin-top: 20px;
  }
</style>
