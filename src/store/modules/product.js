
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
    allProductFeatures: ( state ) => state.productFeatures,
    productType: ( state ) => ( product ) => state.productTypes.find( ( type ) => type.id === product.type ),
    productFeatures: ( state ) => ( productType ) => state.productFeatures.filter( ( feature ) => productType.productFeatures.includes( feature.id ) ),
    getFeaturesForProduct: ( state, getters ) => ( product ) => {
      const productType = getters.productType( product )
      const features = getters.productFeatures( productType )

      return features
    },
    getFeaturesAndFields: ( state ) => ( featureFieldIds ) => featureFieldIds.reduce( ( pairs, featureFieldId ) => {
      for ( const feature of state.productFeatures ) {
        for ( const featureField of feature.featureFields ) {
          if ( featureField.id === featureFieldId ) {
            pairs.push( {
              feature: feature.name,
              value: featureField.name
            } )

            return pairs
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
