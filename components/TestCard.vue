<template>
  <NuxtLink
    :to="slug"
    class="test z-depth-1"
    @click.native="goToTest()"
  >
    <span class="test-cover" :style="testCover('01.jpg')" />
    <span class="test-image" :style="testCover('01.jpg')" />
    <button class="test-control test-control-edit">
      <i class="material-icons">edit</i>
    </button>
    <button class="test-control test-control-delete">
      <i class="material-icons">delete</i>
    </button>
    <span class="test-data">
      <span class="test-data-name">{{ test.name }}</span>
      <span class="test-data-date">{{ createdTime }}</span>
    </span>
    <span class="test-extra">
      <span class="test-extra-item">
        <span class="test-extra-info">{{ test.questions.length }}</span>
        <span class="test-extra-text">{{ p11n(test.questions.length, ['Вопрос', 'Вопроса', 'Вопросов']) }}</span>
      </span>
      <span class="test-extra-item">
        <span class="test-extra-info">{{ test.time }}</span>
        <span class="test-extra-text">{{ p11n(test.time, ['Минута', 'Минуты', 'Минут']) }}</span>
      </span>
      <span class="test-extra-item">
        <span class="test-extra-info">{{ test.complexity }}/10</span>
        <span class="test-extra-text">Сложность</span>
      </span>
    </span>
  </NuxtLink>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import { ADD_CURRENT_TESTS } from '~/store/mutation-types'

  export default {
    props: {
      test: {
        type: Object,
        default: () => {}
      }
    },

    computed: {
      slug () {
        return `/my-tests/${this.test._id}`
      },

      createdTime () {
        return new Intl.DateTimeFormat('ru-RU').format(new Date(this.test.created))
      }
    },

    methods: {
      ...mapActions('main', ['setCurrentPageName']),
      ...mapMutations('user', { addCurrentTestCommit: ADD_CURRENT_TESTS }),

      testCover (image) {
        return {
          backgroundImage: 'url(' + require('@/assets/images/test-covers/' + image) + ')'
        }
      },

      p11n (number, titles) {
        const cases = [2, 0, 1, 1, 1, 2]
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
      },

      goToTest () {
        this.addCurrentTestCommit(this.test)
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/variables";

  .test {
    position: relative;
    display: block;
    margin-bottom: 15px;
    overflow: hidden;
    border-radius: 6px;
    background-color: $white;

    &:hover {
      text-decoration: none;
    }
  }

  .test span{
    display: block;
  }

  .test-control {
    position: absolute;
    top: 10px;
    padding: 0;
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 6px;
    background-color: rgba($white, 0.35);
    text-align: center;
    cursor: pointer;
    transition: background 0.3s
  }

  .test-control-edit {
    right: 50px;
  }

  .test-control-delete {
    right: 10px;
  }

  .test-control .material-icons {
    margin-top: 3px;
    color: $gray3;
    opacity: 0.7;
    transition: 0.3s
  }

  .test-cover {
    height: 130px;
    background-size: cover;
  }

  .test-image {
    margin: -50px auto 0;
    width: 100px;
    height: 100px;
    border: 5px solid $white;
    border-radius: 50%;
    background-size: cover;
    transition: transform 0.3s;
  }

  .test-data {
    margin: 15px 0 20px;
  }

  .test-data > * {
    text-align: center;
  }

  .test-data-name {
    padding: 0 15px;
    color: $gray3;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s;
  }

  .test-data-date {
    margin-top: 5px;
    color: $gray2;
    font-size: 14px;
  }

  span.test-extra {
    margin: 0 15px;
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid $gray7;
  }

  .test-extra-item {
    text-align: center;
  }

  .test-extra-info {
    margin-bottom: 3px;
    color: $gray3;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4em;
  }

  .test-extra-text {
    color: $gray4;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.4em;
  }

  .test:hover .test-image {
    transform: scale(1.1);
  }

  .test:hover .test-data-name {
    color: $orange;
  }

  @include w_993 {
    .test {
      margin-bottom: 30px;
    }

    .test-control {
      background-color: rgba($white, 0);
      text-align: center;
      cursor: pointer;
      transition: background 0.3s;
    }

    .test-control .material-icons {
      opacity: 0;
    }

    .test:hover .test-control {
      background-color: rgba($white, 0.15);
    }

    .test:hover .test-control .material-icons {
      opacity: 0.5;
    }

    .test:hover .test-control:hover .material-icons {
      color: $orange;
      opacity: 1;
    }
  }
</style>
