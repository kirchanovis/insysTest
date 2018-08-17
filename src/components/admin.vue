<template>
  <v-container fluid>
    <v-app id="inspire">
    <h2 class="card-title">Добавить пользователя</h2>
    <v-card>
      <v-form ref="form" style="margin:50px;" @submit.prevent="submit">

        <v-text-field
          label="Имя"
          v-model="form.name"
          required
          :counter="10"
          @input="$v.form.name.$touch()"
          @blur="$v.form.name.$touch()"
          :error-messages="nameErrors"
        ></v-text-field>

        <v-text-field
          label="Фамилия"
          v-model="form.lastName"
          required
          @input="$v.form.lastName.$touch()"
          @blur="$v.form.lastName.$touch()"
          :error-messages="lastNameErrors"
        ></v-text-field>
        <v-text-field
          label="Отчество"
          v-model="form.middleName"
          required
          @input="$v.form.middleName.$touch()"
          @blur="$v.form.middleName.$touch()"
          :error-messages="middleNameErrors"
        ></v-text-field>

        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="form.birthday"
            label="Дата рождения"
            readonly
            @input="$v.form.birthday.$touch()"
            @blur="$v.form.birthday.$touch()"
            :error-messages="birthdayErrors"
          ></v-text-field>

          <v-date-picker
            locale = "ru-ru"
            ref="picker"
            v-model="form.birthday"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>

        <v-text-field
          label="Должность"
          v-model="form.position"
        ></v-text-field>

        <v-text-field
          mask="+7 (###) ### - ## - ##"
          v-model="form.phone"
          type="text"
          label="Телефон"
          required
          @input="$v.form.phone.$touch()"
          @blur="$v.form.phone.$touch()"
          :error-messages="phoneErrors"
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          type="email"
          label="EMail"
        ></v-text-field>

        <v-text-field
          v-model="form.position"
          label="Подразделение"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          type="password"
          label="Пароль"
          required
          @input="$v.form.password.$touch()"
          @blur="$v.form.password.$touch()"
          :error-messages="passwordErrors"
        ></v-text-field>
    
        <v-btn type="submit">
          Сохранить
        </v-btn>
      </v-form>
    </v-card>
      <h2 class="card-title">Пользователи</h2>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="users"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </v-container>
</template>

<script>
import { required, minLength, maxLength, alpha } from "vuelidate/lib/validators";

export default {
  name: 'Admin',
  validations: {
    form: {
      name: {
        alpha,
        required,
        maxLength: maxLength(50),
      },
      lastName: {
        alpha,
        required,
        maxLength: maxLength(50),
      },
      middleName: {
        alpha,
        required,
        maxLength: maxLength(50),
      },
      birthday: {
        alpha,
        required,
      },
      phone: {
        alpha,
        required,
      },
      password: {
        alpha,
        required,
        minLength: minLength(6),
      }
    },
  },
  data () {
    return {
      menu: false,
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Email', value: 'email' , sortable: false},
        { text: 'Телефон', value: 'phone' }
      ],
      form: {
        name: "",
        lastName: "",
        middlename: "",
        birthday: "",
        phone: "",
        email: "",
        password: "",
      },
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  computed:{
    users() {
      console.log(this.$store.getters.results)
      return this.$store.getters.results
    },
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.maxLength && errors.push('Имя может содержать не более 50 символов')
      !this.$v.form.name.required && errors.push('Введите Имя')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.form.lastName.$dirty) return errors
      !this.$v.form.lastName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.form.lastName.required && errors.push('Введите Фамилию')
      return errors
    },
    middleNameErrors () {
      const errors = []
      if (!this.$v.form.middleName.$dirty) return errors
      !this.$v.form.middleName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.form.middleName.required && errors.push('Введите Отчество')
      return errors
    },
    birthdayErrors () {
      const errors = []
      if (!this.$v.form.birthday.$dirty) return errors
      !this.$v.form.birthday.required && errors.push('Введите дату рождения')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.form.phone.$dirty) return errors
      !this.$v.form.phone.required && errors.push('Введите телефон')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.minLength && errors.push('Минимум 6 символов')
      !this.$v.form.password.required && errors.push('Введите пароль')
      return errors
    },
  },
  mounted: function () {
    this.$store.dispatch('getUsers')
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    submit () {
      this.$v.$touch()
      console.log(this.$v.$invalid)
      if (this.$v.$invalid) {
        console.log('Сохранить')
      } else {
        console.log('Сохранить2')
      }

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-title {
  margin: 20px 0;
}
</style>
