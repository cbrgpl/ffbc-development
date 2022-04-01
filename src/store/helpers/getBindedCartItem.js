
import CartProductBuilder from '@classes/cartProductBuilder'
const cartProductBuilder = new CartProductBuilder()

export default ( cartItem ) => {
  const bindedCartItem = cartProductBuilder.getBindedCartItem( cartItem )
  cartProductBuilder.bindProductToCartItem( bindedCartItem )

  return bindedCartItem
}
