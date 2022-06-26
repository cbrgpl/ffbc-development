import cartContainsItem from './cartContainsItem'

export default ( localCartItems, backendCartItems ) => {
  const localCartDifference = []

  for ( const localItem of localCartItems ) {
    if ( !cartContainsItem( backendCartItems, localItem ) ) {
      localCartDifference.push( localItem )
    }
  }

  return localCartDifference
}
