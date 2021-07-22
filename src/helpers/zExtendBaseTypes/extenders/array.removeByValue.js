export default function ( value ) {
  const elemIndex = this.indexOf( value )

  return elemIndex !== -1 ? this.splice( elemIndex, 1 )[ 0 ] : null
}
