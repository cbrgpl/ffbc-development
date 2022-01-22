import ConstructorNamedError from './constructorNamedError'

export default class HookableError extends ConstructorNamedError {
  constructor ( ...params ) {
    super( ...params )

    this.onErrorCallback = null
  }

  onErrorHook ( ...params ) {
    if ( typeof this.onErrorCallback === 'function' ) {
      this.onErrorCallback( ...params )
    }
  }
}
