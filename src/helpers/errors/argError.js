import BaseError from './base_errors/baseError'

export default class ArgError extends BaseError {
  constructor ( argValue, argErrorMessage, ...params ) {
    super( ...params )

    this.argValue = argValue
    this.argErrorMessage = argErrorMessage
  }
}
