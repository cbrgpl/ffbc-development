import { app } from '@/main.js'
import { STORAGE_NAMES } from '@/enums/consts'

import toastByState from './commandToastByState'

const notificateAppComponent = () => localStorage.setItem( STORAGE_NAMES.EMAIL_VERIFICATION, true )
const isServerDisabled = ( commandResult ) => commandResult.nextRoute === 'ServerDisabled'

export default async function ( to, from, next ) {
  notificateAppComponent()

  const strategy = to.meta.strategy
  const strategyResult = await strategy.execute()

  if ( !isServerDisabled( strategyResult ) ) {
    toastByState( app, strategyResult )
  }

  next( { name: strategyResult.nextRoute } )
}
