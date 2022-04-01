export default ( cartItems ) => {
  const cartProductIds = []

  for ( const cartItem of cartItems ) {
    const cartItemProductId = cartItem.product

    if ( !cartProductIds.includes( cartItemProductId ) ) {
      cartProductIds.push( cartItemProductId )
    }
  }

  return cartProductIds
}
