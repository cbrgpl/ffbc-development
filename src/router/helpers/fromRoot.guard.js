const toIsRoot = ( to ) => to.name === 'Root'

export default async ( to, from, next ) => {
  if ( toIsRoot( to ) ) {
    next( { name: 'ShopMain' } )
  } else {
    next()
  }
}
