// String
import capitalize from './extenders/string.capitalize'
import lookbehind from './extenders/string.lookbehindAlter'
// Number
// Boolean
// Array
import remove from './extenders/array.remove'
import equals from './extenders/array.equals'
import unique from './extenders/array.unique'
import exclude from './extenders/array.exclude'
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
    equals,
    unique,
    exclude
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
