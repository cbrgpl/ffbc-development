
import { NetworkAttemptError } from '@errors'
import { measureService } from '@services'
import { arrayUtils } from '@js_utils'

import ApiSendArray from '../helpers/apiSendArray'

export default {
  namespaced: true,
  state () {
    return {
      measures: [],
      userMeasures: [],
      enumLoaded: false,
      apiSendArray: null
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
    },
    userMeasureId: ( state, getters ) => ( measureField ) => {
      for ( const userMeasureField of state.userMeasures ) {
        if ( userMeasureField.measureField === measureField ) {
          return userMeasureField.id
        }
      }
    },
    apiSendArray ( state ) {
      return state.apiSendArray
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
    },
    setApiSendArray ( state, apiSendArray ) {
      state.apiSendArray = apiSendArray
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
    async setUserMeasures ( { commit, dispatch, getters }, measureForm ) {
      if ( getters.apiSendArray === null ) {
        commit( 'setApiSendArray', new ApiSendArray( {
          fieldExists: getters.measureExists,
          postField: ( ...args ) => dispatch( 'postMeasureField', ...args ),
          patchField: ( ...args ) => dispatch( 'patchMeasureField', ...args ),
          getFieldId: getters.userMeasureId,
          fieldIdKey: 'measureField',
        } ) )
      }

      const requestResults = await getters.apiSendArray.sendForm( measureForm )

      const measure = requestResults.map( ( result ) => result.body )
      const patchedMeasureField = requestResults.filter( ( result ) => result.method === 'PATCH' )
        .map( ( result ) => result.body )

      commit( 'removeUserMeasureFields', patchedMeasureField )
      commit( 'setUserMeasures', measure )
    },
    postMeasureField ( context, args ) {
      return measureService.postUserMeasure( ...args )
    },
    patchMeasureField ( context, args ) {
      return measureService.patchUserMeasure( ...args )
    },
  }
}
