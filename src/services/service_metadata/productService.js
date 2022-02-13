import { API_URL } from 'consts'

const productApiModule = [
  {
    method: 'GET',
    url: API_URL + '/products/',
    secure: false,
    roles: [],
    handler: 'getProducts',
    headers: {
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'page', 'perPage' ],
      properties: {
        page: {
          type: 'integer'
        },
        perPage: {
          type: 'integer'
        },
        productType: {
          type: 'string',
        },
        budgetLevel: {
          type: 'integer'
        },
        name: {
          type: 'string'
        }
      }
    }
  },
]

export default productApiModule
