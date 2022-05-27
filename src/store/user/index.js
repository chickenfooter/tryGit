export default {
    namespaced: true,
    state: {
      loginuser: {
        username: '',
        password: ''
      }
    },
    getters: {
  
    },
    mutations: {
      save_login(state, user) {
        state.loginuser.username = user.username
        state.loginuser.password = user.password
        console.log(user)
      }
    },
    actions: {
  
    }
  }
  