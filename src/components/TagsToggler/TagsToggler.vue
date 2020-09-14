<template>
  <div class="tags_toggler">
    <!--  При изменении ширины - переезжает в левый бок. По-хорошему, добавить иконки -->
    <div class="tags_list">
      <div v-for="tag in tags"
           :key="tag.id"
           :class="[{ active: isCurrent(tag.id) }, 'tag_title']">
        {{ tag.title }}
      </div>
    </div>

    <div>
      <div class="tags_content">
        <keep-alive>
          <common-tag
              v-if="isCurrent(0)"
              v-model="formState.common"/>
          <address-tag
              v-if="isCurrent(1)"
              v-model="formState.address"/>
          <passport-tag
              v-if="isCurrent(2)"
              v-model="formState.passport"/>
        </keep-alive>
      </div>

      <div>
        <button @click="makeUser()">Создать пользователя</button>
        <span class="notify--required_fields">* - обязательные поля</span>
      </div>
    </div>

  </div>
</template>

<script>
import CommonTag from "./CommonTag/CommonTag";
import AddressTag from "./AddressTag/AddressTag";
import PassportTag from "./PassportTag/PassportTag";

import { getCommonInitialState, getAddressInitialState, getPassportInitialState } from './consts';

export default {
  name: "TagsToggler",
  components: {
    CommonTag,
    AddressTag,
    PassportTag,
  },
  data () {
    return {
      current: 0,
      tags: [
        {
          id: 0,
          title: "Основная инфромация",
          initialized: true,
        },
        {
          id: 1,
          title: "Адресс",
          initialized: false,
        },
        {
          id: 2,
          title: "Паспорт",
          initialized: false,
        },
      ],
      formState: {
        common: {
          ...getCommonInitialState(),
        },
        address: {
          ...getAddressInitialState(),
        },
        passport: {
          ...getPassportInitialState(),
        }
      }
    };
  },
  methods: {
    // Валидацию нужно делать в рамках одной страницы
    // 1. Не давать пользователю перейти на следующий шаг, пока есть ошибки или незаполненные обязательные поля
    // 2. Вызывать событие обновления (v-model) только, когда все данные на вкладке валидны.
    // ! Не должно быть невалидных данных в родителе.

    makeUser () {
      console.debug('User created!');
      console.debug('user data', this.formState);
    },

    isCurrent (id) {
      return this.data.id === id;
    },
  },
};
</script>
