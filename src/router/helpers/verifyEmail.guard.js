import { authService } from '@services'
import { app } from '@/main.js'

import CONST from '#CONST'

export default async function ( to, from, next ) {
  const token = to.href.lookbehindAlter( /(?:token=).*(&||$)/, [ 'token=', /&.*/ ] )

  const response = await authService.verifyEmail( token )

  if ( response.response.status === 200 ) {
    app.config.globalProperties.toast$.success( { detail: 'Your mail was successfully confirmed!', life: 6000 } )
    localStorage.setItem( CONST.VERIFICATION_STORAGE_VAR, true )
  } else {
    app.config.globalProperties.toast$.error( { detail: 'An error occurred while validating the email.<br><b>The link may have expired.</b>', life: 6000 } )
  }

  next( { name: 'Main' } )
}
