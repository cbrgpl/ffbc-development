export default function ( array, value ) {
  const elemIndex = array.indexOf( value )

  return elemIndex !== -1 ? array.splice( elemIndex, 1 )[ 0 ] : null
}
