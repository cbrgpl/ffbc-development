
import { NetworkAttemptError } from '@errors'
import { measureService } from '@services'
import { arrayUtils } from '@js_utils'

export default {
  namespaced: true,
  state () {
    return {
      measures: [],
      userMeasures: [],
      enumLoaded: false,
    }
  },
  getters: {
    measures ( state ) {
      return state.measures
    },
    enumLoaded ( state ) {
      return state.enumLoaded
    },
    measureExists: ( state ) => ( measureId ) => {
      const userMeasures = state.userMeasures

      return userMeasures.some( ( measure ) => measure.measureField === measureId )
    },
    userMeasureFields: ( state ) => ( arrayOfFieldIds ) => {
      return state.userMeasures.filter( ( measureField ) => arrayOfFieldIds.includes( measureField.measureField ) )
    }
  },
  mutations: {
    setMeasures ( state, measures ) {
      state.measures = measures
    },
    removeUserMeasureFields ( state, arrayOfmeasureFields ) {
      for ( const userMeasureField of arrayOfmeasureFields ) {
        arrayUtils.remove( state.userMeasures, ( measure ) => measure.measureField === userMeasureField.measureField )
      }
    },
    setUserMeasures ( state, userMeasures ) {
      state.userMeasures.push( ...userMeasures )
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
    async getUserMeasures ( { commit } ) {
      const getMeasureRequest = await measureService.getUserMeasures()

      if ( getMeasureRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( getMeasureRequest.httpResponse )
      }

      commit( 'setUserMeasures', getMeasureRequest.parsedBody )
    },
    validateMeasureRequests ( context, resultOfRequests ) {
      const rejectedRequests = resultOfRequests.filter( ( requestResult ) => requestResult.status === 'rejected' )

      if ( rejectedRequests.length !== 0 ) {
        const errors = rejectedRequests.map( ( rejectedRequest ) => new NetworkAttemptError( rejectedRequest.reason.httpResponse ) )
        throw new AggregateError( errors, 'One of request while setting user contacts has been rejected' )
      }
    },
    async setUserMeasures ( { commit, dispatch }, measureForm ) {
      const arrayOfRequests = []

      for ( const measure of measureForm ) {
        arrayOfRequests.push( dispatch( 'doMeasureRequest', measure ) )
      }
      const resultOfRequests = await Promise.allSettled( arrayOfRequests )

      dispatch( 'validateMeasureRequests', resultOfRequests )

      const measure = resultOfRequests.map( ( result ) => result.value.request.parsedBody )
      const patchedMeasureField = resultOfRequests.filter( ( result ) => result.value.method === 'PATCH' )
        .map( ( result ) => result.value.request.parsedBody )

      commit( 'removeUserMeasureFields', patchedMeasureField )
      commit( 'setUserMeasures', measure )
    },
    async doMeasureRequest ( { getters }, measure ) {
      const measureExists = getters.measureExists
      let requestWrapper = null

      if ( measureExists( measure.measureField ) ) {
        requestWrapper = {
          request: await measureService.patchUserMeasure( measure, getters.userMeasureId( measure.measureField ) ),
          method: 'PATCH'
        }
      } else {
        requestWrapper = {
          request: await measureService.postUserMeasure( measure ),
          method: 'POST'
        }
      }

      if ( ![ 200, 201 ].includes( requestWrapper.request.httpResponse.status ) ) {
        throw requestWrapper.request
      } else {
        return requestWrapper
      }
    },
  }
}
