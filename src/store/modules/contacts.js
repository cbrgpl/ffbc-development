import getActionResultDTO from '../helpers/getActionResultDTO'
import { NetworkAttemptError, ErrorWithDescription } from '@errors'
import { contactsService } from '@services'
import { STATEMENT_OR_BLOCK_KEYS } from '../../../../../Users/cybir/AppData/Local/Microsoft/TypeScript/4.6/node_modules/@babel/types/lib/index'

export default {
  namespaced: true,
  state () {
    return {
      contactTypes: [],
    }
  },
  getters: {
    contactTypes: ( state ) => state.contactTypes,
    userContacts: ( state, getters, rootState, rootGetters ) => rootGetters[ 'user/userData' ].contactServices,
    contactExists: ( state, getters ) => ( contactId ) => {
      const userContacts = getters.userContacts

      return userContacts.some( ( contact ) => contact.contactService === contactId )
    },
    userContactId: ( state, getters ) => ( contactId ) => getters.userContacts.find( ( userContact ) => userContact.contactService === contactId ).id
  },
  mutations: {
    setContactTypes ( state, contactTypes ) {
      state.contactTypes = contactTypes
    },
    setUserServices ( state ) {
    }
  },
  actions: {
    async getContactTypes ( { commit } ) {
      const contactTypeRequest = await contactsService.getContactTypes()

      if ( contactTypeRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( contactTypeRequest.httpResponse )
      }

      commit( 'setContactTypes', contactTypeRequest.parsedBody )
    },
    validateContactRequests ( context, resultOfRequests ) {
      const rejectedRequests = resultOfRequests.filter( ( requestResult ) => requestResult.status === 'rejected' )

      if ( rejectedRequests.length !== 0 ) {
        const errors = rejectedRequests.map( ( rejectedRequest ) => new NetworkAttemptError( rejectedRequest.reason.httpResponse ) )
        throw new AggregateError( errors, 'One of request while setting user contacts has been rejected' )
      }
    },
    async setContacts ( { commit, dispatch }, contacts ) {
      const arrayOfRequests = []

      for ( const contact of contacts ) {
        arrayOfRequests.push( dispatch( 'doContactRequest', contact ) )
      }
      const resultOfRequests = await Promise.allSettled( arrayOfRequests )

      dispatch( 'validateContactRequests', resultOfRequests )

      const contactArray = resultOfRequests.map( ( result ) => result.value.parsedBody )
      commit( 'user/setUserContacts', contactArray, { root: true } )
    },
    async doContactRequest ( { getters }, contact ) {
      const contactExists = getters.contactExists
      let request = null

      if ( contactExists( contact.contactService ) ) {
        request = await contactsService.patchContactService( contact, getters.userContactId( contact.contactService ) )
      } else {
        request = await contactsService.setUserContacts( contact )
      }

      if ( ![ 200, 201 ].includes( request.httpResponse.status ) ) {
        throw request
      } else {
        return request
      }
    },
  }
}
