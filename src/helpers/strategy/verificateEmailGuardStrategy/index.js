import Strategy from '../base_strategies/strategy'

import getResponseBasedResult from './getResponseBasedResult'
import { authService } from '@services'

class VerificateEmailGuardStrategy extends Strategy {
  async execute () {
    const token = location.search.replace( '?token=', '' )

    const request = await authService.verifyEmail( { token } )

    return getResponseBasedResult( request.httpResponse.status )
  }
}

export default new VerificateEmailGuardStrategy()
