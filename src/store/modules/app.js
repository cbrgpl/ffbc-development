
export default {
  namespaced: true,
  state () {
    return {
      loadedStatuses: {
        user: false,
        subApp: false,
      }
    }
  },
  getters: {
    appInitialized: ( state ) => state.loadedStatuses.user && state.loadedStatuses.subApp,
    subAppLoaded: ( state ) => state.loadedStatuses.subApp,
  },
  mutations: {
    userLoaded ( state ) {
      state.loadedStatuses.user = true
    },
    subAppLoaded ( state, value ) {
      state.loadedStatuses.subApp = value
    }
  },
  actions: {
  }
}
