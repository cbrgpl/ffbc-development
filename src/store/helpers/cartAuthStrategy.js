import CartStrategy from './cartStrategy'

import { NetworkAttemptError } from '@errors'
import { cartService } from '@services'

export default class CartAuthStrategy extends CartStrategy {
  constructor () {
    super()
    this.cartId = null
  }

  setCartId ( cartId ) {
    this.cartId = cartId
  }

  async initCart () {
    const cartRequest = await cartService.getCart()

    if ( cartRequest.httpResponse.status !== 200 ) {
      throw new NetworkAttemptError( cartRequest.httpResponse )
    }

    return cartRequest.parsedBody
  }

  async addCartItem ( cartItem ) {
    const addRequest = await cartService.addCartItem( {
      cart: this.cartId,
      ...cartItem,
    } )

    return addRequest.parsedBody
  }

  removeCartItems ( cartItemIds ) {
    return cartService.removeCartItems( { ids: cartItemIds } )
  }
}
