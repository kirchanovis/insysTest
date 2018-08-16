<template>
<v-app id="inspire">
        <v-container align-center justify-center>
            <v-layout row wrap align-center justify-center>
                <v-flex xs12 sm6>
                    <v-card class="elevation-8">
                        <!-- ERROR MESSAGE -->
                        <v-layout row v-if="error">
                            <v-flex xs12 sm6 offset-sm3>
                                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                            </v-flex>
                        </v-layout>

                        <!-- Login/Signin -->
                        <v-layout row align-center justify-center class="py-5">

                            <v-form @submit.prevent="onSignin">

                                <!-- <v-layout row> -->
                                <v-flex xs12>
                                    <h1 class="text-xs-center mb-5">Вход</h1>
                                    <v-text-field name="email" label="Логин" id="email" v-model="email" type="email" required></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field name="password" label="Пароль" id="password" v-model="password" type="password" required></v-text-field>
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
        </v-container>
    </v-app>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
