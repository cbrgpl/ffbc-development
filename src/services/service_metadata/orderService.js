const orderApiModule = [
  {
    method: 'GET',
    url: process.env.VUE_APP_API_URL + '/orders/',
    secure: true,
    roles: [],
    handler: 'getOrders',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'GET',
    url: process.env.VUE_APP_API_URL + '/orders/specs/',
    secure: false,
    roles: [],
    handler: 'getOrderSpecs',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'GET',
    url: process.env.VUE_APP_API_URL + '/orders/{{id}}/',
    secure: false,
    roles: [],
    handler: 'getOrderDetails',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'POST',
    url: process.env.VUE_APP_API_URL + '/orders/',
    secure: false,
    roles: [],
    handler: 'orderCreate',
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
  },
  {
    method: 'POST',
    url: process.env.VUE_APP_API_URL + '/order-items/',
    secure: false,
    roles: [],
    handler: 'orderItemsCreate',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'array',
    }
  },
  {
    method: 'POST',
    url: process.env.VUE_APP_API_URL + '/order-measures/',
    secure: false,
    roles: [],
    handler: 'orderMeasuresCreate',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'array',
    }
  },
]

export default orderApiModule
