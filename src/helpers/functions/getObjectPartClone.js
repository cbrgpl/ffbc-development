const checkNotUsedKeys = ( notDefinedKeys ) => {
  if ( notDefinedKeys.length !== 0 ) {
    console.warn( 'Some keys did not match value in the origin', notDefinedKeys )
  }
}

export default ( origin, keys ) => {
  const clone = {}
  const notDefinedKeys = []

  for ( const key of keys ) {
    if ( origin[ key ] !== undefined ) {
      clone[ key ] = JSON.parse( JSON.stringify( origin[ key ] ) )
    } else {
      notDefinedKeys.push( key )
    }
  }

  checkNotUsedKeys( notDefinedKeys )

  return clone
}
