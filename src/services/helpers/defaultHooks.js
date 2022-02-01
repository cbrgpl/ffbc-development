import CamelKebabTranslator from './camelCaseKebabTranslator'

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
  requestParameters.fetchParams.body = JSON.stringify( requestParameters.fetchParams.body )
}

export {
  onBeforeFetch,
  onBeforeRequest
}
