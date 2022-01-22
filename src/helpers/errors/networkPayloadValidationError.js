import NetworkAttemptError from './networkAttemptError'
import NetworkPayloadValidationCallback from './onErrorCallbacks/networkPayloadValidationCallback'

export default class NetworkPayloadValidationError extends NetworkAttemptError {
  constructor ( summary, ...params ) {
    super( ...params )
    this.summary = summary
    this.onErrorCallback = NetworkPayloadValidationCallback
  }
}
