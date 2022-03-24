import GuardMetaAccesser from '@/router/helpers/guardMetaAccesser'
import WaiterOfPromises from '@classes/waiterOfPromises.js'

const metaProp = 'guards'

const waiterOfPromises = new WaiterOfPromises()
const guardMetaAccesser = new GuardMetaAccesser( metaProp )

export default async ( to, from, next ) => {
  const currentRoute = guardMetaAccesser.handleCurrentMatch( to.matched )
  const guards = currentRoute.meta[ metaProp ].value

  const guardCallers = guards.map( ( guard ) => () => guard( to, from, next ) )

  await waiterOfPromises.executePromises( guardCallers )
}
