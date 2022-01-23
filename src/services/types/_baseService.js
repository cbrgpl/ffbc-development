import { STATUS_WORDS } from '@/enums/consts'
import CamelKebabTranslator from '@/services/helpers/camelCaseKebabTranslator'
import ResponseHandler from '@/services/helpers/responseHandler'
import endpoints from '@services/endpoints'

const responseHandler = new ResponseHandler()

export default class BaseService {
  static generateReqData ( fields, externalData ) {
    return fields.reduce( ( accum, field ) => {
      accum[ field ] = externalData[ field ]
      return accum
    }, {} )
  }

  constructor ( endpointName ) {
    this._endpoint = endpointName

    this.responseTypes = {
      json: 'json',
      blob: 'blob',
      text: 'text',
      native: 'native'
    }
  }

  async _request ( {
    props = {},
    options = {},
    key = '',
    expectType = this.responseTypes.native,
  } ) {
    const fetchOptions = Object.assign( {
      method: 'GET',
      mode: 'cors',
    }, options )

    this._prepareBody( fetchOptions )
    const url = this._prepareUrl( endpoints[ this._endpoint ][ key ], props )

    const response = await fetch( url, fetchOptions )

    if ( await responseHandler.reactToStatus( response ) === STATUS_WORDS.SUCCESS ) {
      return responseHandler.handleResponse( response, expectType )
    } else {
      const response = await fetch( url, fetchOptions )
      await responseHandler.reactToStatus( response )
      return responseHandler.handleResponse( response, expectType, false )
    }
  }

  _prepareBody ( options ) {
    if ( options.headers[ 'Content-Type' ] === 'application/json' && options.body ) {
      options.body = CamelKebabTranslator.camelKebabObj( options.body )
      options.body = JSON.stringify( options.body )
    }
  }

  _prepareUrl ( url, props ) {
    for ( const prop in props ) {
      if ( props[ prop ] ) url = url + `${ CamelKebabTranslator.camelKebabKey( prop ) }=${ props[ prop ] }&`
    }

    url = url.replace( /&$/, '' )

    return url
  }
}
