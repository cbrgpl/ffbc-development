export default {
  namespaced: true,
  clearable: true,
  state: {
    access: null,
    refresh: localStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ) || sessionStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ),
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
    clearModule ( state ) {
      state.access = null
      state.refresh = null
    },
    setTokens ( state, tokens ) {
      state.access = tokens.access
      state.refresh = tokens.refresh
    }
  }
}
