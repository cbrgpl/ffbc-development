// String
import capitalize from './extenders/capitalize'
// Number
// Boolean
// Array
// Object

// TODO Переработать и сделать на основе объектав как писал Данил
function extendPrototype ( prototyObject, extender ) {
  if ( !extender.name ) {
    console.warn( 'Extender function name was not provided; Extend operation was interrupted' )
    console.warn( 'Extender function is:\n\n', extender.toString() )
    return
  }
  if ( !prototyObject[ extender.name ] ) {
    prototyObject[ extender.name ] = extender
  }
}

( function () {
  extendPrototype( String.prototype, capitalize )
} )()
