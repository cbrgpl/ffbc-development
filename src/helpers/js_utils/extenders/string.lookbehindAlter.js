export default function lookbehind ( string, keyword, unnecesarryPart = '' ) {
  const regexp = new RegExp( `(?:${ keyword }).*($||&)` )
  const matches = string.match( regexp )

  const match = matches ? matches[ 0 ] : ''

  if ( Array.isArray( unnecesarryPart ) ) {
    return unnecesarryPart.reduce( ( resultValue, part ) => resultValue.replace( part, '' ), match )
  } else {
    return match.replace( unnecesarryPart, '' )
  }
}
