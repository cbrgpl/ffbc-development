
import CartProductBuilder from '@classes/cartProductBuilder'

import CartAuthStrategy from '../helpers/cartAuthStrategy'
import CartUnAuthStrategy from '../helpers/cartUnAuthStrategy'
import { arrayUtils } from '@/helpers/js_utils/index'
import { STORAGE_NAMES } from '@/enums/consts'

const cartProductBuilder = new CartProductBuilder()

let cartStrategy = new CartUnAuthStrategy()

export default {
  namespaced: true,
  clearable: true,
  state () {
    return {
      cartLoaded: false,
      cartItems: [],
      cartId: null,
      products: [],
    }
  },
  getters: {
    cartLoaded: ( state ) => state.cartLoaded,
    cartItems: ( state ) => state.cartItems,
    products: ( state ) => state.products,
    cartId: ( state ) => state.cartId,
  },
  mutations: {
    cartLoaded ( state, loadedState ) {
      state.cartLoaded = loadedState
    },
    setCart ( state, cart ) {
      state.cartId = cart.id ?? null
      state.cartItems = cart.cartItems
    },
    setCartId ( state, cartId ) {
      state.cartId = cartId
    },
    setCartProducts ( state, products ) {
      state.products = products
    },
    addCartItem ( state, cartItemWrapper ) {
      state.products.push( cartItemWrapper.product )
      state.cartItems.push( cartItemWrapper.cartItem )
    },
    setCartIdToStrategy ( state ) {
      cartStrategy.setCartId( state.cartId )
    },
    clearModule ( state ) {
      state.cartLoaded = true
      state.cartItems = []
      state.cartId = null
      state.products = []
    }
  },
  actions: {
    setCartStrategy ( state, isAuth ) {
      cartStrategy = isAuth ? new CartAuthStrategy() : new CartUnAuthStrategy()
    },
    async initCart ( { commit, dispatch } ) {
      const cart = await cartStrategy.initCart()

      commit( 'setCart', cart )
      await dispatch( 'createProducts', cart.cartItems )
      commit( 'cartLoaded', true )
    },
    async createProducts ( { commit }, cartItems ) {
      const requests = cartItems.map( ( cartItem ) => cartProductBuilder.getProductResult( cartItem ) )
      const requestResults = await Promise.allSettled( requests )

      const products = requestResults
        .filter( ( result ) => result.status === 'fulfilled' )
        .map( ( result ) => result.value )

      commit( 'setCartProducts', products )
    },
    async createCartItem ( { commit }, cartItem ) {
      await cartStrategy.addCartItem( cartItem )
      const product = await cartProductBuilder.getProductResult( cartItem )

      const cartItemWrapper = {
        cartItem,
        product
      }

      commit( 'addCartItem', cartItemWrapper )

      return true
    },
    async mergeLocalAndApiCarts ( { commit, getters, dispatch } ) {
      const localCartItems = getters.cartItems
      const apiCart = await cartStrategy.initCart()

      commit( 'setCartId', apiCart.id )
      commit( 'setCartIdToStrategy' )

      const cartItemsEqual = ( cartItem1, cartItem2 ) => cartItem1.product === cartItem2.product &&
      arrayUtils.equals( cartItem1.featureFields, cartItem2.featureFields )
      const apiCartContainsItem = ( localItem ) => !!apiCart.cartItems.find( ( apiItem ) => cartItemsEqual( apiItem, localItem ) )

      for ( const localItem of localCartItems ) {
        if ( !apiCartContainsItem( localItem ) ) {
          dispatch( 'createCartItem', localItem )
        }
      }

      localStorage.removeItem( STORAGE_NAMES.LOCAL_CART )

      await dispatch( 'createProducts', apiCart.cartItems )
    }
  }
}
