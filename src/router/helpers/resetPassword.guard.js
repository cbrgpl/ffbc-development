const getQueryParamsMap = () => {
  const search = location.search.replace( '?', '' )
  const mapableQueryParamsArray = search.split( '&' ).map( ( queryParam ) => queryParam.split( '=' ) )
  return new Map( mapableQueryParamsArray )
}

export default ( to, from, next ) => {
  const queryParamMap = getQueryParamsMap()

  if ( queryParamMap.has( 'uidb64' ) && queryParamMap.has( 'token' ) ) {
    to.params.queryParams = queryParamMap
    next()
  } else {
    next( { name: 'ShopTmp' } )
  }
}
