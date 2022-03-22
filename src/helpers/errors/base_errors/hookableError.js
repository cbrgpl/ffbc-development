import BaseError from './baseError'

export default class HookableError extends BaseError {
  constructor ( ...params ) {
    super( ...params )

    this.onErrorCallback = null
  }

  setErrorHook ( callback ) {
    this.onErrorCallback = callback
  }

  onErrorHook ( app, error ) {
    return this.onErrorCallback( app, error )
  }
}
