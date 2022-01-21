export default function ( array, removeValue, useRemoveValAsCallback = true ) {
  const elemIndex = typeof removeValue === 'function' && useRemoveValAsCallback ? array.findIndex( ( value ) => removeValue( value ) )
    : array.indexOf( removeValue )

  return elemIndex !== -1 ? array.splice( elemIndex, 1 )[ 0 ] : null
}
