import { ErrorWithDescription } from '@errors'

export default class CartStrategy {
  initCart () {
    throw new ErrorWithDescription( 'CartStrategy\'s method "initCart" in not implemented' )
  }

  addCartItem () {
    throw new ErrorWithDescription( 'CartStrategy\'s method "createCartItem" in not implemented' )
  }
}
