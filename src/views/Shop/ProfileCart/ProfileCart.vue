<template >
  <div class="flex flex-col" >
    <div class="shop-main_padding flex-grow overflow-y-auto" >
      <CartActions
        @toggleAllProducts="toggleAllProducts"
        @deleteProducts="deleteSelectedProducts"
        :selected-products-empty="selectedProductsEmpty" />
      <span v-if="loading" >
        loading...
      </span>
      <zShopProfileProduct
        v-for="product of products"
        :key="product.cartProductId"
        :product="product.product"
        :product-features="product.features"
        :product-selected="selectedIds[product.cartProductId]"
        @productSelectChanged="toggleSelectedId($event, product.cartProductId)"
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

export default {
  name: 'ProfileCart',
  data () {
    return {
      selectedIds: {},
      loading: true,
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
  computed: {
    ...mapGetters( {
      cartItems: 'cart/cartItems',
      products: 'cart/products',
      cartLoaded: 'cart/cartLoaded',
    } ),
    selectedProductsEmpty () {
      return this.selectedProducts.length === 0
    },
    cartCalculation () {
      const cartCalculation = {
        qnt: 0,
        price: 0,
      }

      for ( const product of this.selectedProducts ) {
        cartCalculation.qnt++
        cartCalculation.price += parseFloat( product.product.price )
      }

      return cartCalculation
    },
    selectedProducts () {
      return this.products.filter( ( product ) => this.selectedIds[ product.cartProductId ] )
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
      if ( this.selectedProductsEmpty ) {
        this.selectAllProducts()
      } else {
        this.unselecteAllProducts()
      }
    },
    selectAllProducts () {
      for ( const product of this.products ) {
        this.selectedIds[ product.cartProductId ] = true
      }
    },
    unselecteAllProducts () {
      for ( const product of this.products ) {
        this.selectedIds[ product.cartProductId ] = false
      }
    },
    deleteSelectedProducts () {
      console.log( 'Удаляю выбранные продукты' )
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
