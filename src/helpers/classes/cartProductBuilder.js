import RequestStrategy from './reguestStrategy'

import { productService } from '@/services'
import store from '@/store'

export default class CartProductBuilder extends RequestStrategy {
  constructor () {
    super()
    this.setService( productService )
  }

  async getProductResult ( cartProduct ) {
    const product = await this.getProduct( cartProduct.product )

    const cartProductFeatures = this.getCartProductFeatures( cartProduct.featureFields )

    return {
      product,
      features: cartProductFeatures,
    }
  }

  async getProduct ( productId ) {
    return await this.request( 'getProductById', null, productId )
  }

  getCartProductFeatures ( featureFields ) {
    return store.getters[ 'product/getFeaturesAndFields' ]( featureFields )
  }
}
