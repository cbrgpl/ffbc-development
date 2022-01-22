import HookableError from './hookableError'
import networkAttemptCallback from './onErrorCallbacks/networkAttemptCallback'

export default class NetworkAttemptError extends HookableError {
  constructor ( apiUrl, requestPayload, responseStatus, ...params ) {
    super( ...params )

    this.apiUrl = apiUrl
    this.requestPayload = requestPayload
    this.responseStatus = responseStatus

    this.onErrorCallback = networkAttemptCallback
  }
}
