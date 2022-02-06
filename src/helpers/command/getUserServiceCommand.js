import ServiceCommand from './base_commands/serviceCommand'
import { userService } from '@services'

class GetUserServiceCommand extends ServiceCommand {
  async execute () {
    const userService = this.services.userService
    const requestArray = [
      () => userService.getUser(),
    ]

    const requestResults = await this.makeRequests( requestArray )

    return {
      getUser: requestResults[ 0 ].value,
    }
  }
}

const getUserServiceCommand = new GetUserServiceCommand( { userService } )
export default getUserServiceCommand
