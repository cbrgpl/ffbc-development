import BaseService from './_baseService'

export default class ServerService extends BaseService {
  constructor () {
    super()

    this._endpoint = 'server'
  }

  healthCheck ( key = 'healthCheck' ) {
    return this._request( {
      key,
    } )
  }
}
