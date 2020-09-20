<template>
  <div class="tag_content password_content">

    <div class="field field--doc_type">
      <label class="hanging" for="typeOfDocument">*Тип документа:</label>

      <select id="typeOfDocument" v-model="fields.typeOfDocument">
        <option disabled value="">Выберите один из вариантов</option>

        <option v-for="(option, index) in docTypes"
                :key="index">
          {{ option }}
        </option>
      </select>

      <div class="error" v-if="touched && !$v.fields.typeOfDocument.required">
        Это обязательное поле
      </div>
    </div>

    <div class="field field--series">
      <label for="series">Серия:</label>
      <input id="series" type="text" placeholder="Введите серию документа"
             :class="$v.fields.series.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.series.$model"
      />

      <template v-if="$v.fields.series.$dirty">
        <div class="error" v-if="!$v.fields.series.isNumber">
          В серии не должно быть символов, кроме цифр
        </div>
      </template>
    </div>

    <div class="field field--numberOfDocument">
      <label for="numberOfDocument">Номер:</label>
      <input id="numberOfDocument" type="text" placeholder="Введите номер документа"
             :class="$v.fields.numberOfDocument.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.numberOfDocument.$model"
      />

      <template v-if="$v.fields.numberOfDocument.$dirty">
        <div class="error" v-if="!$v.fields.numberOfDocument.isNumber">
          В номере не должно быть символов, кроме цифр
        </div>
      </template>
    </div>

    <div class="field field--issuedBy">
      <label for="issuedBy">Кем выдан:</label>
      <input id="issuedBy" type="text" placeholder="Введите кем выдан документ"
             :class="$v.fields.issuedBy.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.issuedBy.$model"
      />

      <template v-if="$v.fields.issuedBy.$dirty">
        <div class="error" v-if="!$v.fields.issuedBy.validSymbols">
          В поле не должно быть русских символов
        </div>
      </template>
    </div>

    <div class="field field--birthday">
      <label for="issuedDate">*Дата выдачи:</label>
      <input id="issuedDate" type="date"
             :class="$v.fields.issuedDate.$error ? 'field_invalid' : '' "
             v-model="$v.fields.issuedDate.$model"
      />

      <div class="error" v-if="touched && !$v.fields.issuedDate.required">
        Это обязательное поле. Выберите дату рождения
      </div>
    </div>

    <div class="tag--controls">
      <button @click="moveToTag(vectorAddress)">⟵ Туда</button>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

import {DOC_TYPES, getPassportInitialState, VECTOR_ADDRESS, VECTOR_PASSPORT} from "../consts";
import {validateStr} from "@/components/helpers";

export default {
  name: 'PasswordTag',
  props: ['changeTagContent', 'setData'],
  data () {
    return {
      fields: {
        ...getPassportInitialState(),
      },
      touched: false
    }
  },
  validations: {
    fields: {
      typeOfDocument: {required},
      series: {
        isNumber: num => !isNaN(num) && num !== null,
      },
      numberOfDocument: {
        isNumber: num => !isNaN(num) && num !== null,
      },
      issuedBy: {
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      issuedDate: {required}
    }
  },
  computed: {
    vectorAddress() {
      return VECTOR_ADDRESS;
    },

    docTypes() {
      return DOC_TYPES;
    }
  },
  watch: {
    setData (next) {
      // console.debug('watch setData, next', next);
      // console.debug('watch setData, current', VECTOR_PASSPORT);
      // console.debug('watch setData, index', next.indexOf(VECTOR_PASSPORT));

      if (next.indexOf(VECTOR_PASSPORT) === -1) return;

      this.moveToTag(VECTOR_PASSPORT);
    }
  },
  methods: {
    moveToTag (vector) {
      if (this.checkErrors()) return;

      this.touched = false;
      let currentVector = VECTOR_PASSPORT;
      this.changeTagContent(currentVector, this.fields, vector);
    },

    checkErrors () {
      this.$v.fields.$touch();
      if (!this.touched) this.touched = true;

      let hasError = false;
      let fields = this.$v.fields;
      for (let key in fields) {
        if (hasError) break;
        if ( !(key in this.fields) ) continue;

        if (key === 'typeOfDocument') {
          hasError |= this.checkDocTypeError();
          // console.debug('key:', key, 'hasError:', !!hasError);
          continue;
        }
        hasError |= !!fields[key].$error;

        // console.debug('key:', key, 'hasError:', !!hasError);
      }

      return hasError;
    },

    checkDocTypeError () {
      return this.fields.typeOfDocument.length <= 0;
    }
  }
}
</script>