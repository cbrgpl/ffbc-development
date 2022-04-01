export default ( arr1, arr2 ) => {
  if ( arr1 === arr2 ) return true
  if ( arr1 == null || arr2 == null ) return false
  if ( arr1.length !== arr2.length ) return false

  const clone1 = [ ...arr1 ].sort( ( a, b ) => a - b )
  const clone2 = [ ...arr2 ].sort( ( a, b ) => a - b )

  return clone1.every( ( val, index ) => val === clone2[ index ] )
}
