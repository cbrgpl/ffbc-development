import GuardCommand from './base_commands/guardCommand'
import { authService } from '@services'

export default class ReqVerifyEmailCommand extends GuardCommand {
  constructor ( getGuardParamsByStatus ) {
    super( authService )

    this.getGuardParamsByStatus = getGuardParamsByStatus
  }

  async execute () {
    const token = location.search.replace( '?token=', '' )

    const request = await authService.verifyEmail( { token } )

    return this.getGuardParamsByStatus( request.httpResponse.status )
  }
}
