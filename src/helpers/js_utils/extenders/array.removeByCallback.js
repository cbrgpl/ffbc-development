export default function ( array, callback ) {
  const elemIndex = array.findIndex( ( value ) => callback( value ) )
  return elemIndex !== -1 ? array.splice( elemIndex, 1 )[ 0 ] : null
}
