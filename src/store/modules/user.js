import { arrayUtils } from '@js_utils'

export default {
  namespaced: true,
  clearable: true,
  state: {
    userData: {
      name: 'Dmitry TTT',
      email: 'cybirgpl@gmail.com',
      phoneNumber: '+79230040520',
    },
  },
  getters: {
    userData ( state ) {
      return state.userData
    },
    roles ( state ) {
      return state.roles
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
  mutations: {
    clearModule ( state ) {
      state.userData = {}
      state.roles = []
    },
    setUserData ( state, userData ) {
      state.userData = userData
    },
    clearUserData ( state ) {
      state.userData = {}
    },
    addRole ( state, roles = [] ) {
      if ( Array.isArray( roles ) ) {
        for ( const role of roles ) {
          state.roles.push( role )
        }
      } else {
        state.roles.push( roles )
      }
    },
    removeRole ( state, role ) {
      arrayUtils.remove( state.roles, role )
    }
  },
}
