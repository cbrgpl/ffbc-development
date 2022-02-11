import CamelKebabTranslator from './camelCaseKebabTranslator'
import store from '@/store'
function onBeforeRequest ( { handlerName, data, id } ) {
  const translatedData = CamelKebabTranslator.translate( {
    value: data,
    mode: CamelKebabTranslator.MODS.CAMEL_KEBAB
  } )

  return {
    handlerName,
    data: translatedData,
    id
  }
}

function onBeforeFetch ( requestParameters ) {
  if ( requestParameters.security.secure ) {
    requestParameters.fetchParams.headers.Authorization = 'Bearer ' + store.getters[ 'auth/accessToken' ]
  }

  requestParameters.fetchParams.body = JSON.stringify( requestParameters.fetchParams.body )
}

function onResponseHandled ( data ) {
  console.log( data )
}

export {
  onBeforeFetch,
  onBeforeRequest,
  onResponseHandled
}
