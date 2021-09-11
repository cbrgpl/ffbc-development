// String
import capitalize from './extenders/string.capitalize'
import lookbehindAlter from './extenders/string.lookbehindAlter'
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
    proto: String.prototype,
    extends: {
      capitalize,
      lookbehindAlter,
    }
  },
  Number: {
    proto: Number.prototype,
    extends: {
    }
  },
  Boolean: {
    proto: Boolean.prototype,
    extends: {
    }
  },
  Array: {
    proto: Array.prototype,
    extends: {
      remove,
      removeCallback
    }
  },
  Object: {
    proto: Object.prototype,
    extends: {
    }
  }
}

function extendAll () {
  for ( const type of Object.keys( extendModule ) ) {
    extendPrototype( extendModule[ type ].proto, extendModule[ type ].extends )
  }
}

extendAll()
