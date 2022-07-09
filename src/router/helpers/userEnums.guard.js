import waiterOfActions from './waiterOfActions.js'

const actions = [
  'contacts/getContactTypes'
]

export default async () => {
  await waiterOfActions.executeActions( actions )
}
