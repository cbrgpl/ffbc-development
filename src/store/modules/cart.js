import CartAuthStrategy from '../helpers/cartAuthStrategy'
import CartUnAuthStrategy from '../helpers/cartUnAuthStrategy'

import { arrayUtils } from '@/helpers/js_utils/index'

import getCartProducts from '../helpers/getCartProducts'
import getLocalCartDifference from '../helpers/getLocalCartDifference'
import getBindedCartItem from '../helpers/getBindedCartItem'
import cartContainsItem from '../helpers/cartContainsItem'

import { productService } from '@services'

let cartStrategy = new CartUnAuthStrategy()

export default {
  namespaced: true,
  clearable: true,
  state () {
    return {
      cartLoaded: false,
      cartId: null,
      bindedCartItems: [],
      // TODO Вынести product buffer в отдельный модуль со своим функционалом
      productBuffer: [],
    }
  },
  getters: {
    cartLoaded: ( state ) => state.cartLoaded,
    productBuffer: ( state ) => state.productBuffer,
    productBufferIncludesProduct: ( state ) => ( productId ) => !!state.productBuffer.find( ( product ) => product.id === productId ),
    bindedCartItems: ( state ) => state.bindedCartItems,
    cartId: ( state ) => state.cartId,
  },
  mutations: {
    cartLoaded ( state, loadedState ) {
      state.cartLoaded = loadedState
    },
    setCartIdToStrategy ( state ) {
      cartStrategy.setCartId( state.cartId )
    },
    setCartId ( state, cartId ) {
      state.cartId = cartId
    },
    setBindedCartItems ( state, bindedCartItems ) {
      state.bindedCartItems = bindedCartItems
    },
    addBindedCartItem ( state, bindedCartItem ) {
      state.bindedCartItems.push( bindedCartItem )
    },
    addCartItemProducts ( state, cartItemProducts ) {
      state.productBuffer.push( ...cartItemProducts )
    },
    addCartItemProduct ( state, cartItemProduct ) {
      state.productBuffer.push( cartItemProduct )
    },
    removeBindedCartItems ( state, cartItemIds ) {
      const formatedIds = cartItemIds.map( ( cartItemId ) => ( { cartItem: { id: cartItemId } } ) )

      arrayUtils.exclude( state.bindedCartItems, formatedIds, ( bindedCartItem ) => bindedCartItem.cartItem.id )
    },
    clearModule ( state ) {
      state.cartLoaded = true
      state.cartId = null
      state.bindedCartItems = []
      state.productBuffer = []
    }
  },
  actions: {
    setCartStrategy ( state, isAuth ) {
      cartStrategy = isAuth ? new CartAuthStrategy() : new CartUnAuthStrategy()
    },
    async initCart ( { commit, dispatch } ) {
      const cart = await cartStrategy.initCart()
      commit( 'setCartId', cart.id )

      await dispatch( 'addCartItemProducts', cart.cartItems )

      const bindedCartItems = cart.cartItems.map( ( cartItem ) => getBindedCartItem( cartItem ) )

      commit( 'setBindedCartItems', bindedCartItems )
      commit( 'cartLoaded', true )
    },
    async mergeLocalAndApiCarts ( { commit, getters, dispatch } ) {
      const localCartItems = getters.bindedCartItems.map( ( bindedCartItem ) => bindedCartItem.cartItem )
      const apiCart = await cartStrategy.initCart()

      commit( 'setCartId', apiCart.id )
      commit( 'setCartIdToStrategy' )

      dispatch( 'addCartItemProducts', apiCart.cartItems )

      const bindedCartItems = apiCart.cartItems.map( ( cartItem ) => getBindedCartItem( cartItem ) )
      commit( 'setBindedCartItems', bindedCartItems )

      const localCartDifference = getLocalCartDifference( localCartItems, apiCart.cartItems )

      for ( const cartItem of localCartDifference ) {
        dispatch( 'addCartItem', cartItem )
      }

      localStorage.removeItem( STORAGE_NAMES.LOCAL_CART )
    },
    async addCartItemProducts ( { commit, dispatch, getters }, cartItems ) {
      const productBufferIncludesProduct = getters.productBufferIncludesProduct
      const cartItemProductIds = getCartProducts( cartItems )

      const dispatches = []
      for ( const productId of cartItemProductIds ) {
        if ( !productBufferIncludesProduct( productId ) ) {
          dispatches.push( dispatch( 'fetchCartItemProduct', productId ) )
        }
      }

      const cartItemProducts = ( await Promise.allSettled( dispatches ) )
        .map( ( dispatch ) => dispatch.value )

      commit( 'addCartItemProducts', cartItemProducts )
    },
    async addCartItem ( { commit, dispatch, getters }, newCartItem ) {
      const cartItems = getters.bindedCartItems.map( ( bindedCartItem ) => bindedCartItem.cartItem )
      if ( cartContainsItem( cartItems, newCartItem ) ) {
        return false
      }

      const createdCartItem = await cartStrategy.addCartItem( newCartItem )

      await dispatch( 'addCartItemProduct', newCartItem )

      const bindedCartItem = getBindedCartItem( createdCartItem )

      commit( 'addBindedCartItem', bindedCartItem )

      return true
    },
    async addCartItemProduct ( { getters, dispatch, commit }, cartItem ) {
      const productBufferIncludesProduct = getters.productBufferIncludesProduct

      if ( !productBufferIncludesProduct( cartItem.product ) ) {
        const product = await dispatch( 'fetchCartItemProduct', cartItem.product )
        commit( 'addCartItemProduct', product )
      }
    },
    async fetchCartItemProduct ( { commit }, productId ) {
      const request = await productService.getProductById( null, productId )
      return request.parsedBody
    },
    async removeCartItems ( { commit }, cartItemIds ) {
      await cartStrategy.removeCartItems( cartItemIds )

      commit( 'removeBindedCartItems', cartItemIds )
    },
    // --------------PRODUCT BUFFER FUNCTIONALLITY---------------------
    async addProductsByIds ( { commit, getters, dispatch }, productIds ) {
      const productBufferIncludesProduct = getters.productBufferIncludesProduct

      const dispatches = []
      for ( const productId of productIds ) {
        if ( !productBufferIncludesProduct( productId ) ) {
          dispatches.push( dispatch( 'fetchCartItemProduct', productId ) )
        }
      }

      const products = ( await Promise.allSettled( dispatches ) )
        .map( ( dispatch ) => dispatch.value )

      commit( 'addCartItemProducts', products )
    }
  },
}
