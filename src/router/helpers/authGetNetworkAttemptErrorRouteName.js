export default function getNetworkAttemptErrorRoute ( networkAttemptError ) {
  if ( networkAttemptError.responseStatus === 401 ) {
    return 'Main'
  } else if ( networkAttemptError.responseStatus === 500 ) {
    return 'ServerDisabled'
  }
}
