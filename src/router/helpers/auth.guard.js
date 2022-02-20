import $store from '@/store'
import setTokensOnInitial from './authSetTokensOnInitial'

/*

  * There is 3 posibility variants of route.meta.auth

  - false - route requires only not authentificated users
  - undefined - user authentification is not matter
  - true - route requires only authtificated users

*/

const isInitialGuardCall = ( userAuth ) => userAuth === null
const routeRequireAuth = ( matched ) => matched.some( ( route ) => route.meta.auth === true )
const routeRequireAnAuth = ( matched ) => matched.some( ( route ) => route.meta.auth === false )

export default async function ( to, from, next ) {
  let userAuth = $store.getters[ 'auth/isAuth' ]
  const refreshToken = $store.getters[ 'auth/refreshToken' ]

  if ( isInitialGuardCall( userAuth ) && refreshToken !== null ) {
    const onNetworkAttemptErrorRoute = await setTokensOnInitial( refreshToken, $store )

    if ( onNetworkAttemptErrorRoute ) {
      next( { name: onNetworkAttemptErrorRoute } )
    } else {
      userAuth = true
    }
  }

  if ( userAuth && routeRequireAnAuth( to.matched ) ) {
    next( { name: 'ShopProfileMain' } )
  } else if ( !userAuth && routeRequireAuth( to.matched ) ) {
    next( { name: 'ShopMain' } )
  } else {
    next()
  }
}
