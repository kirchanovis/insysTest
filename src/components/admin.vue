<template>
  <v-container fluid>
    <v-app id="inspire">
      <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Редактирование пользователя</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Имя"
                      v-model="editUser.name"
                      required
                      :counter="50"
                      @input="$v.editUser.name.$touch()"
                      @blur="$v.editUser.name.$touch()"
                      :error-messages="editNameErrors"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Фамилия"
                      v-model="editUser.lastName"
                      required
                      @input="$v.editUser.lastName.$touch()"
                      @blur="$v.editUser.lastName.$touch()"
                      :error-messages="editLastNameErrors"
                      :counter="50"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Отчество"
                      v-model="editUser.middleName"
                      required
                      @input="$v.editUser.middleName.$touch()"
                      @blur="$v.editUser.middleName.$touch()"
                      :error-messages="editMiddleNameErrors"
                      :counter="50"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editUser.birthday"
                      type="date"
                      label="Дата рождения"
                      required
                      @input="$v.editUser.birthday.$touch()"
                      @blur="$v.editUser.birthday.$touch()"
                      :error-messages="editBirthdayErrors"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Должность"
                      v-model="editUser.position"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      mask="+7 (###) ### - ## - ##"
                      v-model="editUser.phone"
                      type="text"
                      label="Телефон"
                      required
                      @input="$v.editUser.phone.$touch()"
                      @blur="$v.editUser.phone.$touch()"
                      :error-messages="editPhoneErrors"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editUser.email"
                      type="email"
                      label="EMail"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editUser.deportament"
                      label="Подразделение"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editUser.password"
                      type="password"
                      label="Пароль"
                      required
                      @input="$v.editUser.password.$touch()"
                      @blur="$v.editUser.password.$touch()"
                      :error-messages="editPasswordErrors"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal darken-1" flat @click.native="editClose">Отмена</v-btn>
              <v-btn color="primary" flat @click.native="editSubmit">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      <v-form ref="form" style="margin:20px 50px;" @submit.prevent="submit">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Имя"
                v-model="mainForm.name"
                required
                :counter="50"
                @input="$v.mainForm.name.$touch()"
                @blur="$v.mainForm.name.$touch()"
                :error-messages="nameErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Фамилия"
                v-model="mainForm.lastName"
                required
                @input="$v.mainForm.lastName.$touch()"
                @blur="$v.mainForm.lastName.$touch()"
                :error-messages="lastNameErrors"
                :counter="50"
              ></v-text-field>          
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Отчество"
                v-model="mainForm.middleName"
                required
                @input="$v.mainForm.middleName.$touch()"
                @blur="$v.mainForm.middleName.$touch()"
                :error-messages="middleNameErrors"
                :counter="50"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
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
                  v-model="mainForm.birthday"
                  label="Дата рождения"
                  readonly
                  @input="$v.mainForm.birthday.$touch()"
                  @blur="$v.mainForm.birthday.$touch()"
                  :error-messages="birthdayErrors"
                ></v-text-field>

                <v-date-picker
                  locale = "ru-ru"
                  ref="picker"
                  v-model="mainForm.birthday"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Должность"
                v-model="mainForm.position"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                mask="+7 (###) ### - ## - ##"
                v-model="mainForm.phone"
                type="text"
                label="Телефон"
                required
                @input="$v.mainForm.phone.$touch()"
                @blur="$v.mainForm.phone.$touch()"
                :error-messages="phoneErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="mainForm.email"
                type="email"
                label="EMail"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="mainForm.deportament"
                label="Подразделение"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="mainForm.password"
                type="password"
                label="Пароль"
                required
                @input="$v.mainForm.password.$touch()"
                @blur="$v.mainForm.password.$touch()"
                :error-messages="passwordErrors"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
       



       





    
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
            <td class="text-xs-left">
              <v-edit-dialog
              :return-value.sync="props.item.name"
              lazy
              @save="saveEdit"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.name }}
              <v-text-field
                slot="input"
                v-model="props.item.name"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </v-edit-dialog></td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
          </template>
        </v-data-table>
      </v-card>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn flat @click="snack = false">Закрыть</v-btn>
      </v-snackbar>
    </v-app>
  </v-container>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: 'Admin',
  validations: {
    editUser: {
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
    mainForm: {
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
      editUser: {
        name: "",
        lastName: "",
        middleName: "",
        position: "",
        deportament: "",
        birthday: "",
        phone: "",
        email: "",
        password: ""
      },
      mainForm: {
        name: "",
        lastName: "",
        middleName: "",
        position: "",
        deportament: "",
        birthday: "",
        phone: "",
        email: "",
        password: ""
      },
      dialog: false,
      dialogEdit: false,
      snack: false,
      snackColor: '',
      snackText: '',
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
      if (!this.$v.mainForm.name.$dirty) return errors
      !this.$v.mainForm.name.maxLength && errors.push('Имя может содержать не более 50 символов')
      !this.$v.mainForm.name.required && errors.push('Введите Имя')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.mainForm.lastName.$dirty) return errors
      !this.$v.mainForm.lastName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.mainForm.lastName.required && errors.push('Введите Фамилию')
      return errors
    },
    middleNameErrors () {
      const errors = []
      if (!this.$v.mainForm.middleName.$dirty) return errors
      !this.$v.mainForm.middleName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.mainForm.middleName.required && errors.push('Введите Отчество')
      return errors
    },
    birthdayErrors () {
      const errors = []
      if (!this.$v.mainForm.birthday.$dirty) return errors
      !this.$v.mainForm.birthday.required && errors.push('Введите дату рождения')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.mainForm.phone.$dirty) return errors
      !this.$v.mainForm.phone.required && errors.push('Введите телефон')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.mainForm.password.$dirty) return errors
      !this.$v.mainForm.password.minLength && errors.push('Минимум 6 символов')
      !this.$v.mainForm.password.required && errors.push('Введите пароль')
      return errors
    },
    editNameErrors () {
      const errors = []
      if (!this.$v.editUser.name.$dirty) return errors
      !this.$v.editUser.name.maxLength && errors.push('Имя может содержать не более 50 символов')
      !this.$v.editUser.name.required && errors.push('Введите Имя')
      return errors
    },
    editLastNameErrors () {
      const errors = []
      if (!this.$v.editUser.lastName.$dirty) return errors
      !this.$v.editUser.lastName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.editUser.lastName.required && errors.push('Введите Фамилию')
      return errors
    },
    editMiddleNameErrors () {
      const errors = []
      if (!this.$v.editUser.middleName.$dirty) return errors
      !this.$v.editUser.middleName.maxLength && errors.push('Максимум 50 символов')
      !this.$v.editUser.middleName.required && errors.push('Введите Отчество')
      return errors
    },
    editBirthdayErrors () {
      const errors = []
      if (!this.$v.editUser.birthday.$dirty) return errors
      !this.$v.editUser.birthday.required && errors.push('Введите дату рождения')
      return errors
    },
    editPhoneErrors () {
      const errors = []
      if (!this.$v.editUser.phone.$dirty) return errors
      !this.$v.editUser.phone.required && errors.push('Введите телефон')
      return errors
    },
    editPasswordErrors () {
      const errors = []
      if (!this.$v.editUser.password.$dirty) return errors
      !this.$v.editUser.password.minLength && errors.push('Минимум 6 символов')
      !this.$v.editUser.password.required && errors.push('Введите пароль')
      return errors
    },
  },
  mounted: function () {
    // localStorage.removeItem('users')
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
    editSubmit() {
      this.$v.editUser.$touch()
      if (!this.$v.editUser.$invalid) {
        this.$store.dispatch('updateUser', { user: this.editUser, index: this.editedIndex })
        this.dialogEdit = false;
      }
    },
    submit () {
      this.$v.mainForm.$touch()
      if (!this.$v.mainForm.$invalid) {
        this.$store.dispatch('addUsers',{
          name: this.mainForm.name,
          lastName: this.mainForm.lastName,
          middleName: this.mainForm.middleName,
          position: this.mainForm.position,
          deportament: this.mainForm.deportament,
          birthday: this.mainForm.birthday,
          phone: this.mainForm.phone,
          email: this.mainForm.email,
          password: this.mainForm.password
        })
        this.dialog = true
        this.clearForm()
      }
    },
    clearForm () {
      this.$v.mainForm.$reset()
      this.mainForm.name = ""
      this.mainForm.lastName = ""
      this.mainForm.middleName = ""
      this.mainForm.position = ""
      this.mainForm.deportament = ""
      this.mainForm.birthday = ""
      this.mainForm.phone = ""
      this.mainForm.email = ""
      this.mainForm.password = ""
    },
    saveEdit () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Успешно сохранено'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Не сохранено'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Открыто окно'
    },
    close () {
      // console.log('Dialog closed')
    },
    editClose () {
      this.dialogEdit = false
    },
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editUser = Object.assign({}, item)
      this.dialogEdit = true
    },
    deleteItem (item) {
      const index = this.users.indexOf(item)
      if(confirm('Вы хотите удалить обьект?')){
        this.$store.dispatch('deleteUser', index)
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
