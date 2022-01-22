import HookableError from './hookableError'
import networkAttemptCallback from './onErrorCallbacks/networkAttemptCallback'

export default class NetworkAttemptError extends HookableError {
  constructor ( response, ...params ) {
    super( ...params )

    this.apiUrl = response.url
    this.responseBody = response.body
    this.responseStatus = response.status

    this.onErrorCallback = networkAttemptCallback
  }
}
