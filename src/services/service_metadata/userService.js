const userApiModule = [
  {
    method: 'GET',
    url: process.env.VUE_APP_API_URL + '/user/me/',
    secure: true,
    roles: [],
    handler: 'getUser',
    headers: {
      Accept: 'application/json',
    },
  },
  {
    method: 'POST',
    url: process.env.VUE_APP_API_URL + '/user/me/edit/',
    secure: true,
    roles: [],
    handler: 'updateUser',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'firstName', 'lastName', 'street', 'city', 'country', 'instagramUrl', 'height', 'bustType' ],
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        street: {
          type: 'string'
        },
        city: {
          type: 'string'
        },
        country: {
          type: 'string'
        },
        instagramUrl: {
          type: 'string'
        },
        height: {
          type: 'number'
        },
        age: {
          type: 'number'
        }
      }
    }
  }
]

export default userApiModule
