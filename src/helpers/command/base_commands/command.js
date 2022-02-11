import { ErrorWithDescription } from '@errors'

export default class Command {
  async execute () {
    throw new ErrorWithDescription( 'execute method is not implemented in ServiceCommand descendant' )
  }
}
