import GuardMetaAccesser from '@/router/helpers/guardMetaAccesser'
import WaiterOfPromises from '@classes/waiterOfPromises.js'

const metaProp = 'aggregate'

const waiterOfPromises = new WaiterOfPromises()
const guardMetaAccesser = new GuardMetaAccesser( metaProp )

export default async ( to, from, next ) => {
  const currentRoute = guardMetaAccesser.handleCurrentMatch( to.matched )
  const aggregate = currentRoute.meta[ metaProp ].value
  const guardCallers = aggregate.guards.map( ( guard ) => () => guard( to, from ) )

  await waiterOfPromises.executePromises( guardCallers )
  next()
}
