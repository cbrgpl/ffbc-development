import CamelKebabTranslator from './camelCaseKebabTranslator'
import store from '@/store'
function onBeforeRequest ( { handlerName, data, id } ) {
  const result = {
    handlerName,
    id
  }

  if ( data !== null ) {
    const kebabedData = CamelKebabTranslator.translate( {
      value: data,
      mode: CamelKebabTranslator.MODS.CAMEL_KEBAB
    } )

    result.data = kebabedData
  }

  return result
}

function onBeforeFetch ( requestParameters ) {
  if ( requestParameters.security.secure ) {
    requestParameters.fetchParams.headers.Authorization = 'Bearer ' + store.getters[ 'auth/accessToken' ]
  }

  requestParameters.fetchParams.body = JSON.stringify( requestParameters.fetchParams.body )
}

function onResponseHandled ( { handledResponse } ) {
  if ( handledResponse.parsedBody ) {
    const cameledData = CamelKebabTranslator.translate( {
      value: handledResponse.parsedBody,
      mode: CamelKebabTranslator.MODS.KEBAB_CAMEL
    } )

    handledResponse.parsedBody = cameledData
  }
}

export {
  onBeforeFetch,
  onBeforeRequest,
  onResponseHandled
}
