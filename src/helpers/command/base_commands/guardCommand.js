import Command from './command'

export default class GuardCommand extends Command {
  constructor ( service ) {
    super()

    this.getGuardParamsByStatus = null
    this.service = service
  }
}
