<template >
  <div class="flex-col relative" >
    <zLoader
      v-if="loading"
      class="z-10"
      title
      background
      size="120px" />

    <div class="shop-main-padding flex-grow overflow-y-auto" >
      <CartActions
        :no-selected-items="noSelectedItems"
        :disabled="actionsDisabled"
        @toggleAllSelectStates="toggleAllSelectStates"
        @deleteProducts="deleteSelectedItems" />

      <CartContent
        :binded-cart-items="bindedCartItems"
        @disableLoader="loading = false"
        @toggleSelectState="toggleSelectState" />
    </div>

    <CartFooter
      class="flex-shrink-0 px-2.5 md:px-5 xl:px-7"
      :selected-items="selectedItems"
      @buy="pushToOrderCheckout" />
  </div>
</template>

<script >
import CartActions from './partial/CartActions.vue'
import CartContent from './partial/CartContent.vue'
import CartFooter from './partial/CartFooter.vue'

import { mapGetters } from 'vuex'
import { computed } from 'vue'
import { arrayUtils } from '@js_utils'

export default {
  name: 'ProfileCart',
  components: {
    CartActions,
    CartContent,
    CartFooter,
  },
  provide () {
    return {
      actionsDisabled: computed( () => this.actionsDisabled || this.noSelectedItems ),
      selectedIds: computed( () => this.selectedIds )
    }
  },
  data () {
    return {
      selectedIds: [],
      bindedCartItems: [],
      loading: true,
      actionsDisabled: false,
    }
  },
  computed: {
    ...mapGetters( {
      cartLoaded: 'cart/cartLoaded',
      cartItems: 'cart/cartItems',
    } ),
    noSelectedItems () {
      return this.selectedIds.length === 0
    },
    selectedItems () {
      return this.cartItems.filter( ( cartItem ) => this.selectedIds.includes( cartItem.id ) )
    }
  },
  watch: {
    cartLoaded: {
      handler ( cartLoaded ) {
        if ( cartLoaded ) {
          this.updateBindedCartItems()
        }
      },
      immediate: true,
    }
  },
  methods: {
    async updateBindedCartItems () {
      this.bindedCartItems = await this.$store.dispatch( 'cart/outBindedCartItems' )
    },
    toggleSelectState ( id ) {
      if ( !this.selectedIds.includes( id ) ) {
        this.selectedIds.push( id )
      } else {
        arrayUtils.remove( this.selectedIds, id )
      }
    },
    toggleAllSelectStates () {
      if ( this.noSelectedItems ) {
        this.selectedIds = this.cartItems.map( ( cartItem ) => cartItem.id )
      } else {
        this.selectedIds = []
      }
    },
    async deleteSelectedItems () {
      this.actionsDisabled = true

      await this.$store.dispatch( 'cart/removeCartItems', this.selectedIds )
      this.excludeRemovedBindedItems( this.selectedIds )

      this.selectedIds = []

      this.actionsDisabled = false
    },
    excludeRemovedBindedItems ( removedIds ) {
      const formattedIds = removedIds.map( ( id ) => ( { cartItem: { id } } ) )
      arrayUtils.exclude( this.bindedCartItems, formattedIds, ( bindedItem ) => bindedItem.cartItem.id )
    },
    pushToOrderCheckout () {
      this.$router.push( {
        name: 'ShopCheckout',
        params: {
          cartItemIds: JSON.stringify( this.selectedIds )
        }
      } )
    }

  },
}
</script>

<style lang="scss" scoped >

</style>
