export default ( obj, ...unneededProps ) => {
  for ( const property in obj ) {
    if ( unneededProps.includes( property ) ) {
      delete obj[ property ]
    }
  }

  return obj
}
