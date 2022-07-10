<template >
  <div >
    <CartContentProduct
      v-for="(bindedCartItem, i) of bindedCartItems"
      :key="bindedCartItem.cartItem.id"
      ref="products"
      v-observable="i"
      :cart-item-id="bindedCartItem.cartItem.id"
      :product="bindedCartItem.product"
      :product-features="bindedCartItem.features"
      @VnodeMounted="showCartContent"
      @toggleSelectState="$emit('toggleSelectState', $event)" />
  </div>
</template>

<script >
import { mapGetters } from 'vuex'

import CartContentProduct from './CartContentProduct.vue'

import DomHandler from '@/helpers/classes/DomHandler.class'
import { ReactiveObserver } from '@/helpers/modules/reactiveObserver'

const reactiveObserver = new ReactiveObserver()

export default {
  name: 'CartContent',
  reactiveObserver,
  productBuffer: [],
  directives: {
    observable: reactiveObserver.directive
  },
  components: {
    CartContentProduct,
  },
  props: {
    bindedCartItems: {
      type: Array,
      required: true,
    }
  },
  emits: [ 'toggleSelectState', 'disableLoader' ],
  data () {
    return {
      contentShown: false,
    }
  },
  computed: {
    ...mapGetters( {
      cartLoaded: 'cart/cartLoaded',
      cartEmpty: 'cart/cartEmpty'
    } ),
  },
  watch: {
    bindedCartItems () {
      const observerInited = this.$options.reactiveObserver.inited

      if ( observerInited ) {
        this.$options.reactiveObserver.unobserve()
        this.contentShown = false
      }
    },
    cartLoaded: {
      handler ( cartLoaded ) {
        if ( cartLoaded && this.cartEmpty ) {
          this.showCartContent()
        }
      },
      immediate: true,
    },
    '$options.reactiveObserver.schema': {
      handler ( observerSchema ) {
        const products = this.$refs.products

        for ( const number in observerSchema ) {
          if ( observerSchema[ number ] ) {
            products[ number ].startMediaLoading()
          }
        }
      },
      deep: true,
    },
  },
  beforeUnmount () {
    this.$options.reactiveObserver.unobserve()
  },
  methods: {
    showCartContent () {
      if ( !this.contentShown ) {
        this.contentShown = true

        this.initObserver()
        this.$emit( 'disableLoader' )
      }
    },
    initObserver () {
      const reactiveObserver = this.$options.reactiveObserver

      const $contentContainer = DomHandler.getScrollableParents( this.$el )[ 0 ]
      reactiveObserver.init( $contentContainer, '0px 0px 300px 0px' )
      reactiveObserver.observe()
    },

  },
 
}
</script>
<style lang="scss" scoped >

</style>
