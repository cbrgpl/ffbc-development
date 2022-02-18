import Command from './command'
import { CommandExecutionError } from '@errors'

export default class ServiceCommand extends Command {
  constructor ( services ) {
    super()
    this.services = services

    this.promiseQueue = []
  }

  async makeRequests ( arrayOfFetchRequests ) {
    this.fillPromiseQueue( arrayOfFetchRequests )

    const promiseResults = await Promise.allSettled( this.promiseQueue )
    const promiseResultsValidation = this.isPromiseResultsValid( promiseResults )

    if ( promiseResultsValidation.isValid ) {
      return promiseResults
    } else {
      throw promiseResultsValidation.reason
    }
  }

  fillPromiseQueue ( arrayOfFetchRequests ) {
    for ( const fetchRequest of arrayOfFetchRequests ) {
      const fetchRequestWrapper = this.getRequestPromiseWrapper( fetchRequest() )
      this.promiseQueue.push( fetchRequestWrapper() )
    }
  }

  getRequestPromiseWrapper ( fetchRequestPromise ) {
    return async () => {
      const fetchRequest = await fetchRequestPromise
      if ( fetchRequest.httpResponse.status !== 200 ) {
        throw new CommandExecutionError( this.constructor.name, fetchRequest.httpResponse )
      }

      return fetchRequest
    }
  }

  isPromiseResultsValid ( promiseResults ) {
    for ( const result of promiseResults ) {
      if ( result.status === 'rejected' ) {
        return {
          isValid: false,
          reason: result.reason
        }
      }
    }

    return {
      isValid: true,
    }
  }
}
