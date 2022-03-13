import CartStrategy from './cartStrategy'

import { NetworkAttemptError } from '@errors'
import { cartService } from '@services'

export default class CartAuthStrategy extends CartStrategy {
  constructor () {
    super()
    this.cartId = null
  }

  async initCart () {
    const cartRequest = await cartService.getCart()

    if ( cartRequest.httpResponse.status !== 200 ) {
      throw new NetworkAttemptError( cartRequest.httpResponse )
    }

    return cartRequest.parsedBody
  }

  setCartId ( cartId ) {
    this.cartId = cartId
  }

  addCartItem ( cartItem ) {
    return cartService.addCartItem( {
      cart: this.cartId,
      ...cartItem,
    } )
  }
}
