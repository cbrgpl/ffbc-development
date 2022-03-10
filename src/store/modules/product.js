
import getActionResultDTO from '../helpers/getActionResultDTO'
import { NetworkAttemptError } from '@errors'
import { productService } from '@services'

export default {
  namespaced: true,
  state () {
    return {
      productFeatures: [],
      productTypes: [],
    }
  },
  getters: {
    productFeatures: ( state ) => state.productFeatures,
    productTypeById: ( state ) => ( productTypeId ) => state.productTypes.find( ( type ) => type.id === productTypeId ),
    productFeaturesByIds: ( state ) => ( arrayOfFeatureIds ) => state.productFeatures.filter( ( feature ) => arrayOfFeatureIds.includes( feature.id ) ),
    pairsOfFeatureAndFields: ( state ) => ( arrayOfFeatureFieldIds ) => arrayOfFeatureFieldIds.reduce( ( featureAndFieldPairs, productFeatureFieldId ) => {
      for ( const feature of state.productFeatures ) {
        for ( const featureField of feature.featureFields ) {
          if ( featureField.id === productFeatureFieldId ) {
            featureAndFieldPairs.push( {
              feature: feature.name,
              value: featureField.name
            } )

            return featureAndFieldPairs
          }
        }
      }
    }, [] ),
  },
  mutations: {
    setProductFeatures ( state, features ) {
      state.productFeatures = features
    },
    setProductTypes ( state, types ) {
      state.productTypes = types
    }
  },
  actions: {
    async outFetchProductById ( context, id ) {
      const productRequest = await productService.getProductById( null, id )

      if ( productRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( productRequest.httpResponse )
      }

      return productRequest.parsedBody
    },
    async outGetProducts ( context, filters ) {
      // TODO Допилить после появления ручки
      filters.productType = 1

      const getProductsRequest = await productService.getProducts( filters )
      if ( getProductsRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( getProductsRequest.httpResponse )
      }

      return getActionResultDTO( getProductsRequest )
    },
    async fetchProductFeatures ( { commit } ) {
      const productFeaturesRequest = await productService.getProductFeatures()

      if ( productFeaturesRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( productFeaturesRequest.httpResponse )
      }

      commit( 'setProductFeatures', productFeaturesRequest.parsedBody )
    },
    async fetchProductTypes ( { commit } ) {
      const productTypesRequest = await productService.getProductTypes()

      if ( productTypesRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( productTypesRequest.httpResponse )
      }

      commit( 'setProductTypes', productTypesRequest.parsedBody )
    },
    async outFetchProductsByOrderId ( context, orderId ) {
      const filters = {
        perPage: 20,
        page: 1
      }
      filters.productType = 1

      const getProductsRequest = await productService.getProducts( filters )
      if ( getProductsRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( getProductsRequest.httpResponse )
      }

      return getActionResultDTO( getProductsRequest )
    }
  }
}
