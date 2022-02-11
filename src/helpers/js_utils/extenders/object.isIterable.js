export default function ( obj ) {
  if ( obj ) {
    return typeof obj[ Symbol.iterator ] === 'function'
  }

  return false
}
