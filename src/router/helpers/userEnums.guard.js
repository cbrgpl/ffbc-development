import store from '@/store'
import waiterOfActions from './waiterOfActions.js'

export default async ( to, from, next ) => {
  store.commit( 'app/subAppLoaded', false )

  const actions = [
    'contacts/getContactTypes'
  ]
  await waiterOfActions.executeActions( actions )

  store.commit( 'app/subAppLoaded', true )

  next()
}
