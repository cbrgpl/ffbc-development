import store from '@/store'

const toIsRoot = ( to ) => to.name === 'Root'

export default async ( to, from, next ) => {
  store.commit( 'app/subAppLoaded', true )

  if ( toIsRoot( to ) ) {
    next( { name: 'ShopMain' } )
  } else {
    next()
  }
}
