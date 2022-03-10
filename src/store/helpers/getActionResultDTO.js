const defaultSuccessStatuses = [ 200, 204, 201 ]

export default ( request, successStatuses = defaultSuccessStatuses ) => {
  const isStatusSaccess = ( status ) => successStatuses.includes( status )
  const status = request.httpResponse.status

  if ( isStatusSaccess( status ) ) {
    return {
      data: request.parsedBody,
      success: true,
    }
  } else {
    return {
      data: request.parsedBody,
      success: false,
    }
  }
}
