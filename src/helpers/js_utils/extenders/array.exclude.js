import remove from './array.remove'

export default function ( array, excludeValues, accesserCallback = ( val ) => val ) {
  for ( const value of excludeValues ) {
    remove( array, ( arrVal ) => accesserCallback( arrVal ) === accesserCallback( value ) )
  }
}
