<template>
<v-app id="inspire">
                <v-dialog
                v-model="dialog"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline">Логин или пароль введен не верно!</v-card-title>
          
                  <v-card-text>
                    Убедитесь в правильности ввода логина и пароля
                  </v-card-text>
          
                </v-card>
              </v-dialog>
        <v-container align-center justify-center>
          <div class="center-block">
            <v-layout row wrap align-center justify-center>
                <v-flex xs12 sm6>
                    <v-card class="elevation-8">
                        <!-- Login/Signin -->
                        <v-layout row align-center justify-center class="py-5">

                            <v-form  @submit.prevent="submit">

                                <!-- <v-layout row> -->
                                <v-flex xs12>
                                    <h1 class="text-xs-center mb-5">Вход</h1>
                                    <v-text-field 
                                        label="Логин" 
                                        v-model="login" 
                                        type="text" 
                                        required
                                        @input="$v.login.$touch()"
                                        @blur="$v.login.$touch()"
                                        :error-messages="loginErrors"
                                        ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                        label="Пароль" 
                                        v-model="password" 
                                        type="password" 
                                        required
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()"
                                        :error-messages="passwordErrors"
                                        ></v-text-field>
                                </v-flex>

                                <v-flex xs12 class="py-3">
                                    <div class="text-xs-center">
                                        <v-btn outline type="submit">
                                            Войти
                                            <v-icon right>lock_open</v-icon>
                                            <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        </v-btn>
                                    </div>
                                </v-flex>
                            </v-form>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
          </div>
        </v-container>
    </v-app>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: 'Login',
  validations: {
    login: {
      required,
    },
    password: {
      required,
    }
  },
  data () {
    return {
      login: "",
      password: "",
      dialog: false
    }
  },
  mounted: function () {
    this.$store.dispatch('getAuth')
    if(this.isLoggin){
        // переходим в админку
        this.$router.push('/admin')
    }
  },
  computed:{
    isLoggin() {
      console.log(this.$store.getters.getToken)
      return this.$store.getters.getToken
    },
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) return errors
      !this.$v.login.required && errors.push('Введите Логин')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Введите Пароль')
      return errors
    },
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
          if (this.login === "admin" && this.password === "123456") {
            this.$store.dispatch('setAuth')
            this.$router.push('/admin')
          } else {
            this.dialog = true
          }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-block{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}
</style>
