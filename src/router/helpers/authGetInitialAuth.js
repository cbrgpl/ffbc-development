import setTokensOnInitial from './authSetTokensOnInitial'

export default async function ( $store, next ) {
  const refreshToken = $store.getters[ 'auth/refreshToken' ]

  if ( refreshToken !== null ) {
    const onNetworkAttemptErrorRoute = await setTokensOnInitial( refreshToken, $store )

    if ( onNetworkAttemptErrorRoute ) {
      next( { name: onNetworkAttemptErrorRoute } )
    } else {
      return true
    }
  } else {
    return false
  }
}
