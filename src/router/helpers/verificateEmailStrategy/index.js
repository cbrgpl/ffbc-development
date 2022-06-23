import getResponseBasedResult from './getResponseBasedResult'
import { authService } from '@services'

export const verificateEmail = async () => {
  const token = location.search.replace( '?token=', '' )

  const request = await authService.verifyEmail( { token } )

  return getResponseBasedResult( request.httpResponse.status )
}
