import { API_URL } from 'consts'

const userApiModule = [
  {
    method: 'GET',
    url: API_URL + '/user/me/',
    secure: true,
    roles: [],
    handler: 'getUser',
    headers: {
      Accept: 'application/json',
    },
  },
]

export default userApiModule
