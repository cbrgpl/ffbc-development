
import { NetworkAttemptError } from '@errors'
import { measureService } from '@services'

export default {
  namespaced: true,
  state () {
    return {
      measures: [],
      enumLoaded: false,
    }
  },
  getters: {
    measures ( state ) {
      return state.measures
    },
    enumLoaded ( state ) {
      return state.enumLoaded
    }
  },
  mutations: {
    setMeasures ( state, measures ) {
      state.measures = measures
    },
    setEnumLoaded ( state, enumLoaded ) {
      state.enumLoaded = enumLoaded
    }
  },
  actions: {
    async fetchMeasures ( { commit } ) {
      const measuresRequest = await measureService.getMeasures()

      if ( measuresRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( measuresRequest.httpResponse )
      }

      commit( 'setMeasures', measuresRequest.parsedBody )
      commit( 'setEnumLoaded', true )
    },
    async setUserMeasure ( context, measureForm ) {
      console.log( measureForm )

      return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
          resolve( {
            data: {},
            success: true,
          } )
        }, 3500 )
      } )
    }
  }
}
