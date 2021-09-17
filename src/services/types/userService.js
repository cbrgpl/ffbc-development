import UserDataProcessor from '@services/helpers/userDataProcessor'
import BaseService from './_baseService'

export default class UserService extends BaseService {
  constructor () {
    super()

    this._endpoint = 'user'
  }

  async me ( accessToken, key = 'me' ) {
    const options = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    }

    const userData = await this._request( {
      key,
      expectType: this.responseTypes.json,
      options
    } )

    UserDataProcessor.fromBackend( userData.data )
    return userData
  }
}
