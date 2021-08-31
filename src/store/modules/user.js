export default {
  namespaced: true,
  state: {
    userData: {},
    roles: []
  },
  mutations: {
    setUserData ( state, userData ) {
      state.userData = userData
    },
    clearUserData ( state ) {
      state.userData = {}
    },
    addRole ( state, role ) {
      state.roles.push( role )
    },
    removeRole ( state, role ) {
      state.roles.remove( role )
    }
  },
  getters: {
    userData ( state ) {
      return state.userData
    },
    fullName ( state ) {
      return `${ state.userData.firstName } ${ state.userData.lastName }`
    }
  },
}
