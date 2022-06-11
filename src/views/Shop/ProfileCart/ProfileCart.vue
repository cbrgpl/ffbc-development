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
        @toggleAllItems="toggleAllItems"
        @deleteProducts="deleteSelectedItems"
        :no-selected-items="noSelectedItems"
        :disabled="actionsDisabled" />

      <zShopProfileProduct
        v-for="(bindedCartItem, i) of bindedCartItems"
        :key="bindedCartItem.cartItem.id"
        :product="bindedCartItem.product"
        :product-features="bindedCartItem.features"
        :product-selected="selectedIds[bindedCartItem.cartItem.id]"
        @mounted="showContent"
        @productSelectChanged="selectItem(bindedCartItem.cartItem.id, $event)"
        v-observable="i"
        :intersected="$options.reactiveObserver.observablesSchema[i]"
        show-actions />
    </div>

    <CartFooter
      class="flex-shrink-0 px-2.5 md:px-5 xl:px-7"
      @buy="pushToOrderCheckout"
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
      actionsDisabled: computed( () => this.actionsDisabled || this.noSelectedItems ),
    }
  },
  watch: {
    cartLoaded: {
      handler ( cartLoaded ) {
        if ( cartLoaded && this.cartEmpty ) {
          this.showContent()
        }
      },
      immediate: true,
    }
  },
  computed: {
    ...mapGetters( {
      bindedCartItems: 'cart/bindedCartItems',
      cartLoaded: 'cart/cartLoaded',
    } ),
    cartEmpty () {
      return this.bindedCartItems.length === 0
    },
    noSelectedItems () {
      return this.selectedItems.length === 0
    },
    selectedItems () {
      return this.bindedCartItems.filter( ( bindedCartItem ) => this.selectedIds[ bindedCartItem.cartItem.id ] )
    },
    cartCalculation () {
      const cartCalculation = {
        qnt: 0,
        price: 0,
      }

      for ( const bindedCartItem of this.selectedItems ) {
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
    selectItem ( id, state ) {
      this.selectedIds[ id ] = state
    },
    toggleAllItems () {
      const selectState = this.noSelectedItems === true

      for ( const bindedCartItem of this.bindedCartItems ) {
        this.selectedIds[ bindedCartItem.cartItem.id ] = selectState
      }
    },
    async deleteSelectedItems () {
      this.actionsDisabled = true

      const cartItemIds = this.selectedItems.map( ( bindedCartItem ) => bindedCartItem.cartItem.id )
      await this.$store.dispatch( 'cart/removeCartItems', cartItemIds )

      this.actionsDisabled = false
    },
    pushToOrderCheckout () {
      const bindedCartItemIds = this.selectedItems.map( ( bindedCartItem ) => bindedCartItem.cartItem.id )

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
