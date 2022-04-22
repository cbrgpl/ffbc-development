import cartContainsItem from './cartContainsItem'

export default ( localCartItems, apiCartItems ) => {
  const localCartDifference = []

  for ( const localItem of localCartItems ) {
    if ( !cartContainsItem( apiCartItems, localItem ) ) {
      localCartDifference.push( localItem )
    }
  }

  return localCartDifference
}
