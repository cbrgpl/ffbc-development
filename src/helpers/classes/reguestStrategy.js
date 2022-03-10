import { ErrorWithDescription } from '@errors'

export default class RequestStrategy {
  constructor () {
    this.service = null
  }

  async request ( method, ...args ) {
    const response = await this.service[ method ]( ...args )

    if ( response.httpResponse.status !== 200 ) {
      throw new ErrorWithDescription( `Got not 200 response status while fetching resource with a builder ${ this.constructor.name }` )
    }

    return response.parsedBody
  }

  setService ( service ) {
    this.service = service
  }
}
