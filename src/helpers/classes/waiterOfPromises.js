export default class WaiterOfPromises {
  constructor () {
    this.beforePromiseExecutedHook = null
    this.afterPromiseExecutedHook = null
  }

  async executePromises ( arrayOfPromiseGetters ) {
    const promises = this.getPromises( arrayOfPromiseGetters )

    this.callHook( 'beforePromiseExecutedHook' )
    await Promise.allSettled( promises )
    this.callHook( 'afterPromiseExecutedHook' )

    return this.getPromiseResults( promises )
  }

  getPromises ( arrayOfPromiseGetters ) {
    return arrayOfPromiseGetters.map( ( promiseGetter ) => promiseGetter() )
  }

  getPromiseResults ( promises ) {
    return promises.map( ( promise ) => promise.value )
  }

  callHook ( name ) {
    if ( this[ name ] ) {
      this[ name ]()
    }
  }
}
