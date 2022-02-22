
import getActionResultDTO from '../helpers/getActionResultDTO'
import { NetworkAttemptError } from '@errors'
import { productService } from '@services'

console.log( productService )

export default {
  namespaced: true,
  state () {
    return {}
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    outFetchProductById ( { commit, getters }, id ) {
      // need to make API request
      const fetchedProduct = {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quae doloribus dolores tempo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quae doloribus dolores tempora voluptatum animi sequi sint cupiditate ab tempore, cum quas temporibus sapiente provident, distinctio obcaecati quaerat. Ab accusamus nihil iste ratione laborum nesciunt facere saepe impedit amet dolores rem earum ipsum, ad tempo',
        type: 'Bikini',
        price: 16.35,
        count: 0,
        media: [
          'https://picsum.photos/1920/1080?random=29',
          'https://picsum.photos/1920/1080?random=289',
          'https://picsum.photos/1920/1080?random=358',
          'https://picsum.photos/1920/1080?random=177',
          'https://picsum.photos/1920/1080?random=252'
        ]
      }

      return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
          resolve( fetchedProduct )
        }, 1500 * Math.random() )
      } )
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
    async getProductFeatures ( { commit } ) {

    }
  }
}
