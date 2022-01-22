import $store from '@/store'
import { app } from '@/main.js'
import { userService } from '@services'
import updateTokens from '@/services/helpers/updateTokens'

async function checkUserAtInit () {
  if ( $store.getters[ 'token/refresh' ] === null ) {
    return
  }

  const tokensResponse = await updateTokens()
  if ( tokensResponse.status === 200 ) {
    const userDataResponse = await userService.me( $store.getters[ 'token/access' ] )
    $store.commit( 'user/setUserData', userDataResponse.data )
    $store.commit( 'user/addRole', 'authorized' )
    $store.commit( 'auth/setIsAuth', true )
  } else {
    localStorage.removeItem( 'var_refreshToken' )
    $store.commit( 'auth/setIsAuth', false )
    app.config.globalProperties.toast$.info( { summary: 'You are no longer authorized', detail: 'It seems you’ve been off the site too long, now you need to re-authorise' } )
  }
}

/*

  * There is 3 posibility variants of route.meta.auth

  - false - route requires only not authentificated users
  - undefined - user authentification is not matter
  - true - route requires only authtificated users

*/

export default async function ( to, from, next ) {
  const userAuth = $store.getters[ 'auth/isAuth' ]

  if ( userAuth === null ) {
    await checkUserAtInit()
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
