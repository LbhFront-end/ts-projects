import Vue from 'vue'
import Vuex from 'vuex'
import { loginReq, getInfoReq } from './../api/user';
import Cookies from 'js-cookie';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    email: '',
  },
  mutations: {
    setUserInfoMutations(state, info) {
      const { userName, email } = info
      state.userName = userName
      state.email = email
    },
  },
  actions: {
    loginActions({ commit, dispatch }, { userName, password }) {
      return new Promise((resolve, reject) => {
        loginReq({ userName, password }).then((response) => {
          const { data: { code, msg, data } } = response
          if (code === 0) {
            Cookies.set('token', 'value')
            dispatch('getInfoActions').then(() => {
              resolve()
            })
          } else {
            console.error(msg)
          }
        })
      })
    },
    getInfoActions({ commit }) {
      return new Promise((resolve, reject) => {
        getInfoReq().then((response) => {
          const { data: { code, data } } = response
          if (code === 0) {
            commit('setUserInfoMutations', data)
            resolve()
          }
        })
      })
    },
  },
  modules: {},
})
