import HookableError from './base_errors/hookableError'

export default class NetworkAttemptError extends HookableError {
  constructor ( response, ...params ) {
    super( ...params )

    this.apiUrl = response.url
    this.responseBody = response.body
    this.responseStatus = response.status
  }
}
