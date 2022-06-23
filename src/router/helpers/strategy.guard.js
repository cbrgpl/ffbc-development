import { app } from '@/main.js'

import toastStrategyResult from './commandToastByState'

const isServerDisabled = ( strategyResult ) => strategyResult.nextRoute === 'ServerDisabled'

export default async function ( to, from, next ) {
  const strategy = to.meta.strategy
  const strategyResult = await strategy()

  if ( !isServerDisabled( strategyResult ) ) {
    toastStrategyResult( app, strategyResult )
  }

  next( { name: strategyResult.nextRoute } )
}
