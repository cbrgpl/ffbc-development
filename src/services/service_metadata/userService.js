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
  {
    method: 'GET',
    url: API_URL + '/user/me/tickets/',
    secure: true,
    roles: [],
    handler: 'getUserTickets',
    headers: {
      Accept: 'application/json',
    },
  },
]

export default userApiModule
