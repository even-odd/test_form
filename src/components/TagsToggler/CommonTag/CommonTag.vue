<template>
  <div class="tag_content common_content">

    <div class="field field--name">
      <div class="field--box">
        <label class="hanging" for="name">*Имя:</label>
        <input id="name" type="text" placeholder="Введите имя"
               :class="$v.fields.firstName.$error ? 'field_invalid' : '' "
               v-model.lazy.trim="$v.fields.firstName.$model"
        />
      </div>

      <div v-if="touched || $v.fields.firstName.$dirty">
        <div class="error" v-if="!$v.fields.firstName.required">
          Это обязательное поле
        </div>
        <div class="error" v-if="!$v.fields.firstName.validSymbols">
          Введите имя на русском
        </div>
      </div>

    </div>

    <div class="field field--second_name">
      <div class="field--box">
        <label class="hanging" for="second_name">*Фамилия:</label>

        <input id="second_name" type="text" placeholder="Введите фамилию"
               :class="$v.fields.secondName.$error ? 'field_invalid' : '' "
               v-model.lazy.trim="$v.fields.secondName.$model"
        />
      </div>

      <div v-if="touched || $v.fields.secondName.$dirty">
        <div class="error" v-if="!$v.fields.secondName.required">
          Это обязательное поле
        </div>
        <div class="error" v-if="!$v.fields.secondName.validSymbols">
          Введите фамилию на русском
        </div>
      </div>

    </div>

    <div class="field field--patronymic">
      <div class="field--box">
        <label for="patronymic">Отчетсво:</label>
        <input id="patronymic" type="text" placeholder="Введите отчество"
               :class="$v.fields.patronymic.$error ? 'field_invalid' : '' "
               v-model.lazy.trim="$v.fields.patronymic.$model"
        />
      </div>

      <div class="error" v-if="(touched || $v.fields.patronymic.$dirty) && !$v.fields.patronymic.validSymbols">
        Введите отчество на русском
      </div>
    </div>

    <div class="field field--birthday">
      <div class="field--box">
        <label class="hanging" for="birthday">*Дата рождения:</label>
        <input id="birthday" type="date"
               :class="$v.fields.birthday.$error ? 'field_invalid' : '' "
               v-model="$v.fields.birthday.$model"
        />
      </div>

      <div class="error" v-if="touched && !$v.fields.birthday.required">
        Это обязательное поле. Выберите дату рождения
      </div>
    </div>

    <div class="field field--phone">
      <div class="field--box">
        <label class="hanging" for="phone">*Номер телефона:</label>
        <input id="phone" type="tel" placeholder="Введите номер телефона"
               :class="$v.fields.phone.$error ? 'field_invalid' : '' "
               v-model.lazy.trim="$v.fields.phone.$model"
        />
      </div>

      <div v-if="touched || $v.fields.phone.$dirty">
        <div class="error" v-if="!$v.fields.phone.required">
          Это обязательное поле
        </div>

        <div v-if="$v.fields.phone.required">
          <div class="error" v-if="!$v.fields.phone.validSymbols">
            Невалидный номер. Очистите номер от букв
          </div>
          <div class="error" v-if="!$v.fields.phone.rightStart">
            Невалидный номер. Начните вводить с "8" или "+7"
          </div>
          <div class="error" v-if="!$v.fields.phone.fully">
            Короткий номер. Скорее всего вы забыли дописать несколько цифр
          </div>
        </div>
      </div>

    </div>

    <div class="field field--sex">
      <div>
        <label for="male">Мужской</label>
        <input v-model="fields.sex" id="male" value="male" type="radio"/>
      </div>

      <div>
        <label for="female">Женский</label>
        <input v-model="fields.sex" id="female" value="female" type="radio"/>
      </div>
    </div>

    <div class="field field--group">
      <div class="field--box">
        <label class="hanging" for="group">*Группа клиентов:</label>

        <select
            id="group"
            multiple="multiple"
            :class="$v.fields.groupOfClient.$error ? 'field_invalid' : '' "
        >
          <option v-for="(option, index) in clientGroupList"
                  :ref="index"
                  :key="index"
                  :selected="selectedGroup[index]"
                  @click="toggleOption(fields.groupOfClient, index)">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="error" v-if="(touched || $v.fields.groupOfClient.$dirty) && !$v.fields.groupOfClient.required">
        Выбирете группу клиентов
      </div>
    </div>

    <div class="field field--doctor">
      <label for="doctor">Лечащий врач:</label>

      <select id="doctor" v-model="fields.doctor">
        <option disabled value="">Выберите один из вариантов</option>

        <option v-for="(option, index) in doctors"
                :key="index">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="tag--controls">
      <button @click="moveToTag(vectorAddress)">Сюда ⟶</button>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

import {DOCTORS, getCommonInitialState, getSimpleGroupsObj, GROUPS_CLIENT, VECTOR_ADDRESS} from "../consts";
import {validateStr} from "@/components/helpers";
import {VECTOR_COMMON} from "@/components/TagsToggler/consts";

export default {
  name: 'CommonTag',
  props: ['changeTagContent', 'setData'],
  data() {
    return {
      fields: {
        ...getCommonInitialState(),
      },
      selectedGroup: getSimpleGroupsObj(false),
      touched: false,
    }
  },
  validations: {
    fields: {
      firstName: {
        required,
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      secondName: {
        required,
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      patronymic: {
        validSymbols: value => !validateStr(value, /[a-z]/),
      },
      birthday: {required},
      phone: {
        required,
        validSymbols: value => !validateStr(value, /[а-я]|[a-z]/),
        rightStart: value => {
          let isEight = /^8/.test(value);
          let isSeven = /^\+7/.test(value);

          return isEight || isSeven;
        },
        fully: (value) => {
          let len = value.length;

          if (/^8/.test(value)) {
            return len > 10 && len < 18;
          }

          return len > 11 && len < 19;
        }
      },
      groupOfClient: {required}
    },
  },
  computed: {
    // Не видел константу в шаблоне
    doctors() {
      return DOCTORS;
    },

    // Не видел константу в шаблоне
    clientGroupList() {
      return GROUPS_CLIENT;
    },

    // Не видел константу в шаблоне
    vectorAddress() {
      return VECTOR_ADDRESS;
    }
  },
  watch: {
    setData(next) {
      console.debug('watch setData, next', next);
      console.debug('watch setData, current', VECTOR_COMMON);
      console.debug('watch setData, index', next.indexOf(VECTOR_COMMON));

      if (next.indexOf(VECTOR_COMMON) === -1) return;

      this.moveToTag(VECTOR_COMMON);
    }
  },
  methods: {
    toggleOption(toUpdate, option) {
      // console.debug('toggleOption: old toUpdate', [...toUpdate]);
      // console.debug('toggleOption: old selectedGroup', {...this.selectedGroup});

      if (toUpdate.has(option)) {
        toUpdate.delete(option);
        this.selectedGroup[option] = false;
      } else {
        toUpdate.add(option);
        this.selectedGroup[option] = true;
      }

      // console.debug('toggleOption: new toUpdate', [...toUpdate]);
      // console.debug('toggleOption: new selectedGroup', {...this.selectedGroup});

      this.$refs[option].selected = false;

      for (let selected of toUpdate) {
        let optionEl = this.$refs[selected][0];
        // console.debug('toggleOption: element', optionEl);

        if (!optionEl.selected) optionEl.selected = true;
      }
      // console.debug('_________')
    },

    moveToTag(vector) {
      if (this.checkErrors()) return;

      this.touched = false;
      let currentVector = VECTOR_COMMON;
      this.changeTagContent(currentVector, this.fields, vector);
    },

    checkErrors() {
      this.$v.fields.$touch();
      if (!this.touched) this.touched = true;

      let hasError = false;
      let fields = this.$v.fields;
      for (let key in fields) {
        if (hasError) break;
        if (!(key in this.fields)) continue;

        if (key === 'groupOfClient') {
          hasError |= this.checkGroupError();
          continue;
        }
        hasError |= !!fields[key].$error;

        // console.debug('key:', key, 'hasError:', !!hasError);
      }

      return hasError;
    },

    checkGroupError() {
      // console.debug('checkGroupError - groupOfClient size:', this.fields.groupOfClient.size);
      return this.fields.groupOfClient.size <= 0;
    }
  }
}
</script>