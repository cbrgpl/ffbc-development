/* eslint-disable no-dupe-class-members */
import { reactive, watch } from 'vue'

class ObservableNodeSchema {
  #intersections = reactive( [] )
  #schema = reactive( {} )

  #watcher = watch(
    this.#intersections,
    ( newIntersectedElems ) => this.#setElemsIntersectedState( newIntersectedElems )
  )

  addObservable ( number ) {
    this.#schema[ number ] = false
  }

  addIntersections ( numbers ) {
    numbers.forEach( ( number ) => this.#intersections.push( number ) )
  }

  resetState () {
    this.#schema = reactive( {} )
    this.#intersections.splice( 0 )
  }

  #setElemsIntersectedState ( intersectedElems ) {
    for ( const intersectedElem of intersectedElems ) {
      this.#schema[ intersectedElem ] = true
    }
  }

  get schema () {
    return this.#schema
  }
}

export {
  ObservableNodeSchema
}
