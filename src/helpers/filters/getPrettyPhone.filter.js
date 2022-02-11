export default function ( phone ) {
  if ( !phone ) {
    return ''
  }
  return `${ phone[ 1 ] } (${ phone.substr( 2, 3 ) }) ${ phone.substr( 5, 3 ) }  ${ phone.substr( 8, 2 ) }-${ phone.substr( 10, 2 ) } `
}
