import CartStrategy from './cartStrategy'
import { arrayUtils } from '@js_utils'

export default class CartAnAuthStrategy extends CartStrategy {
  constructor () {
    super()
    this.cartItemCounter = parseInt( localStorage.getItem( 'var_cartItemCounter' ) ) || 0
  }

  initCart () {
    const localCartItems = this.getLocalCartItems()

    return {
      cartItems: localCartItems
    }
  }

  addCartItem ( item ) {
    const cartItem = Object.assign( {}, item )
    cartItem.id = this.cartItemCounter++

    const localCartItems = this.getLocalCartItems()
    localCartItems.push( cartItem )

    this.setLocalCartItems( localCartItems )
    localStorage.setItem( 'var_cartItemCounter', this.cartItemCounter )

    return cartItem
  }

  removeCartItems ( cartItemIds ) {
    const localCartItems = this.getLocalCartItems()

    const formatedCartItemIds = cartItemIds.map( ( cartItemId ) => ( { id: cartItemId } ) )
    arrayUtils.exclude( localCartItems, formatedCartItemIds, ( cartItem ) => cartItem.id )

    this.setLocalCartItems( localCartItems )
  }

  getLocalCartItems () {
    return JSON.parse( localStorage.getItem( STORAGE_NAMES.LOCAL_CART ) || '[]' )
  }

  setLocalCartItems ( cartItems ) {
    const stringifiedCartItems = JSON.stringify( cartItems )
    localStorage.setItem( STORAGE_NAMES.LOCAL_CART, stringifiedCartItems )
  }
}
