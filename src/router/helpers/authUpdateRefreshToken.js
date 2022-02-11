import { authService } from '@services'

import { NetworkAttemptError } from '@errors'

export default async function updateRefreshToken ( refresh ) {
  const request = await authService.updateTokens( { refresh } )

  if ( request.httpResponse.status === 200 ) {
    return request.parsedBody
  } else {
    throw new NetworkAttemptError( request.httpResponse )
  }
}
