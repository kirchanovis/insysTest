import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { map } from 'lodash'



Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: [],
    },
    getters: {
        results(state) {
          return state.users.map( (user) => {
              let userNew = []
              userNew.name = user.name
              userNew.phone = user.phone
              userNew.email = user.email
              return userNew
          })
        },
    },
    mutations: {
        set(state,{type,items}) {
            state[type] = items
        }
    },
    actions: {
        getUsers({commit}) {
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then( response => {
                const users  = response.data;
                commit('set', {type : 'users', items: users})
            }).catch(error => {
              console.log(error)
            })
        },
    }
})

export default store