import ConstructorNamedError from './base_errors/constructorNamedError'

export default class ArgError extends ConstructorNamedError {
  constructor ( argValue, argErrorMessage, ...params ) {
    super( ...params )

    this.argValue = argValue
    this.argErrorMessage = argErrorMessage
  }
}
