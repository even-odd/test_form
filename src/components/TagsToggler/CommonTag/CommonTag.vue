<template>
  <div class="tag_content common_content">
<!--    <div-->
<!--      v-for="(value, key) in fields"-->
<!--      :key="key">-->
<!--      <input type=""/>-->
<!--      {{ `${key}: ${value}` }}-->
<!--    </div>-->
    <div class="common--field common--name">
      <label for="name">*Имя:</label>
      <input id="name" type="text" placeholder="Введите имя"
             :class="$v.fields.firstName.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.firstName.$model"
      />

      <template v-if="(touched || $v.fields.phone.$dirty)">
        <div v-if="!$v.fields.firstName.required">
          Это обязательное поле
        </div>
        <div v-if="!$v.fields.firstName.validSymbols">
          Введите имя на русском
        </div>
      </template>
    </div>

    <div class="common--field common--second_name">
      <label for="second_name">*Фамилия:</label>
      <input id="second_name" type="text" placeholder="Введите фамилию"
             :class="$v.fields.secondName.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.secondName.$model"
      />

      <template v-if="(touched || $v.fields.phone.$dirty)">
        <div v-if="!$v.fields.secondName.required">
          Это обязательное поле
        </div>
        <div v-if="!$v.fields.secondName.validSymbols">
          Введите фамилию на русском
        </div>
      </template>
    </div>

    <div class="common--field common--patronymic">
      <label for="patronymic">Отчетсво:</label>
      <input id="patronymic" type="text" placeholder="Введите отчество"
             :class="$v.fields.patronymic.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.patronymic.$model"
      />

      <div v-if="(touched || $v.fields.secondName.$dirty) && !$v.fields.patronymic.validSymbols">
        Введите отчество на русском
      </div>
    </div>

    <div class="common--field common--birthday">
      <label for="birthday">*Дата рождения:</label>
      <input id="birthday" type="date"
             :class="$v.fields.patronymic.$error ? 'field_invalid' : '' "
             v-model="$v.fields.birthday.$model"
      />

      <div v-if="touched && !$v.fields.birthday.required">
        Это обязательное поле. Выберите дату рождения
      </div>
    </div>

    <div class="common--field common--phone">
      <label for="phone">*Номер телефона:</label>
      <input id="phone" type="tel" placeholder="Введите номер телелефона"
             :class="$v.fields.phone.$error ? 'field_invalid' : '' "
             v-model.lazy.trim="$v.fields.phone.$model"
      />

      <template v-if="(touched || $v.fields.phone.$dirty)">
        <div v-if="!$v.fields.phone.required">
          Это обязательное поле
        </div>
        <div v-if="!$v.fields.phone.validSymbols">
          Невалидный номер. Очистите номер от букв
        </div>
        <div v-if="!$v.fields.phone.rightStart">
          Невалидный номер. Начните вводить с "8" или "+7"
        </div>
        <div v-if="!$v.fields.phone.fully">
          Короткий номер. Скорее всего вы забыли дописать одну цифру
        </div>
      </template>
    </div>

    <div class="common--field common--sex">
      <div>
        <label for="male">Мужской</label>
        <input v-model="fields.sex" id="male" value="male" type="radio"/>
      </div>

      <div>
        <label for="male">Женский</label>
        <input v-model="fields.sex" id="female" value="female" type="radio"/>
      </div>

    </div>

    <div class="common--field common--group">
      <label for="group">*Группа клиентов:</label>

      <select
          id="group"
          multiple="multiple"
          :class="[]"
      >
        <option v-for="(option, index) in clientGroupList"
                :ref="index"
                :key="index"
                :selected="selectedGroup[index]"
                @click="toggleOption(fields.groupOfClient, index)">
          {{ option }}
        </option>
      </select>

      <div v-if="(touched || $v.fields.secondName.$dirty) && !$v.fields.phone.required">
        Выбирете группу клиентов
      </div>
    </div>

    <div class="common--field common--doctor">
      <label for="doctor">Лечащий врач:</label>

      <select id="doctor" v-model="fields.doctor">
        <option disabled value="">Выберите один из вариантов</option>

        <option v-for="(option, index) in doctors"
                :key="index">
          {{ option }}
        </option>
      </select>
    </div>

    <error-msg/>

    <button @click="checkErrors()">⟵ Туда</button>
    <button @click="checkErrors()">Сюда ⟶</button>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

import ErrorMsg from "@/components/ErrorMsg/ErrorMsg";
import { DOCTORS, GROUPS_CLIENT } from "../consts";
import { getCommonInitialState, getSimpleGroupsObj } from "../consts";

function validateLanguage (value, regexp) {
  let prepared = value.toLocaleLowerCase();
  return regexp.test(prepared);
}

export default {
  name: 'CommonTag',
  props: ['changeTagContent'],
  components: {
    ErrorMsg,
  },
  data () {
    return {
      fields: {
        ...getCommonInitialState(),
      },
      selectedGroup: getSimpleGroupsObj(false),
      touched: false,
    }
  },
  computed: {
    // Не видел константу в шаблоне
    doctors () {
      return DOCTORS;
    },

    // Не видел константу в шаблоне
    clientGroupList () {
      return GROUPS_CLIENT;
    },
  },
  validations: {
    fields: {
      firstName: {
        required,
        validSymbols: value => !validateLanguage(value, /[a-z]/),
      },
      secondName: {
        required,
        validSymbols: value => !validateLanguage(value, /[a-z]/),
      },
      patronymic: {
        validSymbols: value => !validateLanguage(value, /[a-z]/),
      },
      birthday: { required },
      phone: {
        required,
        validSymbols: value => !validateLanguage(value, /[а-я]|[a-z]/),
        rightStart: value => {
          let isEight = /^8/.test(value);
          let isSeven = /^\+7/.test(value);

          return  isEight || isSeven;
        },
        fully: (value) => {
          let len = value.length;

          if (/^8/.test(value)) {
            return len > 10;
          }

          return len > 11;
        }
      },
      email: {
        required,
        email,
        validSymbols: value => !validateLanguage(value, /[а-я]/),
      },
    },
  },
  methods: {
    // TODO-s:
    // 1. Понять почему не срабатывает множественное выделение
    // 2. Сделать валидацию (проверка на ошибки и требование обязательных полей)

    // getCurrentDate () {
    //   let current = new Date();
    //   let day = current.getDate();
    //   let month = current.getMonth();
    //   let year = current.getFullYear();
    //
    //   if (day < 10) day = '0' + day;
    //   if (month < 10) month = '0' + month;
    //
    //   return `${year}-${month}-${day}`;
    // },

    toggleOption (toUpdate, option) {
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

    checkErrors () {
      this.$v.fields.$touch();
      if (!this.touched) this.touched = true;

      if (this.$v.fields.$anyError) return;

      this.changeTagContent('common', this.fields);
    },
  }
}
</script>