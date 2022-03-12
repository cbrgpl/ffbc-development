
import getActionResultDTO from '../helpers/getActionResultDTO'
import { NetworkAttemptError } from '@errors'
import { cartService } from '@services'
import CartProductBuilder from '@classes/cartProductBuilder'

const cartProductBuilder = new CartProductBuilder()

export default {
  namespaced: true,
  state () {
    return {
      cartLoaded: false,
      cart: {
        cartItems: [],
      },
      products: [],
    }
  },
  getters: {
    cartLoaded: ( state ) => state.cartLoaded,
    cartProducts: ( state ) => state.products,
    cartItems: ( state ) => state.cart.cartItems,
    cartId: ( state ) => state.cart.id,
  },
  mutations: {
    cartLoaded ( state, loadedState ) {
      state.cartLoaded = loadedState
    },
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

      commit( 'setCart', cartRequest.parsedBody )
      dispatch( 'createProducts', cartRequest.parsedBody.cartItems )
      commit( 'cartLoaded', true )
    },
    async createProducts ( { commit }, cartProducts ) {
      const requests = []

      for ( const cartProduct of cartProducts ) {
        requests.push( cartProductBuilder.getProductResult( cartProduct ) )
      }

      const requestResults = await Promise.allSettled( requests )

      const products = requestResults
        .filter( ( result ) => result.status === 'fulfilled' )
        .map( ( result ) => result.value )

      commit( 'setCartProducts', products )
    },
    async createCartItem ( { commit }, productId ) {

    }
  }
}
