import getRedirectByResponseStatus from './authGetRedirectByResponseStatus'

import { clearAuthInfo } from '@functions'

import { NetworkAttemptError } from '@errors'
const logErrorFields = ( error ) => {
  for ( const field in error ) {
    console.error( field, error[ field ] )
  }
}
export default async function tryCatchInitAuth ( initAuth ) {
  try {
    await initAuth()
  } catch ( error ) {
    if ( error instanceof NetworkAttemptError ) {
      const responseStatus = error.responseStatus
      if ( responseStatus === 401 ) {
        clearAuthInfo()
      }

      const redirectRoute = getRedirectByResponseStatus( responseStatus )

      return redirectRoute
    } else {
      logErrorFields( error )
    }

    throw error
  }
}
