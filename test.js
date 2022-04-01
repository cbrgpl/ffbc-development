
const equals = ( arr1, arr2 ) => {
  if ( arr1 === arr2 ) return true
  if ( arr1 == null || arr2 == null ) return false
  if ( arr1.length !== arr2.length ) return false

  const clone1 = [ ...arr1 ].sort( ( a, b ) => a - b )
  const clone2 = [ ...arr2 ].sort( ( a, b ) => a - b )

  return clone1.every( ( val, index ) => val === clone2[ index ] )
}

const compare = ( localCartItems, apiCartItems ) => {
  const localCartDifference = []

  const cartItemsEqual = ( cartItem1, cartItem2 ) => cartItem1.product === cartItem2.product &&
      equals( cartItem1.featureFields, cartItem2.featureFields )
  const apiCartContainsItem = ( localItem ) => !!apiCartItems.find( ( apiItem ) => cartItemsEqual( apiItem, localItem ) )

  for ( const localItem of localCartItems ) {
    if ( !apiCartContainsItem( localItem ) ) {
      localCartDifference.push( localItem )
    }
  }

  return localCartDifference
}

const localCart = {
  cartItems: [
    {
      product: 1,
      featureFields: [
        1, 5
      ]
    },
    {
      product: 2,
      featureFields: [
        2, 5
      ]
    },
    {
      product: 3,
      featureFields: [
        4, 8
      ]
    }
  ]
}

const apiCart = {
  cartItems: [
    {
      product: 1,
      featureFields: [
        1, 6
      ]
    },
    {
      product: 2,
      featureFields: [
        2, 5
      ]
    },
    {
      product: 3,
      featureFields: [
        4, 8
      ]
    }
  ]
}

const a = compare( localCart.cartItems, apiCart.cartItems )
console.log( a )
console.log( a )
