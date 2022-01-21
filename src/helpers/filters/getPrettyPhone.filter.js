export default function ( phone ) {
  if ( !phone ) {
    return ''
  }
  return `+${ phone[ 0 ] } (${ phone.substr( 1, 3 ) }) ${ phone.substr( 4, 3 ) }  ${ phone.substr( 7, 2 ) }-${ phone.substr( 9, 2 ) } `
}
