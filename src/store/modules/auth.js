export default {
  namespaced: true,
  clearable: true,
  state: {
    isAuth: false,
  },
  getters: {
    isAuth: state => {
      return state.isAuth
    }
  },
  mutations: {
    setIsAuth ( state, payload ) {
      state.isAuth = payload
    },
    clearModule ( state ) {
      state.isAuth = null
    }
  },
}
