<template >
  <div >
    <CartContentProduct
      v-for="(bindedCartItem, i) of bindedCartItems"
      :key="bindedCartItem.cartItem.id"
      :cart-item-id="bindedCartItem.cartItem.id"
      :product="bindedCartItem.product"
      :product-features="bindedCartItem.features"
      @VnodeMounted="showCartContent"
      @toggleSelectState="$emit('toggleSelectState', $event)"
      v-observable="i"
      :intersected="$options.reactiveObserver.schema[i]" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CartContentProduct from './CartContentProduct.vue'

import DomHandler from '@/helpers/classes/DomHandler.class'
import { ReactiveObserver } from '@/helpers/modules/reactiveObserver'

const reactiveObserver = new ReactiveObserver()

export default {
  name: 'CartContent',
  reactiveObserver,
  emits: [ 'toggleSelectState', 'disableLoader' ],
  props: {
    bindedCartItems: {
      type: Array,
      required: true,
    }
  },
  watch: {
    bindedCartItems () {
      this.$options.reactiveObserver.unobserve()
      this.contentShown = false
    },
    cartLoaded: {
      handler ( cartLoaded ) {
        if ( cartLoaded && this.cartEmpty ) {
          this.showCartContent()
        }
      },
      immediate: true,
    }
  },
  data () {
    return {
      contentShown: false,
    }
  },
  computed: {
    ...mapGetters( {
      cartLoaded: 'cart/cartLoaded',
    } ),
    cartEmpty () {
      return this.bindedCartItems.length === 0
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
  directives: {
    observable: reactiveObserver.directive
  },
  components: {
    CartContentProduct,
  }
}
</script>
<style lang="scss" scoped>

</style>
