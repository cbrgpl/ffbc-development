export default function ( value, maxLength = 15 ) {
  if ( !value ) {
    return ''
  }
  return value.length > maxLength ? value.slice( 0, maxLength ) + '...' : value
}
