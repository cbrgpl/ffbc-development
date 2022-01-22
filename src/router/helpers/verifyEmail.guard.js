import { app } from '@/main.js'

import { authService } from '@services'

import { STORAGE_NAMES } from '@/enums/consts'
import { stringUtils } from '@js_utils'

export default async function ( to, from, next ) {
  const token = stringUtils.lookbehind( /(?:token=).*(&||$)/, [ 'token=', /&.*/ ] )

  const response = await authService.verifyEmail( token )

  if ( response.response.status === 200 ) {
    app.config.globalProperties.toast$.success( { detail: 'Your mail was successfully confirmed!', life: 6000 } )
    localStorage.setItem( STORAGE_NAMES.EMAIL_VERIFICATION, true )
  } else {
    app.config.globalProperties.toast$.error( { detail: 'An error occurred while validating the email.<br><b>The link may have expired.</b>', life: 6000 } )
  }

  next( { name: 'Main' } )
}
