import $store from '@/store'
import { app } from '@/main.js'
import { userService } from '@services'
import updateTokens from '@/services/helpers/updateTokens'

function getRouteRoles ( to ) {
  const matched = to.matched
  const roles = []

  for ( const match of matched.filter( ( match ) => match.meta.roles ) ) {
    roles.push( ...match.meta.roles )
  }

  return [ ...new Set( roles ) ]
}

const checkAccess = ( roles, routeRoles ) => !routeRoles.some( ( role ) => !roles.includes( role ) )

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

export default async function ( to, from, next ) {
  if ( $store.getters[ 'auth/isAuth' ] === null ) {
    await checkUserAtInit()
  }

  const routeRoles = getRouteRoles( to )
  const roles = $store.getters[ 'user/roles' ]

  if ( !checkAccess( roles, routeRoles ) && !$store.getters[ 'user/isAuth' ] ) {
    next( { name: 'Preview' } )
  } else if ( !checkAccess( roles, routeRoles ) && $store.getters[ 'user/isAuth' ] ) {
    // TODO Заменить на личный кабинет
    next( { name: 'Main' } )
  } else next()
}
