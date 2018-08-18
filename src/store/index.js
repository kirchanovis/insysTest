import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: [],
        isLoggedIn: false
    },
    getters: {
        results(state) {
          return state.users.map( (user) => {
              let userNew = []
              userNew.name = user.name
              userNew.lastName = user.lastName
              userNew.middleName = user.middleName
              userNew.position = user.position
              userNew.deportament = user.deportament
              userNew.birthday = user.birthday
              userNew.password = user.password
              userNew.phone = user.phone
              userNew.email = user.email
              return userNew
          })
        },
        getToken(state) {
            return state.isLoggedIn
        }
    },
    mutations: {
        SET(state,{type, items}) {
            state[type] = items
        },
        ADD_USER(state, user) {
            state.users.push(user)
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        UPDATE_USER(state, {user, index}){
            state.users.splice(index, 1)
            state.users.push(user);
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        DELETE_USER(state, index){
            state.users.splice(index, 1)
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        GET_AUTH(state) {
            if (localStorage.getItem('token')) {
                state.isLoggedIn = true
            } else {
                state.isLoggedIn = false
            }
        },
        SET_AUTH(state) {
            localStorage.setItem('token', true);
            state.isLoggedIn = true
        }
    },
    actions: {
        getUsers({commit}) {
            if(!localStorage.getItem('users')) {
              axios.get('https://jsonplaceholder.typicode.com/users')
              .then( response => {
                const users  = response.data;
                commit('SET', {type : 'users', items: users})
              }).catch(error => {
                console.log(error)
              })
            } else {
                const users = JSON.parse(localStorage.getItem('users'));
                commit('SET', {type : 'users', items: users}) 
            }
        },
        addUsers({commit}, user){
            commit('ADD_USER', user)
        },
        deleteUser({commit}, index){
            commit('DELETE_USER', index)
        },
        updateUser({commit}, obj){
            commit('UPDATE_USER', {user : obj.user, index: obj.index})
        },
        getAuth({commit}){
            commit('GET_AUTH')
        },
        setAuth({commit}){
            commit('SET_AUTH')
        }
    }
})

export default store