import { ErrorWithDescription } from '@errors'

export default class Command {
  async execute () {
    throw new ErrorWithDescription( 'command execute method is not implemented' )
  }
}
