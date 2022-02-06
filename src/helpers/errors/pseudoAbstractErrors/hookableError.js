import ConstructorNamedError from './constructorNamedError'

export default class HookableError extends ConstructorNamedError {
  constructor ( ...params ) {
    super( ...params )

    this.onErrorCallback = null
  }

  hasOnErrorCallback () {
    return this.onErrorCallback !== null
  }

  onErrorHook ( app, error ) {
    return this.onErrorCallback( app, error )
  }
}
