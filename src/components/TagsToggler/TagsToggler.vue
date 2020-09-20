<template>
    <div class="app">
      <div class="tags-box">
        <keep-alive>
          <common-tag
              v-if="isCurrent(vectorCommon)"
              :changeTagContent="changeContent"
              :setData="getDataFrom"
          />
          <address-tag
              v-if="isCurrent(vectorAddress)"
              :changeTagContent="changeContent"
              :setData="getDataFrom"
          />
          <passport-tag
              v-if="isCurrent(vectorPassport)"
              :changeTagContent="changeContent"
              :setData="getDataFrom"
          />
        </keep-alive>
        <span class="notify--required_fields">* - обязательные поля</span>
      </div>

      <div class="user_creator">
        <div>
          <button @click="makeUser()">Создать пользователя</button>
        </div>

        <div>
          <input id="sms" type="checkbox" v-model="formState.noSMS">
          <label for="sms">Отправлять смс?</label>
        </div>
      </div>
    </div>
</template>

<script>
import CommonTag from "./CommonTag/CommonTag";
import AddressTag from "./AddressTag/AddressTag";
import PassportTag from "./PassportTag/PassportTag";

import {getAddressInitialState, getCommonInitialState, getPassportInitialState} from './consts';
import {VECTOR_ADDRESS, VECTOR_COMMON, VECTOR_PASSPORT} from "@/components/TagsToggler/consts";

export default {
  name: "TagsToggler",
  components: {
    CommonTag,
    AddressTag,
    PassportTag,
  },
  data () {
    return {
      current: VECTOR_COMMON,
      getDataFrom: '',
      tags: [
        {
          id: VECTOR_COMMON,
          title: "Основная инфромация",
          valid: false,
        },
        {
          id: VECTOR_ADDRESS,
          title: "Адресс",
          valid: false,
        },
        {
          id: VECTOR_PASSPORT,
          title: "Паспорт",
          valid: false,
        },
      ],
      formState: {
        [VECTOR_COMMON]: {
          ...getCommonInitialState(),
        },
        [VECTOR_ADDRESS]: {
          ...getAddressInitialState(),
        },
        [VECTOR_PASSPORT]: {
          ...getPassportInitialState(),
        },
        noSMS: true,
      }
    };
  },
  computed: {
    vectorCommon () {
      return VECTOR_COMMON;
    },

    vectorAddress () {
      return VECTOR_ADDRESS;
    },

    vectorPassport () {
      return VECTOR_PASSPORT;
    },
  },
  methods: {
    async makeUser () {
      let check = await this.checkCurrent();
      if (!check) return;

      let tags = this.tags;
      for (let tag of tags) {

        if (!tag.valid) {
          alert('Заполните остальные поля в других секциях (туда/сюда)');
          return;
        }
      }
      alert('Пользователь создан!');
      // console.debug('User created!');
      // console.debug('user data', {...this.formState});
    },

    updateDataForCurrent () {
      let currTag = this.getCurrentTag();
      // console.debug('UPDATE: currTag', currTag);
      // console.debug('UPDATE: isValid', currTag.valid);
      // console.debug('UPDATE: old getDataFrom', this.getDataFrom);

      if (currTag.valid) return;

      // console.debug('update current');
      this.getDataFrom = this.getDataFrom ? this.getDataFrom : this.current;
      this.getDataFrom += '1';
    },

    changeContent (state, data, vector) {
      // console.debug('stateName', state);
      // console.debug('updated data', {...data});
      // console.debug('vector', vector);

      let currTag = this.getCurrentTag();
      currTag.valid = true;

      this.formState[state] = data;
      this.current = vector;

      this.getDataFrom = '';
    },

    async checkCurrent () {
      let tag = this.getCurrentTag();

      if (!tag.valid) {
        this.updateDataForCurrent();

        await setTimeout(() => undefined, 100);

        if(!tag.valid) {
          alert('Поля в текущей секции заполненны неправильно');
          return false;
        }
      }

      return true;
    },

    getCurrentTag () {
      let tags = this.tags;
      let currKey = this.current;

      for (let i = tags.length - 1; i > -1; --i) {
        let tag = tags[i];
        // console.debug('curr tag', {...tag});
        // console.debug('tag id', tag.id);
        // console.debug('current', currKey);
        if (tag.id === currKey) return tag;
      }
    },

    isCurrent (id) {
      return this.current === id;
    },
  },
};
</script>

<style>
  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 10px 15px;
    border-left: 2px dashed black;
    border-top: 2px dashed black;

    background-color: white;
    box-shadow: 10px 10px 1px -3px rgba(0,0,0,0.75);
  }

  .error {
    padding: 5px;
    border-left: 2px solid brown;
    border-bottom: 2px dashed brown;
    max-width: 295px;
  }

  .tags-box {
    min-width: 300px;
    max-width: 1000px;
  }

  .field {
    display: flex;
    flex-direction: column;
  }

  .field label {
    display: inline-block;
    margin: 5px 0;
  }

  .field .hanging {
    margin-left: -8px;
  }

  .field input {
    display: block;
  }

  .field input[type='radio'] {
    display: inline;
    margin: 0 5px;
  }

  .field select {
    display: block;
    /*margin: 5px 0;*/
  }

  .tag--controls {
    display: flex;
    justify-content: space-evenly;
    margin: 10px 0 0 0;
  }

  .user_creator {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .user_creator > div {
    margin: 0 5px;
  }

  .notify--required_fields {
    margin-left: -8px;
  }
</style>
