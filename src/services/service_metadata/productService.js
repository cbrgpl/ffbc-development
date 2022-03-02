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
      required: [ 'page', 'perPage', 'productType' ],
      properties: {
        page: {
          type: 'integer'
        },
        perPage: {
          type: 'integer'
        },
        productType: {
          type: 'integer',
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
  {
    method: 'GET',
    url: API_URL + '/products/{{id}}/',
    secure: false,
    roles: [],
    handler: 'getProductById',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'GET',
    url: API_URL + '/product-features/',
    secure: false,
    roles: [],
    handler: 'getProductFeatures',
    headers: {
      Accept: 'application/json'
    },
  },
  {
    method: 'GET',
    url: API_URL + '/product-types/',
    secure: false,
    roles: [],
    handler: 'getProductTypes',
    headers: {
      Accept: 'application/json'
    },
  },
]

export default productApiModule
