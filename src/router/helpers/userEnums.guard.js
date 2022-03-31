import waiterOfActions from './waiterOfActions.js'

const actions = [
  'contacts/getContactTypes'
]

export default async ( to, from ) => {
  await waiterOfActions.executeActions( actions )
}
