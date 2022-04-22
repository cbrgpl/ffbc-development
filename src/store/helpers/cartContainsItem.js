import cartItemsEqual from './cartItemsEqual'

export default ( cart, item ) => !!cart.find( ( cartItem ) => cartItemsEqual( cartItem, item ) )
