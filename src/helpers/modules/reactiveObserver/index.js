/* eslint-disable no-dupe-class-members */
import ObserverBuffer from './observerBuffer'
import { getDirective, OBSERVABLE_ATTR } from './observableDirective'

class ReactiveObserver {
  #observer = null
  #observerBuffer = new ObserverBuffer()

  init ( root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0 ) {
    const options = { root, rootMargin, threshold }
    this.#observer = new IntersectionObserver( ( ...args ) => this.#addIntersections( ...args ), options )
    this.#startObserving()
  }

  #addIntersections ( entries ) {
    const attr = OBSERVABLE_ATTR
    const intersectionNumbers = entries
      .filter( ( entry ) => entry.isIntersecting )
      .map( ( entry ) => entry.target.dataset[ attr ] )

    this.#observerBuffer.addIntersections( intersectionNumbers )
  }

  #startObserving () {
    const observableSelector = `[data-${ OBSERVABLE_ATTR }]`
    const $elems = document.querySelectorAll( observableSelector )

    for ( const $el of $elems ) {
      this.#observer.observe( $el )
    }
  }

  reset () {
    this.#observerBuffer.resetState()
  }

  get observableDirective () {
    return getDirective( ( ...args ) => this.#observerBuffer.addObservable( ...args ) )
  }

  get observablesSchema () {
    return this.#observerBuffer.observablesSchema
  }
}

export {
  ReactiveObserver
}
