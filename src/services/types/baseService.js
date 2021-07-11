import endpoints from '@endpoints/index.js'

const errorStatuses = [ 500, 404 ]

async function parseSuccessResponse ( response, responseType ) {
  switch ( responseType ) {
  case 'json':
    return await response.json()
  case 'blob':
    return await response.blob()
  case 'text':
    return ( await response.text() ).replace( /"||'/g, '' )
  }
}

function getValidError ( errorObjectValue, originalMessage ) {
  if ( typeof errorObjectValue === 'function' ) {
    return errorObjectValue( originalMessage )
  }

  return errorObjectValue
}

function processErrorResponse ( response, validErrors = {} ) {
  const validErrorKeys = Object.keys( validErrors )

  for ( const validErrorKey of validErrorKeys ) {
    // Ищется подстрока, потому что содержание ошибки может быть динамическим
    // Например как в passportSerivce/uploadDocumentsImages
    if ( response.message.includes( validErrorKey ) ) {
      return {
        errorCondition: 'valid',
        message: getValidError( validErrors[ validErrorKey ], response.message ),
        nativeErrorObject: response
      }
    }
  }
  response.errorCondition = 'invalid'
  return response
}

export default class BaseService {
  constructor ( endpointName ) {
    this.endpointName = endpointName
    this.validErrors = {} // error.message: errorTranslation

    this.parseableTypes = {
      json: 'json',
      blob: 'blob',
      text: 'text'
    }
  }

  async request ( {
    props = {},
    options = {},
    key = ''
  } ) {
    const url = this.prepareUrl( endpoints[ this.endpointName ][ key ], props )

    return await fetch( url, options )
  }

  async processResponse ( { response, endpointKey, successResponseType } ) {
    if ( errorStatuses.includes( response.status ) ) {
      return processErrorResponse( ( await response.json() ).error, this.validErrors[ endpointKey ] )
    }

    return await parseSuccessResponse( response, successResponseType )
  }

  prepareUrl ( url, props ) {
    for ( const prop in props ) {
      url = url + `${ prop }=${ props[ prop ] }&`
    }

    url = url.replace( /&$/, '' )

    return url
  }
}
