/* eslint-disable no-dupe-class-members */
import { reactive, watch } from 'vue'

export default class ObserverBuffer {
    #intersections = reactive( [] )
    #observablesSchema = reactive( {} )
    #watcher = watch(
      this.#intersections,
      ( newIntersectedElems ) => this.#setElemsIntersectedState( newIntersectedElems )
    )

    addObservable ( number ) {
      this.#observablesSchema[ number ] = false
    }

    addIntersections ( numbers ) {
      numbers.forEach( ( number ) => this.#intersections.push( number ) )
    }

    resetState () {
      this.#resetObservablesSchema()
      this.#clearIntersections()
    }

    #resetObservablesSchema () {
      const numbers = Object.keys( this.#observablesSchema )

      for ( const number of numbers ) {
        this.#observablesSchema[ number ] = false
      }
    }

    #clearIntersections () {
      this.#intersections.splice( 0 )
    }

    #setElemsIntersectedState ( newIntersectedElems ) {
      for ( const intersectedElem of newIntersectedElems ) {
        this.#observablesSchema[ intersectedElem ] = true
      }
    }

    get observablesSchema () {
      return this.#observablesSchema
    }
}
