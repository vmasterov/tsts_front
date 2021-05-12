<template>
  <div
    class="question z-depth-1"
    :class="{blur: isBlured}"
  >
    <div class="caption">
      <div class="number">{{ count + 1 }} из {{ questions.length }}</div>
      <div class="text">{{ questions[count].question }}</div>
    </div>
    <div class="variants">
      <ul class="variants-list">
        <li
          v-for="(variant, index) in questions[count].variants"
          :key="index"
          class="variant"
        >
          <md-radio
            v-if="answerType"
            v-model="radio"
            :value="variant"
          >
            {{ variant }}
          </md-radio>
          <md-checkbox
            v-else
            v-model="checkbox"
            :value="variant"
          >
            {{ variant }}
          </md-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      test: {
        type: Object,
        default: () => ({})
      },

      isBlured: {
        type: Boolean,
        default: () => {}
      },

      goTo: {
        type: Number,
        default: 0
      }
    },

    data: () => {
      return {
        checkbox: [],
        radio: null,
        count: 0,
        answers: []
      }
    },

    computed: {
      questions () {
        return this.test.questions
      },

      answerType () {
        return this.questions[this.count].is_one_right_answer
      },

      control: {
        get () {
          return this.answerType ? this.radio : this.checkbox
        },
        set (answer) {
          this.answerType ? this.radio = answer : this.checkbox = answer
        }
      },

      controlDefault () {
        return this.answerType ? null : []
      }
    },

    watch: {
      goTo (value) {
        if (!this.answers[this.count]) this.answers.push({ id: this.count, answer: this.control })
        else this.answers[this.count].answer = this.control

        this.$emit('addAnswer', { answers: this.answers })

        if (value === this.questions.length) {
          this.$emit('stop')
          return
        }

        if (value === -1) return

        this.count = value

        this.control = this.answers[value] ? this.answers[value].answer : this.controlDefault
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";
  .question {
    padding: 15px;
    border-radius: 6px;
    background-color: #fff;
  }

  .question .caption {
    padding-bottom: 20px;
    margin-bottom: 25px;
    display: block;
    border-bottom: 1px solid rgba($gray1, 0.3);
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
  }

  .question .number {
    margin-right: 20px;
    max-width: 100px;
    white-space: nowrap;
  }

  .question .variants .variant {
    margin-top: 10px;
  }

  .question .variants .variant label {
    color: #66615b;
  }

  .question .variants .variant span {
    font-size: 14px;
  }

  .variants-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .md-radio,
  .md-checkbox {
    margin: 0;
  }

  @include w_993 {
    .question {
      padding: 25px 30px 20px;
    }

    .question .caption {
      display: flex;
      font-size: 18px;
    }

    .question .variants .variant {
      margin-top: 15px;
    }

    .question .variants .variant span {
      font-size: 18px;
    }
  }
</style>
