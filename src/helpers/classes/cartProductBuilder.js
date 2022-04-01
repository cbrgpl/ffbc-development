import RequestStrategy from './reguestStrategy'

import store from '@/store'

export default class CartProductBuilder extends RequestStrategy {
  getBindedCartItem ( cartItem ) {
    const features = this.getCartItemFeatures( cartItem.featureFields )

    return {
      cartItem,
      features,
      product: null,
    }
  }

  async bindProductToCartItem ( bindedCartItem ) {
    const productBuffer = store.getters[ 'cart/productBuffer' ]

    const cartItemProductId = bindedCartItem.cartItem.product
    const cartItemProduct = productBuffer.find( ( product ) => product.id === cartItemProductId )

    bindedCartItem.product = cartItemProduct
  }

  getCartItemFeatures ( featureFields ) {
    return store.getters[ 'product/getFeaturesAndFields' ]( featureFields )
  }
}
