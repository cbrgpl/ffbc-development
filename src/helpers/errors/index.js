import ArgError from '@errors/argError'
import InternalClientLogicError from '@errors/internalClientLogicError'
import NetworkAttemptError from '@/helpers/errors/networkAttemptError'
import RouteAccessError from '@errors/routeAccessError'

export default [
  ArgError,
  InternalClientLogicError,
  NetworkAttemptError,
  RouteAccessError
]
