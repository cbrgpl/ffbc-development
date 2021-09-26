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
    userDataClone ( state ) {
      return Object.assign( state.userData )
    },
    avatar ( state ) {
      return state.userData.avatar
    },
    documents ( state ) {
      const documents = []

      documents.push( state.userData.documentPhotoOne )
      documents.push( state.userData.documentPhotoTwo )
      documents.push( state.userData.documentPhotoThree )

      return documents
    },
    fullName ( state ) {
      return !state.userData.firstName && !state.userData.lastName ? 'Name is not specified' : `${ state.userData.firstName } ${ state.userData.lastName }`
    }
  },
}
