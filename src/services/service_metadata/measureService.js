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
]

export default measureApiModule
