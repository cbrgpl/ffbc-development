import { InternalClientLogicError } from '@errors'

export default class Command {
  async execute () {
    throw new InternalClientLogicError( 'execute method is not implemented in ServiceCommand descendant' )
  }
}
