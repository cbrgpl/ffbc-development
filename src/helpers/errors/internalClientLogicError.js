import HookableError from './pseudoAbstractErrors/hookableError'
// Переименовать в ErrorWithDescription

export default class InternalClientLogicError extends HookableError {
  constructor ( description, ...params ) {
    super( ...params )

    this.description = description
  }
}
