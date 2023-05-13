const getBindedItemTemplate = () => ( {
  cartItem: null,
  product: null,
  features: null,
} )

export const getBindedCartItem = ( cartItems, products, getFeaturesWithField ) => {
  const bindedItems = []

  for ( const cartItem of cartItems ) {
    const bindedItem = getBindedItemTemplate()

    bindedItem.cartItem = cartItem
    bindedItem.product = products.find( ( product ) => product.type === cartItem.product )
    bindedItem.features = getFeaturesWithField( cartItem.featureFields )

    bindedItems.push( bindedItem )
  }

  return bindedItems
}
