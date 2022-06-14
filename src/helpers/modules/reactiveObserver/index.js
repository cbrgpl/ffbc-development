/* eslint-disable no-dupe-class-members */
import { ObservableNodeSchema } from './observerBuffer'
import { CustomObserver } from './customObserver.js'
import { ObservableDirective } from './observableDirective'

class ReactiveObserver {
  #observer = null
  #schema = new ObservableNodeSchema()
  #observableDirective = new ObservableDirective( ( ...args ) => this.#schema.addObservable( ...args ) )

  init ( root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0 ) {
    const observerOptions = { root, rootMargin, threshold }
    const addIntersection = ( ...params ) => this.#addIntersections( ...params )

    this.#observer = new CustomObserver( observerOptions, addIntersection )
  }

  #addIntersections ( entries ) {
    const attr = ObservableDirective.OBSERVABLE_ATTR
    const intersectedNumbers = entries
      .filter( ( entry ) => entry.isIntersecting )
      .map( ( entry ) => entry.target.dataset[ attr ] )

    this.#schema.addIntersections( intersectedNumbers )
  }

  observe () {
    const nodeBuffer = this.#observableDirective.nodeBuffer

    this.#observer.observe( nodeBuffer )
  }

  unobserve () {
    const nodeBuffer = this.#observableDirective.nodeBuffer
    this.#observer.unobserve( nodeBuffer )
    this.#schema.resetState()
    this.#observableDirective.clearNodeBuffer()
  }

  get schema () {
    return this.#schema.schema
  }

  get directive () {
    return this.#observableDirective.vueDirective
  }

  get inited () {
    return this.#observer !== null
  }
}

export {
  ReactiveObserver
}
