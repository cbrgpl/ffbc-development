<template >
  <div class="flex flex-col" >

    <div class="shop-main_padding flex-grow overflow-y-auto" >
      <CartActions
        @toggleAllProducts="toggleAllProducts"
        @deleteProducts="deleteSelectedProducts"
        :selected-products-empty="selectedProductsEmpty" />

      <zShopProfileProduct
        v-for="product of products"
        :key="product.id"
        :product="product"
        :product-selected="selectedIds[product.id]"
        @productSelectChanged="toggleSelectedId($event, product.id)"
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

import cartProducts from '@enums/fake/cartProduct.js'

export default {
  name: 'ProfileCart',
  data () {
    return {
      selectedIds: {},
      products: cartProducts
    }
  },
  computed: {
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
        cartCalculation.price += product.price
      }

      return cartCalculation
    },
    selectedProducts () {
      return this.products.filter( ( product ) => this.selectedIds[ product.id ] )
    },
  },
  created () {
    this.initSelectedIds()
  },
  methods: {
    initSelectedIds () {
      for ( const product of this.products ) {
        this.selectedIds[ product.id ] = false
      }
    },
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
        this.selectedIds[ product.id ] = true
      }
    },
    unselecteAllProducts () {
      for ( const product of this.products ) {
        this.selectedIds[ product.id ] = false
      }
    },
    deleteSelectedProducts () {
      console.message( 'Удаляю выбранные продукты' )
    },
    showBuyProductsDialog () {
      console.message( 'Показываю диалг для полкуки' )
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
