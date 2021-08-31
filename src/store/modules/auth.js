export default {
  namespaced: true,
  state: {
    isAuth: null,
  },
  getters: {
    isAuth: state => {
      return state.isAuth
    }
  },
  mutations: {
    setIsAuth ( state, payload ) {
      state.isAuth = payload
    }
  },
}
