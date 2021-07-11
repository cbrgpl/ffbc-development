export default function ( responseResult, makeNotificationBoolean = false ) {
  if ( !responseResult.errorCondition ) {
    return responseResult
  }

  if ( responseResult.errorCondition === 'valid' ) {
    if ( makeNotificationBoolean ) {
      this.$eventBus.$emit( 'pushNotification', {
        notificationText: responseResult.message,
        notificationType: 'error'
      } )
    }

    return {
      error: true,
      message: responseResult.message,
    }
  } else {
    this.$eventBus.$emit( 'unexpectedError', responseResult )

    throw responseResult
  }
}
