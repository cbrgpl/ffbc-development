export default function getRedirectByResponseStatus ( responseStatus ) {
  if ( responseStatus === 401 ) {
    return 'Main'
  } else if ( responseStatus === 500 ) {
    return 'ServerDisabled'
  }
}
