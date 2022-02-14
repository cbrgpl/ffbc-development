import { ErrorWithDescription } from '@errors'

export default class Strategy {
  async execute () {
    throw new ErrorWithDescription( 'strategy execute method is not implemented' )
  }
}
