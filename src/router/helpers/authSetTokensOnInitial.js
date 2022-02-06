import updateRefreshToken from './authUpdateRefreshToken'
import updateTokensInStorages from './authUpdateTokensInStorages'
import getNetworkAttemptErrorRoute from './authGetNetworkAttemptErrorRouteName'

import { clearAuthInfo } from '@functions'

import { NetworkAttemptError } from '@errors'

const isNetworkErrorAttemptWith401 = ( networkAttemptErrorRoute ) => networkAttemptErrorRoute === 'Main'

export default async function setTokensOnInitial ( refreshToken, $store ) {
  try {
    const tokens = await updateRefreshToken( refreshToken )
    updateTokensInStorages( $store, tokens )
  } catch ( error ) {
    if ( error instanceof NetworkAttemptError ) {
      const networkAttemptErrorRoute = getNetworkAttemptErrorRoute( error )

      if ( isNetworkErrorAttemptWith401( networkAttemptErrorRoute ) ) {
        clearAuthInfo( $store )
      }

      return networkAttemptErrorRoute
    }

    throw error
  }
}
