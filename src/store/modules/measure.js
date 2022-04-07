
import { NetworkAttemptError } from '@errors'
import { measureService } from '@services'
import { arrayUtils } from '@js_utils'

import ArrayApiSender from '../helpers/arrayApiSender'

export default {
  namespaced: true,
  state () {
    return {
      measures: [],
      userMeasures: [],
      enumLoaded: false,
      arrayApiSender: null
    }
  },
  getters: {
    measures ( state ) {
      return state.measures
    },
    enumLoaded ( state ) {
      return state.enumLoaded
    },
    userMeasureExists: ( state ) => ( measureId ) => {
      const userMeasures = state.userMeasures

      return userMeasures.some( ( measure ) => measure.measureField === measureId )
    },
    userMeasureFields: ( state ) => ( measureFieldArray ) => {
      return state.userMeasures.filter( ( measureField ) => measureFieldArray.includes( measureField.measureField ) )
    },
    userMeasureId: ( state ) => ( measureField ) => {
      for ( const userMeasureField of state.userMeasures ) {
        if ( userMeasureField.measureField === measureField ) {
          return userMeasureField.id
        }
      }
    },
    groupMeasureFields: ( state, getters ) => ( measureFieldArray, getMeasureFieldId = ( measureField ) => measureField ) => {
      const getMeasureForMeasureField = getters.measureForMeasureField
      const measureFieldGroupes = []

      const createMeasureGroup = ( measure ) => ( {
        measureId: measure.id,
        name: measure.name,
        measureFields: []
      } )
      const getMeasureGroup = ( measureId ) => measureFieldGroupes.find( ( measureGroup ) => measureGroup.measureId === measureId )

      for ( const measureField of measureFieldArray ) {
        const currentMeasure = getMeasureForMeasureField( measureField, getMeasureFieldId )
        const measureGroup = getMeasureGroup( currentMeasure.id )

        if ( !measureGroup ) {
          const measureGroup = createMeasureGroup( currentMeasure )
          measureGroup.measureFields.push( measureField )

          measureFieldGroupes.push( measureGroup )
        } else {
          measureGroup.measureFields.push( measureField )
        }
      }

      return measureFieldGroupes
    },
    measureFieldWithName: ( state, getters ) => ( measureField, getMeasureFieldId = ( measureField ) => measureField ) => {
      const currentMeasure = getters.measureForMeasureField( measureField, getMeasureFieldId )
      const enumedMeasureField = currentMeasure.measureFields.find( ( enumedMeasureField ) => enumedMeasureField.id === getMeasureFieldId( measureField ) )

      return {
        name: enumedMeasureField.name,
        measureField,
      }
    },
    measureForMeasureField: ( state, getters ) => ( measureField, getMeasureFieldId = ( measureField ) => measureField ) => {
      return getters.measures.find( ( measure ) => measure.measureFields.find( ( enumedMeasureField ) => enumedMeasureField.id === getMeasureFieldId( measureField ) ) )
    },
    arrayApiSender ( state ) {
      return state.arrayApiSender
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
    setArrayApiSender ( state, arrayApiSender ) {
      state.arrayApiSender = arrayApiSender
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
      if ( getters.arrayApiSender === null ) {
        commit( 'setArrayApiSender', new ArrayApiSender( {
          fieldExists: getters.userMeasureExists,
          postField: ( ...args ) => dispatch( 'postField', ...args ),
          patchField: ( ...args ) => dispatch( 'patchField', ...args ),
          getFieldId: getters.userMeasureId,
          fieldIdKey: 'measureField',
        } ) )
      }

      const requestResults = await getters.arrayApiSender.sendForm( measureForm )

      const measure = requestResults.map( ( result ) => result.body )
      const patchedUserMeasureFields = requestResults.filter( ( result ) => result.method === 'PATCH' )
        .map( ( result ) => result.body )

      commit( 'removeUserMeasureFields', patchedUserMeasureFields )
      commit( 'setUserMeasures', measure )
    },
    postField ( context, args ) {
      return measureService.postUserMeasure( ...args )
    },
    patchField ( context, args ) {
      return measureService.patchUserMeasure( ...args )
    },
  }
}
