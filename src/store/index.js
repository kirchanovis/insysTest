import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";



Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: [],
        isLoggedIn: !localStorage.getItem('token')
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
        },
        [LOGIN] (state) {
            state.pending = true;
        },
        [LOGIN_SUCCESS] (state) {
            state.isLoggedIn = true;
            state.pending = false;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
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