import { arrayUtils } from '@js_utils'

import { NetworkAttemptError } from '@errors'

import { getUserServiceCommand } from '@commands'
import { userService } from '@/services/services'
import getActionResultDTO from '@/store/helpers/getActionResultDTO'

export default {
  namespaced: true,
  clearable: true,
  state: {
    userData: {
      contactServices: [ { id: 6, value: 'qwe qw', contactService: 1, user: 3 }, { id: 8, value: 'mmqq', contactService: 3, user: 3 }, { id: 9, value: 'zof', contactService: 2, user: 3 }, { id: 10, value: 'glo', contactService: 4, user: 3 } ]
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
      return state.userData.firstName + ' ' + state.userData.lastName
    },
    email ( state ) {
      return state.userData.email
    }
  },
  actions: {
    async getUser ( { commit } ) {
      const userData = await getUserServiceCommand.execute()

      commit( 'setUserData', userData.getUser.parsedBody )
    },
    async updateUser ( { commit }, user ) {
      const updateUserRequest = await userService.updateUser( user )

      if ( updateUserRequest.httpResponse.status === 200 ) {
        commit( 'setUserData', updateUserRequest.parsedBody )
      } else if ( /5\d\d/.test( updateUserRequest.httpResponse.status ) ) {
        throw new NetworkAttemptError( updateUserRequest.httpResponse )
      }

      return getActionResultDTO( updateUserRequest )
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
    setUserContacts ( state, contacts ) {
      state.userData.contactServices = contacts
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
