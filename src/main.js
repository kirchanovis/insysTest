import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import router from './router';

import store from './store/index.js'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
