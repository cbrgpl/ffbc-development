
import getActionResultDTO from '../helpers/getActionResultDTO'
import { NetworkAttemptError } from '@errors'
import { cartService } from '@services'
import CartProductBuilder from '@classes/cartProductBuilder'

const cartProductBuilder = new CartProductBuilder()

export default {
  namespaced: true,
  state () {
    return {
      cart: [],
      products: [],
    }
  },
  getters: {
    cartProducts: ( state ) => state.products,
    cart: ( state ) => state.cart
  },
  mutations: {
    setCart ( state, cart ) {
      state.cart = cart
    },
    setCartProducts ( state, products ) {
      state.products = products
    }
  },
  actions: {
    async initCart ( { commit, dispatch } ) {
      const cartRequest = await cartService.getCart()

      if ( cartRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( cartRequest.httpResponse )
      }

      commit( 'setCart', cartRequest.parsedBody.cartItems )
      dispatch( 'createProducts', cartRequest.parsedBody.cartItems )
    },
    async createProducts ( { commit }, cartProducts ) {
      const products = []

      for ( const cartProduct of cartProducts ) {
        products.push( await cartProductBuilder.getProductResult( cartProduct ) )
      }

      commit( 'setCartProducts', products )
    },
    async addProductToCart ( { commit }, productId ) {

    }
  }
}
