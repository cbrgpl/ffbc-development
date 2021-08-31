import BaseService from './_baseService'
export default class UserService extends BaseService {
  constructor () {
    super()

    this._endpoint = 'user'
  }

  me ( accessToken, key = 'me' ) {
    const options = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    }

    return this._request( {
      key,
      expectType: this.responseTypes.json,
      options
    } )
  }
}
