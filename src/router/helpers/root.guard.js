import store from '@/store'

import WaiterOfPromises from '@classes/waiterOfPromises.js'
import waiterOfActions from './waiterOfActions.js'

const waiterOfPromises = new WaiterOfPromises()

const initUser = async ( isAuth ) => {
  if ( isAuth && !store.getters[ 'user/userLoaded' ] ) {
    return waiterOfActions.executeActions( [ 'user/getUser' ] )
  }
}

const initCart = async ( isAuth ) => {
  const actions = [
    'cart/initCart'
  ]

  store.dispatch( 'cart/setCartStrategy', isAuth )

  await waiterOfActions.executeActions( actions )

  if ( isAuth ) {
    store.commit( 'cart/setCartIdToStrategy' )
  }
}

const toIsRoot = ( to ) => to.name === 'Root'

export default async ( to, from, next ) => {
  const isAuth = store.getters[ 'auth/isAuth' ]

  const promiseGetters = [
    () => initUser( isAuth ),
    () => initCart( isAuth )
  ]

  await waiterOfPromises.executePromises( promiseGetters )

  store.commit( 'app/userLoaded', true )

  if ( toIsRoot( to ) ) {
    next( { name: 'ShopMain' } )
    return
  }

  next()
}
