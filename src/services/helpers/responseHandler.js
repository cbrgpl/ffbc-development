import { STATUS_WORDS } from '@/enums/consts'
import updateTokens from './updateTokens.js'
import CamelKebabTranslator from './camelCaseKebabTranslator.js'

const ERROR_STATUSES = {
  SHOULD_BE_HANDLED: [ /[1-4]\d{2}/ ],
  EXEPTIONS: [ ] // [ 429 ] as an example
}

export default class ResponseHandler {
  async handleResponse ( response, dataType ) {
    const handledResponse = {
      data: null,
      response: null,
    }

    handledResponse.data = CamelKebabTranslator.kebabCamelObj( await this._parseData( response, dataType ) )
    handledResponse.response = response

    return handledResponse
  }

  async _parseData ( response, type ) {
    switch ( type ) {
    case 'json':
      return await response.json()
    case 'blob':
      return await response.blob()
    case 'text':
      return ( await response.text() ).replace( /"||'/g, '' )
    case 'native':
      return response
    }
  }

  async reactToStatus ( response, checkUnauth = true ) {
    const handleTestingPositive = ERROR_STATUSES.SHOULD_BE_HANDLED.some( ( statusesGroup ) => statusesGroup.test( response.status ) ) &&
      !ERROR_STATUSES.EXEPTIONS.some( ( exeption ) => exeption === response.status )

    if ( !handleTestingPositive ) {
      const error = {
        payload: response,
        error: new Error( 'status is ' + response.status )
      }

      throw error
    } else if ( response.status === 401 && checkUnauth ) {
      await updateTokens()
    } else return STATUS_WORDS.SUCCESS

    return STATUS_WORDS.ERROR
  }
}
