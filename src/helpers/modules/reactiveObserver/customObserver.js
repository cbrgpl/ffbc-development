class CustomObserver {
  #observer = null

  constructor ( observerOptions, addIntersection ) {
    this.#observer = new IntersectionObserver( addIntersection, observerOptions )
  }

  observe ( $nodes ) {
    for ( const $node of $nodes ) {
      this.#observer.observe( $node )
    }
  }

  unobserve ( $nodes ) {
    for ( const $node of $nodes ) {
      this.#observer.unobserve( $node )
    }
  }
}

export {
  CustomObserver
}
