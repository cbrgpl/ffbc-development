
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
    userMeasureId: ( state ) => ( measureField ) => {
      for ( const userMeasureField of state.userMeasures ) {
        if ( userMeasureField.measureField === measureField ) {
          return userMeasureField.id
        }
      }
    },
    groupMeasureFieldByMeasure: ( state, getters ) => ( measureFieldArray, getMeasureFieldId = ( measureField ) => measureField ) => {
      const getMeasureForMeasureField = getters.measureForMeasureField
      const groupedMeasureFields = []

      const createMeasureGroup = ( measure ) => ( {
        measureId: measure.id,
        name: measure.name,
        measureFields: []
      } )
      const getMeasureGroup = ( measureId ) => groupedMeasureFields.find( ( measureGroup ) => measureGroup.measureId === measureId )

      for ( const measureField of measureFieldArray ) {
        const measureOfMeasureField = getMeasureForMeasureField( measureField, getMeasureFieldId )
        const measureGroup = getMeasureGroup( measureOfMeasureField.id )

        if ( !measureGroup ) {
          const measureGroup = createMeasureGroup( measureOfMeasureField )
          measureGroup.measureFields.push( measureField )

          groupedMeasureFields.push( measureGroup )
        } else {
          measureGroup.measureFields.push( measureField )
        }
      }

      return groupedMeasureFields
    },
    measureFieldWithName: ( state, getters ) => ( measureField, getMeasureFieldId = ( measureField ) => measureField ) => {
      const measureOfMeasureField = getters.measureForMeasureField( measureField, getMeasureFieldId )
      const enumMeasureField = measureOfMeasureField.measureFields.find( ( enumMeasureField ) => enumMeasureField.id === getMeasureFieldId( measureField ) )

      return {
        name: enumMeasureField.name,
        measureField,
      }
    },
    measureForMeasureField: ( state, getters ) => ( measureField, getMeasureFieldId = ( measureField ) => measureField ) => {
      return getters.measures.find( ( measure ) => measure.measureFields.find( ( enumMeasureField ) => enumMeasureField.id === getMeasureFieldId( measureField ) ) )
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
    async fetchUserMeasures ( { commit } ) {
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
