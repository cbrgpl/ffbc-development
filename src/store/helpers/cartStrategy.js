/* eslint-disable no-unused-vars */
import { ErrorWithDescription } from '@errors'

export default class CartStrategy {
  initCart () {
    throw new ErrorWithDescription( 'CartStrategy\'s method "initCart" in not implemented' )
  }

  addCartItem () {
    throw new ErrorWithDescription( 'CartStrategy\'s method "addCartItem" in not implemented' )
  }

  removeCartItems ( cartItemIds ) {
    throw new ErrorWithDescription( 'CartStrategy\'s method "removeCartItem" in not implemented' )
  }
}
