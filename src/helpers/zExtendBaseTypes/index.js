// String
import capitalize from './extenders/string.capitalize'
// Number
// Boolean
// Array
import remove from './extenders/array.removeByValue'
import removeCallback from './extenders/array.removeByCallback'
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
    remove,
    removeCallback
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
