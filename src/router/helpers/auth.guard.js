import $store from '@/store'
import { computed } from 'vue'
import setAuthDataOnInit from './authSetAuthDataOnInit'
import tryCatchInitAuth from './authTryCatchInitAuth'
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
  const userAuth = computed( () => $store.getters[ 'auth/isAuth' ] )
  if ( isInitialGuardCall( userAuth.value ) ) {
    const refreshToken = $store.getters[ 'auth/refreshToken' ]
    const redirectRoute = await tryCatchInitAuth( () => setAuthDataOnInit( refreshToken ) )
    if ( redirectRoute ) {
      next( { name: redirectRoute } )
      return
    }
  }

  if ( userAuth.value && routeRequireAnAuth( to.matched ) ) {
    next( { name: 'ShopProfileMain' } )
  } else if ( !userAuth.value && routeRequireAuth( to.matched ) ) {
    next( { name: 'ShopMain' } )
  } else {
    next()
  }
}
