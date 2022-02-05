import { app } from '@/main.js'

import { authService } from '@services'

import { STORAGE_NAMES } from '@/enums/consts'

export default async function ( to, from, next ) {
  const token = location.search.replace( '?token=', '' )

  const request = await authService.verifyEmail( { token } )

  if ( request.httpResponse.status === 200 ) {
    app.config.globalProperties.toast$.success( { detail: 'Your mail was successfully confirmed!', life: 6000 } )
    localStorage.setItem( STORAGE_NAMES.EMAIL_VERIFICATION, true )
  } else {
    app.config.globalProperties.toast$.error( { detail: 'An error occurred while validating the email.<br><b>The link may have expired.</b>', life: 6000 } )
  }

  next( { name: 'ShopMain' } )
}
