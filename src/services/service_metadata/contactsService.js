import { API_URL } from 'consts'

const contactsApiModule = [
  {
    method: 'GET',
    url: API_URL + '/contact-services/',
    secure: false,
    roles: [],
    handler: 'getContactTypes',
    headers: {
      Accept: 'application/json'
    }
  },
  {
    method: 'POST',
    url: API_URL + '/user-contact-services/',
    secure: true,
    roles: [],
    handler: 'setUserContacts',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'value', 'contactService' ],
      properties: {
        value: {
          type: 'string'
        },
        contactService: {
          type: 'number'
        }
      }
    }
  },
  {
    method: 'PATCH',
    url: API_URL + '/user-contact-services/{{id}}/',
    secure: true,
    roles: [],
    handler: 'patchContactService',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'value', 'contactService' ],
      properties: {
        value: {
          type: 'string',
        },
        contactService: {
          type: 'number'
        }
      }
    }
  }

]

export default contactsApiModule
