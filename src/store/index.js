import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
    avatar: '/api/avatar/default.jpg'
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
      localStorage.setItem('userId', user.userId)
    }
  },
  actions: {
  },
  modules: {
  }
})
