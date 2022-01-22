import ConstructorNamedError from './constructorNamedError'

export default class HookableError extends ConstructorNamedError {
  constructor ( useHook = true, ...params ) {
    super( ...params )

    this.useHook = useHook
    this.onErrorCallback = null
  }

  onErrorHook ( ...params ) {
    if ( typeof this.onErrorCallback === 'function' ) {
      this.onErrorCallback( ...params )
    }
  }
}
