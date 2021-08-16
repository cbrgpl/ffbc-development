import CONST from '#CONST'
import CamelKebabTranslator from '@services/camelCaseKebabTranslator'
import endpoints from '@services/endpoints'

const ERROR_STATUSES = {
  SHOULD_BE_HANDLED: [ /[1-4]\d{2}/ ]
}

async function parseSuccessResponse ( response, type ) {
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

async function handleResponse ( response, expectType ) {
  const handledResponse = {
    data: null,
    error: null,
    response: null,
  }

  const statusTesting = ERROR_STATUSES.SHOULD_BE_HANDLED
    .some( ( statusesGroup ) => statusesGroup.test( response.status ) )

  if ( statusTesting ) {
    handledResponse.data = CamelKebabTranslator.kebabCamelObj( await parseSuccessResponse( response, expectType ) )
  } else {
    handledResponse.error = new Error( 'status is ' + response.status )
  }

  handledResponse.response = response

  return handledResponse
}

export default class BaseService {
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

    const handledResponse = await handleResponse( response, expectType )

    if ( handledResponse.error ) throw handledResponse

    return handledResponse
  }

  _prepareBody ( options ) {
    if ( options.body ) {
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
