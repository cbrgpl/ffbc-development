import { API_URL } from 'consts'

const cartApiModule = [
  {
    method: 'GET',
    url: API_URL + '/cart/',
    secure: true,
    roles: [],
    handler: 'getCart',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'POST',
    url: API_URL + '/cart-items/',
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
  }
]

export default cartApiModule
