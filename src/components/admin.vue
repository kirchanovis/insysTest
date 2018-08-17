<template>
  <v-container fluid>
    <v-app id="inspire">
    <h2 class="card-title">Добавить пользователя</h2>
    <v-card>
      <v-form ref="form" style="margin:20px 50px;" >
        <v-text-field
          label="Имя"
          v-model="rForm.name"
          required
          :vuelidate="$v.rForm.username" :vuelidate-messages="messages.rForm.username"
        ></v-text-field>
        <v-text-field
          label="Фамилия"
          required
        ></v-text-field>
        <v-text-field
          label="Отчество"
          required
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
            v-model="rForm.date"
            label="Дата рождения"
            readonly
          ></v-text-field>
          <v-date-picker
            locale = "ru-ru"
            ref="picker"
            v-model="rForm.date"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>

        <v-text-field
          label="Должность"
          required
        ></v-text-field>
        <v-text-field
          mask="+7 (###) ### - ## - ##"
          type="text"
          label="Телефон"
          required
        ></v-text-field>
        <v-text-field
          type="email"
          label="EMail"
          required
        ></v-text-field>

        <v-text-field
          label="Подразделение"
          required
        ></v-text-field>
        <v-text-field 
          type="password"
          label="Пароль"
          required
        ></v-text-field>
    
        <v-btn>
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
import { required, minLength, maxLength, email, alpha, alphaNum } from "vuelidate/lib/validators";

export default {
  name: 'Admin',
  validations: {
    rForm: {
      name: {
        alpha,
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      lastName: {
        alpha,
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      username: {
        alphaNum,
        required,
        minLength: minLength(3),
        maxLength: maxLength(255),
        exists(value) {
          return this.checkExists(value, "username");
        },
      },
      email: {
        email,
        required,
        minLength: minLength(4),
        maxLength: maxLength(255),
        exists(value) {
          return this.checkExists(value, "email");
        },
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
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
      messages: {
        rForm: {
          name: {
            required: "Your name is required.",
            alpha: "Your name is invalid, you must only use letters.",
          },
          lastName: {
            required: "Your last name is required.",
            alpha: "Your last name is invalid, you must only use letters or numbers.",
          },
          middlename: {
            required: "Your last name is required.",
            alpha: "Your last name is invalid, you must only use letters or numbers.",
          },
          email: {
            required: "Your email is required.",
            exists: "This email is already registered.",
            email: "Your email is invalid.",
          },
          password: {
            minLength: "There is a minimum length requirement of 6.",
            required: "Your password is required.",
          },
        },
      },
      rForm: {
        name: "",
        lastName: "",
        username: "",
        date: "",
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
    }
  },
  mounted: function () {
    this.$store.dispatch('getUsers')
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
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
