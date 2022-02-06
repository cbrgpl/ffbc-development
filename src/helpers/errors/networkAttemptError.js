import HookableError from './pseudoAbstractErrors/hookableError'

export default class NetworkAttemptError extends HookableError {
  constructor ( response, ...params ) {
    super( ...params )

    this.apiUrl = response.url
    this.responseBody = response.body
    this.responseStatus = response.status
  }
}
