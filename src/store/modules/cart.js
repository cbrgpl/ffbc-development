import CartAuthStrategy from '../helpers/cartAuthStrategy'
import CartUnAuthStrategy from '../helpers/cartUnAuthStrategy'

import { arrayUtils } from '@/helpers/js_utils/index'

import getNotAddedCartItems from '../helpers/getNotAddedCartItems'
import cartContainsItem from '../helpers/cartContainsItem'

import { getBindedCartItem } from '../helpers/getBindedCartItems'

import cartProducts from './cartProducts'

let cartStrategy = new CartUnAuthStrategy()

export default {
  namespaced: true,
  clearable: true,
  modules: {
    products: cartProducts
  },
  state () {
    return {
      cartLoaded: false,
      cartId: null,
      cartItems: [],
    }
  },
  getters: {
    cartLoaded: ( state ) => state.cartLoaded,
    cartEmpty: ( state ) => state.cartItems.length === 0,
    cartId: ( state ) => state.cartId,
    cartItems: ( state ) => state.cartItems
  },
  mutations: {
    setCartLoaded ( state, loadedState ) {
      state.cartLoaded = loadedState
    },
    setCartIdToStrategy ( state ) {
      cartStrategy.setCartId( state.cartId )
    },
    setCartId ( state, cartId ) {
      state.cartId = cartId
    },
    setCartItems ( state, cartItems ) {
      state.cartItems = cartItems
    },
    addCartItem ( state, cartItem ) {
      state.cartItems.push( cartItem )
    },
    removeCartItems ( state, ids ) {
      const formatedIds = ids.map( ( id ) => ( { id } ) )

      arrayUtils.exclude( state.cartItems, formatedIds, ( cartItem ) => cartItem.id )
    },
    clearModule ( state ) {
      state.cartLoaded = true
      state.cartId = null
      state.cartItems = []
    }
  },
  actions: {
    setCartStrategy ( state, isAuth ) {
      cartStrategy = isAuth ? new CartAuthStrategy() : new CartUnAuthStrategy()
    },
    async initCart ( { commit } ) {
      const cart = await cartStrategy.initCart()
      commit( 'setCartId', cart.id )
      commit( 'setCartItems', cart.cartItems )
      commit( 'setCartLoaded', true )
    },
    async mergeLocalAndApiCarts ( { commit, getters, dispatch } ) {
      commit( 'setCartLoaded', false )
      const localCartItems = getters.cartItems
      const backendCart = await cartStrategy.initCart()

      commit( 'setCartId', backendCart.id )
      commit( 'setCartIdToStrategy' )

      commit( 'setCartItems', backendCart.cartItems )

      const notAddedCartItems = getNotAddedCartItems( localCartItems, backendCart.cartItems )

      const dispatches = []
      for ( const cartItem of notAddedCartItems ) {
        dispatches.push( dispatch( 'addCartItem', cartItem ) )
      }

      await Promise.allSettled( dispatches )

      localStorage.removeItem( STORAGE_NAMES.LOCAL_CART )
      commit( 'setCartLoaded', true )
    },
    async addCartItem ( { commit, getters }, item ) {
      if ( cartContainsItem( getters.cartItems, item ) ) {
        return false
      }

      const createdCartItem = await cartStrategy.addCartItem( item )

      commit( 'addCartItem', createdCartItem )
      return true
    },
    async removeCartItems ( { commit }, ids ) {
      await cartStrategy.removeCartItems( ids )

      commit( 'removeCartItems', ids )
    },
    async outBindedCartItems ( { dispatch, rootGetters } ) {
      const cartItems = rootGetters[ 'cart/cartItems' ]

      await dispatch( 'products/loadProducts', cartItems )

      const products = rootGetters[ 'cart/products/buffer' ]
      const getFeaturesWithField = rootGetters[ 'product/getFeaturesAndFields' ]

      return getBindedCartItem( cartItems, products, getFeaturesWithField )
    }
  },
}
