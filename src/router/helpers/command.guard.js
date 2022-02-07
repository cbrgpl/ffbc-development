import { app } from '@/main.js'
import { STORAGE_NAMES } from '@/enums/consts'

import toastByState from './commandToastByState'

const notificateAppComponent = () => localStorage.setItem( STORAGE_NAMES.EMAIL_VERIFICATION, true )
const isServerDisabled = ( commandResult ) => commandResult.nextRoute === 'ServerDisabled'

export default async function ( to, from, next ) {
  notificateAppComponent()

  const command = to.meta.command
  const commandResult = await command.execute()

  if ( !isServerDisabled( commandResult ) ) {
    toastByState( app, commandResult )
  }

  next( { name: commandResult.nextRoute } )
}
