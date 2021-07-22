export default function getParent ( node, callback ) {
  if ( node == null || !callback ) {
    return null
  }

  if ( callback( node ) ) {
    return node
  } else {
    return getParent( node.parentNode, callback )
  }
}
