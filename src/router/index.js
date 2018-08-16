import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Admin from '../components/admin.vue'
import Page404 from '../components/p404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
})
