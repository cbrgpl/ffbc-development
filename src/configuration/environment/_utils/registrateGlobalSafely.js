export const registrateGlobalSafely = ( key, value ) => {
  if ( !window[ key ] ) {
    window[ key ] = value
  } else {
    throw new Error( `Global with name ${ key } already exists` )
  }
}
