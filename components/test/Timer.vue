<template>
  <div class="timer">
    <i class="material-icons">timer</i>
    <div class="time">{{ timer }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      test: {
        type: Object,
        default: () => ({})
      },

      isStartTimer: {
        type: Boolean,
        default: false
      }
    },

    data: () => {
      return {
        min: 0,
        sec: 3
      }
    },

    computed: {
      timer () {
        const min = this.min < 10 ? `0${this.min}` : this.min
        const sec = this.sec < 10 ? `0${this.sec}` : this.sec
        return this.test.time ? `${min}:${sec}` : '--:--'
      }
    },

    watch: {
      isStartTimer (value) {
        if (value) this.startTimer()
      },

      test (value) {
        if (value) this.min = this.test.time
      }
    },

    created () {
      if (this.test.time) this.min = this.test.time
    },

    methods: {
      startTimer () {
        const timerID = setInterval(() => {
          this.sec -= 1
          if (this.sec < 0) {
            if (this.min === 0) {
              this.min = 0
              this.sec = 0
              clearInterval(timerID)
              this.$emit('timeIsUp')
              return
            }
            this.min -= 1
            this.sec = 59
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .timer {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    font-weight: bold;
  }

  .time {
    margin-left: 5px;
  }

  .timer i.material-icons {
    position: relative;
    top: -2px;
  }
</style>
