import getActionResultDTO from '../helpers/getActionResultDTO'
import { NetworkAttemptError } from '@errors'
import { contactsService } from '@services'

import ArrayApiSender from '../helpers/arrayApiSender'

export default {
  namespaced: true,
  state () {
    return {
      contactTypes: [],
      arrayApiSender: null,
    }
  },
  getters: {
    contactTypes: ( state ) => state.contactTypes,
    userContacts: ( state, getters, rootState, rootGetters ) => rootGetters[ 'user/userData' ].contactServices,
    contactExists: ( state, getters ) => ( contactId ) => {
      const userContacts = getters.userContacts

      return userContacts.some( ( contact ) => contact.contactService === contactId )
    },
    userContactId: ( state, getters ) => ( contactId ) => getters.userContacts.find( ( userContact ) => userContact.contactService === contactId ).id,
    arrayApiSender: ( state ) => state.arrayApiSender
  },
  mutations: {
    setContactTypes ( state, contactTypes ) {
      state.contactTypes = contactTypes
    },
    setArrayApiSender ( state, arrayApiSender ) {
      state.arrayApiSender = arrayApiSender
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
    async setContacts ( { commit, getters, dispatch }, contacts ) {
      if ( getters.arrayApiSender === null ) {
        commit( 'setArrayApiSender', new ArrayApiSender( {
          fieldExists: getters.contactExists,
          postField: ( ...args ) => dispatch( 'postContact', ...args ),
          patchField: ( ...args ) => dispatch( 'patchContact', ...args ),
          getFieldId: getters.userContactId,
          fieldIdKey: 'contactService',
        } ) )
      }

      const requestResults = await getters.arrayApiSender.sendForm( contacts )

      const contactArray = requestResults.map( ( result ) => result.body )
      commit( 'user/setUserContacts', contactArray, { root: true } )
    },
    postContact ( context, args ) {
      return contactsService.setUserContacts( ...args )
    },
    patchContact ( context, args ) {
      return contactsService.patchContactService( ...args )
    }
  }
}
