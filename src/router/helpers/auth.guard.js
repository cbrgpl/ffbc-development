import $store from '@/store'
import setTokensOnInitial from './authSetTokensOnInitial'

/*

  * There is 3 posibility variants of route.meta.auth

  - false - route requires only not authentificated users
  - undefined - user authentification is not matter
  - true - route requires only authtificated users

*/

const isInitialGuardCall = ( userAuth ) => userAuth === null

export default async function ( to, from, next ) {
  const userAuth = $store.getters[ 'auth/isAuth' ]
  const refreshToken = $store.getters[ 'auth/refreshToken' ]

  if ( isInitialGuardCall( userAuth ) && refreshToken !== null ) {
    const onNetworkAttemptErrorRoute = await setTokensOnInitial( refreshToken, $store )

    if ( onNetworkAttemptErrorRoute ) {
      next( { name: onNetworkAttemptErrorRoute } )
      return
    }
  }

  const routeRequireAuth = to.meta.auth

  if ( routeRequireAuth === false && userAuth ) {
    next( { name: 'Home' } )
  } else if ( routeRequireAuth === true && !userAuth ) {
    next( { name: 'Main' } )
  } else {
    next()
  }
}
