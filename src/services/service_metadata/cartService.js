const cartApiModule = [
  {
    method: 'GET',
    url: process.env.VUE_APP_API_URL + '/cart/',
    secure: true,
    roles: [],
    handler: 'getCart',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'POST',
    url: process.env.VUE_APP_API_URL + '/cart-items/',
    secure: true,
    roles: [],
    handler: 'addCartItem',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'cart', 'product', 'featureFields' ],
      properties: {
        cart: {
          type: 'integer',
        },
        product: {
          type: 'integer',
        },
        featureFields: {
          type: 'array',
        }
      }
    }
  },
  {
    method: 'POST',
    url: process.env.VUE_APP_API_URL + '/cart-items/delete-multiple/',
    secure: true,
    roles: [],
    handler: 'removeCartItems',
    headers: {
      'Content-Type': 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'ids' ],
      ids: {
        type: 'array'
      }
    }
  }
]

export default cartApiModule
