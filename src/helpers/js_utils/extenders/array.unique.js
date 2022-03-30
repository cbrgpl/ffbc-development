export default ( arr, getUniqueProp = ( el ) => el ) => {
  const unique = []

  arr.forEach( element => {
    if ( !unique.find( ( val ) => getUniqueProp( val ) === getUniqueProp( element ) ) ) {
      unique.push( element )
    }
  } )

  return unique
}
