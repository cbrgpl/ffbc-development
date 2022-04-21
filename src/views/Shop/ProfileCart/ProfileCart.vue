<template >
  <div class="flex-col relative" >
    <zLoader
      class="z-10"
      v-if="loading"
      title
      background
      size="120px" />

    <div class="shop-main_padding flex-grow overflow-y-auto" >
      <CartActions
        @toggleAllProducts="toggleAllProducts"
        @deleteProducts="deleteSelectedProducts"
        :selected-products-empty="selectedProductsEmpty"
        :disabled="actionsDisabled" />

      <zShopProfileProduct
        v-for="bindedCartItem of bindedCartItems"
        :key="bindedCartItem.cartItem.id"
        :product="bindedCartItem.product"
        :product-features="bindedCartItem.features"
        :product-selected="selectedIds[bindedCartItem.cartItem.id]"
        @productSelectChanged="toggleSelectedId($event, bindedCartItem.cartItem.id)"
        show-actions />
    </div>

    <CartFooter
      class="flex-shrink-0 px-2.5 md:px-5 xl:px-7"
      @buy="showBuyProductsDialog"
      :cart-calculation="cartCalculation" />
  </div>
</template>

<script>
import CartActions from './partial/CartActions.vue'
import zShopProfileProduct from '@components/composite/zShopProfileProduct.vue'
import CartFooter from './partial/CartFooter.vue'

import { mapGetters } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'ProfileCart',
  data () {
    return {
      selectedIds: {},
      loading: true,
      actionsDisabled: false,
    }
  },
  watch: {
    cartLoaded: {
      handler ( newValue ) {
        if ( newValue ) {
          this.loading = false
        }
      },
      immediate: true,
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
  methods: {
    toggleSelectedId ( selectState, id ) {
      if ( selectState ) {
        this.selectedIds[ id ] = true
      } else {
        this.selectedIds[ id ] = false
      }
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
    showBuyProductsDialog () {
      this.toast$.info( { summary: 'No access', detail: 'That functionality is not completed yet...', life: 7500 } )
    }
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
