import { NetworkAttemptError, AggregateError } from '@errors'

export default class ArrayApiSender {
  constructor ( { fieldExists, postField, patchField, getFieldId, fieldIdKey } ) {
    this.fieldExists = fieldExists
    this.postField = postField
    this.patchField = patchField
    this.getFieldId = getFieldId
    this.fieldIdKey = fieldIdKey
  }

  async sendForm ( form ) {
    const arrayOfRequests = []
    for ( const field of form ) {
      arrayOfRequests.push( this.doRequest( field ) )
    }

    const requestResults = await Promise.allSettled( arrayOfRequests )

    this.validateRequests( requestResults )

    return requestResults.map( ( result ) => ( { body: result.value.request.parsedBody, method: result.value.method } ) )
  }

  async doRequest ( field ) {
    let requestWrapper = null

    if ( this.fieldExists( field[ this.fieldIdKey ] ) ) {
      const fieldId = this.getFieldId( field[ this.fieldIdKey ] )
      requestWrapper = {
        request: await this.patchField( [ field, fieldId ] ),
        method: 'PATCH'
      }
    } else {
      requestWrapper = {
        request: await this.postField( [ field ] ),
        method: 'POST'
      }
    }

    if ( ![ 200, 201 ].includes( requestWrapper.request.httpResponse.status ) ) {
      throw requestWrapper.request
    } else {
      return requestWrapper
    }
  }

  validateRequests ( resultOfRequests ) {
    const rejectedRequests = resultOfRequests.filter( ( requestResult ) => requestResult.status === 'rejected' )
    if ( rejectedRequests.length !== 0 ) {
      const errors = rejectedRequests.map( ( rejectedRequest ) => new NetworkAttemptError( rejectedRequest.reason.httpResponse ) )
      throw new AggregateError( errors, 'One of request while setting user contacts has been rejected' )
    }
  }
}
