import store from '@/store'
import waiterOfActions from './waiterOfActions.js'

const actions = [
  'cart/initCart'
]

export default async ( to, from ) => {
  const isAuth = store.getters[ 'auth/isAuth' ]

  store.dispatch( 'cart/setCartStrategy', isAuth )

  await waiterOfActions.executeActions( actions )

  if ( isAuth ) {
    store.commit( 'cart/setCartIdToStrategy' )
  }
}
