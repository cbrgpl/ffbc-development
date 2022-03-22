import WaiterOfPromises from '@classes/waiterOfPromises'
import store from '@/store'

const beforeRequestsHook = () => {

}

const afterRequestsHook = () => {

}

class WaiterOfActions extends WaiterOfPromises {
  constructor () {
    super()

    this.beforePromiseExecutedHook = beforeRequestsHook
    this.afterPromiseExecutedHook = afterRequestsHook
  }

  executeActions ( arrayOfActions ) {
    const arrayOfPromiseGetters = arrayOfActions.map( ( action ) => () => this.doStoreAction( action ) )
    return this.executePromises( arrayOfPromiseGetters )
  }

  doStoreAction ( actionName ) {
    return store.dispatch( actionName )
  }
}

export default new WaiterOfActions()
