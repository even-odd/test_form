<template>
  <div class="tag_content address_content">

    <div class="field field--index">
      <label for="index">Индекс:</label>
      <input id="index" type="text" placeholder="Введите индекс"
             :class="$v.fields.index.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.index.$model"
      />

      <template v-if="touched || $v.fields.index.$dirty">
        <div class="error" v-if="!$v.fields.index.isNumber">
          В индексе не должно быть символов, кроме цифр
        </div>
      </template>
    </div>

    <div class="field field--country">
      <label for="country">Страна:</label>
      <input id="country" type="text" placeholder="Введите название страны"
             :class="$v.fields.country.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.country.$model"
      />

      <template v-if="touched || $v.fields.country.$dirty">
        <div class="error" v-if="!$v.fields.country.validSymbols">
          Введите название страны на русском
        </div>
      </template>
    </div>

    <div class="field field--region">
      <label for="region">Область:</label>
      <input id="region" type="text" placeholder="Введите название области"
             :class="$v.fields.region.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.region.$model"
      />

      <template v-if="touched || $v.fields.region.$dirty">
        <div class="error" v-if="!$v.fields.region.validSymbols">
          Введите название области на русском
        </div>
      </template>
    </div>

    <div class="field field--city">
      <label class="hanging" for="city">*Город:</label>
      <input id="city" type="text" placeholder="Введите название города"
             :class="$v.fields.city.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.city.$model"
      />

      <template v-if="touched || $v.fields.city.$dirty">
        <div class="error" v-if="!$v.fields.city.required">
          Это обязательное поле
        </div>

        <div class="error" v-if="!$v.fields.city.validSymbols">
          Введите название города на русском
        </div>
      </template>
    </div>

    <div class="field field--street">
      <label for="street">Улица:</label>
      <input id="street" type="text" placeholder="Введите название улицы"
             :class="$v.fields.street.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.street.$model"
      />

      <template v-if="touched || $v.fields.street.$dirty">
        <div class="error" v-if="!$v.fields.street.validSymbols">
          Введите название улицы на русском
        </div>
      </template>
    </div>

    <div class="field field--house">
      <label for="house">Дом:</label>
      <input id="house" type="text" placeholder="Введите номер дома"
             v-model.lazy.trim="$v.fields.house.$model"
      />

      <template v-if="touched || $v.fields.house.$dirty">
        <div class="error" v-if="!$v.fields.house.validSymbols">
          Введите номер дома на русском
        </div>
      </template>
    </div>

    <div class="tag--controls">
      <button @click="moveToTag(vectorCommon)">⟵ Туда</button>
      <button @click="moveToTag(vectorPassport)">Сюда ⟶</button>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators';

import {getAddressInitialState, VECTOR_ADDRESS, VECTOR_COMMON, VECTOR_PASSPORT} from "../consts";
import {validateStr} from "@/components/helpers";

export default {
  name: 'AddressTag',
  props: ['changeTagContent', 'setData'],
  data () {
    return {
      fields: {
        ...getAddressInitialState(),
      },
      touched: false
    }
  },
  validations: {
    fields: {
      index: {
        isNumber: num => !isNaN(num) && num !== null,
      },
      country: {
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      region: {
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      city: {
        required,
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      street: {
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      house: {
        validSymbols: value => !validateStr(value, /[a-z]/),
      }
    }
  },
  computed: {
    vectorCommon () {
      return VECTOR_COMMON;
    },

    vectorPassport () {
      return VECTOR_PASSPORT;
    },
  },
  watch: {
    setData (next) {
      // console.debug('watch setData, next', next);
      // console.debug('watch setData, current', VECTOR_ADDRESS);
      // console.debug('watch setData, index', next.indexOf(VECTOR_ADDRESS));

      if (next.indexOf(VECTOR_ADDRESS) === -1) return;

      this.moveToTag(VECTOR_ADDRESS);
    }
  },
  methods: {
    moveToTag (vector) {
      if (this.checkErrors()) return;

      this.touched = false;
      let currentVector = VECTOR_ADDRESS;
      this.changeTagContent(currentVector, this.fields, vector);
    },

    checkErrors () {
      this.$v.fields.$touch();
      if (!this.touched) this.touched = true;

      return this.$v.fields.$anyError;
    },
  }
}
</script>


