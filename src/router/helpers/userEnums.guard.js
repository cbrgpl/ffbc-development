import waiterOfActions from './waiterOfActions.js'

export default async ( to, from, next ) => {
  const actions = [
    'contacts/getContactTypes'
  ]

  await waiterOfActions.executeActions( actions )

  next()
}
