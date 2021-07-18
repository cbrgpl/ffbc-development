// String
import capitalize from './extenders/capitalize'
// Number
// Boolean
// Array
// Object

function extendPrototype ( prototyObject, extendersObj ) {
  for ( const [ name, extender ] of Object.entries( extendersObj ) ) {
    if ( !prototyObject[ name ] ) {
      prototyObject[ name ] = extender
    }
  }
}

const extendModule = {
  String: {
    capitalize,
  },
  Number: {

  },
  Boolean: {

  },
  Array: {

  },
  Object: {

  }
}

function extendAll () {
  extendPrototype( String.prototype, extendModule.String )
  extendPrototype( Number.prototype, extendModule.Number )
  extendPrototype( Boolean.prototype, extendModule.Boolean )
  extendPrototype( Array.prototype, extendModule.Array )
  extendPrototype( Object.prototype, extendModule.Object )
}

extendAll()
