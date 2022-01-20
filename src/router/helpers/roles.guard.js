import $store from '@/store'

function getRouteRoles ( to ) {
  const matched = to.matched
  const roles = []

  for ( const match of matched.filter( ( match ) => match.meta.roles ) ) {
    roles.push( ...match.meta.roles )
  }

  return [ ...new Set( roles ) ]
}

const isAccess = ( userRoles, requiredRoles ) => {
  return requiredRoles.length === 0 ? true
    : requiredRoles.every( ( requireRole ) => userRoles.includes( requireRole ) )
}

export default async function ( to, from, next ) {
  const routeRoles = getRouteRoles( to )
  const roles = $store.getters[ 'user/roles' ]

  if ( !isAccess( roles, routeRoles ) ) {
    next( { name: 'Main' } )
  } else {
    next()
  }
}
