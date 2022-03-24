import store from '@/store'

import waiterOfActions from './waiterOfActions.js'

export default async ( to, from ) => {
  const isAuth = store.getters[ 'auth/isAuth' ]

  if ( isAuth && !store.getters[ 'user/userLoaded' ] ) {
    await waiterOfActions.executeActions( [ 'user/getUser' ] )
  }

  store.commit( 'app/userLoaded', true )
}
