// String
import capitalize from './extenders/string.capitalize'
import lookbehind from './extenders/string.lookbehindAlter'
// Number
// Boolean
// Array
import remove from './extenders/array.removeByValue'
import removeCallback from './extenders/array.removeByCallback'
// Object
import isIterable from './extenders/object.isIterable'

const extendModule = {
  string: {
    capitalize,
    lookbehind,
  },
  number: {
  },
  boolean: {
  },
  array: {
    remove,
    removeCallback
  },
  object: {
    isIterable,
  }
}

export const stringUtils = extendModule.string
export const numberUtils = extendModule.number
export const booleanUtils = extendModule.boolean
export const arrayUtils = extendModule.array
export const objectUtils = extendModule.object
