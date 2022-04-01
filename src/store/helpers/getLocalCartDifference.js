import { arrayUtils } from '@/helpers/js_utils/index'

export default ( localCartItems, apiCartItems ) => {
  const localCartDifference = []

  const cartItemsEqual = ( cartItem1, cartItem2 ) => cartItem1.product === cartItem2.product &&
    arrayUtils.equals( cartItem1.featureFields, cartItem2.featureFields )
  const apiCartContainsItem = ( localItem ) => !!apiCartItems.find( ( apiItem ) => cartItemsEqual( apiItem, localItem ) )

  for ( const localItem of localCartItems ) {
    if ( !apiCartContainsItem( localItem ) ) {
      localCartDifference.push( localItem )
    }
  }

  return localCartDifference
}
