<template>
  <div
    class="controls"
    :class="{blur: isBlured}"
  >
    <md-button
      :disabled="disabledBack"
      class="md-raised md-primary quest-button quest-back"
      @click="clickHandler('back')"
    >
      Назад
    </md-button>
    <md-button
      :disabled="disabledForward"
      class="md-raised md-primary quest-button quest-forward"
      @click="clickHandler('forward')"
    >
      Вперед
    </md-button>
    <md-button
      :disabled="disabledStop"
      class="md-raised md-primary quest-button quest-finish"
      @click="clickHandler('stop')"
    >
      Завершить
    </md-button>
  </div>
</template>

<script>
  export default {
    props: {
      isBlured: {
        type: Boolean,
        default: () => {}
      },

      goTo: {
        type: Number,
        default: 0
      },

      lastQuestion: {
        type: Number,
        default: 0
      }
    },

    computed: {
      disabledBack () {
        return this.goTo === 0 || this.goTo === -1
      },

      disabledForward () {
        return this.goTo >= this.lastQuestion - 1 || this.goTo === -1
      },

      disabledStop () {
        return this.goTo === -1
      }
    },

    methods: {
      clickHandler (type) {
        this.$emit(type)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .controls {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  .controls button{
    padding: 0;
    width: calc(33.333333% - 5px);
  }

  .quest-button {
    font-size: 13px;
    line-height: 32px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @include w_601 {
    .controls {
      display: block;
    }

    .controls button{
      margin-right: 10px;
      width: auto;
    }

    .controls button::v-deep .md-ripple {
      padding: 0 16px;
    }
  }

  @include w_993 {
    .controls {
      margin-top: 25px;
    }
  }
</style>
