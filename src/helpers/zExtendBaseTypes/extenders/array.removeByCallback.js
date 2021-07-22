export default function ( callback ) {
  const elemIndex = this.findIndex( ( value ) => callback( value ) )
  return elemIndex !== -1 ? this.splice( elemIndex, 1 )[ 0 ] : null
}
