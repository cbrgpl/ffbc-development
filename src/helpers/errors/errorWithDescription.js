import HookableError from './base_errors/hookableError'

export default class ErrorWithDescription extends HookableError {
  constructor ( description, ...params ) {
    super( ...params )

    this.description = description
  }
}
