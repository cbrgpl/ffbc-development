
import { NetworkAttemptError } from '@errors'
import { measureService } from '@services'

export default {
  namespaced: true,
  state () {
    return {
      measures: []
    }
  },
  getters: {
    measures ( state ) {
      return state.measures
    }
  },
  mutations: {
    setMeasures ( state, measures ) {
      state.measures = measures
    }
  },
  actions: {
    async fetchMeasures ( { commit } ) {
      const measuresRequest = await measureService.getMeasures()

      if ( measuresRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( measuresRequest.httpResponse )
      }

      commit( 'setMeasures', measuresRequest.parsedBody )
    }
  }
}
