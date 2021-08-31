export default {
  namespaced: true,
  state: {
    access: null,
    refresh: localStorage.getItem( 'var_refreshToken' ),
  },
  getters: {
    access ( state ) {
      return state.access
    },
    refresh ( state ) {
      return state.refresh
    },
    tokens ( state ) {
      return {
        access: state.access,
        refresh: state.refresh
      }
    }
  },
  mutations: {
    setTokens ( state, tokens ) {
      state.access = tokens.access
      state.refresh = tokens.refresh
      localStorage.setItem( 'var_refreshToken', tokens.refresh )
    }
  }
}
