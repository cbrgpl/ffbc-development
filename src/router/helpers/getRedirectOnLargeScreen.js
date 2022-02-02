export default ( minWidthRedirect, redirectName ) => ( to, from, next ) => {
  if ( document.body.clientWidth >= minWidthRedirect ) {
    next( { name: redirectName } )
  } else {
    next()
  }
}
