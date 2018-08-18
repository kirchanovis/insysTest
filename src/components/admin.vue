<template>
  <v-container fluid>
    <v-app id="inspire">
                  <v-dialog
                v-model="dialog"
                max-width="290"
              >
                <v-card>
          
                  <v-card-text>
                    Пользователь успешно добавлен
                  </v-card-text>
          
                </v-card>
              </v-dialog>
    <h2 class="card-title">Добавить пользователя</h2>
    <v-card>
      <v-form ref="form" style="margin:50px;" @submit.prevent="submit">

        <v-text-field
          label="Имя"
          v-model="name"
          required
          :counter="50"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          :error-messages="nameErrors"
        ></v-text-field>

        <v-text-field
          label="Фамилия"
          v-model="lastName"
          required
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
          :error-messages="lastNameErrors"
          :counter="50"
        ></v-text-field>
        <v-text-field
          label="Отчество"
          v-model="middleName"
          required
          @input="$v.middleName.$touch()"
          @blur="$v.middleName.$touch()"
          :error-messages="middleNameErrors"
          :counter="50"
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
            v-model="birthday"
            label="Дата рождения"
            readonly
            @input="$v.birthday.$touch()"
            @blur="$v.birthday.$touch()"
            :error-messages="birthdayErrors"
          ></v-text-field>

          <v-date-picker
            locale = "ru-ru"
            ref="picker"
            v-model="birthday"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>

        <v-text-field
          label="Должность"
          v-model="position"
        ></v-text-field>

        <v-text-field
          mask="+7 (###) ### - ## - ##"
          v-model="phone"
          type="text"
          label="Телефон"
          required
          @input="$v.phone.$touch()"
          @blur="$v.phone.$touch()"
          :error-messages="phoneErrors"
        ></v-text-field>

        <v-text-field
          v-model="email"
          type="email"
          label="EMail"
        ></v-text-field>

        <v-text-field
          v-model="deportament"
          label="Подразделение"
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          label="Пароль"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: 'Admin',
  validations: {
    name: {
      required,
      maxLength: maxLength(50),
    },
    lastName: {
      required,
      maxLength: maxLength(50),
    },
    middleName: {
      required,
      maxLength: maxLength(50),
    },
    birthday: {
      required,
    },
    phone: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    }
  },
  data () {
    return {
      menu: false,
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Email', value: 'email' , sortable: false},
        { text: 'Телефон', value: 'phone' }
      ],
      name: "",
      lastName: "",
      middleName: "",
      position: "",
      deportament: "",
      birthday: "",
      phone: "",
      email: "",
      password: "",
      dialog: false
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  computed:{
    users() {
      return this.$store.getters.results
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Имя может содержать не более 50 символов')
      !this.$v.name.required && errors.push('Введите Имя')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.lastName.required && errors.push('Введите Фамилию')
      return errors
    },
    middleNameErrors () {
      const errors = []
      if (!this.$v.middleName.$dirty) return errors
      !this.$v.middleName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.middleName.required && errors.push('Введите Отчество')
      return errors
    },
    birthdayErrors () {
      const errors = []
      if (!this.$v.birthday.$dirty) return errors
      !this.$v.birthday.required && errors.push('Введите дату рождения')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Введите телефон')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Минимум 6 символов')
      !this.$v.password.required && errors.push('Введите пароль')
      return errors
    },
  },
  mounted: function () {
    if(this.$store.getters.getToken) {
      this.$store.dispatch('getUsers')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.dispatch('addUsers',{
          name: this.name,
          lastName: this.lastName,
          middleName: this.middleName,
          position: this.position,
          deportament: this.deportament,
          birthday: this.birthday,
          phone: this.phone,
          email: this.email,
          password: this.password
        })
        this.dialog = true
      }
      this.clearForm()

    },
    clearForm () {
      this.$v.$reset()
      this.name = ""
      this.lastName = ""
      this.middleName = ""
      this.position = ""
      this.deportament = ""
      this.birthday = ""
      this.phone = ""
      this.email = ""
      this.password = ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-title {
  margin: 20px 0;
}
</style>
