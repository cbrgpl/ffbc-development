<template >
  <div >
    <zShopProfileProduct
      v-for="(bindedCartItem, i) of bindedCartItems"
      :key="bindedCartItem.cartItem.id"
      :cart-item-id="bindedCartItem.cartItem.id"
      :product="bindedCartItem.product"
      :product-features="bindedCartItem.features"
      @VnodeMounted="showContent"
      @toggleSelectState="$emit('toggleSelectState', $event)"
      v-observable="i"
      :intersected="$options.reactiveObserver.observablesSchema[i]" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import zShopProfileProduct from '@components/composite/zShopProfileProduct.vue'

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
    cartLoaded: {
      handler ( cartLoaded ) {
        if ( cartLoaded && this.cartEmpty ) {
          this.showContent()
        }
      },
      immediate: true,
    }
  },
  data () {
    return {
      contentMounted: false,
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
    this.$options.reactiveObserver.reset()
  },
  methods: {
    showContent ( ) {
      if ( !this.contentMounted ) {
        this.contentMounted = true
        this.initObserver()
        this.$emit( 'disableLoader' )
      }
    },
    initObserver () {
      const reactiveObserver = this.$options.reactiveObserver
      const $contentContainer = DomHandler.getScrollableParents( this.$el )[ 0 ]
      reactiveObserver.init( $contentContainer, '0px 0px 300px 0px' )
    },
  },
  directives: {
    observable: reactiveObserver.observableDirective
  },
  components: {
    zShopProfileProduct,
  }
}
</script>
<style lang="scss" scoped>

</style>
