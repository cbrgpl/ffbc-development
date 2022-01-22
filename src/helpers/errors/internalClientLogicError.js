import HookableError from './hookableError'
import internalClientLogicCallback from './onErrorCallbacks/internalClientLogicCallback'

export default class InternalClientLogicError extends HookableError {
  constructor ( description, ...params ) {
    super( ...params )

    this.description = description
    this.onErrorCallback = internalClientLogicCallback
  }
}
