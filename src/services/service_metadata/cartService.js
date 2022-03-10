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
]

export default cartApiModule
