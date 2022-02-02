export default {
  namespaced: true,
  clearable: true,
  state: {
    isAuth: true,
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
