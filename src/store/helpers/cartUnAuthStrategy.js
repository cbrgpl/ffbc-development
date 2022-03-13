import CartStrategy from './cartStrategy'
import { STORAGE_NAMES } from '@/enums/consts'

export default class CartAnAuthStrategy extends CartStrategy {
  initCart () {
    const localStorageCart = localStorage.getItem( STORAGE_NAMES.LOCAL_CART ) ?? ''

    const localStorageCartItems = localStorageCart.split( ';uwu;' ).splice( 1 )
      .reduce( ( cartItems, stringifyCartItem ) => {
        cartItems.push( JSON.parse( stringifyCartItem ) )
        return cartItems
      }, [] )

    return {
      cartItems: localStorageCartItems
    }
  }

  addCartItem ( cartItemPrototype ) {
    const localStorageCart = localStorage.getItem( STORAGE_NAMES.LOCAL_CART ) ?? ''
    const cartItemStringify = JSON.stringify( cartItemPrototype )

    localStorage.setItem( STORAGE_NAMES.LOCAL_CART, localStorageCart + ';uwu;' + cartItemStringify )
  }
}
