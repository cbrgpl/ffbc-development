export default function ( value, leftSymbolsQuantity, replacementSymbol, rightSymbolsQuantity = leftSymbolsQuantity ) {
  if ( !value ) {
    return ''
  }

  const replacemntSymbolsQuantity = value.length - leftSymbolsQuantity - rightSymbolsQuantity
  return value.substr( 0, leftSymbolsQuantity ) + replacementSymbol.repeat( replacemntSymbolsQuantity ) + value.substr( -1 * rightSymbolsQuantity )
}
