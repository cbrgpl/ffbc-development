import { API_URL } from 'consts'

const measureApiModule = [
  {
    method: 'GET',
    url: API_URL + '/measures/',
    secure: false,
    roles: [],
    handler: 'getMeasures',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'GET',
    url: API_URL + '/user-measures/',
    secure: true,
    roles: [],
    handler: 'getUserMeasures',
    headers: {
      Accept: 'application/json',
    },
  },
  {
    method: 'POST',
    url: API_URL + '/user-measures/',
    secure: true,
    roles: [],
    handler: 'postUserMeasure',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'value', 'user', 'measureField' ],
      properties: {
        value: {
          type: 'string'
        },
        user: {
          type: 'number'
        },
        measureField: {
          type: 'number'
        }
      }
    }
  },
  {
    method: 'PATCH',
    url: API_URL + '/user-measures/{{id}}/',
    secure: true,
    roles: [],
    handler: 'patchUserMeasure',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'value', 'user', 'measureField' ],
      properties: {
        value: {
          type: 'string'
        },
        user: {
          type: 'number'
        },
        measureField: {
          type: 'number'
        }
      }
    }
  }
]

export default measureApiModule
