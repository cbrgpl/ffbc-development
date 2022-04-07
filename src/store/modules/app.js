import { arrayUtils } from '@js_utils'

export default {
  namespaced: true,
  state () {
    return {
      loadedStatuses: {
        user: false,
        subApp: false,
      },
      escCloseCallers: [],
    }
  },
  getters: {
    appInitialized: ( state ) => state.loadedStatuses.user,
    subAppLoaded: ( state ) => state.loadedStatuses.subApp,
    escCloseCallers: ( state ) => state.escCloseCallers
  },
  mutations: {
    userLoaded ( state ) {
      state.loadedStatuses.user = true
    },
    subAppLoaded ( state, value ) {
      state.loadedStatuses.subApp = value
    },
    pushEscCloseCaller ( state, escCloseCaller ) {
      state.escCloseCallers.push( escCloseCaller )
    },
    removeEscCloseCaller ( state, callerId ) {
      arrayUtils.remove( state.escCloseCallers, ( escCloseCaller ) => escCloseCaller.callerId === callerId )
    }
  },
  actions: {
    initWindowEscListener ( { getters } ) {
      const escCloseCallers = getters.escCloseCallers

      window.addEventListener( 'keydown', ( event ) => {
        if ( event.key === 'Escape' ) {
          for ( const escCloseCaller of escCloseCallers ) {
            if ( escCloseCaller.getCallCondition() ) {
              escCloseCaller.closeFn()
            }
          }
        }
      } )
    }
  }
}
