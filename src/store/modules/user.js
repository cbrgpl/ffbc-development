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
    fullName ( state ) {
      return state.name
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
