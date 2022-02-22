const successStatusses = [ 200, 201 ]
export default class ServiceAdapter {
  contains ( methodName ) {
    return !!this[ methodName ]
  }

  call ( methodName, serviceResponse ) {
    if ( successStatusses.includes( serviceResponse.httpResponse.status ) ) {
      return this[ methodName ]( serviceResponse )
    }

    return serviceResponse
  }
}
