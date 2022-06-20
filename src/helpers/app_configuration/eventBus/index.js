class EventBus {
    #events = new Map()

    emit ( eventName, ...params ) {
      if ( this.#events.has( eventName ) ) {
        const listeners = this.#events.get( eventName )

        this.#logTrace( eventName )

        listeners.forEach( ( listener ) => listener( ...params ) )
      } else {
        throw new Error( `Event with name ${ eventName } is not set` )
      }
    }

    #logTrace ( eventName ) {
      if ( process.env.VUE_APP_EVENT_BUS_TRACE === 'true' ) {
        console.trace( `EventBus; "${ eventName }" have been emitted` )
      }
    }

    on ( eventName, handler ) {
      if ( typeof handler !== 'function' ) {
        throw new TypeError( 'handler is not a function' )
      }

      if ( this.#events.has( eventName ) ) {
        this.#events.get( eventName ).push( handler )
      } else {
        this.#events.set( eventName, [ handler ] )
      }
    }

    remove ( eventName ) {
      return this.#events.delete( eventName )
    }
}

export default new EventBus()
