import HookableError from './pseudoAbstractErrors/hookableError'

export default class RouteAccessError extends HookableError {
    static TYPES = {
      ROLE_ACESS: 'ROLE_ACCESS_DENIDED',
      AUTH_ACESS: 'AUTH_ACCESS_DENIDED'
    }

    constructor ( route, guard, errorType, ...params ) {
      super( ...params )

      this.route = route
      this.guard = guard
      this.errorType = errorType
    }
}
