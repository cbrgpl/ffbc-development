<template >
  <div class="flex-col relative" >
    <zLoader
      class="z-10"
      v-if="loading"
      title
      background
      size="120px" />

    <div
      ref="contentContainer"
      class="shop-main_padding flex-grow overflow-y-auto" >
      <CartActions
        @toggleAllProducts="toggleAllProducts"
        @deleteProducts="deleteSelectedProducts"
        :selected-products-empty="selectedProductsEmpty"
        :disabled="actionsDisabled" />

      <zShopProfileProduct
        v-for="(bindedCartItem, i) of bindedCartItems"
        :key="bindedCartItem.cartItem.id"
        :product="bindedCartItem.product"
        :product-features="bindedCartItem.features"
        :product-selected="selectedIds[bindedCartItem.cartItem.id]"
        @mounted="showContent"
        @productSelectChanged="toggleSelectedId($event, bindedCartItem.cartItem.id)"
        v-observable="i"
        :intersected="$options.reactiveObserver.observablesSchema[i]"
        show-actions />
    </div>

    <CartFooter
      class="flex-shrink-0 px-2.5 md:px-5 xl:px-7"
      @buy="goToOrderCheckout"
      :cart-calculation="cartCalculation" />
  </div>
</template>

<script>
import CartActions from './partial/CartActions.vue'
import zShopProfileProduct from '@components/composite/zShopProfileProduct.vue'
import CartFooter from './partial/CartFooter.vue'

import { ReactiveObserver } from '@/helpers/modules/reactiveObserver'

import { mapGetters } from 'vuex'
import { computed } from 'vue'

const reactiveObserver = new ReactiveObserver()

export default {
  name: 'ProfileCart',
  reactiveObserver,
  data () {
    return {
      selectedIds: {},
      loading: true,
      actionsDisabled: false,
    }
  },
  provide () {
    return {
      actionsDisabled: computed( () => this.actionsDisabled ),
    }
  },
  computed: {
    ...mapGetters( {
      bindedCartItems: 'cart/bindedCartItems',
      cartLoaded: 'cart/cartLoaded',
    } ),
    selectedProductsEmpty () {
      return this.selectedCartItems.length === 0
    },
    selectedCartItems () {
      return this.bindedCartItems.filter( ( bindedCartItem ) => this.selectedIds[ bindedCartItem.cartItem.id ] )
    },
    cartCalculation () {
      const cartCalculation = {
        qnt: 0,
        price: 0,
      }

      for ( const bindedCartItem of this.selectedCartItems ) {
        cartCalculation.qnt++
        cartCalculation.price += parseFloat( bindedCartItem.cartItem.price )
      }

      return cartCalculation
    },
  },
  beforeUnmount () {
    this.$options.reactiveObserver.reset()
  },
  methods: {
    showContent ( ) {
      if ( this.loading ) {
        this.initObserver()
        this.loading = false
      }
    },
    initObserver () {
      const reactiveObserver = this.$options.reactiveObserver
      const $contentContainer = this.$refs.contentContainer
      reactiveObserver.init( $contentContainer, '0px 0px 300px 0px' )
    },
    toggleSelectedId ( selectState, id ) {
      this.selectedIds[ id ] = selectState
    },
    toggleAllProducts () {
      const selectAll = this.selectedProductsEmpty === true

      for ( const bindedCartItem of this.bindedCartItems ) {
        this.selectedIds[ bindedCartItem.cartItem.id ] = selectAll
      }
    },
    async deleteSelectedProducts () {
      this.actionsDisabled = true

      const cartItemIds = this.selectedCartItems.map( ( bindedCartItem ) => bindedCartItem.cartItem.id )
      await this.$store.dispatch( 'cart/removeCartItems', cartItemIds )

      this.actionsDisabled = false
    },
    goToOrderCheckout () {
      const bindedCartItemIds = this.selectedCartItems.map( ( bindedCartItem ) => bindedCartItem.cartItem.id )

      this.$router.push( {
        name: 'ShopCheckout',
        params: {
          bindedCartItemIds: JSON.stringify( bindedCartItemIds )
        }
      } )
    }
  },
  directives: {
    observable: reactiveObserver.observableDirective
  },
  components: {
    zShopProfileProduct,
    CartActions,
    CartFooter,
  }
}
</script>

<style lang="scss" scoped>

</style>
